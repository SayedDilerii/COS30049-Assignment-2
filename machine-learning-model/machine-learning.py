import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import QuantileTransformer, RobustScaler
from sklearn.metrics import mean_squared_error, r2_score
import json
from datetime import datetime, timedelta
import sys
import os

class FireRiskPredictor:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.qt = None
        self.feature_importances = None
        
    def train(self, data_path):
        # print("Loading data...")
        self.data = pd.read_csv(data_path, usecols=['state', 'discovery_month', 'discovery_doy', 
                                                   't_min', 't_max', 'elevation', 'fire_size'])
        
        # Feature engineering
        self._prepare_features()
        
        # Train model
        self._train_model()
        
        # Calculate feature importance
        self._calculate_feature_importance()
    
    def _prepare_features(self):
        # print("Preparing features...")
        self.data['sin_day'] = np.sin(2 * np.pi * self.data['discovery_doy']/365)
        self.data['cos_day'] = np.cos(2 * np.pi * self.data['discovery_doy']/365)
        self.data['temp_range'] = self.data['t_max'] - self.data['t_min']
        self.data['temp_squared'] = self.data['t_max'] ** 2
        self.data['temp_exp'] = np.exp((self.data['t_max'] - self.data['t_max'].mean()) / self.data['t_max'].std())
        self.data['temp_elev_interact'] = self.data['t_max'] * self.data['elevation']
        
        # Aggregate by state and month
        self.data_state = self.data.groupby(['state', 'discovery_month', 'discovery_doy']).agg({
            'fire_size': 'sum',
            't_min': 'mean',
            't_max': 'mean',
            'temp_range': 'mean',
            'temp_squared': 'mean',
            'temp_exp': 'mean',
            'temp_elev_interact': 'mean',
            'elevation': 'mean',
            'sin_day': 'first',
            'cos_day': 'first'
        }).reset_index()
        
        # Transform fire_size to risk_score
        self.qt = QuantileTransformer(output_distribution='uniform', n_quantiles=1000)
        self.data_state['risk_score'] = self.qt.fit_transform(self.data_state[['fire_size']])
    
    def _train_model(self):
        features = ['state', 'discovery_month', 'discovery_doy', 't_min', 't_max', 
                   'temp_range', 'temp_squared', 'temp_exp', 'temp_elev_interact', 
                   'elevation', 'sin_day', 'cos_day']
        
        X = pd.get_dummies(self.data_state[features], columns=['state'])
        y = self.data_state['risk_score']
        
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.scaler = RobustScaler()
        X_train_scaled = self.scaler.fit_transform(self.X_train)
        
        self.model = RandomForestRegressor(n_estimators=500, max_depth=20, random_state=42, n_jobs=-1)
        self.model.fit(X_train_scaled, self.y_train)
    
    def _calculate_feature_importance(self):
        feature_importance = pd.DataFrame({
            'feature': self.X_train.columns,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        # Filter out state-specific features for general importance
        self.feature_importances = feature_importance[
            ~feature_importance['feature'].str.startswith('state_')
        ].head(10)
    
    def predict_with_insights(self, date, state, t_min, t_max):
        """Predict fire risk and return additional visualization data"""
        date_obj = pd.to_datetime(date)
        risk_score = self._predict_single(date_obj, state, t_min, t_max)
        
        # Generate visualization data
        viz_data = {
            'current_prediction': {
                'risk_score': float(risk_score),
                'date': date,
                'state': state,
                'temperature': {'min': t_min, 'max': t_max}
            },
            'feature_importance': self.feature_importances.to_dict('records'),
            'historical_context': self._get_historical_context(state, date_obj),
            'temperature_risk_curve': self._generate_temp_risk_curve(state, date_obj, t_min, t_max),
            'seasonal_risk': self._calculate_seasonal_risk(state),
            'state_comparison': self._get_state_comparison(state, date_obj)
        }
        
        return viz_data
    
    def _predict_single(self, date, state, t_min, t_max):
        input_data = pd.DataFrame(0, index=[0], columns=self.X_train.columns)
        
        # Fill basic features
        input_data['discovery_month'] = date.month
        input_data['discovery_doy'] = date.timetuple().tm_yday
        input_data['t_min'] = t_min
        input_data['t_max'] = t_max
        input_data['elevation'] = self.data_state[self.data_state['state'] == state]['elevation'].mean()
        
        # Calculate derived features
        input_data['sin_day'] = np.sin(2 * np.pi * input_data['discovery_doy']/365)
        input_data['cos_day'] = np.cos(2 * np.pi * input_data['discovery_doy']/365)
        input_data['temp_range'] = input_data['t_max'] - input_data['t_min']
        input_data['temp_squared'] = input_data['t_max'] ** 2
        input_data['temp_exp'] = np.exp((input_data['t_max'] - self.data['t_max'].mean()) / self.data['t_max'].std())
        input_data['temp_elev_interact'] = input_data['t_max'] * input_data['elevation']
        
        # Set state
        state_column = f'state_{state}'
        if state_column in input_data.columns:
            input_data[state_column] = 1
        
        input_scaled = self.scaler.transform(input_data)
        return self.model.predict(input_scaled)[0]
    
    def _get_historical_context(self, state, date):
        """Get historical risk scores for the same month"""
        month = date.month
        state_data = self.data_state[
            (self.data_state['state'] == state) & 
            (self.data_state['discovery_month'] == month)
        ]
        
        return {
            'avg_risk': float(state_data['risk_score'].mean()),
            'max_risk': float(state_data['risk_score'].max()),
            'min_risk': float(state_data['risk_score'].min()),
            'percentile_90': float(state_data['risk_score'].quantile(0.9))
        }
    
    def _generate_temp_risk_curve(self, state, date, t_min, t_max):
        """Generate risk scores across temperature range"""
        temp_range = np.linspace(t_min - 5, t_max + 5, 20)
        risks = []
        
        for temp in temp_range:
            risk = self._predict_single(date, state, t_min, temp)
            risks.append({'temperature': float(temp), 'risk': float(risk)})
        
        return risks
    
    def _calculate_seasonal_risk(self, state):
        """Calculate average risk scores by month for the state"""
        monthly_risks = self.data_state[self.data_state['state'] == state].groupby('discovery_month').agg({
            'risk_score': 'mean',
            't_max': 'mean',
            't_min': 'mean'
        }).reset_index()
        
        return monthly_risks.to_dict('records')
    
    def _get_state_comparison(self, target_state, date):
        """Compare risk levels across neighboring states"""
        month = date.month
        all_states = self.data_state['state'].unique()
        
        state_risks = []
        for state in all_states:
            avg_risk = self.data_state[
                (self.data_state['state'] == state) & 
                (self.data_state['discovery_month'] == month)
            ]['risk_score'].mean()
            
            state_risks.append({
                'state': state,
                'avg_risk': float(avg_risk)
            })
        
        return sorted(state_risks, key=lambda x: x['avg_risk'], reverse=True)
    
    def predict_with_visualizations(self, date, state, t_min, t_max):
        """Generate prediction and visualization data for a specific query"""
        date_obj = pd.to_datetime(date)
        base_risk = self._predict_single(date_obj, state, t_min, t_max)
        
        # 1. Temperature Sensitivity Analysis
        temp_analysis = self._analyze_temperature_sensitivity(date_obj, state, t_min, t_max)
        
        # 2. Historical Risk Comparison
        historical_comparison = self._get_historical_comparison(date_obj, state)
        
        # 3. Monthly Risk Forecast
        risk_forecast = self._generate_monthly_forecast(date_obj, state, t_min, t_max)
        
        return {
            'current_prediction': {
                'risk_score': float(base_risk),
                'date': date,
                'state': state,
                'temperature': {'min': t_min, 'max': t_max}
            },
            'temperature_sensitivity': temp_analysis,
            'historical_comparison': historical_comparison,
            'monthly_forecast': risk_forecast
        }
    
    def _analyze_temperature_sensitivity(self, date, state, t_min, t_max):
        """Analyze how risk changes with temperature variations"""
        temp_range = np.linspace(t_min - 5, t_max + 5, 15)
        base_temp = (t_max + t_min) / 2
        
        sensitivity_data = []
        for temp in temp_range:
            risk_low = self._predict_single(date, state, max(temp - 5, 0), temp)
            risk_high = self._predict_single(date, state, temp, temp + 5)
            
            sensitivity_data.append({
                'temperature': float(temp),
                'risk_low_temp': float(risk_low),
                'risk_high_temp': float(risk_high),
                'is_current': abs(temp - base_temp) < 1
            })
        
        return sensitivity_data
    
    def _get_historical_comparison(self, date, state):
        """Compare current prediction with historical data"""
        month = date.month
        day_of_year = date.timetuple().tm_yday
        
        # Get 30-day window around the target date
        historical_data = self.data_state[
            (self.data_state['state'] == state) &
            (abs(self.data_state['discovery_doy'] - day_of_year) <= 15)
        ]
        
        if len(historical_data) == 0:
            return []
        
        risks_by_temp = []
        temp_ranges = np.linspace(
            historical_data['t_max'].min(),
            historical_data['t_max'].max(),
            8
        )
        
        for i in range(len(temp_ranges)-1):
            temp_min, temp_max = temp_ranges[i], temp_ranges[i+1]
            mask = (historical_data['t_max'] >= temp_min) & (historical_data['t_max'] < temp_max)
            risk_scores = historical_data[mask]['risk_score']
            
            if len(risk_scores) > 0:
                risks_by_temp.append({
                    'temp_range': f"{temp_min:.1f}-{temp_max:.1f}°C",
                    'avg_risk': float(risk_scores.mean()),
                    'max_risk': float(risk_scores.max()),
                    'min_risk': float(risk_scores.min()),
                    'sample_size': int(len(risk_scores))
                })
        
        return risks_by_temp
    
    def _generate_monthly_forecast(self, date, state, t_min, t_max):
        """Generate risk predictions for upcoming months"""
        forecasts = []
        
        # Generate predictions for next 6 months
        for i in range(6):
            future_date = date + pd.DateOffset(months=i)
            
            # Adjust temperatures based on historical averages for that month
            month_data = self.data_state[
                (self.data_state['state'] == state) &
                (self.data_state['discovery_month'] == future_date.month)
            ]
            
            if len(month_data) > 0:
                temp_adjustment = (month_data['t_max'].mean() - t_max) / 2
                adjusted_t_max = t_max + temp_adjustment
                adjusted_t_min = t_min + temp_adjustment
                
                risk = self._predict_single(future_date, state, adjusted_t_min, adjusted_t_max)
                
                forecasts.append({
                    'month': future_date.strftime('%B'),
                    'risk_score': float(risk),
                    'avg_temp': float(adjusted_t_max),
                    'historical_avg_risk': float(month_data['risk_score'].mean())
                })
        
        return forecasts
    
# if __name__ == "__main__":
#     predictor = FireRiskPredictor()
#     predictor.train('./datasets/merged_data(1).csv')
    
#     insights = predictor.predict_with_insights(
#         date="2024-05-12",
#         state="NY",
#         t_min=20,
#         t_max=38
#     )
    
#     print(json.dumps(insights, indent=2))

if __name__ == "__main__":
    try:
        if len(sys.argv) != 5:
            raise ValueError(f"Expected 4 arguments (state, date, tmin, tmax), got {len(sys.argv)-1}")
            
        # Get the directory where the Python script is located
        script_dir = os.path.dirname(os.path.abspath(__file__))
        
        # Construct absolute path to the dataset
        dataset_path = os.path.join(script_dir, 'datasets', 'merged_data(1).csv')
        
        if not os.path.exists(dataset_path):
            raise FileNotFoundError(f"Dataset not found at: {dataset_path}")
            
        state = sys.argv[1]
        date = sys.argv[2]
        t_min = float(sys.argv[3])
        t_max = float(sys.argv[4])
        
        predictor = FireRiskPredictor()
        predictor.train(dataset_path)
        
        insights = predictor.predict_with_insights(
            date=date,
            state=state,
            t_min=t_min,
            t_max=t_max
        )
                
        insights['state_comparison'] = [
            state_data for state_data in insights['state_comparison'] 
            if not np.isnan(state_data['avg_risk'])
        ]
        
        for key in insights:
            if isinstance(insights[key], list):
                insights[key] = [
                    item for item in insights[key]
                    if not any(isinstance(v, float) and np.isnan(v) for v in item.values())
                ]
        
        print(json.dumps(insights))

    except Exception as e:
        print(json.dumps({
            "success": False,
            "error": str(e)
        }))
        sys.exit(1)
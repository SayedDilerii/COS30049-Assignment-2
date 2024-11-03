type Tempreture = {
  tmin: string;
  tmax: string;
};

type CurrentPrediction = {
  risk_score: number;
  state: string;
  date: string;
  tempreture: Tempreture;
};

type FeatureImportance = {
  feature: string;
  importance: number;
};

type HistoricalContext = {
  avg_risk: string;
  max_risk: string;
  min_risk: string;
  precentile_90: string;
};

type TempretureRiskCurve = {
  tempreture: number;
  risk: number;
};

type SeasonalRisk = {
  discovery_month: number;
  risk_score: number;
  t_max: number;
  t_min: number;
};

type StateComparison = {
  state: string;
  avg_risk: number;
};

type Result = {
  current_prediction: CurrentPrediction;
  feature_importance: FeatureImportance[];
  historical_context: HistoricalContext;
  temperature_risk_curve: TempretureRiskCurve[];
  seasonal_risk: SeasonalRisk[];
  state_comparison: StateComparison[];
};

export type ModelResult = {
  success: boolean;
  result: Result;
};

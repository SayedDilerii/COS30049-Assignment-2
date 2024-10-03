import os
import pandas as pd

# Define the paths for your bushfire data file and the folder containing weather data
bushfire_data_file = r'./datasets/cleaned-bushfire.csv'
weather_data_folder = r'' # This requires the weather dataset which we aren't able to provide due to it's large size and time it takes to clean.

# Load the bushfire data
bushfire_data = pd.read_csv(bushfire_data_file)

# Convert 'discovery_datetime' to datetime, and drop rows with invalid dates
bushfire_data['discovery_datetime'] = pd.to_datetime(bushfire_data['discovery_datetime'], errors='coerce')
bushfire_data = bushfire_data.dropna(subset=['discovery_datetime'])

# Create required date-related columns
bushfire_data['formatted_date'] = bushfire_data['discovery_datetime'].dt.date
bushfire_data['discovery_month'] = bushfire_data['discovery_datetime'].dt.month
bushfire_data['discovery_time'] = bushfire_data['discovery_datetime'].dt.strftime('%H:%M')
bushfire_data['discovery_doy'] = bushfire_data['discovery_datetime'].dt.dayofyear

# Function to assign season based on month
def get_season(month):
    if month in [12, 1, 2]:
        return 'Winter'
    elif month in [3, 4, 5]:
        return 'Spring'
    elif month in [6, 7, 8]:
        return 'Summer'
    else:
        return 'Fall'

bushfire_data['season'] = bushfire_data['discovery_month'].apply(get_season)

# Load and concatenate weather data for the unique years in bushfire data
weather_data_frames = []
years = bushfire_data['discovery_datetime'].dt.year.unique()
for year in years:
    weather_file = os.path.join(weather_data_folder, f'{year}_weather_data.csv')
    if os.path.exists(weather_file):
        weather_data = pd.read_csv(weather_file)
        weather_data['Date'] = pd.to_datetime(weather_data['Date'], errors='coerce').dt.date
        weather_data_frames.append(weather_data)
    else:
        print(f"Weather data file not found: {weather_file}")

# Merge all weather data if available
if weather_data_frames:
    weather_data = pd.concat(weather_data_frames, ignore_index=True)
    
    # Group by Date and STATE, averaging relevant columns
    weather_data_grouped = weather_data.groupby(['Date', 'STATE']).agg(
        avg_TMAX=('TMAX (°C)', 'mean'),
        avg_TMIN=('TMIN (°C)', 'mean'),
        avg_Elevation=('ELEVATION', 'mean')
    ).reset_index()

    # Merge bushfire data with grouped weather data on 'formatted_date' and 'state'
    merged_data = pd.merge(
        bushfire_data, 
        weather_data_grouped, 
        left_on=['formatted_date', 'state'], 
        right_on=['Date', 'STATE'], 
        how='inner'
    )

    # Prepare final DataFrame with the required columns
    final_data = merged_data.rename(columns={
        'object_id': 'fire_id',  # Rename object_id to fire_id
        'formatted_date': 'discovery_date',
        'avg_TMIN': 't_min',
        'avg_TMAX': 't_max',
        'avg_Elevation': 'elevation'
    })[[
        'fire_id', 'discovery_date', 'discovery_month', 'discovery_time',
        'discovery_doy', 'general_cause', 'origin', 'fire_size',
        'fire_class', 'latitude', 'longitude', 'state', 'season', 
        't_min', 't_max', 'elevation'
    ]]

    # Round latitude, longitude, t_min, t_max, and elevation to 2 decimal places
    final_data[['latitude', 'longitude', 't_min', 't_max', 'elevation']] = final_data[['latitude', 'longitude', 't_min', 't_max', 'elevation']].round(2)

    # Save the final data to CSV
    output_file = os.path.join(weather_data_folder, 'final_bushfire_weather_data_anthony.csv')
    final_data.to_csv(output_file, index=False)
    print(f"All merged data saved to: {output_file}")
else:
    print("No weather data to merge.")

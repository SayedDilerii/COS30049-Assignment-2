from data_transformation import ProcessWeatherData
from data_transformation import ProcessBushfireData
import matplotlib.pyplot as plt
import pandas as pd

# Define the path to your data
basePathWeather = 'vic'
locationWeather = "aireys_inlet"  # Edit for specific locations or remove for all data

basePathBushfire = 'bushfires_australia'

# Process the data using the function from data-transformation.py
weatherDataFrame = ProcessWeatherData(basePathWeather, locationWeather)
bushfireDataFrame = ProcessBushfireData(basePathBushfire)

# Filter data for Victoria
bushfireDataFile = bushfireDataFrame[bushfireDataFrame["State"].str.contains('VIC (Victoria)', na=False, regex=False)]

# Ensure only bushfires are included
bushfireDataFile = bushfireDataFile[bushfireDataFile['Fire Type'] == 'Bushfire']

# Ensure data is sorted by Date for merging
weatherDataFrame = weatherDataFrame.sort_values(by='Date')
bushfireDataFile = bushfireDataFile.sort_values(by='Ignition Date')

# Normalize date formats
weatherDataFrame['Date'] = pd.to_datetime(weatherDataFrame['Date']).dt.date
bushfireDataFile['Ignition Date'] = pd.to_datetime(bushfireDataFile['Ignition Date']).dt.date

# Merge datasets on date
mergedData = pd.merge(weatherDataFrame, bushfireDataFile, left_on='Date', right_on='Ignition Date', how='inner')

# Check if mergedData is not empty
if mergedData.empty:
    print("No overlapping dates found between weather and bushfire data.")
else:
    # Create temperature bins of 5 degrees
    temperature_bins = pd.interval_range(start=0, end=50, freq=5)
    mergedData['Temperature Bin'] = pd.cut(mergedData['Max.Temp (°C)'], bins=temperature_bins)

    # Aggregate bushfire occurrences by temperature bin
    aggregated_data = mergedData.groupby('Temperature Bin').size().reset_index(name='Number of Bushfires')

    # Plot data
    plt.figure(figsize=(14, 7))

    plt.bar(
        aggregated_data['Temperature Bin'].astype(str),
        aggregated_data['Number of Bushfires'],
        color='red',
        alpha=0.7
    )
    plt.xlabel('Temperature Bin (°C)')
    plt.ylabel('Number of Bushfires')
    plt.title('Number of Bushfires by Temperature Range in Victoria')
    plt.xticks(rotation=45)
    plt.grid(True)

    plt.show()

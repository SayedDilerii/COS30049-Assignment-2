from data_transformation import ProcessWeatherData
from data_transformation import ProcessBushfireData
import matplotlib.pyplot as plt

# Define the path to your data
basePathWeather = 'vic'
locationWeather = "aireys_inlet" # Edit to for specific locations or remove for all data

basePathBushfire = 'bushfires_australia'

# Process the data using the function from data-transformation.py
weatherDataFrame = ProcessWeatherData(basePathWeather, locationWeather)
bushfireDataFrame = ProcessBushfireData(basePathBushfire)


# Ensure data is sorted by Date for consistent plotting
weatherDataFrame = weatherDataFrame.sort_values(by='Date')
bushfireDataFrame = bushfireDataFrame.sort_values(by='Ignition Date')

# Check dataframe
print(bushfireDataFrame.head())
print(weatherDataFrame.head())

# # Set up the plot
# plt.figure(figsize=(12, 8))

# # Create a bar graph
# plt.bar(weatherDataFrame['Date'], weatherDataFrame['Rain (mm)'], color='blue', width=10)

# # Label the axes
# plt.xlabel('Date')
# plt.ylabel('Rain (mm)')
# plt.title('Rainfall Over Time')

# # Rotate x-axis labels for better readability
# plt.xticks(rotation=45)

# # Add grid for better readability
# plt.grid(True, linestyle='--', alpha=0.7)

# # Automatically adjust subplot parameters to fit the plot
# plt.tight_layout()

# plt.show()
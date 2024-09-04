from data_transformation import ProcessData
import pandas as pd
import matplotlib.pyplot as plt

# Define the path to your data
basePath = 'vic'
location = "aireys_inlet" # Edit to for specific locations

# Process the data using the function from data-transformation.py
combinedDataFile = ProcessData(basePath, location)

# Ensure data is sorted by Date for consistent plotting
combinedDataFile = combinedDataFile.sort_values(by='Date')

# Set up the plot
plt.figure(figsize=(12, 8))

# Create a bar graph
plt.bar(combinedDataFile['Date'], combinedDataFile['Rain (mm)'], color='blue', width=10)

# Label the axes
plt.xlabel('Date')
plt.ylabel('Rain (mm)')
plt.title('Rainfall Over Time')

# Rotate x-axis labels for better readability
plt.xticks(rotation=45)

# Add grid for better readability
plt.grid(True, linestyle='--', alpha=0.7)

# Automatically adjust subplot parameters to fit the plot
plt.tight_layout()

plt.show()
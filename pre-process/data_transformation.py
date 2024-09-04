import pandas as pd
import os

def CleanCSV(file_path):
    # Try different encodings if needed
    encodings = ['ISO-8859-1'] # Add as needed
    dataFile = None

    for encoding in encodings:
        try:
            dataFile = pd.read_csv(file_path, skiprows=14, encoding=encoding)
            break  # If successful, exit the loop
        except UnicodeDecodeError:
            continue  # Try the next encoding
    
    if dataFile is None:
        raise ValueError(f"Unable to read the file {file_path} with any of the specified encodings.")
    
    dataFile.columns = [
        "Station Name", "Date", "Evapotranspiration (mm)", "Rain (mm)",
        "Pan Evaporation (mm)", "Max.Temp (°C)", "Min.Temp (°C)",
        "Max Relative Humidity (%)", "Min Relative Humidity (%)",
        "10m Wind Speed (m/sec)", "Solar Radiation (MJ/sq m)"
    ]
    # Convert the Date column to datetime
    dataFile['Date'] = pd.to_datetime(dataFile['Date'], format='mixed')

    # Remove rows with NaN in 'Date' column
    dataFile = dataFile.dropna(subset=['Date'])
    
    # Remove the row with 'Totals:'
    dataFile = dataFile[~dataFile['Station Name'].str.contains('Totals:', na=False)]

    # Convert 'Rain (mm)' to numeric
    dataFile['Rain (mm)'] = pd.to_numeric(dataFile['Rain (mm)'], errors='coerce')
    print(dataFile)

    return dataFile

def ProcessData(basePath, location_filter=None):
    allData = []

    # Iterate through each item in basePath directory
    for location in os.listdir(basePath):
        # If a location filter is provided and does not match the current location, skip it
        if location_filter and location != location_filter:
            continue

        # Join basePath with each file to form locationPath
        locationPath = os.path.join(basePath, location)

        # If locationPath exists
        if os.path.isdir(locationPath):
            for CSVfile in os.listdir(locationPath):
                filePath = os.path.join(locationPath, CSVfile)

                if filePath.endswith('.csv'):
                    # Load and clean the CSV file
                    try:
                        dataFile = CleanCSV(filePath)

                        # Add columns for location and year/month
                        dataFile['Location'] = location
                        dataFile['YearMonth'] = os.path.splitext(CSVfile)[0]

                        # Append the cleaned DataFrame to the list
                        allData.append(dataFile)
                    except ValueError as e:
                        print(e)  # Print an error message if the file can't be read

    # Combine all the individual DataFrames into one
    combinedDataFile = pd.concat(allData, ignore_index=True)
    
    return combinedDataFile


"""
    Example usage:
    basePath = 'vic'
    combinedDataFile = ProcessData(basePath)
"""
import pandas as pd
import os

# TODO: Possibly re-factor functions to create seperate .csv files with necessary data so data processes occurs when file is not processed

def CleanWeatherData(filePath):
    # Try different encodings if needed
    encodings = ['ISO-8859-1'] # Add as needed
    dataFile = None

    for encoding in encodings:
        try:
            dataFile = pd.read_csv(filePath, skiprows=14, encoding=encoding)
            break  # If successful, exit the loop
        except UnicodeDecodeError:
            continue  # Try the next encoding
    
    if dataFile is None:
        raise ValueError(f"Unable to read the file {filePath} with any of the specified encodings.")
    
    dataFile.columns = [
        "Station Name", "Date", "Evapotranspiration (mm)", "Rain (mm)",
        "Pan Evaporation (mm)", "Max.Temp (°C)", "Min.Temp (°C)",
        "Max Relative Humidity (%)", "Min Relative Humidity (%)",
        "10m Wind Speed (m/sec)", "Solar Radiation (MJ/sq m)"
    ]

    # DATA PROCESSING

    # Convert the Date column to datetime
    dataFile['Date'] = pd.to_datetime(dataFile['Date'], format='mixed')

    # Remove rows with NaN in 'Date' column
    dataFile = dataFile.dropna(subset=['Date'])
    
    # Remove the row with 'Totals:'
    dataFile = dataFile[~dataFile['Station Name'].str.contains('Totals:', na=False)]

    # Convert 'Rain (mm)' to numeric
    dataFile['Rain (mm)'] = pd.to_numeric(dataFile['Rain (mm)'], errors='coerce')

    # DEBUGGING

    # print(dataFile) 

    return dataFile

def ProcessWeatherData(basePath, location_filter=None):
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
                        dataFile = CleanWeatherData(filePath)

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

def CleanBushfireData(filePath):
    encodings = ['ISO-8859-1', 'UTF-8']  # Add as needed
    dataFile = None

    for encoding in encodings:
        try:
            dataFile = pd.read_csv(filePath, encoding=encoding)
            break  # If successful, exit the loop
        except UnicodeDecodeError:
            continue  # Try the next encoding
    
    if dataFile is None:
        raise ValueError(f"Unable to read the file {filePath} with any of the specified encodings.")
    
    dataFile.columns = [
        "Object ID", "Fire ID", "Fire Name", "Ignition Date", "Capture Date",
        "Extinguish Date", "Fire Type", "Ignition Cause", "Capture Method",
        "Area (ha)", "Perimeter (km)", "State", "Agency", "Shape Area", "Shape Length"
    ]

    # DATA PROCESSING

    # TODO: Remove irrelevant fires (unknown, prescribed, controlled etc..)
    #       Remove other states 
    #       Remove unnecessary data (Fire ID, Capture Method, Shape Area, Shapre Length etc...)
    #       Re-format after cleaning 

    # Convert date columns to datetime
    date_columns = ["Ignition Date", "Capture Date", "Extinguish Date"]
    for column in date_columns:
        dataFile[column] = pd.to_datetime(dataFile[column], errors='coerce')

    # Drop rows with missing values in critical columns
    dataFile = dataFile.dropna(subset=["Ignition Date", "Area (ha)"])

    # Remove rows with unrealistic or empty values
    dataFile = dataFile[dataFile["Area (ha)"] > 0]
    dataFile = dataFile[dataFile["State"].notna()]

    # Reset index after cleaning
    dataFile.reset_index(drop=True, inplace=True)

    # DEBUGGING

    # print(dataFile)

    return dataFile

def ProcessBushfireData(basePath):
    allData = []

    # Iterate through each item in basePath directory
    for file in os.listdir(basePath):
        filePath = os.path.join(basePath, file)

        # Check if the file is a CSV and its name contains 'historical_bushfire_boundaries'
        if file.endswith('.csv') and 'Historical_Bushfire_Boundaries' in file:
            try:
                # Load and clean the CSV file
                dataFile = CleanBushfireData(filePath)

                # Append the cleaned DataFrame to the list
                allData.append(dataFile)
            except ValueError as e:
                print(e)  # Print an error message if the file can't be read

    # Combine all the individual DataFrames into one
    combinedDataFile = pd.concat(allData, ignore_index=True)
    
    return combinedDataFile
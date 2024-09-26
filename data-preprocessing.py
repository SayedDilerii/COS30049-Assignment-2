import csv
import os

def load_station_data(station_data_file):
    """
    Load station data from a CSV file into a dictionary for quick lookup.
    Only includes stations with IDs starting with 'US'.
    
    :param station_data_file: Path to the station data CSV file
    :return: Dictionary with station IDs as keys and station details as values
    """
    station_data = {}
    with open(station_data_file, newline='') as f:
        reader = csv.reader(f)
        next(reader)  # Skip header
        for row in reader:
            station_id = row[0]
            if station_id.startswith('US'):
                # Store all station details except the ID
                station_data[station_id] = row[1:]
    return station_data

def process_weather_file(input_file, output_file, station_data):
    """
    Process a single weather data file, matching weather data with station data.
    Writes the combined data to a new CSV file.
    
    :param input_file: Path to the input weather data CSV file
    :param output_file: Path to the output combined data CSV file
    :param station_data: Dictionary of station data for quick lookup
    """
    with open(input_file, newline='') as infile, open(output_file, 'w', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        # Write header to output file
        writer.writerow(['state', 'latitude', 'longitude', 'date', 't_min', 't_max', 'elevation'])
        next(reader)  # Skip header in input file
        
        for row in reader:
            station_id, _, date, tmin, tmax = row
            if station_id in station_data:
                state, latitude, longitude, elevation = station_data[station_id]
                # Format date from yyyymmdd to yyyy-mm-dd
                formatted_date = f"{date[:4]}-{date[4:6]}-{date[6:]}"
                writer.writerow([state, latitude, longitude, formatted_date, tmin, tmax, elevation])

def process_weather_folder(weather_folder, station_data_file, output_folder):
    """
    Process all weather data files in a folder, combining them with station data.
    
    :param weather_folder: Path to the folder containing weather data files
    :param station_data_file: Path to the station data CSV file
    :param output_folder: Path to the folder where output files will be saved
    """
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)
    
    # Load station data once for all files
    station_data = load_station_data(station_data_file)
    
    # Process each year's data
    for year in range(2000, 2023):
        input_file = os.path.join(weather_folder, f'{year}_processed.csv')
        output_file = os.path.join(output_folder, f'{year}_weather_data.csv')
        
        if os.path.exists(input_file):
            print(f"Processing file: {input_file}")
            process_weather_file(input_file, output_file, station_data)
        else:
            print(f"File not found: {input_file}")

if __name__ == "__main__":
    # Define input and output paths
    weather_data_input_folder = 'weather-outputs'
    station_data_input_file = 'station-outputs/cleaned-station-data.csv'
    final_weather_data_folder = 'final_weather_data'
    
    # Execute the main processing function
    process_weather_folder(weather_data_input_folder, station_data_input_file, final_weather_data_folder)

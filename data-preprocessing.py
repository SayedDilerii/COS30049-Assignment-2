import csv
import os
import time

# Processes weather data by reading yearly CSV files from the weather_data_cleaning folder and matching each record with corresponding station information from stations.csv.
# It creates an output folder, final_weather_data, if it doesn't exist.
# For each weather record, it retrieves relevant station details, such as the station ID, name, and location, then writes the combined data to new CSV files in the output folder.
# This results in a dataset linking weather information to specific stations.
# Only stations with ID starting with "US" are processed.

script_dir = os.path.dirname(os.path.abspath(__file__))
weather_data_input_folder = 'weather_data_cleaning'
station_data_input_file = 'station_data_cleaning/us_stations.csv'
final_weather_data_folder = 'final_weather_data'  # Define output folder

def read_weather_folder(weather_folder, station_data_file, output_folder):
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for year in range(2000, 2025):
        input_file = os.path.join(weather_folder, f'{year}_processed.csv')
        output_file = os.path.join(output_folder, f'{year}_weather_data.csv')

        if os.path.exists(input_file):
            print(f"Processing file: {input_file}")

            with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
                writer = csv.writer(outfile)
                writer.writerow(['STATION', 'STATION_NAME', 'ELEVATION', 'LATITUDE', 'LONGITUDE', 'DATE', 'TMAX', 'TMIN'])

                # Match station names using the station data file
                match_station_name(input_file, station_data_file, writer)


def match_station_name(weather_data_file, station_data_file, writer):
    with open(station_data_file) as station_data:
        station_lines = list(csv.reader(station_data))

    with open(weather_data_file) as weather_data:
        weather_lines = list(csv.reader(weather_data))

        for weather_row in weather_lines[1:]:
            weather_station_id = weather_row[0]
            date = weather_row[2]  # Original format: yyyymmdd
            tmax = weather_row[3]
            tmin = weather_row[4]

            # Convert date from yyyymmdd to yyyy-mm-dd
            formatted_date = f"{date[:4]}-{date[4:6]}-{date[6:]}"

            for station_row in station_lines:
                if weather_station_id == station_row[0]:
                    state = station_row[4]
                    latitude = station_row[1]
                    longitude = station_row[2]
                    elevation = station_row[3]

                    writer.writerow([elevation, latitude, longitude, formatted_date, tmax, tmin, state])
                    break


# Main execution
read_weather_folder(weather_data_input_folder, station_data_input_file, final_weather_data_folder)

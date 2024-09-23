import csv
import os

# Reads data from the specified input file and processes only US weather stations.
# Extracts fields such as ID, latitude, longitude, elevation, state, and name.
# Writes the filtered information to 'us_stations.csv'.

file_name = 'ghcnd-stations.txt'
input_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), file_name)
output_file = 'us_stations.csv'

def process_us_weather_stations(input_file, output_file):
    if not os.path.exists(input_file):
        print(f"Error: File '{input_file}' not found.")
        return
    
    try:
        with open(input_file, 'r') as infile, open(output_file, 'w', newline='') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(['ID', 'LATITUDE', 'LONGITUDE', 'ELEVATION', 'STATE', 'NAME'])
            
            for line in infile:
                station_id = line[0:11].strip()      # ID
                if not station_id.startswith('US'):  # Only process US stations
                    continue
                # print(f"Processing station ID: {station_id}")  # debugging
                
                latitude = line[12:20].strip()       # LATITUDE
                longitude = line[21:30].strip()      # LONGITUDE
                elevation = line[31:37].strip()      # ELEVATION
                state = line[38:40].strip()          # STATE
                name = line[41:71].strip()           # NAME
                
                writer.writerow([station_id, latitude, longitude, elevation, state, name])
        
        print(f"Data successfully written to '{output_file}'")
    
    except Exception as e:
        print(f"An error occurred: {e}")

# Process only US weather stations
process_us_weather_stations(input_file, output_file)

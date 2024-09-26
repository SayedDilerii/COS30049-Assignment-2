import csv
import os

# Reads data from the specified input file and processes only US weather stations.
# Extracts fields such as ID, latitude, longitude, elevation, state, and name.
# Writes the filtered information to 'us_stations.csv'.


def process(input_file_path: str, output_file_path: str):
    if not os.path.exists(input_file_path):
        print(f"Error: File '{input_file_path}' not found.")
        return
    
    try:
        with open(input_file_path, 'r') as infile, open(output_file_path, 'w', newline='') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(['station_id', 'state', 'latitude', 'longitude', 'elevation'])
            
            for line in infile:
                station_id = line[0:11].strip()      # STATION ID
                if not station_id.startswith('US'):  # Only process US stations
                    continue
                
                state = line[38:40].strip()          # STATE
                latitude = line[12:20].strip()       # LATITUDE
                longitude = line[21:30].strip()      # LONGITUDE
                elevation = line[31:37].strip()      # ELEVATION
                
                writer.writerow([station_id, state, latitude, longitude, elevation])
        
        print(f"Data successfully written to '{output_file_path}'")
    
    except Exception as e:
        print(f"An error occurred: {e}")



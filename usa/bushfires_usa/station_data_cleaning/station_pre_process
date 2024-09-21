import csv
import os

# reads data from a specified input file containing unprocessed information about weather stations, extracting fields such as ID, latitude, longitude, elevation, state, and name. 
# If the input file is found, it writes this information to a new CSV file named 'stations.csv'.



file_name = '' # Absolute path
input_file = os.path.abspath(file_name)
output_file = 'stations.csv'

def process_ghcnd_data(input_file, output_file):
    if not os.path.exists(input_file):
        print(f"Error: File '{input_file}' not found.")
        return
    
    try:
        with open(input_file, 'r') as infile, open(output_file, 'w', newline='') as outfile:
            writer = csv.writer(outfile)
            writer.writerow(['ID', 'LATITUDE', 'LONGITUDE', 'ELEVATION', 'STATE', 'NAME'])
            
            for line in infile:
                station_id = line[0:11].strip()      # ID
                latitude = line[12:20].strip()       # LATITUDE
                longitude = line[21:30].strip()      # LONGITUDE
                elevation = line[31:37].strip()      # ELEVATION
                state = line[38:40].strip()          # STATE
                name = line[41:71].strip()           # NAME
                
                writer.writerow([station_id, latitude, longitude, elevation, state, name])
        
        print(f"Data successfully written to '{output_file}'")
    
    except Exception as e:
        print(f"An error occurred: {e}")

process_ghcnd_data(input_file, output_file)

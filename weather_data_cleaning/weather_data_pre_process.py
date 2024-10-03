import csv
import os
import pandas as pd


# This script processes weather data files for the years 2000 to 2024, extracting maximum (TMAX) and minimum (TMIN) temperatures from each CSV file. 
# It reads the data in chunks to handle large files, converting temperature values from tenths of degrees to degrees Celsius. 
# For each unique station ID and date, it stores the TMAX and TMIN values in a dictionary. 
# After processing, it writes the results to a new CSV file, including only the records with a TMAX value. The
# output file is named after the input file with a "_processed" suffix.

script_dir = os.path.dirname(os.path.abspath(__file__))
input_folder = ''  # This requires the weather dataset which we aren't able to provide due to it's large size and time it takes to clean.

def process_chunk(chunk, writer):
    station_data = {}

    for index, row in chunk.iterrows():
        station_id = row.iloc[0]
        date = str(row.iloc[1])  # Convert to string
        element = row.iloc[2]
        value = row.iloc[3]

        value = float(value) / 10.0

        if (station_id, date) not in station_data:
            station_data[(station_id, date)] = {'TMAX': None, 'TMIN': None}

        if element == 'TMAX':
            station_data[(station_id, date)]['TMAX'] = value
        elif element == 'TMIN':
            station_data[(station_id, date)]['TMIN'] = value

    for (station_id, date), data in station_data.items():
        if data['TMAX'] is not None:  # Write only if TMAX is present
            writer.writerow([station_id, date[:4], date, data['TMAX'], data['TMIN']])

def extract_tmax_tmin_from_all_files(input_folder):
    for year in range(2000, 2025):
        input_file = os.path.join(input_folder, f'{year}.csv')
        output_file = os.path.join(input_folder, f'{year}_processed.csv')

        if os.path.exists(input_file):
            print(f"Processing file: {input_file}")

            with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
                writer = csv.writer(outfile)
                writer.writerow(['Station ID', 'Year', 'Date', 'TMAX (°C)', 'TMIN (°C)'])

                chunks = pd.read_csv(input_file, chunksize=10**6)
                for chunk in chunks:
                    process_chunk(chunk, writer)
            
            print(f"Finished processing file: {input_file}")
        else:
            print(f"File not found: {input_file}")

extract_tmax_tmin_from_all_files(input_folder)

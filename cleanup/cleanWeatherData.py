import csv
import os
from concurrent.futures import ProcessPoolExecutor
import pandas as pd

# -- WARNING: THIS IS A UTILITY FUNCTION THAT PROCESSESS LARGE SUMS OF DATA. THE EXECUTION TIME DEPENDS ON USER'S DEVICE SPECS.
# -- REMINDER: YOU NEED YOUR WEATHER DATASET IN ORDER TO RUN THIS FUNCTION

# This script processes weather data files for the years 2000 to 2024, extracting maximum (TMAX) and minimum (TMIN) temperatures from each CSV file. 
# It reads the data in chunks to handle large files, converting temperature values from tenths of degrees to degrees Celsius. 
# For each unique station ID and date, it stores the TMAX and TMIN values in a dictionary. 
# After processing, it writes the results to a new CSV file, including only the records with a TMAX value. The
# output file is named after the input file with a "_processed" suffix.

def process_chunk(chunk):
    station_data = {}
    for _, row in chunk.iterrows():
        station_id, date, element, value = row.iloc[:4]
        date = str(date)
        value = float(value) / 10.0
        key = (station_id, date)

        if key not in station_data:
            station_data[key] = {'TMAX': None, 'TMIN': None}
        station_data[key][element] = value
    
    return [
        [station_id, date[:4], date, data['TMAX'], data['TMIN']]
        for (station_id, date), data in station_data.items()
        if data['TMAX'] is not None
    ]

def process_file(input_file, output_file):
    print(f"Processing file: {input_file}")
    
    with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['station_id', 'year', 'date', 't_min', 't_min'])
        
        chunksize = 10**6
        chunks = pd.read_csv(input_file, chunksize=chunksize, usecols=[0, 1, 2, 3])
        
        with ProcessPoolExecutor() as executor:
            for result in executor.map(process_chunk, chunks):
                writer.writerows(result)
    
    print(f"Finished processing file: {input_file}")

def extract_tmax_tmin_from_all_files(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)
    
    for year in range(2000, 2025):
        input_file = os.path.join(input_folder, f'{year}.csv')
        output_file = os.path.join(output_folder, f'{year}_processed.csv')
        
        if os.path.exists(input_file):
            process_file(input_file, output_file)
        else:
            print(f"File not found: {input_file}")

if __name__ == "__main__":
    input_folder = './../weather-data'
    output_folder = 'output'
    extract_tmax_tmin_from_all_files(input_folder, output_folder)
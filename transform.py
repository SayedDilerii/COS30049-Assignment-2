import pandas as pd
import numpy as np


def transform_weather_data(input_file, output_file):
    df = pd.read_csv(input_file, header=None, 
                     names=['STATION', 'DATE', 'TYPE', 'VALUE', 'UNUSED1', 'UNUSED2', 'QUALITY', 'UNUSED3'])

    df['DATE'] = pd.to_datetime(df['DATE'], format='%Y%m%d')

    df_wide = df.pivot_table(index=['STATION', 'DATE'], columns='TYPE', values='VALUE', aggfunc='first')
    df_wide.reset_index(inplace=True)

    df_wide.rename(columns={'PRCP': 'PRCP', 'TMAX': 'TMAX', 'TMIN': 'TMIN'}, inplace=True)

    df_wide['STATION_NAME'] = 'UNKNOWN'
    df_wide['ELEVATION'] = np.nan
    df_wide['LATITUDE'] = np.nan
    df_wide['LONGITUDE'] = np.nan

    column_order = ['STATION', 'STATION_NAME', 'ELEVATION', 'LATITUDE', 'LONGITUDE', 'DATE', 'TMAX', 'TMIN', 'PRCP']
    df_wide = df_wide[column_order]

    for col in ['TMAX', 'TMIN']:
        df_wide[col] = df_wide[col].astype(float) / 10

    df_wide['PRCP'] = df_wide['PRCP'].astype(float) / 10

    df_wide.to_csv(output_file, index=False, float_format='%.1f', date_format='%Y%m%d')

    print(f"Transformed data saved to {output_file}")


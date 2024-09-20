import pandas as pd;
import numpy as np;
from transform_weather_data import "utils/transform_weather_data";
# dataFrame = pd.read_csv("~/Downloads/GHCND_sample_csv.csv")




output_file = "./2023_transformed.csv"
file_path = "~/Desktop/weather-data/2023.csv"
# transform_weather_data(file_path, output_file)
dataFrame = pd.read_csv(file_path, nrows=1000)
print(dataFrame)

# Usage
input_file = '2023.csv'
output_file = '2023_transformed.csv'
transform_weather_data(input_file, output_file)
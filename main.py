from cleanup import cleanStationData
from constants import STATIONS_FILE_PATH, OUTPUT_PATH;

# if both weather station's station_id and the weather data's station_id match, 
# the state column from the weather station will be merged weather data.
cleanStationData.process(STATIONS_FILE_PATH, OUTPUT_PATH)

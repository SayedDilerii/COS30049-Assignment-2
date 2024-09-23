<h1>Victoria Weather Dataset</h1>

<p>
  This project processes raw data from the National Oceanic and Atmospheric Administration (NOAA), specifically <code>ghcnd-station.txt</code>, and weather data into CSV files using the scripts <code>station_pre_process.py</code> and <code>weather_data_pre_process.py</code>, respectively.
</p>

<p>
  The weather data from 2000 to 2024 (the years can be adjusted) must reside in the <strong>weather_data_cleaning</strong> folder for <code>weather_data_pre_process.py</code> to process it. Once processed, you can run <code>weather_data_pre_process.py</code> to obtain the cleaned data.
</p>

<p>
  Note that some records may be missing TMIN values and state information.<p>

<p>
  Data sources include the National Oceanic and Atmospheric Administration (NOAA) and the Global Historical Climatology Network Daily (GHCND).<br>
  For data: <a href="https://www.ncei.noaa.gov/pub/data/ghcn/" target="_blank">NOAA GHCN</a>
</p>

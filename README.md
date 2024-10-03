**The final form of our dataset will contain the following attributes:**

- Date and Time:

discovery_date: Date of fire discovery (YYYY-MM-DD)
discovery_time: Time of fire discovery (HH:MM)
month: Extracted from discovery date (1-12)
day_of_year: Extracted from discovery date (1-365/366)

- Location:

latitude: Latitude of the fire
longitude: Longitude of the fire
state: State abbreviation (e.g., CA, TX)
elevation: From weather data

- Fire Characteristics:

fire_size: Size of the fire
fire_class: Classification of fire size (A, B, C, etc.)
general_cause: Cause of the fire
origin: Origin of the fire (e.g., Natural, Accidental)

- Weather Conditions:

t_max: Maximum temperature on the day of discovery
t_min: Minimum temperature on the day of discovery
temp_range: Calculated as t_max - t_min

- Derived Weather Features:

t_max_prev_7day_avg: Average maximum temperature for the 7 days prior to the fire
t_min_prev_7day_avg: Average minimum temperature for the 7 days prior to the fire

- Categorical Features:

temp_category: Categorized temperature (e.g., Cool, Mild, Hot, Extreme)
fire_size_category: Categorized fire size (e.g., Small, Medium, Large, Extreme)

- Time-based Features:

is_weekend: Boolean indicating if the discovery date was a weekend
season: Season of the year (Spring, Summer, Fall, Winter)

- State-level Aggregations:

state_avg_temp: Average temperature for the state
state_fire_frequency: Number of fires in the state up to that point in the year

- Unique Identifier:

fire_id: A unique identifier for each fire event (can be object_id from your original data)

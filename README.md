# emmanyok.github.io
#### Web Visualization Dashboard

### Analysis

This is a visualization for weather data analysis.Data was pulled from the OpenWeatherMap API and analyzed looking at the effect of a city's latitude on various weather patterns including max temperature, humidity, cloudiness, and wind speed.

After the data were extracted from the API, Matplotlib was used to plot city latitude vs a respecitve weather pattern. This site contains the plots created in that analysis along with a brief description of each plot and any trends that could be observed. Below is the summary of the findings as per the weather pattern close to and away from the equator as described below:

### Findings

## Temperature
As expected, the weather becomes significantaly warmer as one approaches the equator (Zero Degrees Latitude). More interestingly, however, is the fact that the southern hemisphere tends to be warmer this time of the year than the northern hemisphere. This may be due to the tilt of the earth at the time of the year this data was gathered.

## Humidity
The humidity level does not appear to be strongly correlated with latitude based on the plot. The plot shows some evidence that cities at the higher latitude are more humid. However, it is not conclusive, as the underlying data was just a snapshot of wether conditions based on a particular day and time. Further research would be needed to make valid conclusion.

## Cloudiness
The plot doesn't necessarily show any trend between latitude and cloudiness. We can't say cloudiness increase or decrease when latitude get closer to the equator. Clouds tend to form in abundance in the middle latitudes 60 degrees north and south of the equator. This is where the edges of polar and mid latitude circulation cells collide and push air upward.

## Wind Speed
The plot does show that the highest wind speeds were for cities at the highest latitudes, while we did not see these high wind speeds at the lower latitudes. However, I don't think this is enough to make any conclusions, as the data was collected on just one day and time. Across the lower latitudes, there seems to be a fairly consitent distribution of wind speed.




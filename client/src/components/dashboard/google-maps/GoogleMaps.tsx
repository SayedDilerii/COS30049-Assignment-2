import { stateData, stateNameToCode } from "@/constants/states";
import { fipsToStateCode, GoogleMapsProps, MapContentProps } from "@/types/maps.type";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

const MapContent: React.FC<MapContentProps> = ({ selectedState, highlightColor }) => {
  const map = useMap();
  const dataLayerRef = useRef<google.maps.Data | null>(null);

  useEffect(() => {
    if (!map) return;
    const stateCode = selectedState ? stateNameToCode[selectedState] : null;

    // Initialize the data layer if it doesn't exist
    if (!dataLayerRef.current) {
      dataLayerRef.current = new window.google.maps.Data({ map });

      dataLayerRef.current.loadGeoJson("https://storage.googleapis.com/mapsdevsite/json/states.js");

      // for debugging
      dataLayerRef.current.addListener("click", (event) => {
        const feature = event.feature;
        const fipsCode = feature.getProperty("STATE");
        const stateCode = fipsToStateCode[fipsCode];
        console.log("Clicked state:", {
          fipsCode,
          stateCode,
          name: feature.getProperty("NAME"),
        });
      });
    }

    // Set the style when state is selected
    dataLayerRef.current.setStyle((feature) => {
      const fipsCode = feature.getProperty("STATE");
      const featureStateCode = fipsToStateCode[fipsCode];
      const isSelected = featureStateCode === stateCode;

      return {
        fillColor: isSelected ? highlightColor : "#CCCCCC",
        fillOpacity: isSelected ? 0.5 : 0.2,
        strokeColor: "#FF0000",
        strokeWeight: isSelected ? 2 : 0,
      };
    });

    // Animate to selected state if one is selected
    if (stateCode && stateData[stateCode]) {
      const { center, zoom } = stateData[stateCode];
      map.panTo(center);
      map.setZoom(zoom);
    }

    return () => {
      if (dataLayerRef.current) {
        dataLayerRef.current.setMap(null);
        dataLayerRef.current = null;
      }
    };
  }, [map, selectedState, highlightColor]);

  return null;
};
const GoogleMaps: React.FC<GoogleMapsProps> = ({ selectedState, highlightColor }) => {
  const centerOfMap = { lat: 38.7946, lng: -98.4488625 };

  return (
    <APIProvider apiKey="AIzaSyAWRxgkJJbgFgXSqdng39RBiK1nDriP66I">
      <Map defaultZoom={4} defaultCenter={centerOfMap} streetViewControl={false} mapTypeControl={false} gestureHandling="cooperative">
        <MapContent selectedState={selectedState} highlightColor={highlightColor} />
      </Map>
    </APIProvider>
  );
};

export default GoogleMaps;

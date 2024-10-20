import { APIProvider, Map } from "@vis.gl/react-google-maps";

const GoogleMaps: React.FC = () => {
  const centerOfMap = { lat: 38.7946, lng: -98.4488625 };
  return (
    <APIProvider apiKey="AIzaSyAWRxgkJJbgFgXSqdng39RBiK1nDriP66I">
      <Map defaultZoom={4} defaultCenter={centerOfMap} streetViewControl={false} mapTypeControl={false}></Map>
    </APIProvider>
  );
};

export default GoogleMaps;

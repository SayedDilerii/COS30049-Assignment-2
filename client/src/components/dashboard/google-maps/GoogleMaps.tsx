import { Button } from "@/components/ui/button";
import { APIProvider, ControlPosition, Map, MapCameraChangedEvent, MapControl } from "@vis.gl/react-google-maps";
import { useState } from "react";

const GoogleMaps: React.FC = () => {
  const centerOfMap = { lat: 38.7946, lng: -98.4488625 };
  const [center, setCenter] = useState(centerOfMap);
  const [show, setShow] = useState<boolean>(false);

  const centerMap = () => {
    setCenter(centerOfMap);
  };

  return (
    <APIProvider apiKey="">
      <Map
        defaultZoom={4}
        center={center}
        defaultCenter={center}
        streetViewControl={false}
        onCameraChanged={(ev: MapCameraChangedEvent) => setCenter(ev.detail.center)}
        onCenterChanged={(ev) => {
          setShow(true);
          console.log(ev.detail.zoom);
        }}
      >
        <MapControl position={ControlPosition.BOTTOM_RIGHT}>
          {show && (
            <Button
              className="mb-4"
              onClick={() => {
                centerMap();
              }}
            >
              Center Map
            </Button>
          )}
        </MapControl>
      </Map>
    </APIProvider>
  );
};

export default GoogleMaps;

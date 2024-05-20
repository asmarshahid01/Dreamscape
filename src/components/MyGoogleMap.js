import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '200px',
  position: 'absolute',
  left: '29%',
  right: '40%',
  bottom: '5%'
};

const center = {
  lat: 31.4815,
  lng: 74.3030
};

const MyGoogleMap = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBorgeQ-8LoP5ht0fC0YbrPiGGmpUmFw2M"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        { /* Child components, like markers, info windows, etc. here */ }
        <MarkerF position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default MyGoogleMap;

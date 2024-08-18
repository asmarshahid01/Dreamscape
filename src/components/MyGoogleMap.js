import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '40vw',
  height: '10vw',
  position: 'absolute',
  left: '50%',
  bottom: '2vw',
  opacity: '0.7',
  transform: 'translate(-50%, 0)',
  borderRadius: '1vw'
};

const center = {
  lat: 31.4815,
  lng: 74.3030
};

const MyGoogleMap = () => {
  return (
    <LoadScript
      googleMapsApiKey=""
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default MyGoogleMap;

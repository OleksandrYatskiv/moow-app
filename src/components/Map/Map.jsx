/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';
import './Map.sass';
import productCard from '../../images/product-card.svg';
import productCardMobile from '../../images/product-card-mobile.svg';
import { useSelector } from 'react-redux';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

export default function GoogleMapComponent() {
  const [markers, setMarkers] = useState([]);
  const [directionsResponses, setDirectionsResponses] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userToMarkerDistance, setUserToMarkerDistance] = useState([]);
  const [markerToMarkerDistances, setMarkerToMarkerDistances] = useState([]);

  const distance = useSelector((state) => state.slice.distance);
  const forwarder = useSelector((state) => state.slice.forwarder);

  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
    const dLon = (coord2.lng - coord1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(coord1.lat * (Math.PI / 180)) * Math.cos(coord2.lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const handleMapClick = (event) => {
    if (event && event.latLng) {
      const newMarker = {
        id: markers.length + 1,
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
      };

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    }
  };

  const calculateRoutes = () => {
    if (!userLocation || markers.length < 2) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const requests = [];

    requests.push({
      origin: userLocation,
      destination: markers[0].position,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    markers.forEach((item, index, array) => {
      if (index < array.length - 1) {
        requests.push({
          origin: item.position,
          destination: array[index + 1].position,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
      }
    });

    Promise.all(requests.map(req =>
      new Promise((resolve, reject) => {
        directionsService.route(req, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && result) {
            resolve(result);
          } else {
            reject(`Directions request failed due to ${status}`);
          }
        });
      })
    ))
      .then(responses => {
        setDirectionsResponses(responses);
        setUserToMarkerDistance(calculateDistance(userLocation, markers[0].position));

        const markerToMarkerDistances = responses.map(response => {
          const legs = response.routes[0].legs;
          return legs.reduce((total, leg) => total + leg.distance.value, 0) / 1000;
        });

        setMarkerToMarkerDistances(markerToMarkerDistances);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setUserLocation({ lat: latitude, lng: longitude });
        }, (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
          }
        });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  useEffect(() => {
    if (markers.length >= 2 && userLocation) {
      calculateRoutes();
    }
  }, [markers, userLocation]);

  const mapOptions = {
    styles: [
      {
        elementType: 'geometry',
        stylers: [
          { color: '#f5f5f5' },
        ],
      },
      {
        elementType: 'labels.icon',
        stylers: [
          { visibility: 'off' },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#616161' },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          { color: '#b0b0b0' },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          { lightness: 100 },
          { visibility: 'on' },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          { visibility: 'on' },
        ],
      },
      {
        featureType: 'water',
        stylers: [
          { color: '#e0e0e0' },
        ],
      },
      {
        featureType: 'landscape',
        stylers: [
          { color: '#f0f0f0' },
        ],
      },
    ],
  };

  let calculatedMarkerToMarkerDistance = distance !== 0 ? distance : markerToMarkerDistances;
  const pointA = useSelector((state) => state.slice.pointA);
  let userToPointA = userToMarkerDistance;
  if (pointA?.lat && pointA?.lng) {
    userToPointA = calculateDistance(userLocation, pointA);
  }

  calculatedMarkerToMarkerDistance = calculatedMarkerToMarkerDistance.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className='map-container'>
      <div className="card-wrap">
        <img className='product-card' src={productCard} alt="product card" />
        <img className='product-card-mobile' src={productCardMobile} alt="product card" />
      </div>
      <GoogleMap
        options={mapOptions}
        mapContainerStyle={mapContainerStyle}
        center={userLocation}
        zoom={9}
        onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            label={marker.id.toString()}
          />
        ))}
        {directionsResponses.map((response, index) => (
          <DirectionsRenderer
            key={index}
            directions={response}
          />
        ))}
      </GoogleMap>
      <div className="map-text">
        <p className='cost-title'>Подача транспорту</p>
        <p className='cost'>{(userToPointA * 10).toFixed(2)} грн</p>
      </div>
      <div className="map-text">
        <p className='cost-title'>Маршрут загрузка-вигрузка</p>
        <p className='cost'>{(calculatedMarkerToMarkerDistance * 10).toFixed(2)} грн</p>
      </div>
      <div className="map-text">
        <p className='cost-title'>Послуги експедитора</p>
        <p className='cost'>{forwarder ? '200' : '0'} грн</p>
      </div>
      <div className="total-cost-wrap">
        <p className="total-cost-text">Повна Ціна</p>
        <p className="total-cost">{((userToPointA * 10) + (calculatedMarkerToMarkerDistance * 10) + (forwarder ? 200 : 0)).toFixed(2)} грн</p>
      </div>
      <button className='order-btn'>Оформити</button>
    </div>
  );
}

// P.S. not handling both inputs from address card and map at the same time
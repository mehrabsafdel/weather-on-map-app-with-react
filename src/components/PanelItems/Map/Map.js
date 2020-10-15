import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Classes from './Map.css';
import Modal from '../../UI/Forecast/Modal/Modal'

mapboxgl.accessToken = 'pk.eyJ1IjoibWVocmFic2ZkbCIsImEiOiJja2V6djY3MWYwZGQ5MnlwbGJqcWZ6MGV2In0.CALKqE_nG5dkQmOIqm6xxg';

const Map = (props) => {
  // console.log(props.cityInfo)
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);
  const [showModal, setShowModal] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cityTemp, setCityTemp] = useState();
  const [cityMax, setCityMax] = useState();
  const [cityMin, setCityMin] = useState();
  const [forecast, setForecast] = useState([]);



  // Initialize map when component mounts
  useEffect(() => {
    // let url = "http://streaming.tdiradio.com:8000/house.mp3";
    // let audio = new Audio(url);
    // audio.play();
    console.log("use effect")
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/' + props.mode,
      center: [lng, lat],
      zoom: zoom
    });

// map.setStyle('mapbox://styles/mapbox/' + props.mode);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });


    
    map.on('load', function () {
          console.log(props.cityInfo);

  const feature = [];
  props.cityInfo.map((city) => {
    console.log(city)
    const featureData = {
      'type': 'Feature',
      'properties': {
        'description': '<p style="font-size:16px;"><strong>average temp is : </strong>' + city.temp
          + '<br/>minimum temp is : <b>' + city.lowestTemp + '</b>' + 
        
        '</p>'
        ,
        'name' : city.city
      },
      geometry: {
        'type': 'Point',
        'coordinates': [city.coords.lon, city.coords.lat]
      }
    }
    feature.push(featureData);

  })
      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        // Add an image to use as a custom marker
        function (error, image) {
          if (error) throw error;
          map.addImage('custom-marker', image);
          map.addSource('places', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': feature
            }
          });

          // Add a layer showing the places.
          map.addLayer({
            'id': 'places',
            'type': 'symbol',
            'source': 'places',
            'layout': {
              'icon-image': 'custom-marker',
              'icon-allow-overlap': true
            }
          });
        }
      );

      // Create a popup, but don't add it to the map yet.
      var popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false
      });

      map.on('mouseenter', 'places', function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
      });

      map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

});
    map.on('click', 'places', function (e) {
      props.cityInfo.map((city) => {
        if (city.city == e.features[0].properties.name) {
          setForecast(city.forecast)
          setCityName(city.city)
          setCityTemp(city.temp)
          setCityMax(city.highestTemp)
          setCityMin(city.lowestTemp)          
        }

      })
      // setModalInfo(e.features[0].properties.name)
            setShowModal(true);
    });

    // Clean up on unmount
     return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={Classes.body}>
     {showModal && <Modal
        show={showModal}
        modalClosed={() => setShowModal(false)}
        city={cityName}
        temp={cityTemp}
        max={cityMax}
        min={cityMin}
        forecast={forecast}
      ></Modal > }

      <div className={Classes.sidebarStyle} >
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className={Classes.mapContainer} ref={mapContainerRef} />

    </div>
  );
};

export default Map;
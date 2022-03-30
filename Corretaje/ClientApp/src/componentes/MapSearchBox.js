/** @format */

import React from 'react';
import PropTypes from 'prop-types';

export default class MapSearchBox extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      mapSet: false,
      searchBox: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { map, setCoords } = nextProps;
    const { mapSet } = prevState;
    let newState = {};

    if (map && !mapSet) {
      const inputSearchBox = document.getElementById('inputSearchBox');
      const searchBox = new window.google.maps.places.SearchBox(inputSearchBox);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
        inputSearchBox
      );

      // Bias the SearchBox results towards current map's viewport
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      let markers = [];
      searchBox.addListener('places_changed', function() {
        const places = searchBox.getPlaces();

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            return;
          }

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          lat && lng && setCoords({ lat, lng });

          const icon = {
            url: place.icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(
            new window.google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location
            })
          );

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });

      newState = {
        mapSet: true,
        searchBox
      };
    }

    return newState;
  }

  render() {
    return (
      <input
        id="inputSearchBox"
        style={{ height: '30px', width: '350px', marginTop: '10px' }}
      />
    );
  }
}

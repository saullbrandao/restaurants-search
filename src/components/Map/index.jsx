import React, { useCallback, useEffect, useState } from 'react'
import { GoogleApiWrapper, Map as GoogleMap, Marker } from 'google-maps-react'
import { useDispatch, useSelector } from 'react-redux'
import { setRestaurants, setRestaurant } from 'redux/modules/restaurants'

const MapContainer = ({ google, query, placeId }) => {
  const dispatch = useDispatch()
  const { restaurants } = useSelector((state) => state.restaurantsReducer)
  const [map, setMap] = useState(null)

  const searchByQuery = useCallback(
    (query) => {
      dispatch(setRestaurants([]))

      const service = new google.maps.places.PlacesService(map)

      const request = {
        location: map.center,
        radius: '200',
        type: ['restaurant'],
        query,
      }

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          dispatch(setRestaurants(results))
        }
      })
    },
    [google, map, dispatch]
  )

  useEffect(() => {
    if (query) {
      searchByQuery(query)
    }
  }, [query, searchByQuery])

  const getRestaurantDetails = useCallback(
    (placeId) => {
      dispatch(setRestaurant(null))
      const service = new google.maps.places.PlacesService(map)

      const request = {
        placeId,
        fields: ['name', 'opening_hours', 'formatted_address', 'formatted_phone_number'],
      }

      service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          dispatch(setRestaurant(place))
        }
      })
    },
    [google, map, dispatch]
  )

  useEffect(() => {
    if (placeId) {
      getRestaurantDetails(placeId)
    }
  }, [placeId, getRestaurantDetails])

  const searchNearby = (map, center) => {
    const service = new google.maps.places.PlacesService(map)
    dispatch(setRestaurants([]))

    const request = {
      location: center,
      radius: '20000',
      type: ['restaurant'],
    }

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        dispatch(setRestaurants(results))
      }
    })
  }

  const onMapReady = (_, map) => {
    setMap(map)
    searchNearby(map, map.center)
  }

  const containerStyle = {
    position: 'relative',
    width: 'calc(100vw - 360px)',
    height: '100vh',
  }

  return (
    <GoogleMap
      google={google}
      containerStyle={containerStyle}
      defaultZoom={15}
      centerAroundCurrentLocation
      onRecenter={onMapReady}
      onReady={onMapReady}>
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.place_id}
          name={restaurant.name}
          position={{
            lat: restaurant.geometry.location.lat(),
            lng: restaurant.geometry.location.lng(),
          }}
        />
      ))}
    </GoogleMap>
  )
}

export const Map = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer)

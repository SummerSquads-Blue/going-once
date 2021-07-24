import { useContext, useState } from "react";
import { LocationContext } from "./LocationContext";

export default function useLocation() {
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')
  const locationData = useContext(LocationContext)

  // use HTML location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        // create google LatLng object with coordinates
        const pos = new window.google.maps.LatLng(
          position.coords.latitude, position.coords.longitude,
        );

        // load google Geocoder service, pass in LatLng object
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ location: pos})
        .then((response) => {
          console.log("response", response)

          // grab first address in response array, probably most accurate
          if (response.results[0]) {
            const { address_components } = response.results[0]

            // the city is type "locality" or "sublocality"
            const city = address_components?.find(
              (comp) => (
                comp.types.includes('locality') 
                || comp.types.includes('sublocality')
              ))?.long_name

            // the state is type "adminstrative_area_level_1", apparently
            const state = address_components?.find(
              (comp) => 
                comp.types.includes('administrative_area_level_1'))?.short_name

            // if we have a city and state, update location data
            if(city && state && pos) {
              const location = {
                name: `${city}, ${state}`,
                coords: pos
              }
              console.log("location found", location)
              // update location data in context
              locationData.setLoc(location)
              // run setLocation prop if available
              setLocation(location)
            }
          } else {
            setError("No locations found");
            // console.log("No locations found")
          }
        })
      },
      (error) => {
        // Error with Geolocation API
        console.error(error)
        setError(error.message);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    console.log("Your browser does not support Geolocation")
    setError("Your browser does not support Geolocation");
  }
  return { location, error }
}
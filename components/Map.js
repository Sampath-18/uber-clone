import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY } from "@env";
import axios from "axios";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  const [waypoints, setWaypoints] = useState(null);

  useEffect(() => {
    const fetchDirections = async () => {
      if (!origin || !destination) return;
      try {
        console.log("api key: ", GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY);
        console.log(
          "coords: ",`${origin.location.lat},${origin.location.lon}|${destination.location.lat},${destination.location.lon}`
        );
        const mode = "drive";

        const response = await axios.get(
          `https://api.geoapify.com/v1/routing`,
          {
            params: {
              waypoints: `${origin.location.lat},${origin.location.lon}|${destination.location.lat},${destination.location.lon}`,
              mode: mode,
              apiKey: GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY,
            },
          }
        );
        // if (response.data) console.log("response: ",response.data.features[0].geometry.coordinates);
        if (response.data.features[0].geometry.coordinates) {
          console.log("fetched route successfully");
          var coordinates = [];
          const rc = response.data.features[0].geometry.coordinates[0];
          coordinates = rc.map(([longitude,latitude])=>({latitude:latitude,longitude:longitude}))
          // for (c in rc) {
          //   coordinates = [...coordinates, { latitude: c[1], longitude: c[0] }];
          // }
          console.log("waypoints read: ", coordinates);
          setWaypoints(coordinates);
          // console.log("waypoints read: ", waypoints);
          // setWaypoints(response.data.features[0].geometry.coordinates);
        }
      } catch (error) {
        console.error("error fetching directions: ", error);
      }
    };
    fetchDirections();
  }, [origin, destination]);

  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {/* {origin && destination && waypoints && (
        <MapViewDirections
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lon,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lon,
          }}
          waypoints={waypoints}
          // mode="DRIVING"
          directionsServiceBaseUrl="https://api.geoapify.com/v1/routing"
          apikey={GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY}
          strokeWidth={3}
          language="en"
          strokeColor="black"
        />
      )} */}
      {origin && destination && waypoints && (
        <Polyline
          coordinates={waypoints}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lon,
          }}
          title="Origin"
          description={origin.place}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lon,
          }}
          title="Destination"
          description={destination.place}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

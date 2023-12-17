import { View, Text } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import tw from "tailwind-react-native-classnames";

const Map = () => {
  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: 19.26046,
        longitude: 72.97941,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    />
  );
};

export default Map;

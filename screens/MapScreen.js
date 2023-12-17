import {  Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Input } from "@rneui/themed";
import Map from "../components/Map";

const MapScreen = () => {
  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Text>Textual content here</Text>
        <Input aria-label="Where From?" onChange={(data)=>{console.log(data)}}></Input>
      </View>
    </View>
  );
};

export default MapScreen;

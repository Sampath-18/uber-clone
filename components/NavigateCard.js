import { SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react";
import PlaceAutocomplete from "./PlaceAutocomplete";
import tw from "tailwind-react-native-classnames";
import { GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY } from "@env";
import { setDestination } from "../slices/navSlice";
import { useDispatch } from "react-redux";

const NavigateCard = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white`}>
      <Text>Navigate Card</Text>
      <PlaceAutocomplete
        placeHolder="Where to?"
        query={{
          apiKey: GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY,
          language: "en",
        }}
        onSelect={(place) => {
          // setOrigin(null);
          dispatch(
            setDestination({
              location: {
                lat: place.properties.lat,
                lon: place.properties.lon,
              },
              place: place.properties.formatted,
            })
          );
        }}
        styles={destinationAutoCompleteStyles}
      />
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});

const destinationAutoCompleteStyles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    // paddingTop: 20,
    paddingLeft: 20,
    flex: 0,
  },
  textInput: {
    fontSize: 18,
  },
});

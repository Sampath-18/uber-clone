import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PlaceAutocomplete from "../components/PlaceAutocomplete";
import { GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY } from "@env";
import { setOrigin, setDestination } from "../slices/navSlice";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`pl-5 pt-15`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <PlaceAutocomplete
          placeHolder="Where From?"
          styles={fromInputBoxStyles}
          onSelect={(place) => {
            dispatch(
              setOrigin({
                location: {
                  lon: place.properties.lon,
                  lat: place.properties.lat,
                },
                place: place.properties.formatted,
              })
            );
            dispatch(setDestination(null));
          }}
          query={{
            apiKey: GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY,
            language: "en",
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const fromInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // paddingTop: 20,
    flex: 0,
  },
  textInput: {
    fontSize: 18,
  },
});

import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PlaceAutocomplete from "../components/PlaceAutocomplete";
import {GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY} from "@env"
// import { GeoapifyContext, GeoapifyGeocoderAutocomplete } from "@geoapify/react-geocoder-autocomplete";
// import "@geoapify/geocoder-autocomplete/styles/minimal.css";

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`pl-5 pt-15`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          styles={fromInputBoxStyles}
          placeholder="Where From?"

        />
        <PlaceAutocomplete
          placeHolder="Where From?"
          styles={fromInputBoxStyles}
          onSelect={()=>{const x=10;}}
          query={{apiKey:GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY}}
        />
        {/* <GeoapifyContext apiKey={GEOAPIFY_PLACES_AUTOCOMPLETE_API_KEY}>
          <GeoapifyGeocoderAutocomplete placeholder="Where From?" lang="en" />
        </GeoapifyContext> */}
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

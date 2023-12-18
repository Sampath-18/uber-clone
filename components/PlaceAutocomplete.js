import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import axios from "axios";

const PlaceAutocomplete = ({
  placeHolder,
  debounce,
  styles,
  onSelect,
  query,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");

  const handleTextInputChange = async (text) => {
    setInput(text);
    if (text.length > 1) {
      try {
        // console.log("query params: ", { ...query, text: text });
        const response = await axios.get(
          "https://api.geoapify.com/v1/geocode/autocomplete",
          { params: { ...query, text: text } }
        );
        // console.log("Fetched suggestions: ", response.data);
        if (response.data.features) {
          // console.log("First suggestion: ",response.data.features[0] );
          setSuggestions(response.data.features);
        }
      } catch (error) {
        console.log("query: ", query);
        console.log("error occurred while fetching auto complete: ", error);
      }
    }
  };

  const handleSelectPlace = (place) => {
    setInput(place.properties.formatted);
    setSuggestions([]);
    onSelect(place);
  };

  // useEffect(() => {
  //   return () => {
  //     handleTextInputChange(input);
  //   }
  // }, [input])

  return (
    <View style={{ ...defaultStyles.container, ...styles.container }}>
      <View style={defaultStyles.textInputContainer}>
        <TextInput
          style={{ ...styles.textInput, ...defaultStyles.textInput }}
          placeholder={placeHolder}
          value={input}
          onChangeText={handleTextInputChange}
          // onChangeText={(newText) => setInput(newText)}
        />
        {input.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setInput("");
              setSuggestions([]);
            }}
          >
            <Icon
              type="entypo"
              name="cross"
              color="black"
              size={20}
              style={defaultStyles.crossIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {suggestions.length > 0 && (
        <View style={defaultStyles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => handleSelectPlace(item)}>
                  <View style={defaultStyles.suggestionContainer}>
                    <Text style={defaultStyles.suggestionText1}>
                      {item.properties.address_line1}
                    </Text>
                    <Text style={defaultStyles.suggestionText2}>
                      {item.properties.address_line2}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default PlaceAutocomplete;

const defaultStyles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 10,
    width: "95%",
  },
  textInputContainer: {
    borderRadius: 8,
    borderWidth: 0.3,
    height: 45,
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // elevation: 0.5,
  },
  textInput: {
    fontSize: 18,
    paddingLeft: 10,
    flex: 1,
  },
  crossIcon: {
    backgroundColor: "white",
    borderWidth: 0.25,
    borderRadius: 100,
    marginRight: 15,
  },
  suggestionsContainer: {
    paddingTop: 5,
  },
  suggestionText1: {
    fontSize: 18,
    padding: 3,
    paddingBottom: 10,
  },
  suggestionText2: {
    fontSize: 12,
    padding: 3,
    paddingBottom: 10,
  },
  suggestionContainer: {
    borderBottomWidth: 0.4,
    borderBottomColor: "lightgray",
    padding: 4,
    paddingLeft: 0,
    marginTop: 5,
  },
});

import React, { Component } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Rating } from "react-native-ratings";

import { Button } from "./common";

const image = require("../../assets/images/rest_01.jpg");
const colors = require("../../assets/colors");
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 2.3;
const CARD_WIDTH = CARD_HEIGHT + 50;

export default class RestaurantCard extends Component {
  onCardPressed = () => {
    this.props.onPressItem();
  };
  render() {
    const {
      container,
      cardContainer,
      imageStyle,
      whiteGradient,
      openTag,
      mainContent,
      restName,
      buttonContainer
    } = styles;
    return (
      <View style={container}>
        <View style={{ width, height: CARD_HEIGHT }}>
          <View style={cardContainer}>
            <Image source={image} style={imageStyle} />
            <LinearGradient
              colors={["#FFFFFF00", "#FFFFFF", "#FFFFFF"]}
              style={whiteGradient}
            />
            <Text style={openTag}>OPEN</Text>
            <View style={mainContent}>
              <Text style={restName}>Rotana Restaurant</Text>
              <Text>Oran, Algerie</Text>
              <Rating
                ratingCount={5}
                imageSize={18}
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 12 }}
              />
              <Text>460, Reviews</Text>
            </View>
          </View>
          <View style={buttonContainer}>
            <Button
              buttonWidth={CARD_WIDTH - 100}
              buttonHeight={50}
              paddingTop={12}
              cornerRadius={25}
              onPress={this.onCardPressed}
            >
              ORDER NOW
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    paddingVertical: 10,
    width,
    height: CARD_HEIGHT + 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    backgroundColor: "#FFF",
    alignSelf: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    elevation: 2
  },
  imageStyle: {
    height: 180,
    width: CARD_WIDTH,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover"
  },
  whiteGradient: {
    height: 120,
    width: CARD_WIDTH,
    position: "absolute",
    bottom: CARD_HEIGHT - 180,
    alignItems: "center"
  },
  openTag: {
    color: "#59EA8C",

    position: "absolute",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 7,
    paddingVertical: 2,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#0AC272",
    fontSize: 9
  },
  mainContent: {
    width: CARD_WIDTH,
    position: "absolute",
    bottom: CARD_HEIGHT - 220,
    alignItems: "center"
  },
  restName: {
    fontSize: 18,
    color: colors.jet,
    fontWeight: "bold"
  },
  buttonContainer: {
    width: CARD_WIDTH,
    height: 50,
    flexDirection: "row",
    position: "absolute",
    bottom: -15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  }
};

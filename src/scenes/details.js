import React, { Component } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";
import { Rating } from "react-native-ratings";
import Icon from "react-native-vector-icons/EvilIcons";

import { Button, Counter } from "../components/common";

const image = require("../../assets/images/rest_08.jpg");
const colors = require("../../assets/colors");
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 2.2;
const CARD_WIDTH = width;

export default class Details extends Component {
  onReturnPressed() {
    Actions.pop();
  }

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
              <Icon name="arrow-left" size={36} />

              <View style={{ alignItems: "center" }}>
                <Text style={restName}>Rotana Restaurant</Text>
                <Text>Oran, Algerie</Text>
                <Rating
                  ratingCount={5}
                  imageSize={18}
                  onFinishRating={this.ratingCompleted}
                  style={{ paddingVertical: 12 }}
                />
              </View>
              <Icon name="heart" size={36} />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 30,
            height: 70,
            backgroundColor: "#fff",
            borderColor: "#00000030",
            borderBottomWidth: 0.4
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold" }}>
            React Native Vector
          </Text>
          <Counter
            width={150}
            buttonSize={42}
            buttonColor={"#FFF"}
            backgroundButtonColor={"#0AC272"}
            count={0}
            countSize={16}
            countColor={colors.jet}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 30,
            height: 70,
            backgroundColor: "#fff",
            borderColor: "#00000080",
            borderBottomWidth: 0.4
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold" }}>
            React Redux Thunk
          </Text>
          <Counter
            width={150}
            buttonSize={42}
            buttonColor={"#FFF"}
            backgroundButtonColor={"#0AC272"}
            count={2}
            countSize={16}
            countColor={colors.jet}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 30,
            height: 70,
            backgroundColor: "#fff",
            borderColor: "#00000080",
            borderBottomWidth: 0.4
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "bold" }}>
            Fish Chilly Masala
          </Text>
          <Counter
            width={150}
            buttonSize={42}
            buttonColor={"#FFF"}
            backgroundButtonColor={"#0AC272"}
            count={1}
            countSize={16}
            countColor={colors.jet}
          />
        </View>
        <View style={buttonContainer}>
          <Button
            buttonWidth={CARD_WIDTH - 100}
            buttonHeight={50}
            paddingTop={12}
            cornerRadius={25}
          >
            ORDER NOW
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    width,
    height,
    backgroundColor: "#FFFFFF70"
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 1,
    backgroundColor: "#FFF",
    alignSelf: "center"
  },
  imageStyle: {
    height: 220,
    width: CARD_WIDTH,

    resizeMode: "cover"
  },
  whiteGradient: {
    height: 120,
    width: CARD_WIDTH,
    position: "absolute",
    bottom: CARD_HEIGHT - 220,
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
    bottom: CARD_HEIGHT - 260,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  restName: {
    fontSize: 24,
    color: colors.jet,
    fontWeight: "bold"
  },
  buttonContainer: {
    width: CARD_WIDTH,
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    justifyContent: "center"
  }
};

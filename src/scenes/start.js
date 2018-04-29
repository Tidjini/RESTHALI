import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
//custom libs
import { enterToMain } from "../actions";
import { Button } from "../components/common";

const { SCREEN_WIDTH, SCREEN_HEIGHT } = require("../../utils/const");
const image = require("../../assets/images/back_image.jpg");
const colors = require("../../assets/colors");

class Start extends Component {
  enterToMain() {
    this.props.enterToMain();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          justifyContent: "flex-end"
        }}
      >
        <Image
          style={{
            flex: 1,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            resizeMode: "cover"
          }}
          source={image}
        />

        <LinearGradient
          colors={["#FFFFFF00", "#FFFFFFDD", "#FFFFFF"]}
          style={{
            height: SCREEN_HEIGHT / 2,
            width: SCREEN_WIDTH,
            position: "absolute"
          }}
        >
          <View style={{ marginTop: 100, marginLeft: 50 }}>
            <Text style={{ fontSize: 28, color: colors.jet, paddingLeft: 10 }}>
              RESTAURENTS {"\n"}NEAR ME
            </Text>
            <Button
              buttonWidth={SCREEN_WIDTH - 200}
              buttonHeight={50}
              paddingTop={12}
              onPress={this.enterToMain.bind(this)}
              cornerRadius={25}
            >
              FIND NOW
            </Button>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default connect(null, { enterToMain })(Start);

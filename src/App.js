import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//custom libs
import { Button } from './components/common';

const { SCREEN_WIDTH, SCREEN_HEIGHT } = require('../utils/const');
const image = require('../assets/images/back_image.jpg');
const colors = require('../assets/colors');

export default class App extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          justifyContent: 'flex-end'
        }}
      >
        <Image
          style={{
            flex: 1,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            resizeMode: 'cover'
          }}
          source={image}
        />

        <LinearGradient
          colors={['#FFFFFF00', '#FFFFFFDD', '#FFFFFF']}
          style={{
            height: SCREEN_HEIGHT / 2.1,
            width: SCREEN_WIDTH,
            position: 'absolute'
          }}
        >
          <View style={{ marginTop: 100, marginLeft: 50 }}>
            <Text style={{ fontSize: 36, color: colors.jet }}>
              RESTAURENTS {'\n'}NEAR ME
            </Text>
            <Button
              buttonWidth={SCREEN_WIDTH - 200}
              buttonHeight={50}
              paddingTop={12}
            >
              FIND NOW
            </Button>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

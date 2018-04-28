/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import { Rating } from 'react-native-ratings';
import { Button } from '../components/common';

import state from '../../Model/data';

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 2.4;
const CARD_WIDTH = CARD_HEIGHT + 50;

const image = require('../../assets/images/rest_01.jpg');
const colors = require('../../assets/colors');

export default class App extends Component {
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item ...?
      //check if we are in our range
      if (index > state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index < 0) {
        index = 0;
      }
      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }
  renderMarkers() {
    const { markerWrap, ring, marker } = styles;

    const interpolations = state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH
      ];
      //With out the clamp the interpolate will calculate the rate of change and keep applying it (keep calculate for every marker and removed it from map)??
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: 'clamp'
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp'
      });
      return { scale, opacity };
    });
    // NOTE: this custom Marker for the map cause we add some children, if not the map render the default marker
    state.markers.map((marker, index) => {
      const scaleStyle = {
        transform: [
          {
            scale: interpolations[index].scale
          }
        ]
      };
      const opacityStyle = {
        opacity: interpolations[index].opacity
      };
      return (
        <MapView.Marker key={index} coordinate={marker.coordinate}>
          <Animated.View style={[markerWrap, opacityStyle]}>
            <Animated.View style={[ring, scaleStyle]} />
            <View style={styles.marker} />
          </Animated.View>
        </MapView.Marker>
      );
    });
  }
  renderCards() {
    const { card, cardImage, textContent, cardtitle, cardDescription } = styles;
    state.markers.map((marker, index) => {
      return (
        <View style={card} key={index}>
          <Image source={marker.image} style={cardImage} resizeMode="cover" />
          <View style={textContent}>
            <Text numberOfLines={1} style={cardtitle}>
              {marker.title}
            </Text>
            <Text numberOfLines={1} style={cardDescription}>
              {marker.description}
            </Text>
          </View>
        </View>
      );
    });
  }
  renderCardsScroll() {
    const { scrollView, endPadding } = styles;

    return (
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.animation
                }
              }
            }
          ],
          { useNativeDriver: true }
        )}
        style={scrollView}
        contentContainerStyle={endPadding}
      >
        {this.renderCards()}
      </Animated.ScrollView>
    );
  }
  render() {
    const { container } = styles;
    // NOTE: map => (this.map = map) is ref so we can animate the map later (when region changes)
    return (
      <View style={container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={state.region}
          style={container}
        >
          {this.renderMarkers()}
        </MapView>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            paddingVertical: 10,
            width,
            height: CARD_HEIGHT + 100,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View style={{ width, height: CARD_HEIGHT }}>
            <View
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: 10,
                backgroundColor: '#FFF',
                alignSelf: 'center'
              }}
            >
              <Image
                source={image}
                style={{
                  height: 180,
                  width: CARD_WIDTH,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  resizeMode: 'cover'
                }}
              />
              <LinearGradient
                colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF']}
                style={{
                  height: 120,
                  width: CARD_WIDTH,
                  position: 'absolute',
                  bottom: CARD_HEIGHT - 180,
                  alignItems: 'center'
                }}
              />
              <Text
                style={{
                  color: '#59EA8C',

                  position: 'absolute',
                  alignItems: 'center',
                  margin: 16,
                  paddingHorizontal: 7,
                  paddingVertical: 2,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#0AC272',
                  fontSize: 9
                }}
              >
                OPEN
              </Text>
              <View
                style={{
                  width: CARD_WIDTH,
                  position: 'absolute',
                  bottom: CARD_HEIGHT - 230,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.jet,
                    fontWeight: 'bold'
                  }}
                >
                  Rotana Restaurant
                </Text>
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
            <View
              style={{
                width: CARD_WIDTH,
                height: 50,
                flexDirection: 'row',
                position: 'absolute',
                bottom: -10,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
              }}
            >
              <Button
                buttonWidth={CARD_WIDTH - 100}
                buttonHeight={50}
                paddingTop={12}
              >
                ORDER NOW
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)'
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)'
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },

  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden'
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 12,
    color: '#444'
  }
});

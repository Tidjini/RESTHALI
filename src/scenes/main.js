/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions
} from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { enterToDetails } from "../actions";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/EvilIcons";
import { Rating } from "react-native-ratings";

import { Button } from "../components/common";
import state from "../../Model/data";
import RestaurantCard from "../components/restaurantCard";

const { width, height } = Dimensions.get("window");
const mapStyle = require("../../assets/map.style.json");

const CARD_HEIGHT = height / 2.4;
const CARD_WIDTH = CARD_HEIGHT + 50;

const image = require("../../assets/images/rest_02.jpg");
const colors = require("../../assets/colors");

class Main extends Component {
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
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp"
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

  onOrderRestaurant() {
    this.props.enterToDetails();
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
          customMapStyle={mapStyle}
        >
          {this.renderMarkers()}
        </MapView>
        <View
          style={{
            height: 50,
            width: width - 50,
            alignSelf: "center",
            position: "absolute",
            top: 20,
            borderRadius: 5,
            backgroundColor: "#FFF",
            shadowColor: colors.primary,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 1,
            elevation: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Icon name="navicon" size={24} style={{ marginLeft: 10 }} />
          <Text style={{ color: colors.dimGray }}>Search for restaurant</Text>
          <Icon name="search" size={24} style={{ marginRight: 10 }} />
        </View>
        <RestaurantCard onPressItem={this.onOrderRestaurant.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  },
  scrollView: {
    position: "absolute",
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
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  }
});

export default connect(null, { enterToDetails })(Main);

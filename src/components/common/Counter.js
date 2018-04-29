import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../assets/colors";

const { width, height } = Dimensions.get("window");
const itemWidth = width / 2 - 10;
const Counter = ({
  buttonSize,
  buttonColor,
  onPlusPress,
  onMinusPress,
  count,
  countSize,
  countColor,
  width,
  backgroundButtonColor
}) => {
  return (
    <View
      style={{
        width: width || itemWidth,
        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15
      }}
    >
      <TouchableOpacity
        onPress={onMinusPress}
        style={{
          borderRadius: buttonSize - 10,
          width: buttonSize - 10,
          height: buttonSize - 10,

          backgroundColor: backgroundButtonColor || "#FFF",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          name="minus"
          size={buttonSize - 30}
          color={buttonColor}
          style={{ borderRadius: buttonSize }}
        />
      </TouchableOpacity>
      <Text
        style={{ fontWeight: "bold", fontSize: countSize, color: countColor }}
      >
        {count}
      </Text>
      <TouchableOpacity
        onPress={onPlusPress}
        style={{
          borderRadius: buttonSize - 10,
          width: buttonSize - 10,
          height: buttonSize - 10,

          backgroundColor: backgroundButtonColor || "#FFF",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon
          name="plus"
          size={buttonSize - 30}
          color={buttonColor}
          style={{ borderRadius: buttonSize }}
        />
      </TouchableOpacity>
    </View>
  );
};

export { Counter };

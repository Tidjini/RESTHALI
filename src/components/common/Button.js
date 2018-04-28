import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colors from '../../../assets/colors';

const Button = ({
  onPress,
  color,
  children,
  buttonWidth,
  buttonHeight,
  paddingTop,
  textColor
}) => {
  const width = buttonWidth || 100;
  const height = buttonHeight || 50;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width,
        height,
        alignSelf: 'stretch',
        backgroundColor: color || colors.primary,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: color || colors.primary,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        shadowColor: colors.primary,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        elevation: 2,
        position: 'relative'
      }}
    >
      <Text
        style={{
          alignSelf: 'center',
          color: textColor || '#FFFFFF',
          fontSize: 16,
          fontWeight: '600',
          paddingTop: paddingTop || 5,
          paddingBottom: 10
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };

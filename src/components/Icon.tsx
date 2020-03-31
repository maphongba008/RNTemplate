import React from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BasePureComponent } from './BaseComponent';

type IconProps = {
  name: string;
  style?: StyleProp<ViewStyle & TextStyle>;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  white?: boolean;
  tiny?: boolean;
  [key: string]: any;
};

export class Icon extends BasePureComponent<IconProps> {
  render() {
    const { style } = this.props;
    const textStyles = Object.keys(this.props)
      .filter((key) => this.props[key])
      // @ts-ignore
      .map((key) => styles[key])
      .filter((t) => t);
    return <Ionicons {...this.props} style={[{ fontSize: 25, color: '#000' }, textStyles, style]} />;
  }
}

const styles = StyleSheet.create({
  tiny: {
    fontSize: 16,
  },
  small: {
    fontSize: 20,
  },
  medium: {
    fontSize: 25,
  },
  large: {
    fontSize: 30,
  },
  white: {
    color: '#FFF',
  },
  black: {
    color: '#000',
  },
});

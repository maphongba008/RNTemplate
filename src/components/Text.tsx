import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

type TextProps = {
  f14?: boolean;
  f15?: boolean;
  f1520?: boolean;
  f16?: boolean;
  f17?: boolean;
  bold?: boolean;
  white?: boolean;
  [key: string]: any;
} & RNTextProps;

export class Text extends React.PureComponent<TextProps> {
  render() {
    const textStyles = Object.keys(this.props)
      .filter((key) => this.props[key])
      // @ts-ignore
      .map((key) => styles[key])
      .filter((t) => t);
    return (
      <RNText {...this.props} style={[textStyles, this.props.style]}>
        {this.props.children}
      </RNText>
    );
  }
}

const styles = StyleSheet.create({
  f14: {
    fontSize: 14,
  },
  f15: {
    fontSize: 15,
  },
  f1520: {
    fontSize: 15,
    lineHeight: 20,
  },
  f16: {
    fontSize: 16,
  },
  f17: {
    fontSize: 17,
  },
  bold: {
    fontWeight: 'bold',
  },
  white: {
    color: '#FFF',
  },
});

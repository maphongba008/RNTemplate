import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface BoxProps extends ViewProps {
  horizontal?: boolean;
  vertical?: boolean;
  full?: boolean;
  center?: boolean;
  absoluteFillParent?: boolean;
}

export class Box extends React.PureComponent<BoxProps> {
  render(): JSX.Element {
    const customStyles = Object.keys(this.props)
      // @ts-ignore
      .filter((key: string): boolean => !!styles[key])
      // @ts-ignore
      .map((key) => styles[key]);
    return (
      <View {...this.props} style={[customStyles, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  full: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteFillParent: {
    ...StyleSheet.absoluteFillObject,
  },
});

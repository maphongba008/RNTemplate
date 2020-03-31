import React from 'react';
import { TouchableOpacity as TO, TouchableOpacityProps as TP } from 'react-native';

type TouchableOpacityProps = {} & TP;

export class TouchableOpacity extends React.PureComponent<TouchableOpacityProps> {
  render() {
    return (
      <TO activeOpacity={0.7} {...this.props}>
        {this.props.children}
      </TO>
    );
  }
}

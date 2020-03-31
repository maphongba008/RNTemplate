import React from 'react';
import { FlatList as FL, FlatListProps as FP } from 'react-native';

type FlatListProps<T> = Omit<FP<T>, 'renderItem'> & {
  children: (item: T, index: number) => React.ReactElement;
};

export class List<T> extends React.PureComponent<FlatListProps<T>> {
  _renderItem = ({ item, index }: { item: T; index: number }) => this.props.children(item, index);

  render() {
    if (typeof this.props.children !== 'function') {
      throw new Error('Children must be a function');
    }
    return <FL data={this.props.data} renderItem={this._renderItem} {...this.props} />;
  }
}

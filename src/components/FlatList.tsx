import React from 'react';
import { FlatList as FL, FlatListProps as FP, ActivityIndicator, Image } from 'react-native';
import { Box } from './Box';
import { Text } from './Text';
import { BasePureComponent } from './BaseComponent';

type FlatListProps<T> = Omit<FP<T>, 'renderItem'> & {
  children: (item: T, index: number) => React.ReactElement;
  emptyOption?: {
    icon: number;
    text: string;
  };
  isLoading?: boolean;
  loadingText?: string;
  loadingComponent?: () => React.ReactElement;
};

export class List<T> extends BasePureComponent<FlatListProps<T>> {
  _renderItem = ({ item, index }: { item: T; index: number }) => this.props.children(item, index);

  render() {
    if (typeof this.props.children !== 'function') {
      throw new Error('Children must be a function');
    }
    const { data, emptyOption, isLoading, loadingComponent, loadingText } = this.props;
    if (isLoading) {
      if (loadingText) {
        return (
          <Box full center>
            <ActivityIndicator size="small" />
            <Text style={{ marginTop: 8 }}>{this.t(loadingText)}</Text>
          </Box>
        );
      }
      if (loadingComponent) {
        return (
          <List data={[1, 2, 3]} keyExtractor={(item) => String(item)}>
            {() => <React.Fragment>{loadingComponent()}</React.Fragment>}
          </List>
        );
      }
    }
    if ((!data || data.length === 0) && emptyOption) {
      return (
        <Box full center>
          <Image source={emptyOption.icon} />
          <Text style={{ marginTop: 8 }}>{emptyOption.text}</Text>
        </Box>
      );
    }
    return <FL data={this.props.data} renderItem={this._renderItem} {...this.props} />;
  }
}

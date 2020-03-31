import React from 'react';
import { Platform } from 'react-native';
import { Box } from './Box';
import { hasNotch } from 'react-native-device-info';
import { StyleSheet } from 'react-native';
import { BaseComponent } from './BaseComponent';

const isAndroid = Platform.OS === 'android';
const statusBarHeight = isAndroid ? 0 : hasNotch() ? 44 : 20;
const bottomSpacing = 34;

type ContainerProps = {
  renderStatusBar?: (height: number) => JSX.Element;
  statusBarColor?: string;
  hasSpacingBottom?: boolean;
};

export class Container extends BaseComponent<ContainerProps> {
  static bottomSpacing = 34;
  static topSpacing = statusBarHeight;

  render() {
    const { renderStatusBar, statusBarColor, hasSpacingBottom } = this.props;
    return (
      <Box full style={[styles.header]}>
        {renderStatusBar ? (
          renderStatusBar(statusBarHeight)
        ) : (
          <Box style={[styles.statusBar, { backgroundColor: statusBarColor || this.context.colors.statusBar }]} />
        )}
        {this.props.children}
        {hasSpacingBottom && <Box style={{ height: bottomSpacing }} />}
      </Box>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: statusBarHeight,
  },
  header: {},
});

import React from 'react';
import { BasePureComponent } from './BaseComponent';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  ViewStyle,
  TextStyle,
  Dimensions,
  LayoutChangeEvent,
  ActivityIndicator,
} from 'react-native';
import { List } from './FlatList';
import { Text } from './Text';
import { Theme } from '@src/theme';
import { Icon } from './Icon';

const { height: screenHeight } = Dimensions.get('window');

type Option = {
  key: string;
  value: string;
  [key: string]: any;
};

type ForwardedProps = {
  data: Option[];
  onOptionSelected?: (option: Option) => void;
  selectedOption?: Option;
  // allow user to tap outside to dismiss
  tapToDismiss?: boolean;
  optionContainerStyle?: ViewStyle;
  optionTextStyle?: TextStyle;
};

type DropDownListModalProps = {
  visible?: boolean;
  onRequestClose: () => void;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
  maxHeight?: number;
} & ForwardedProps;

type DropDownListModalState = {
  height: number;
};

const PADDING = 100;
const OFFSET = 10;

class DropDownListModal extends BasePureComponent<DropDownListModalProps, DropDownListModalState> {
  state = {
    height: 0,
  };

  _onLayout = (event: LayoutChangeEvent) => {
    this.setState({ height: event.nativeEvent.layout.height });
  };

  render() {
    const { visible, data, onRequestClose, onOptionSelected, tapToDismiss, height, width, pageX, pageY } = this.props;
    const maxHeight = this.props.maxHeight || 300;
    const styles = this.useStyles(optionStyles);
    // calculate position of view
    const x = pageX;
    let y = pageY;

    if (pageY + height + this.state.height > screenHeight - PADDING) {
      // go top
      y = pageY - OFFSET - this.state.height;
    } else {
      // go bottom
      y = pageY + height + OFFSET;
    }
    const viewStyle: ViewStyle = {
      position: 'absolute',
      left: x,
      top: y,
      width,
      opacity: this.state.height ? 1 : 0,
    };
    return (
      <Modal transparent visible={visible} animated animationType="fade" onRequestClose={onRequestClose}>
        <View style={StyleSheet.absoluteFill}>
          {tapToDismiss && (
            <TouchableOpacity onPress={onRequestClose} style={[StyleSheet.absoluteFill]} activeOpacity={1} />
          )}
          <View onLayout={this._onLayout} style={[styles.list, { maxHeight }, viewStyle]}>
            <List data={data}>
              {(option) => (
                <TouchableOpacity
                  onPress={() => onOptionSelected && onOptionSelected(option)}
                  style={[styles.container]}>
                  <Text style={styles.text}>{option.value}</Text>
                </TouchableOpacity>
              )}
            </List>
          </View>
        </View>
      </Modal>
    );
  }
}

const optionStyles = ({ sharedStyle }: Theme) =>
  StyleSheet.create({
    list: {
      ...sharedStyle.shadow1,
      borderRadius: 4,
    },
    container: {
      padding: 8,
    },
    text: {},
  });

type DropDownButtonProps = {
  isLoadingData?: boolean;
  placeholder?: string;
} & ForwardedProps;

type DropDownButtonState = {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
  visible: boolean;
};

export class DropDownButton extends BasePureComponent<DropDownButtonProps, DropDownButtonState> {
  view: TouchableOpacity | null = null;

  state = {
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
    visible: false,
  };

  _handlePress = () => {
    if (!this.view) {
      return;
    }
    this.view.measure((_, __, width, height, pageX, pageY) => {
      this.setState({ width, height, pageX, pageY, visible: true });
    });
  };

  _onOptionSelected = (option: Option) => {
    this.setState({ visible: false });
    console.log(this.props.onOptionSelected);
    this.props.onOptionSelected && this.props.onOptionSelected(option);
  };

  render() {
    const { isLoadingData, placeholder, selectedOption } = this.props;
    const { width, height, pageX, pageY, visible } = this.state;
    const displayText = (selectedOption && selectedOption.value) || placeholder || '';
    const styles = this.useStyles(appStyles);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={isLoadingData}
        onPress={this._handlePress}
        ref={(r) => (this.view = r)}
        style={styles.container}>
        <DropDownListModal
          {...this.props}
          visible={visible}
          width={width}
          onOptionSelected={this._onOptionSelected}
          height={height}
          pageX={pageX}
          pageY={pageY}
          onRequestClose={() => this.setState({ visible: false })}
        />
        <Text>{displayText}</Text>
        <View style={styles.indicatorContainer}>
          {isLoadingData ? <ActivityIndicator animating /> : <Icon name="md-arrow-dropdown" />}
        </View>
      </TouchableOpacity>
    );
  }
}

const appStyles = ({ sharedStyle }: Theme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      padding: 8,
      ...sharedStyle.shadow1,
    },
    indicatorContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      paddingHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

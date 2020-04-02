import React from 'react';
import { ScrollView, Dimensions, Animated, Image, View } from 'react-native';
import { TouchableOpacity, Text, BaseComponent } from '@src/components';
import { ScaledSheet } from 'rn-scaled-sheet';
import { BackHandler } from '@src/components';
import { observable } from 'mobx';
import EventEmitter from '@src/utils/EventEmitter';
import { observer } from 'mobx-react';
import { Theme } from '@src/theme';

const { height } = Dimensions.get('window');

type Button = {
  text: string;
  onPress?: () => void;
  style?: any;
  textStyle?: any;
};

type PopupData = {
  title?: string;
  message?: string;
  canDismiss?: boolean;
  buttonOrientation?: 'vertical' | 'horizontal';
  icon?: number;
  buttons?: Button[];
};

type Props = {
  data: PopupData;
};

@observer
class PopupController extends BaseComponent {
  @observable
  popup: PopupData[] = [];
  popupRefs: Popup[] | null[] = [];

  static showPopup = (data: PopupData) => {
    EventEmitter.notify('showPopup', data);
  };

  componentDidMount = () => {
    EventEmitter.register('closePopup', () => {
      const last = this.popupRefs.pop();
      if (last) {
        last.hide(() => {
          this.popup.pop();
        });
      }
    });
    EventEmitter.register('showPopup', (data: PopupData) => {
      this.popup.push(data);
    });
  };

  render() {
    if (this.popup.length === 0) {
      return null;
    }
    return this.popup.map((p, index) => <Popup ref={(r) => (this.popupRefs[index] = r)} key={p.title} data={p} />);
  }
}

class Popup extends BaseComponent<Props> {
  state = {
    animation: new Animated.Value(0),
  };

  _handleButtonPress = (button: Button) => {
    const { data } = this.props;
    if (!data.canDismiss) {
      return;
    }
    // close modal
    EventEmitter.notify('closePopup');
    // handle press
    button.onPress && button.onPress();
  };

  componentDidMount = () => {
    Animated.spring(this.state.animation, {
      toValue: 1,
      // duration: 200,
      useNativeDriver: false,
    }).start();
  };

  hide = (callback: () => void) => {
    Animated.spring(this.state.animation, {
      toValue: 0,
      // duration: 200,
      useNativeDriver: false,
    }).start(callback);
  };

  _renderVerticalButtons = (buttons: Button[]) => {
    const styles = this.useStyles(mStyles);
    return (
      <View>
        {buttons.map((btn) => (
          <TouchableOpacity
            key={btn.text}
            onPress={() => this._handleButtonPress(btn)}
            style={[styles.button, btn.style]}>
            <Text medium f16 style={[styles.buttonText, btn.textStyle]}>
              {btn.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  _renderHorizontalButtons = (buttons: Button[]) => {
    const styles = this.useStyles(mStyles);
    return (
      <View style={{ flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: 'rgba(0, 0, 0, .2)' }}>
        {buttons.map((btn) => (
          <TouchableOpacity
            key={btn.text}
            onPress={() => this._handleButtonPress(btn)}
            style={[styles.buttonHorizontal, btn.style]}>
            <Text medium f16 style={[styles.buttonText, btn.textStyle]}>
              {btn.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  render() {
    const { data } = this.props;
    const styles = this.useStyles(mStyles);
    if (!data) {
      return null;
    }
    const containerAnimatedStyle = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .3)'],
      }),
    };

    const popupAnimatedStyle = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [(height * 2) / 3, 0],
          }),
        },
      ],
    };

    let isVertical;
    if (data.buttonOrientation === 'vertical') {
      isVertical = true;
    } else if (data.buttonOrientation === 'horizontal') {
      isVertical = false;
    } else {
      isVertical = data.buttons && data.buttons.length > 2 ? true : false;
    }
    return (
      <Animated.View style={[styles.overlay, containerAnimatedStyle]}>
        <Animated.View style={[styles.container, popupAnimatedStyle]}>
          {!!data.icon && <Image source={data.icon} style={styles.icon} />}
          <Text bold f1624 style={[styles.titleText]}>
            {data.title}
          </Text>
          <ScrollView style={{ maxHeight: height / 2 }}>
            <Text f1520 style={[styles.messageText]}>
              {data.message}
            </Text>
          </ScrollView>

          {isVertical && !!data.buttons && this._renderVerticalButtons(data.buttons)}
          {!isVertical && !!data.buttons && this._renderHorizontalButtons(data.buttons)}
        </Animated.View>
        {data.canDismiss && <BackHandler onBack={() => EventEmitter.notify('closePopup')} />}
      </Animated.View>
    );
  }
}

const mStyles = ({ colors }: Theme) =>
  ScaledSheet.create({
    overlay: {
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      elevation: 2,
    },
    container: {
      backgroundColor: '#FFF',
      borderRadius: 8,
      margin: 16,
    },
    icon: {
      marginTop: 16,
      alignSelf: 'center',
    },
    titleText: {
      marginTop: 16,
      textAlign: 'center',
      marginBottom: 24,
      marginHorizontal: 16,
    },
    messageText: {
      marginBottom: 32,
      marginHorizontal: 16,
    },
    closeButton: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: 8,
    },
    closeIcon: {
      fontSize: 25,
      color: 'rgba(0, 0, 0, .7)',
    },
    button: {
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 0.5,
      borderTopColor: 'rgba(0, 0, 0, .2)',
    },
    buttonHorizontal: {
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderLeftWidth: 0.5,
      borderLeftColor: 'rgba(0, 0, 0, .2)',
      flex: 1,
    },
    buttonText: {},
  });

export default PopupController;

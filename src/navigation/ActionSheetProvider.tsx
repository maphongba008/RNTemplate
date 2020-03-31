import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import EventEmitter, { Keys } from '@src/utils/EventEmitter';
import _ from 'lodash';

type ActionSheetOption = {
  text: string;
  isCancel?: boolean;
  isDestructive?: boolean;
  onPress?: () => void;
};

type ActionSheetProps = {
  title: string;
  options: ActionSheetOption[];
  tintColor?: string;
};

interface ActionSheetState {
  title: string;
  options: ActionSheetOption[];
  tintColor: string | undefined;
}

export class ActionSheetProvider extends React.Component<{}, ActionSheetState> {
  static show = (title: string, options: ActionSheetOption[], tintColor?: string) => {
    EventEmitter.notify(Keys.ShowActionSheet, {
      title,
      options,
      tintColor,
    });
  };

  actionSheet: ActionSheet | null = null;

  state = {
    title: '',
    tintColor: undefined,
    options: [],
  };

  _showActionSheet = (data: ActionSheetProps) => {
    this.setState(
      {
        title: data.title,
        options: data.options,
        tintColor: data.tintColor,
      },
      () => {
        this.actionSheet && this.actionSheet.show();
      },
    );
  };

  _handleOnClick = (index: number) => {
    const obj: ActionSheetOption = this.state.options[index];
    obj && obj.onPress && obj.onPress();
  };

  componentDidMount = () => {
    EventEmitter.register(Keys.ShowActionSheet, this._showActionSheet);
  };

  render() {
    const options = this.state.options.map((option: ActionSheetOption) => option.text);
    const cancelButtonIndex = _.findIndex(this.state.options, (option: ActionSheetOption) => !!option.isCancel);
    const destructiveButtonIndex = _.findIndex(
      this.state.options,
      (option: ActionSheetOption) => !!option.isDestructive,
    );
    return (
      <ActionSheet
        ref={(r: ActionSheet) => (this.actionSheet = r)}
        title={this.state.title}
        options={options}
        tintColor={this.state.tintColor}
        cancelButtonIndex={cancelButtonIndex}
        destructiveButtonIndex={destructiveButtonIndex}
        onPress={this._handleOnClick}
      />
    );
  }
}

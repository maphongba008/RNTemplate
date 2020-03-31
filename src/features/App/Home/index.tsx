import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Theme, ThemeProvider } from '@src/theme';
import { AppScreen, List, TouchableOpacity, Container, Header, DropDownButton } from '@src/components';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Services, { User } from '@src/api/Services';
import { ActionSheetProvider } from '@src/navigation/ActionSheetProvider';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');
console.log('device dimensions: ', width, height);

@observer
export class HomeScreen extends AppScreen {
  @observable showModal = false;
  @observable user: User | undefined = undefined;

  _handlePress = () => {
    Services.fetchUsers().then((users) => {
      this.user = users[0];
      console.log(this.user);
    });
  };

  _handlePress2 = () => {
    ActionSheetProvider.show('Choose theme', [
      {
        text: 'Dark theme',
        onPress: () => {
          ThemeProvider.changeTheme('dark');
        },
      },
      {
        text: 'Light theme',
        onPress: () => {
          ThemeProvider.changeTheme('light');
        },
      },
      {
        text: 'Cancel',
        isCancel: true,
      },
    ]);
  };

  state = {
    selectedOption: null,
  };

  render(): JSX.Element {
    const appStyles = this.useStyles(styles);
    console.log('selected', this.state.selectedOption);
    return (
      <Container>
        <Header title="Hello you" />
        <ScrollView>
          <View style={{}}>
            <Text>Version: {DeviceInfo.getReadableVersion()}</Text>
            <Text>{this.t('SPLASH_SCREEN.TITLE')}</Text>
            <TouchableOpacity onPress={this._handlePress}>
              <Text>Click me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={appStyles.container} onPress={this._handlePress2}>
              <Text>Click me</Text>
            </TouchableOpacity>
            <DropDownButton
              data={Array.from({ length: 3 }).map((_, index) => ({
                key: String(index),
                value: `Donate ${index + 1}k`,
              }))}
              // @ts-ignore
              selectedOption={this.state.selectedOption}
              onOptionSelected={(selectedOption) => {
                this.setState({ selectedOption });
                console.log(selectedOption);
              }}
              tapToDismiss
              placeholder="Choose "
            />
            <View style={{ height: 400 }} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      height: 1000,
      backgroundColor: colors.backgroundColor,
    },
    btn: {},
  });

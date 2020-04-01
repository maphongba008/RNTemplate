import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, Alert } from 'react-native';
import { Theme, ThemeProvider } from '@src/theme';
import { AppScreen, List, TouchableOpacity, Container, Header, DropDownButton } from '@src/components';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Services, { User } from '@src/api/Services';
import { ActionSheetProvider } from '@src/navigation/ActionSheetProvider';
import DeviceInfo from 'react-native-device-info';
import Configs from '@src/constants/Configs';

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
    return (
      <Container>
        <Header title="Hello you" />
        <ScrollView>
          <View style={{}}>
            <Text>Version: {DeviceInfo.getReadableVersion()}</Text>
            <Text>{this.t('SPLASH_SCREEN.TITLE')}</Text>
            <Text>{Configs.API_URL}</Text>
            <TouchableOpacity onPress={this._handlePress}>
              <Text>Click me</Text>
            </TouchableOpacity>
            {!!this.user && <Text>{this.user.email}</Text>}
            <TouchableOpacity style={appStyles.container} onPress={this._handlePress2}>
              <Text>Change theme</Text>
            </TouchableOpacity>
            <View style={{ height: 500 }} />
            <DropDownButton
              data={Array.from({ length: 3 }).map((_, index) => ({
                key: String(index),
                value: `Row ${index + 1}`,
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
      padding: 8,
      alignSelf: 'center',
      backgroundColor: colors.backgroundColor,
    },
    btn: {},
  });

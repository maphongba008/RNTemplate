import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Theme, ThemeProvider } from '@src/theme';
import { AppScreen, List, TouchableOpacity, Container, Header, DropDownButton, Box, LoadingRow } from '@src/components';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import { ActionSheetProvider } from '@src/navigation/ActionSheetProvider';
import DeviceInfo from 'react-native-device-info';
import Configs from '@src/constants/Configs';

const { width, height } = Dimensions.get('window');
console.log('device dimensions: ', width, height);

@inject('appStore')
@observer
export class HomeScreen extends AppScreen {
  @observable showModal = false;

  _handlePress = () => {
    this.props.appStore.fetchUsers();
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
    const { usersLoader } = this.props.appStore;
    return (
      <Container>
        <Header title="Hello you" />
        <View style={{ height: 200 }}>
          <List
            keyExtractor={(user) => String(user.id)}
            isLoading={usersLoader.isLoading}
            loadingComponent={() => <LoadingRow />}
            // loadingText="Loading users"
            data={usersLoader.data}>
            {(user) => (
              <Box>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
              </Box>
            )}
          </List>
        </View>
        <ScrollView>
          <View style={{}}>
            <Text>Version: {DeviceInfo.getReadableVersion()}</Text>
            <Text>{this.t('SPLASH_SCREEN.TITLE')}</Text>
            <Text>{Configs.API_URL}</Text>
            <TouchableOpacity style={appStyles.container} onPress={this._handlePress}>
              <Text>Test API</Text>
            </TouchableOpacity>
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
      marginTop: 10,
    },
    btn: {},
  });

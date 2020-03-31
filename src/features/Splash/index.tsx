import React from 'react';
import { Text, View, Modal } from 'react-native';
import { AppScreen, Box } from '../../components';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Screens from '@src/navigation/Screens';
import Configs from '@src/constants/Configs';
import NavigationService from '@src/navigation/NavigationService';

@observer
export class SplashScreen extends AppScreen {
  @observable
  text = 'Ahihi';

  @observable
  isShowModal = false;

  componentDidMount = async () => {
    await NavigationService.ready();
    NavigationService.navigate(Screens.APP);
  };

  render(): JSX.Element {
    return (
      <Box full center>
        <Text>{this.t('SPLASH_SCREEN.TITLE')}</Text>
        <Text>{this.text}</Text>
        <Text>{Configs.API_URL}</Text>
        <Modal visible={this.isShowModal} transparent>
          <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
        </Modal>
      </Box>
    );
  }
}

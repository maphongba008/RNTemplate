import { NavigationScreenProp } from 'react-navigation';
import { BaseComponent } from './BaseComponent';
import { AppStore } from '@src/stores/AppStore';
type AppScreenProps = {
  navigation: NavigationScreenProp<{}>;
  appStore: AppStore;
};

export class AppScreen<T = {}, K = {}> extends BaseComponent<AppScreenProps & T, K> {
  back = () => this.props.navigation.goBack();
}

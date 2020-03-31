import { NavigationScreenProp } from 'react-navigation';
import { BaseComponent } from './BaseComponent';
type AppScreenProps = {
  navigation: NavigationScreenProp<{}>;
};

export class AppScreen<T = {}, K = {}> extends BaseComponent<AppScreenProps & T, K> {
  back = () => this.props.navigation.goBack();
}

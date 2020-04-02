import { BackHandler as BH } from 'react-native';
import { BasePureComponent } from './BaseComponent';

type BackHandlerProps = {
  onBack?: () => void;
  disabled?: boolean;
};

export class BackHandler extends BasePureComponent<BackHandlerProps> {
  componentDidMount = () => {
    BH.addEventListener('hardwareBackPress', this._onBackPress);
  };

  _onBackPress = () => {
    const { onBack, disabled } = this.props;
    if (disabled) {
      return true;
    }
    if (onBack) {
      onBack();
      return true;
    }
    return false;
  };

  componentWillUnmount = () => {
    BH.removeEventListener('hardwareBackPress', this._onBackPress);
  };

  render() {
    return null;
  }
}

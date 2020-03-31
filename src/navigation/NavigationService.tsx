import { NavigationActions, NavigationContainerComponent } from 'react-navigation';
import EventEmitter, { Keys } from '@src/utils/EventEmitter';

let _resolve: (() => void) | null = null;
let _navigator: NavigationContainerComponent | null = null;
let _isReady = false;

class NavigationService {
  ready = () => {
    return new Promise((resolve: () => void) => {
      if (_isReady) {
        resolve();
      } else {
        _resolve = resolve;
      }
    });
  };

  setTopLevelNavigator = (navigator: NavigationContainerComponent | null) => {
    _navigator = navigator;
    _isReady = true;
    _resolve && _resolve();
    _resolve = null;
  };

  navigate = (routeName: string, params?: object) => {
    _navigator && _navigator.dispatch(NavigationActions.navigate({ routeName, params }));
  };

  back = () => {
    _navigator && _navigator.dispatch(NavigationActions.back());
  };
  /**
 * title={'Which one do you like ?'}
          options={['Apple', 'Banana', 'cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => {
 */
  showActionSheet = (title: string, options: ActionSheetOption[]) => {
    EventEmitter.notify(Keys.ShowActionSheet, {
      title,
      options,
    });
  };
}

interface ActionSheetOption {
  text: string;
  onPress?: () => void;
  isDestructive?: boolean;
  isCancel?: boolean;
}

export default new NavigationService();

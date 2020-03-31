import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Screens from './Screens';
import {SplashScreen} from '../features/Splash';
import {HomeScreen} from '../features/App/Home';

const App = createStackNavigator(
  {
    [Screens.HOME]: HomeScreen,
  },
  {
    headerMode: 'none',
  },
);

const MainNavigator = createSwitchNavigator({
  [Screens.SPLASH]: SplashScreen,
  [Screens.APP]: App,
});

export const AppNavigator = createAppContainer(MainNavigator);

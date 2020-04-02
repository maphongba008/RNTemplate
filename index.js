/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/navigation';
import { name as appName } from './app.json';
import './src/configs';

AppRegistry.registerComponent(appName, () => App);

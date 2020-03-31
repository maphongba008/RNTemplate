import React from 'react';
import { LightTheme, DarkTheme, Color, SharedStyle, sharedStyle } from './themes';
import { Appearance } from 'react-native';
import EventEmitter, { Keys } from '@src/utils/EventEmitter';
export type Theme = {
  colors: Color;
  sharedStyle: SharedStyle;
};

export const defaultTheme: Theme = {
  colors: Appearance.getColorScheme() === 'light' ? LightTheme : DarkTheme,
  sharedStyle: sharedStyle,
};

export const ThemeContext = React.createContext(defaultTheme);

export class ThemeProvider extends React.Component {
  state = {
    theme: defaultTheme,
  };

  static changeTheme = (theme: 'light' | 'dark') => {
    EventEmitter.notify(Keys.ChangeTheme, theme);
  };

  componentDidMount = () => {
    EventEmitter.register(Keys.ChangeTheme, this._onThemeChange);
  };

  _onThemeChange = (theme: 'light' | 'dark') => {
    console.log('theme changed', theme);
    this.setState({ theme: { ...this.state.theme, colors: theme === 'light' ? LightTheme : DarkTheme } });
  };

  render() {
    console.log('ThemeContext.Provider', this.state.theme);
    return <ThemeContext.Provider value={this.state.theme}>{this.props.children}</ThemeContext.Provider>;
  }
}

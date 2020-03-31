import React from 'react';
import { Theme, defaultTheme, ThemeContext } from '@src/theme';
import i18n from '../locale/i18n';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

type BaseComponentProps = {};
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
type StyleProps<T> = (theme: Theme) => T;

export class BaseComponent<T = {}, K = {}> extends React.Component<BaseComponentProps & T, K> {
  context: Theme = defaultTheme;
  static contextType = ThemeContext;
  translate = (text: string): string => i18n.t(text);
  t = (text: string): string => i18n.t(text);

  useStyles = <T extends NamedStyles<T> | NamedStyles<any>>(style: StyleProps<T>): T => {
    const styles = style(this.context);
    return styles;
  };
}

export class BasePureComponent<T = {}, K = {}> extends React.PureComponent<BaseComponentProps & T, K> {
  context: Theme = defaultTheme;
  static contextType = ThemeContext;
  translate = (text: string): string => i18n.t(text);

  t = (text: string): string => i18n.t(text);

  useStyles = <T extends NamedStyles<T> | NamedStyles<any>>(style: StyleProps<T>): T => {
    const styles = style(this.context);
    return styles;
  };
}

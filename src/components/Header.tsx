import React from 'react';
import { BasePureComponent } from './BaseComponent';
import { Box } from './Box';
import { TouchableOpacity } from './TouchableOpacity';
import { StyleSheet } from 'react-native';
import { Text } from './Text';
import { Icon } from './Icon';

type HeaderProps = {
  leftIcon?: string;
  onPressLeft?: () => void;
  rightIcon?: string;
  onPressRight?: () => void;
  title?: string;
  onSearchChange?: (text: string) => void;
  onCancelSearch?: () => void;
  isSearching?: boolean;
};

export class Header extends BasePureComponent<HeaderProps> {
  render() {
    const { leftIcon, rightIcon, title, onPressLeft, onPressRight } = this.props;
    return (
      <Box style={[styles.header, { backgroundColor: this.context.colors.navigationBarColor }]}>
        <TouchableOpacity disabled={!leftIcon} onPress={onPressLeft} style={styles.leftButton}>
          {!!leftIcon && <Icon style={{ color: this.context.colors.iconHeaderColor }} name={leftIcon} />}
        </TouchableOpacity>
        <Text f17 style={[styles.titleText, { color: this.context.colors.iconHeaderColor }]}>
          {title}
        </Text>
        <TouchableOpacity disabled={!rightIcon} onPress={onPressRight} style={styles.rightButton}>
          {!!rightIcon && <Icon style={{ color: this.context.colors.iconHeaderColor }} name={rightIcon} />}
        </TouchableOpacity>
      </Box>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButton: {
    width: 60,
    paddingLeft: 10,
  },
  rightButton: {
    width: 60,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    height: 30,
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
});

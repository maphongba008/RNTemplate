export const LightTheme = {
  backgroundColor: 'red',
  textColor: 'green',
  statusBar: 'red',
  iconHeaderColor: '#FFF',
  navigationBarColor: 'red',
};

export type Color = typeof LightTheme;

export const DarkTheme: Color = {
  backgroundColor: '#F2f',
  textColor: '#ff2',
  statusBar: '#F2f',
  iconHeaderColor: '#FFF',
  navigationBarColor: '#F2f',
};

export const sharedStyle = {
  shadow1: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1,
    backgroundColor: '#FFF',
  },
};

export type SharedStyle = typeof sharedStyle;

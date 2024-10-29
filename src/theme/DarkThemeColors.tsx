const DarkThemeColors = [
  {
    name: 'AKILA_THEME',
    palette:  {
      mode: 'dark',
      primary: {
        main: '#FF578F',  // Deep Pink
        light: '#FF88B0', // Lighter Pink
        dark: '#D04570',  // Darker Pink
        contrastText: '#ffffff',  // White text for contrast
      },
      secondary: {
        main: '#F66859',  // Coral Orange
        light: '#F99889', // Lighter Coral
        dark: '#C55348',  // Darker Coral
        contrastText: '#ffffff',  // White text for contrast
      },
      accent: {
        main: '#5C206A',  // Deep Violet
        contrastText: '#ffffff',  // White for contrast
      },
      background: {
        default: '#1E1E1E',  // Dark background
        paper: '#2C2C2C',    // Slightly lighter dark for cards/containers
      },
      text: {
        primary: '#ffffff',  // White text for readability on dark background
        secondary: '#B0B0B0', // Slightly muted text for secondary elements
      },
      action: {
        hover: '#FF88B0',  // Lighter Pink for hover effects
        selected: '#F66859',  // Coral Orange for selected items
      },
      gradient: {
        main: 'linear-gradient(90deg, #FF578F 0%, #F66859 100%)',  // Gradient from Deep Pink to Coral Orange
      },
      level:{
        none: '#24b667',
        low: '#ffca3a',
        medium: '#fd8824',
        high: '#d31212',
        critical: '#6a020c',
        unknown: '#b1c0c5',
      }
    },
  },
  {
    name: 'AQUA_THEME',
    palette: {
      primary: {
        main: '#0074BA',
        light: '#103247',
        dark: '#006DAF',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#47D7BC',
        light: '#0C4339',
        dark: '#39C7AD',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'PURPLE_THEME',
    palette: {
      primary: {
        main: '#763EBD',
        light: '#26153C',
        dark: '#6E35B7',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#95CFD5',
        light: '#09454B',
        dark: '#8BC8CE',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'GREEN_THEME',
    palette: {
      primary: {
        main: '#0A7EA4',
        light: '#05313F',
        dark: '#06769A',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#CCDA4E',
        light: '#282917',
        dark: '#C3D046',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'CYAN_THEME',
    palette: {
      primary: {
        main: '#01C0C8',
        light: '#003638',
        dark: '#00B9C0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#FB9678',
        light: '#40241C',
        dark: '#F48B6C',
        contrastText: '#ffffff',
      },
    },
  },
  {
    name: 'ORANGE_THEME',
    palette: {
      primary: {
        main: '#FA896B',
        light: '#402E32',
        dark: '#F48162',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#0074BA',
        light: '#082E45',
        dark: '#006FB1',
        contrastText: '#ffffff',
      },
    },
  },
];

export { DarkThemeColors };

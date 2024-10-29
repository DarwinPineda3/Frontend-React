const LightThemeColors = [
  {
    name: 'AKILA_THEME',
    palette: {
      primary: {
        main: '#FF578F',  // Deep Pink
        light: '#FF88B0', // Lighter Pink
        dark: '#D04570',  // Darker Pink
        contrastText: '#ffffff',  // White for contrast
      },
      secondary: {
        main: '#F66859',  // Coral Orange
        light: '#F99889', // Lighter Coral
        dark: '#C55348',  // Darker Coral
        contrastText: '#ffffff',  // White for contrast
      },
      accent: {
        main: '#5C206A',  // Deep Violet
        contrastText: '#ffffff',  // White for contrast
      },
      background: {
        default: '#FEF9F8',  // Off White background
        paper: '#ffffff',    // Pure white for paper (cards, containers)
      },
      text: {
        primary: '#333333',  // Dark text for readability
        secondary: '#666666', // Secondary text
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
    }
  },
  {
    name: 'AQUA_THEME',
    palette: {
      primary: {
        main: '#0074BA',
        light: '#EFF9FF',
        dark: '#006DAF',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#47D7BC',
        light: '#EDFBF7',
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
        light: '#F2ECF9',
        dark: '#6E35B7',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#95CFD5',
        light: '#EDF8FA',
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
        light: '#F4F9FB',
        dark: '#06769A',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#CCDA4E',
        light: '#FAFBEF',
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
        light: '#EBF9FA',
        dark: '#00B9C0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#FB9678',
        light: '#FFF5F2',
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
        light: '#FBF2EF',
        dark: '#F48162',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#0074BA',
        light: '#EFF9FF',
        dark: '#006FB1',
        contrastText: '#ffffff',
      },
    },
  },
];

export { LightThemeColors };

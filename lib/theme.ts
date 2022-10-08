import ArrowDropDownRounded from "@mui/icons-material/ArrowDropDownRounded";
import { createTheme, Theme, alpha } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

declare module "@mui/material/styles/createPalette" {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    primaryDark: PaletteColor;
  }
}

export const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  main: "#007FFF",
  500: "#007FFF",
  600: "#0072E5", // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};
export const blueDark = {
  50: "#E2EDF8",
  100: "#CEE0F3",
  200: "#91B9E3",
  300: "#5090D3",
  main: "#5090D3",
  400: "#265D97",
  500: "#1E4976",
  600: "#173A5E",
  700: "#132F4C", // contrast 13.64:1
  800: "#001E3C",
  900: "#0A1929",
};
const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7", // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
  400: "#B2BAC2", // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
  500: "#A0AAB4", // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
  600: "#6F7E8C", // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
  700: "#3E5060", // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
  800: "#2D3843", // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
  900: "#1A2027",
};

const theme = createTheme({
  palette: {
    primary: blue,
    divider: grey[100],
    background: {
      default: grey[50],
    },
    mode: "light",
    common: {
      black: "#1D1D1D",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
    grey,
    error: {
      50: "#FFF0F1",
      100: "#FFDBDE",
      200: "#FFBDC2",
      300: "#FF99A2",
      400: "#FF7A86",
      500: "#FF505F",
      main: "#EB0014", // contrast 4.63:1
      600: "#EB0014",
      700: "#C70011",
      800: "#94000D",
      900: "#570007",
    },
    success: {
      50: "#E9FBF0",
      100: "#C6F6D9",
      200: "#9AEFBC",
      300: "#6AE79C",
      400: "#3EE07F",
      500: "#21CC66",
      600: "#1DB45A",
      main: "#1AA251",
      700: "#1AA251",
      800: "#178D46",
      900: "#0F5C2E",
    },
    warning: {
      50: "#FFF9EB",
      100: "#FFF3C1",
      200: "#FFECA1",
      300: "#FFDC48", // vs blueDark900: WCAG 10.4 AAA, APCA 72 Ok for text
      400: "#F4C000", // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
      500: "#DEA500", // vs blueDark900: WCAG 8 AAA normal, APCA 58 Only large text
      main: "#DEA500",
      600: "#D18E00", // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
      700: "#AB6800", // vs white bg: WCAG 4.4 AA large, APCA 71 Ok for text
      800: "#8C5800", // vs white bg: WCAG 5.9 AAA large, APCA 80 Best for text
      900: "#5A3600", // vs white bg: WCAG 10.7 AAA, APCA 95 Best for text
    },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 10,
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 800,
      lineHeight: 78 / 70,
      color: blueDark[900],
    },
    h2: {
      fontSize: "clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)",
      fontWeight: 800,
      lineHeight: 44 / 36,
      color: blueDark[700],
    },
    h3: {
      fontSize: "2.25rem",
      lineHeight: 44 / 36,
      letterSpacing: 0.2,
    },
    h4: {
      fontSize: "1.75rem",
      lineHeight: 42 / 28,
      letterSpacing: 0.2,
    },
    h5: {
      fontSize: "1.5rem",
      lineHeight: 36 / 24,
      letterSpacing: 0.1,
      color: blue.main,
    },
    h6: {
      fontSize: "1.25rem",
      lineHeight: 30 / 20,
    },
    button: {
      textTransform: "initial",
      fontWeight: 700,
      letterSpacing: 0,
    },
    subtitle1: {
      fontSize: "1rem",
      lineHeight: 24 / 18,
      letterSpacing: 0,
      fontWeight: 400,
      color: alpha(blueDark[900], 0.8),
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 24 / 16,
      letterSpacing: 0,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 21 / 14,
      letterSpacing: 0,
    },
    caption: {
      display: "inline-block",
      fontSize: "0.75rem",
      lineHeight: 18 / 12,
      letterSpacing: 0,
      fontWeight: 700,
    },
    allVariants: {
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
  },
});

export const getThemedComponents = (
  theme: Theme
): {
  components: Theme["components"];
} => {
  return {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          sizeLarge: {
            padding: "0.875rem 1rem",
            ...theme.typography.body1,
            lineHeight: 21 / 16,
            fontWeight: 700,
          },
          sizeSmall: {
            padding: theme.spacing(0.5, 1),
            marginLeft: theme.spacing(-1),
          },
          containedPrimary: {
            backgroundColor: theme.palette.primary[500],
            color: "#fff",
          },
        },
        variants: [
          {
            // @ts-ignore internal repo module augmentation issue
            props: { variant: "link" },
            style: {
              fontSize: theme.typography.pxToRem(14),
              fontWeight: 700,
              color: theme.palette.primary[600],
              mb: 1,
              "& svg": {
                ml: -0.5,
              },
            },
          },
        ],
      },
      MuiIconButton: {
        variants: [
          {
            props: { color: "primary" },
            style: {
              height: 34,
              width: 34,
              border: `1px solid ${theme.palette.grey[200]}`,
              borderRadius: theme.shape.borderRadius,
              color: theme.palette.primary[500],
              "&:hover": {
                borderColor: theme.palette.grey[300],
                background: theme.palette.grey[50],
              },
            },
          },
        ],
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            [theme.breakpoints.up("md")]: {
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: theme.palette.grey[100],
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "none",
        },
        styleOverrides: {
          root: {
            color: theme.palette.primary[600],
            display: "inline-flex",
            alignItems: "center",
            "&:hover": {
              color: theme.palette.primary[700],
            },
            "&.MuiTypography-body1 > svg": {
              marginTop: 2,
            },
            "& svg:last-child": {
              marginLeft: 2,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState: { color, variant } }) => ({
            fontWeight: 500,
            ...(variant === "outlined" &&
              color === "default" && {
                color: theme.palette.grey[900],
                backgroundColor: "transparent",
                borderColor: theme.palette.grey[200],
                "&:hover": {
                  color: theme.palette.grey[900],
                },
              }),
            ...(variant === "outlined" &&
              color === "primary" && {
                "&:hover": {
                  color: theme.palette.primary[500],
                },
              }),
            ...(variant === "filled" &&
              color === "default" && {
                border: "1px solid transparent",
                color: theme.palette.primary[700],
                backgroundColor: alpha(theme.palette.primary[100], 0.5),
                "&:hover": {
                  backgroundColor: theme.palette.primary[100],
                },
              }),
            // for labelling product in the search
            // @ts-ignore internal repo module augmentation issue
            ...(variant === "light" && {
              ...(color === "default" && {
                color: theme.palette.primary[700],
                backgroundColor: alpha(theme.palette.primary[100], 0.3),
              }),
              ...(color === "warning" && {
                color: theme.palette.warning[900],
                backgroundColor: theme.palette.warning[100],
              }),
              ...(color === "success" && {
                color: theme.palette.success[900],
                backgroundColor: theme.palette.success[100],
              }),
            }),
          }),
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            padding: "8px",
            textTransform: "none",
            fontWeight: 500,
            fontSize: theme.typography.pxToRem(14),
            color: theme.palette.grey[700],
            borderRadius: 0,
            "&:hover": {
              backgroundColor: theme.palette.grey[50],
            },
            "&.Mui-selected": {
              color: theme.palette.primary[500],
              borderRadius: 10,
              border: "1px solid",
              borderColor: `${theme.palette.primary[500]} !important`,
              backgroundColor: theme.palette.primary[50],
              "&:hover": {
                backgroundColor: theme.palette.primary[100],
              },
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ArrowDropDownRounded,
        },
        styleOverrides: {
          iconFilled: {
            top: "calc(50% - .25em)",
          },
        },
      },
      MuiTab: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: "#fff",
            "&[href]": {
              textDecorationLine: "none",
            },
          },
          outlined: {
            display: "block",
            borderColor: theme.palette.grey[200],
            "a&, button&": {
              "&:hover": {
                boxShadow: "0px 4px 20px rgba(170, 180, 190, 0.3)",
              },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1, 2),
            borderColor: theme.palette.divider,
          },
          head: {
            color: theme.palette.text.primary,
            fontWeight: 700,
          },
          body: {
            color: theme.palette.text.secondary,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            padding: "5px 9px",
          },
        },
      },
    },
  };
};

export default deepmerge(theme, getThemedComponents(theme));

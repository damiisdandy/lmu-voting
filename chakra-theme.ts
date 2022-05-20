import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const breakpoints = {
  sm: "22rem",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const DEFAULT_FONTS =
  " -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif";
const colors = {
  brand: {
    100: "#8E3B46",
    200: "#E8DAB2",
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: "'Koulen'," + DEFAULT_FONTS,
  body: "'Open Sans'" + DEFAULT_FONTS,
};

export const chakraTheme = extendTheme({
  colors,
  config,
  fonts,
  breakpoints,
});

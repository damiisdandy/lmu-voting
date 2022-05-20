import { AppProps } from "next/app";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { chakraTheme } from "../chakra-theme";
import { GlobalContextProvider } from "../context";
import "../styles.css";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContextProvider>
      <ChakraProvider resetCSS theme={chakraTheme}>
        <ColorModeProvider
          options={{
            initialColorMode: chakraTheme.config.initialColorMode,
            useSystemColorMode: chakraTheme.config.useSystemColorMode,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </GlobalContextProvider>
  );
};

export default CustomApp;

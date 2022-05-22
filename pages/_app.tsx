import { AppProps } from "next/app";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { chakraTheme } from "../chakra-theme";
import { GlobalContextProvider } from "../context";
import config from "../config";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "../styles.css";

const client = new ApolloClient({
  uri: config.apiUrl + "/graphql",
  cache: new InMemoryCache(),
});

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

export default CustomApp;

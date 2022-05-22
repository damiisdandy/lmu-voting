import { AppProps } from "next/app";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { chakraTheme } from "../chakra-theme";
import { GlobalContextProvider } from "../context";
import config from "../config";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import "../styles.css";

const link = createHttpLink({
  uri: config.apiUrl + "/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
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

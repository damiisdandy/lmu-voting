import { css, Global } from "@emotion/react";
import React from "react";
import "@fontsource/open-sans";
import "@fontsource/koulen";

const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    background-color: #e8dab2;
  }

  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    font-family: "Open Sans", -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
  }
`;

type WithDefaultGlobalStylesProps = {
  children: React.ReactNode;
};
const WithDefaultGlobalStyles: React.FC<WithDefaultGlobalStylesProps> = ({
  children,
}) => {
  return (
    <>
      <Global styles={globalStyles} />
      {children}
    </>
  );
};

export default WithDefaultGlobalStyles;

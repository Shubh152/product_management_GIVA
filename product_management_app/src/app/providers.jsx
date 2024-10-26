"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    brand: {
      50: "#AF8F6F", // hover for button // 2
      700: "#AF8F6F", // hover for button // 2
      300: "#74512D", // 3
      200: "#F8F4E1", // 1
      900: "#F8F4E1", // 1
      600: "#543310", //text in button // 4
      500: "#543310", //4 // solid button main
      800: "#74512D", // 3
    },
  },
  fonts: {
    body: "var(--font-mont)",
    banner: "var(--font-noto)",
    play: "var(--font-play)",
  },
});

export function Providers({ children }) {
  return (
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
  );
}

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#F3F4F6",
      },
    }),
  },
});

export default theme;

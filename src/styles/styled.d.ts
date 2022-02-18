import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    bgColor: {
      dark: string;
      black: string;
      light: string;
    };
    textColor: {
      hover: string;
      white: string;
      highlight: string;
    };
  }
}

import { ThemeProvider } from "styled-components";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyled";
import { theme } from "./styles/theme";
import "./styles/App.css"

function App() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router/>
    </ThemeProvider>
  );
}

export default App;

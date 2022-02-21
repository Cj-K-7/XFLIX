import { ThemeProvider } from "styled-components";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyled";
import { theme } from "./styles/theme";
import "./styles/App.css"
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router/>
        <Footer/>
    </ThemeProvider>
  );
}

export default App;

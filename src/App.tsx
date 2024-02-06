import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from './styles/themes/globals';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { CycleContextProvider } from "./contexts/CycleContext";
export const App = () => {


  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )

}


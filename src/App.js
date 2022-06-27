import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import Page from "./components/Page";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Page />
      </div>
    </ThemeProvider>
  );
}

export default App;

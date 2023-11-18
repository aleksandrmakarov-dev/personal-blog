import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import axios from "axios";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    github: PaletteColor;
    google: PaletteColor;
  }
  interface PaletteOptions {
    github?: PaletteColorOptions;
    google?: PaletteColorOptions;
  }
}

// // Extend color prop on components
declare module "@mui/material/Button" {
  export interface ButtonPropsColorOverrides {
    github: true;
    google: true;
  }
}

// default axios config
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

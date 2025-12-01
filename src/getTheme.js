import { createTheme } from "@mui/material/styles";

const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
        secondary: darkMode ? "#b0b0b0" : "#4f4f4f",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              color: darkMode ? "#ffffff" : "#000000",
            },
            "& .MuiInputLabel-root": {
              color: darkMode ? "#b0b0b0" : "#4f4f4f",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: darkMode ? "#b0b0b0" : "#c4c4c4",
              },
              "&:hover fieldset": {
                borderColor: darkMode ? "#ffffff" : "#000000",
              },
              "&.Mui-focused fieldset": {
                borderColor: darkMode ? "#1976d2" : "#1976d2",
              },
            },
          },
        },
      },
    },
  });

export default getTheme;

import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        className: `
          justify-center
          rounded-md
          bg-indigo-600
          text-sm
          font-semibold
          leading-6
          text-white
          shadow-sm
          hover:bg-indigo-500
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-indigo-600
        `
      },
      styleOverrides: {
        contained: {
          textTransform: 'none',
        }
      }
    }
  }
});
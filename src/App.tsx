import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './theme';
import { RouterProvider } from './routes';

function App() {

  return (
    <>
     <CssBaseline />
     <ThemeProvider>
        <RouterProvider />
     </ThemeProvider>
    </>
  )
}

export default App
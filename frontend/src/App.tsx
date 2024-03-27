import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Default from "./pages/default";
import Router from "./Router";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <Router />
    </LocalizationProvider>
  );
}

export default App;

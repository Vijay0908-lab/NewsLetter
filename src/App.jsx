import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NewsProvider } from "./Services/HomeApi";
import Home from "./Pages/Home";
import Applayout from "./Pages/Applayout";
import Weather from "./Pages/Weather";
import EntrTain from "./Pages/EntrTain";
import Sports from "./Pages/Sports";
import Miscellaneous from "./Pages/Miscellaneous";
import PageNotFound from "./Pages/PageNotFound";




function App() {
  return (
    <NewsProvider>
    <BrowserRouter>
      <Routes>
        <Route
          element={
            // <ProtectectedRoute>
            <Applayout />
            // </ProtectectedRoute>
          }
          >
          <Route index element={<Navigate replace to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="weather" element={<Weather />} />
          <Route path="entertainment" element={<EntrTain />} />
          <Route path="sports" element={<Sports />} />
          <Route path="miscellaneous" element={<Miscellaneous />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
   </NewsProvider>
  );
}

export default App;

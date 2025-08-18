import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import { NewsProvider } from "./Services/HomeApi";
import Home from "./Pages/Home";
import Applayout from "./Pages/Applayout";
import Weather from "./Pages/Weather";

import Sports from "./Pages/Sports";
import Top from "./Pages/Top";
import PageNotFound from "./Pages/PageNotFound";
import Social from "./Pages/Social";




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
          <Route path="/weather" element={<Weather />} />
          <Route path="/top" element={<Top />} />
          <Route path="/social" element={<Social />} />
          <Route path="/sports" element={<Sports />} />
          
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
   </NewsProvider>
  );
}

export default App;

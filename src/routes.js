import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import DefaultLayout from './layouts/default'
import Home from "./pages/Home";
import Events from "./pages/Events";
import Faqs from "./pages/Faqs";
import Sponsors from "./pages/Sponsors";
import LoginPage from "./pages/auth/login";
import SignUpPage from "./pages/auth/signup";

/** Pass in the page component and get the page back with its layout. */
function getPage(PageComponent) {
  const getLayout = PageComponent.getLayout ?? (page => <DefaultLayout>{page}</DefaultLayout>)
  return getLayout(<PageComponent />)
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={getPage(Home)} />
        <Route exact path="/events" element={getPage(Events)} />
        <Route exact path="/faqs" element={getPage(Faqs)} />
        <Route exact path="/sponsors" element={getPage(Sponsors)} />
        <Route exact path="/auth/login" element={getPage(LoginPage)} />
        <Route exact path="/auth/signup" element={getPage(SignUpPage)} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

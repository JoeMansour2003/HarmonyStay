import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Features } from "./components/features";
import { Book } from "./components/book";
import { Gallery } from "./components/gallery";
import { Services } from "./components/services";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import { MainLayout } from "./components/Mainlayout";
import Admin  from "./components/admin";
import LoginPage from "./components/login";
import JsonData from "./data/data.json";
import "./App.css";

// const ScrollToElement = () => {
//   const { state } = useLocation();
//   useEffect(() => {
//     if (state?.scrollTo) {
//       const element = document.getElementById(state.scrollTo);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [state]);
//   return null;
// };

// const App = () => {
//   const [landingPageData, setLandingPageData] = useState({});
//   useEffect(() => {
//     setLandingPageData(JsonData);
//   }, []);

//   return (
//     <Router>
//       <Navigation />
//       <ScrollToElement /> 
//       <Routes>
//         <Route path="/" element={
//           <React.Fragment>
//             <Header data={landingPageData.Header} />
//             <About data={landingPageData.About} />
//             <Features data={landingPageData.Features} />
//             <Book data={landingPageData.Book} />
//             <Gallery data={landingPageData.Gallery} />
//             <Services data={landingPageData.Services} />
//             <Testimonials data={landingPageData.Testimonials} />
//             <Team data={landingPageData.Team} />
//             <Contact data={landingPageData.Contact} />
//           </React.Fragment>
//         } />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/admin" element={<Admin />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Wrap the main content in MainLayout */}
        <Route path="/" element={<MainLayout><HomePage data={landingPageData} /></MainLayout>} />
        <Route path="/login" element={<LoginPage />} />
        {/* Admin route, not wrapped in MainLayout */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

// Helper component for the homepage content
const HomePage = ({ data }) => (
  <React.Fragment>
    <Header data={data.Header} />
    <About data={data.About} />
    <Features data={data.Features} />
    <Book data={data.Book} />
    <Gallery data={data.Gallery} />
    <Services data={data.Services} />
    <Testimonials data={data.Testimonials} />
    <Team data={data.Team} />
    <Contact data={data.Contact} />
  </React.Fragment>
);

export default App;
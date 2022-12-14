import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Service from "../components/Sections/Service";
import Doctors from "../components/Sections/Doctors";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer";

export default function Landing() {
  return (
    <>
      {/* Header / Navigation */}
      {/* If auth=true the landing page navigation menu is hidden */}
      <TopNavbar auth={false} />

      {/* Landing page sections */}
      <Header />
      <Service />
      <Doctors />
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}

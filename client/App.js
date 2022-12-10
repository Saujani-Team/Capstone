import React from "react";

import TheNavbar from "./components/Navbar";
import Routes from "./Routes";
import Footer from "./components/Footer";

// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <TheNavbar />
      <div className="routes-background">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;

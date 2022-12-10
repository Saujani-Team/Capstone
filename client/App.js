import React from "react";

import TheNavbar from "./components/Navbar";
import Routes from "./Routes";

// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <TheNavbar />
      <div className="routes-background">
        <Routes />
      </div>
    </div>
  );
};

export default App;

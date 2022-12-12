import React from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

class HowTo extends React.Component {
  render() {
    return (
      <Container>
        <div className="home-text">
          <Row>
            <h3>
              <img src={"/WelcomeToDYFO.png"} height={40} />
            </h3>
          </Row>
          <Row>
            <h3>
              To get started{" "}
              <Link to="/login">
                <img src={"/Login.png"} height={32} />
              </Link>
              {", "}
              <Link to="/signup">
                <img src={"/Sign Up.png"} height={33} />
              </Link>{" "}
              or click on{" "}
              <Link to="/draw">
                <img src={"/Draw.png"} height={25} />
              </Link>{" "}
              to continue as a Guest!
            </h3>
          </Row>
          <Row>
            <h2>How to DYFO!</h2>
            <p>Click on Draw and Start Drawing to open your canvas. </p>
          </Row>
          <Row>
            <h3>Invite Others!</h3>
            <p>
              Click on Draw and Generate Link 🖇️ and send the link to your
              collaborators.
            </p>
          </Row>
        </div>
      </Container>
    );
  }
}

export default HowTo;

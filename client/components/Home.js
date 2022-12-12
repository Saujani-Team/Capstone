import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export const Home = (props) => {
  const { firstName } = props;
  const { isLoggedIn } = props;

  return (
    <Container>
      {isLoggedIn ? (
        <div className="home-text">
          <Row>
            <h3>
              <img className="font-welcome" src={"/Welcome.png"} height={35} />{" "}
              {firstName}!
            </h3>
          </Row>
          <h5>
            To get started, click on{" "}
            <Link to="/draw">
              <img className="font-draw" src={"/Draw.png"} height={20} />
            </Link>{" "}
            visit,{" "}
            <Link to="/users/:userId">
              <img src={"/My Profile.png"} height={20} />
            </Link>{" "}
            or check out the{" "}
            <Link to="/howto">
              <img className="font-howto" src={"/How To.png"} height={20} />
            </Link>{" "}
            page.
          </h5>
        </div>
      ) : (
        <div className="home-text">
          <Row>
            <h3>
              <img src={"/WelcomeToDYFO.png"} height={35} />
            </h3>
          </Row>
          <Row>
            <h5>
              To get started{" "}
              <Link to="/login">
                <img src={"/Login.png"} height={22} />
              </Link>
              {", "}
              <Link to="/signup">
                <img src={"/Sign Up.png"} height={23} />
              </Link>{" "}
              or click on{" "}
              <Link to="/draw">
                <img className="font-draw" src={"/Draw.png"} height={23} />
              </Link>{" "}
              to continue as a Guest!
            </h5>
          </Row>
        </div>
      )}
      <Carousel className="carousel" variant="dark">
        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (9).png"
            height={300}
          />
          <Carousel.Caption>
            <h3>Water Cycle</h3>
            <p>Created by: Ms. Yondo's Class</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (6).png"
            height={300}
          />
          <Carousel.Caption>
            <h3>Beach</h3>
            <p>Created by: Ms. Qiu's Class</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (4).png"
            height={300}
          />
          <Carousel.Caption>
            <h3>Freestyle</h3>
            <p>Created by: Jett Bye and his Dad</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-inline p-2" src="/my-drawing_3.png" height={300} />
          <Carousel.Caption>
            <h3>Dancing on a Volcano</h3>
            <p>Created by: Allie Wang and Friends</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-inline p-2" src="/my-drawing.png" height={300} />
          <Carousel.Caption>
            <h3>Draw Your Face</h3>
            <p>Created by: Ilana Bye</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (7).png"
            height={300}
          />
          <Carousel.Caption>
            <h3>Happy Family</h3>
            <p>Created by: The Coopster Family</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-inline p-2" src="/siyun_image.png" height={300} />
          <Carousel.Caption>
            <h3>Hoppy Bunny</h3>
            <p>Created by: Siyun</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (10).png"
            height={300}
          />
          <Carousel.Caption>
            <h3>Flower</h3>
            <p>Created by: Science Class</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (10).png"
            height={300}
          />
          <Carousel.Caption>
            <h3>Flower</h3>
            <p>Created by: Science Class</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (8).png"
            height={300}
          />
          <Carousel.Caption>
            <h3>Abstract Shapes</h3>
            <p>Created by: Art Club</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    firstName: state.auth.firstName,
    auth: state.auth,
  };
};

export default connect(mapState)(Home);

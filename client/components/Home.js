import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

export const Home = (props) => {
  const { firstName } = props;
  const { isLoggedIn } = props;

  return (
    <div>
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
      {isLoggedIn ? (
        <div className="home-text">
          <h3>
            <img src={"/Welcome.png"} height={40} /> {firstName}!
          </h3>
          <h2>How to Use Draw Your Face Off!</h2>
          <p>
            Click Draw and Start Drawing to open your canvas and start drawing.{" "}
          </p>
          <h3>Invite Others!</h3>
          <p>
            Click on Draw and Generate Link 🖇️ and send the link to your
            collaborators.
          </p>
          <h3>Save Drawings!</h3>
          <p>Click Save Drawing to have your drawing saved to your Profile.</p>
          <h3>My Profile!</h3>
          <p>
            On this page, you'll see your information and your saved drawings
            displayed. You can choose a drawing to edit and continue working.
            You can download your drawing or copy it to the clipboard to share
            your drawings with others. If you want to remove a drawing from your
            profile, you can delete.
          </p>
        </div>
      ) : (
        <div className="home-text">
          <img src={"/WelcomeToDYFO.png"} height={40} />
          <h3>
            You can get started by <Link to="/login">Logging in,</Link>{" "}
            <Link to="/signup">Signing Up,</Link> or start{" "}
            <Link to="/draw">Drawing</Link> as a Guest!
          </h3>
          <h2>How to Use Draw Your Face Off!</h2>
          <p>Click on Draw and Start Drawing to open your canvas. </p>
          <h3>Invite Others!</h3>
          <p>
            Click on Draw and Generate Link 🖇️ and send the link to your
            collaborators.
          </p>
        </div>
      )}
    </div>
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

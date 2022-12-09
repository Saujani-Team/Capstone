import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

export const Home = (props) => {
  const { username } = props;
  const { isLoggedIn } = props;

  return (
    <div>
      <Carousel className="carousel" variant="dark">
        <Carousel.Item>
          <img className="d-inline p-2" src="/my-drawing.png" height={200} />
          <Carousel.Caption>
            <h3>Drawing #1</h3>
            <p>Created by: Ilana Bye</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (2).png"
            height={200}
          />
          <Carousel.Caption>
            <h3>Drawing #2</h3>
            <p>Created by: Ms. Lynn's Class</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (4).png"
            height={200}
          />
          <Carousel.Caption>
            <h3>Drawing #3</h3>
            <p>Created by: Jett Bye</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-inline p-2" src="/my-drawing.png" height={200} />
          <Carousel.Caption>
            <h3>Drawing #1</h3>
            <p>Created by: Ilana Bye</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (2).png"
            height={200}
          />
          <Carousel.Caption>
            <h3>Drawing #2</h3>
            <p>Created by: Ms. Lynn's Class</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline p-2"
            src="/my-drawing (4).png"
            height={200}
          />
          <Carousel.Caption>
            <h3>Drawing #3</h3>
            <p>Created by: Jett Bye</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {isLoggedIn ? (
        <div>
          <h3>Welcome, {username}!</h3>
          <h2>How to Use Draw Your Face Off!</h2>
          <h3>Start a Drawing!</h3>
          <p>Click Draw and Start Drawing to open your canvas. </p>
          <h3>Invite Others!</h3>
          <p>Click Generate Link 🖇️ and send the link to your collaborators.</p>
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
        <div>
          <h1>Welcome to DYFO!</h1>
          <h2>How to Use Draw Your Face Off!</h2>
          <h3>
            You can <Link to="/login">Login,</Link>{" "}
            <Link to="/signup">Sign Up,</Link> or start{" "}
            <Link to="/draw">Drawing</Link> as a Guest!
          </h3>
          <p>Click Start Drawing to open your canvas. </p>
          <h3>Invite Others!</h3>
          <p>Click Generate Link 🖇️ and send the link to your collaborators.</p>
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
    username: state.auth.username,
    auth: state.auth,
  };
};

export default connect(mapState)(Home);

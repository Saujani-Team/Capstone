import React from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

class HowTo extends React.Component {
  render() {
    return (
      <Container>
        <div className="home-text">
          <h3>
            <img src={"/How to DYFO.png"} height={30} />
          </h3>

          <img src={"/Invite Others.png"} height={20} />

          <p>
            Click Generate Link 🖇️ and share the link to your collaborators.
            <div>
              <img src={"/Draw Page Tools.png"} height={100} width={500} />
            </div>
          </p>
          <p>
            From <img src={"/My Profile.png"} height={20} /> you can view your
            information, saved drawings, and groups. Easily edit, download,
            copy, or delete any drawing.
            <div>
              <img src={"/My Profile Page.png"} height={250} width={400} />
            </div>
          </p>
          <p>
            Leaders can create groups! Share the link and allow for participants
            to collaborate together. Monitor progress of all groups instandly by
            clicking Refresh Group Images.
            <div>
              <img src={"/My Groups Display.png"} height={180} width={300} />
            </div>
          </p>

          {/* </Row> */}
        </div>
      </Container>
    );
  }
}

export default HowTo;

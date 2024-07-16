import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleIcon from "./SimpleIcon";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function Quantum() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12">
      <div className="col-span-3 col-start-2 p-8 text-center">
        <h1 className="project-title">
          <b>Quantum</b>
          <a
            className="ml-4 text-blue-400"
            href="https://quantum-trivia.online/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </a>
          <br />
          An multiplayer Trivia Game
        </h1>
        <h2 className="project-description">
          This is a SOCIAL trivia game!
          <br />
          <br />
          Ask each other Question cards. The Answer is on the opposite face of
          the card.
          <br />
          <br />
          The cards you see in your hand contain the only Answers. The Question
          itself is hidden, until you ask the Quantum Card.
          <br />
          <br />
          Cards have a Quantum quality, they are either Zeros or Ones. Get rid
          of your Zeros by asking them.
          <br />
          <br />
          When someone is wrong, they lose a One card to you. A full hand of
          Ones wins !
        </h2>
        <div className="center text-md flex pt-4 sm:pt-16">
          <SimpleIcon
            href={"https://socket.io/"}
            alt={"Socket IO"}
            src={"../../public/socketio.png"}
          />
          <SimpleIcon
            href={"https://www.mongodb.com/"}
            alt={"Mongo DB"}
            src={"../../public/mongodb.svg"}
          />
          <SimpleIcon
            href={"https://react.dev/"}
            alt={"React"}
            src={"../../public/react.webp"}
          />
          <SimpleIcon
            href={"https://nodejs.org/en"}
            alt={"Node JS"}
            src={"../../public/node.png"}
          />
        </div>
      </div>
      <div className="flip-col col-span-1 col-start-6">
        <div className="quantum-card">
          <div className="flip-card-front">
            <p className="quantum-text">How many eyes does a bee have?</p>
          </div>
          <div className="flip-card-back">
            <p className="quantum-head">O</p>
            <p className="quantum-text">5</p>
          </div>
        </div>
      </div>
      <div className="center col-span-2 col-start-9 mb-8 flex">
        <iframe
          className="quantum-video w-4/5 sm:w-full md:w-1/3 lg:w-full"
          title="Quantum"
          src="../../public/Quantum Demo.mp4"
        />
      </div>
    </div>
  );
}

export default Quantum;

import SimpleIcon from "./SimpleIcon";

function Quantum() {
  return (
    <div className="grid grid-cols-12">
      <div className="flip-col col-span-1 col-start-2">
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
      <div className="col-span-2 col-start-5">
        <iframe
          className="quantum-video h-full"
          title="Quantum"
          src="../../public/Quantum Demo.mp4"
        />
      </div>
      <div className="col-span-3 col-start-9 p-8 text-center">
        <h1 className="project-title">
          <b>Quantum</b>
          <br />
          An multiplayer online Trivia Game
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
        <div className="center text-md flex pt-16">
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
    </div>
  );
}

export default Quantum;

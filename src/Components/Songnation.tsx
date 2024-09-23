import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleIcon from "./SimpleIcon";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "./Projects";

function Songnation() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12">
      <div className="col-span-3 col-start-2 p-8 text-center">
        <h1 className="project-title">
          <b>Songnation</b>
          <a
            className="ml-4 text-blue-400"
            href="https://quantum-trivia.online/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </a>
          <br />A vote-based 24/7 playlist!
        </h1>
        <h2 className="project-description">
          SongNation is a music project to allow a fresh kind of collaborative
          and democratic playlist.
          <br />
          <br />
          Vote on which track will be next, live! Just like in an election, each
          user gets a vote to effect the results of the upcoming song.
          <br />
          <br />
          Enjoy!
        </h2>

        <div className="center text-md flex pt-4 sm:pt-16">
          <SimpleIcon
            href={"https://vitejs.dev/"}
            alt={"Vite"}
            src={`${baseUrl}/vite.svg`}
          />
          <SimpleIcon
            href={"https://www.mongodb.com/"}
            alt={"Mongo DB"}
            src={`${baseUrl}/mongodb.svg`}
          />
          <SimpleIcon
            href={"https://react.dev/"}
            alt={"React"}
            src={`${baseUrl}/react.webp`}
          />
          <SimpleIcon
            href={"https://nodejs.org/en"}
            alt={"Node JS"}
            src={`${baseUrl}/node.png`}
          />
        </div>
      </div>
      <div className="center col-span-5 col-start-5 m-auto mb-8 flex aspect-square w-2/3 overflow-hidden rounded-3xl sm:w-1/2 md:mb-12 lg:mb-auto lg:w-2/3">
        <img src={`${baseUrl}/songnation_cropped.png`} alt="songnation" />
      </div>
      <div className="center col-span-2 col-start-10 mb-8 flex">
        <video
          className="screencast-video w-4/5 sm:w-full md:w-1/3 lg:w-full"
          title="Songnation"
          src={`${baseUrl}/SongNation Demo.mp4`}
          autoPlay
          loop
          muted
          controls
        />
      </div>
    </div>
  );
}

export default Songnation;

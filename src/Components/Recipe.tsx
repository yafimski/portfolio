import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleIcon from "./SimpleIcon";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "./Projects";

function Recipe() {
  return (
    <div className="center flex flex-col lg:grid lg:grid-cols-12">
      <div className="col-span-4 col-start-2 p-8 text-center">
        <h1 className="project-title">
          <b>a4recipe</b>
          <a
            className="ml-4 text-blue-400"
            href="https://yafimski.github.io/a4recipe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </a>
          <br />A visual recipe maker
        </h1>
        <h2 className="project-description">
          My amazing wife works as a pastry chef in a great place in Tel Aviv.
          From time to time she tells me about a funny story where "someone" at
          work would put 1kg of sugar in the recipe instead of 100g.
          <br />
          <br />
          <span className="text-xs">
            <p className="me">
              Me: "How is it possible to miss by x10..? Don't you do it every
              day..?"
            </p>
            <p className="her">
              Her: "Yeah but we make a lot of things and it's rare, but it
              happens.."
            </p>
            <p className="me">
              Me: "Ok but I mean.. it's not obvious when the recipe is wrong..?"
            </p>
            <p className="her">
              Her: "It should be.. we write it all down in tables.."{" "}
            </p>
            <p className="me">Me: "Then where do the mistakes come from?"</p>
            <p className="her">
              Her: "Well, the tables are excel and they are packed with
              information so there is a risk of reading the wrong line..."
            </p>
          </span>
          <br /> So I thought.. well, how can I make sure that every time you
          get the right amounts? This quickly became a 3-week experiment with{" "}
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://platform.openai.com/docs/api-reference/chat"
            className="inline-link"
          >
            ChatGpt-4o
          </a>{" "}
          for some amazing mouth-salivating image generation.
        </h2>
        <div className="center text-md flex pt-4 sm:pt-16">
          <SimpleIcon
            href={"https://react.dev/"}
            alt={"React"}
            src={`${baseUrl}/react.webp`}
          />
          <SimpleIcon
            href={"https://vitejs.dev/"}
            alt={"Vite"}
            src={`${baseUrl}/vite.svg`}
          />
          <SimpleIcon
            href={"https://redux.js.org/"}
            alt={"Redux"}
            src={`${baseUrl}/redux.png`}
          />
          <SimpleIcon
            href={"https://tailwindcss.com/"}
            alt={"Tailwind CSS"}
            src={`${baseUrl}/tailwind.png`}
          />
          <SimpleIcon
            href={"https://vitest.dev/"}
            alt={"Vitest"}
            src={`${baseUrl}/vitest.png`}
          />
        </div>
      </div>
      <div className="center col-span-6 col-start-7 mb-8 flex aspect-square w-2/3 overflow-hidden rounded-3xl sm:w-1/2 md:mb-12 lg:mb-0 lg:w-2/3">
        <img src={`${baseUrl}/a4recipe.gif`} alt="a4recipe" />
      </div>
    </div>
  );
}

export default Recipe;

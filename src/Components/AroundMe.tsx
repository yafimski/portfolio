import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleIcon from "./SimpleIcon";

const images = [
  "../../public/aroundme_1.png",
  "../../public/aroundme_2.png",
  "../../public/aroundme_3.png",
];

function AroundMe() {
  return (
    <div className="m-0 flex flex-col-reverse lg:grid lg:grid-cols-12 lg:flex-col">
      <div className="center col-span-2 col-start-2 flex md:m-auto md:mb-16 md:w-1/3 lg:m-0 lg:w-full">
        <img
          className="sm:rounded-xl"
          src={"../../public/aroundme_appscreen.png"}
          alt={"around me app"}
        />
      </div>
      <div className="center relative col-span-5 col-start-4 m-auto overflow-hidden border-0">
        <div className="mx-auto max-w-6xl px-6">
          <div className="hidden sm:flex md:my-16 [&>div:hover]:w-[30rem] [&>hover:div]:w-16">
            {images.map((img) => (
              <div key={img} className="img-group">
                <img className="h-full object-cover" src={img} alt={img} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-3 col-start-9 p-8 text-center">
        <h1 className="project-title mb-0">
          <b>Around Me</b>{" "}
          <a
            className="ml-4 text-blue-400"
            href="https://play.google.com/store/apps/details?id=com.yafimski.aroundme&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </a>
          <br />
          AI Travel app on Google Play
        </h1>
        <div className="center my-3 flex">
          <img
            className="w-24"
            src={"../../public/aroundme_icon.png"}
            alt={"around me app"}
          />
        </div>
        <h2 className="project-description">
          Ready to discover the world in a whole new way?
          <br />
          Meet Around Me – your personal AI audio travel tour guide!
          <br />
          <br />
          The app shows you nearby locations and allows you to listen on
          on-demand genrated AI voice tour guide to expand your knowledge as a
          tourist/traveller.
          <br />
          <br />
          The app started out as an idea while travelling on our honeymoon, to
          query nearby places without going to google or wikipedia.
          <br />
          <br />
          This became a 3-month project where I built an end-to-end app, backend
          and frontend with integration of Google Places and OpenAI APIs.
        </h2>
        <div className="center text-md flex pt-4 sm:pt-16">
          <SimpleIcon
            href={"https://reactnative.dev/"}
            alt={"React Native"}
            src={"../../public/react_native.png"}
          />
          <SimpleIcon
            href={"https://openai.com/"}
            alt={"OpenAI"}
            src={"../../public/openai.webp"}
          />
          <SimpleIcon
            href={"https://supabase.com/"}
            alt={"Supabase"}
            src={"../../public/supabase.png"}
          />
          <SimpleIcon
            href={
              "https://play.google.com/store/apps/details?id=com.yafimski.aroundme&hl=en"
            }
            alt={"Google Play"}
            src={"../../public/google_play.png"}
          />
        </div>
      </div>
    </div>
  );
}

export default AroundMe;

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Social from "./Components/Social";
import "./index.css";
import Quote from "./Components/Quote";
import Head from "./Components/Head";
import Projects from "./Components/Projects";
import Romeo from "./Components/Romeo";
import Recipe from "./Components/Recipe";
import AroundMe from "./Components/AroundMe";
import Quantum from "./Components/Quantum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Cred from "./Components/Cred";

function App() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-auto bg-black">
      <div className="center flex flex-col">
        <section className="center mb-24 flex flex-col">
          <Head />
          <Projects />
          <Quote />
          <footer className="center absolute top-0 m-8">
            <Social
              link="https://www.linkedin.com/in/yafimsimanovsky/"
              icon={faLinkedin}
            />
            <Social
              link="https://github.com/yafimski/a4recipe"
              icon={faGithub}
            />
          </footer>
        </section>
        <section id="recipe" className="center section-white">
          <Recipe />
        </section>
        <section id="aroundme" className="center section-black">
          <AroundMe />
        </section>
        <section id="quantum" className="center section-white">
          <Quantum />
        </section>
        <section id="romeo" className="center section-black">
          <Romeo />
        </section>
        <section className="center flex w-full bg-neutral-50 sm:h-[5rem]">
          <Cred />
        </section>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faChevronUp}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-0 right-0 m-4 aspect-square cursor-pointer rounded-full bg-neutral-50 p-2 text-xl text-black hover:bg-neutral-950 hover:text-white"
        />
      </div>
    </div>
  );
}

export default App;

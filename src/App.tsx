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

function App() {
  return (
    <div className="flex min-h-screen items-start justify-center overflow-auto bg-black">
      <div className="center flex flex-col">
        <section className="center flex flex-col pb-8">
          <Head />
          <Projects />
          <Quote />
          <header className="center flex pt-16">
            <Social
              link="https://www.linkedin.com/in/yafimsimanovsky/"
              icon={faLinkedin}
            />
            <Social
              link="https://github.com/yafimski/a4recipe"
              icon={faGithub}
            />
          </header>
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
      </div>
    </div>
  );
}

export default App;

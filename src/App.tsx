import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Social from "./Components/Social";
import "./index.css";
import Quote from "./Components/Quote";
import Head from "./Components/Head";
import Projects from "./Components/Projects";

function App() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-black overflow-auto">
      <div className="flex flex-col center">
        <header className="w-screen p-4 text-left fixed top-0">
          <Social link="https://www.linkedin.com/in/yafimsimanovsky/" icon={faLinkedin} />
          <Social link="https://github.com/yafimski/a4recipe" icon={faGithub} />
        </header>
        <Head />
        <Projects />
        <Quote />
      </div>
    </div>
  );
}

export default App;

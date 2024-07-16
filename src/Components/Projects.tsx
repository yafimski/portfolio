export const baseUrl =
  process.env.NODE_ENV === "production" ? "/portfolio/" : "";

function Projects() {
  const goToProject = (project: string) => {
    const yPos = document.getElementById(project)?.getBoundingClientRect().y;
    if (yPos) {
      window.scrollTo({ top: yPos - 50, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="projects relative">
        <ul className="projects-grid">
          <div
            className="project-box"
            onKeyDown={() => {}}
            onClick={() => goToProject("recipe")}
          >
            a4recipe
          </div>
          <div
            className="project-box"
            onKeyDown={() => {}}
            onClick={() => goToProject("aroundme")}
          >
            Around
            <br />
            Me
          </div>
          <div
            className="project-box"
            onKeyDown={() => {}}
            onClick={() => goToProject("quantum")}
          >
            Quantum
          </div>
          <div
            className="project-box"
            onKeyDown={() => {}}
            onClick={() => goToProject("romeo")}
          >
            Romeo
          </div>
        </ul>
      </div>
    </>
  );
}

export default Projects;

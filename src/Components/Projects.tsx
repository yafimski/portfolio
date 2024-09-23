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
            onClick={() => goToProject("a4recipe")}
          >
            <img
              className="project-box-img"
              src="a4recipe_box.webp"
              alt="a4recipe"
            />
          </div>
          <div
            className="project-box"
            onKeyDown={() => {}}
            onClick={() => goToProject("aroundme")}
          >
            <img
              className="project-box-img"
              src="aroundme_box.webp"
              alt="around me"
            />
          </div>
          <div
            className="project-box"
            onKeyDown={() => {}}
            onClick={() => goToProject("quantum")}
          >
            <img
              className="project-box-img"
              src="quantum_box.webp"
              alt="quantum"
            />
          </div>
          <div
            className="project-box"
            onKeyDown={() => {}}
            onClick={() => goToProject("romeo")}
          >
            <img className="project-box-img" src="romeo_box.webp" alt="romeo" />
          </div>
          <div
            className="project-box"
            onKeyDown={() => {}}
            onClick={() => goToProject("songnation")}
          >
            <img
              className="project-box-img"
              src="songnation_box.webp"
              alt="songnation"
            />
          </div>
        </ul>
      </div>
    </>
  );
}

export default Projects;

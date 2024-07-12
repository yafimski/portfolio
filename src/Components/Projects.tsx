import { useState } from "react";

function Projects() {
  const [currProject, setCurrProject] = useState<number>(0);

  return (
    <div className="projects">
      <ul className="grid grid-cols-4 gap-16 mb-36">
        <div
          className="project-box"
          onKeyDown={() => {
            return;
          }}
          onClick={() => setCurrProject(1)}
        >
          {currProject === 1 && <div className="project-content">Content</div>}
        </div>
        <div className="project-box">{""}</div>
        <div className="project-box">{""}</div>
        <div className="project-box">{""}</div>
      </ul>
    </div>
  );
}

export default Projects;

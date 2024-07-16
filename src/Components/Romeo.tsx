import SimpleIcon from "./SimpleIcon";

function Romeo() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 col-start-2 p-8 text-center">
        <h1 className="project-title">
          <b>Romeo</b>
          <br />
          An online 3D viewer & editor
        </h1>
        <p className="project-description">
          The concept was to create a platform where Construction & 3D
          professionals could upload an asset and not just view it, but also to
          edit/add meaningful metadata to the 3D scene or the object Mesh
          itself. The original idea was inspired by the{" "}
          <a
            href="https://github.com/paireks/dotbim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            .bim format
          </a>
          , which urged a more open approach to metadata in 3D environments.
        </p>
        <div className="center text-md flex pt-16">
          <SimpleIcon
            href={"https://react.dev/"}
            alt={"React"}
            src={"../../public/react.webp"}
          />
          <SimpleIcon
            href={"https://threejs.org/"}
            alt={"Three JS"}
            src={"../../public/threeJS.png"}
          />
          <SimpleIcon
            href={"https://www.youtube.com/watch?v=xvFZjo5PgG0"}
            alt={"IFC.js"}
            src={"../../public/ifcJS.png"}
          />
          <SimpleIcon
            href={"https://firebase.google.com/"}
            alt={"Google Firebase"}
            src={"../../public/firebase.png"}
          />
        </div>
      </div>
      <div className="center relative col-span-5 col-start-7 aspect-video overflow-hidden border-0">
        <iframe
          className="romeo-video h-full"
          title="Romeo"
          src="../../public/MVP for Three.js IFC Viewer.mp4"
        />
      </div>
    </div>
  );
}

export default Romeo;

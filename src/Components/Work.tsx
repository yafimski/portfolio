function Work() {
  return (
    <div className="center flex">
      <h1 className="text-intro center inter mr-16 italic">
        I previously worked at
      </h1>
      <div className="relative mr-16 max-w-24">
        <a href="https://view.com/" target="_blank" rel="noopener noreferrer">
          <img src="../../public/view_inc.png" alt="View Inc." />
        </a>
      </div>
      <div className="relative max-w-36">
        <a
          href="https://www.beamup.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../../public/beamup.png" alt="BeamUp" />
        </a>
      </div>
    </div>
  );
}

export default Work;

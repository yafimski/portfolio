import { baseUrl } from "./Projects";

function Cred() {
  return (
    <div className="center flex justify-between pb-8 sm:pb-0">
      <div className="cred-cols">
        <h1 className="cred-title">I previously worked at</h1>
        <div className="cred-logos">
          <a
            href="https://view.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="cred-img"
          >
            <img src={`${baseUrl}/view_inc.png`} alt="View Inc." />
          </a>
          <a
            href="https://www.beamup.ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`${baseUrl}/beamup.png`} alt="BeamUp" />
          </a>
        </div>
      </div>
      <div className="cred-cols sm:ml-36">
        <h1 className="cred-title">I graduated with honors from</h1>
        <div className="cred-logos">
          <a
            href="https://www.tudelft.nl/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="cred-img"
          >
            <img src={`${baseUrl}/tu_delft.png`} alt="TU Delft, NL" />
          </a>
          <a
            href="https://www.polimi.it/il-politecnico/chi-siamo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="polimi.png" alt="Politecnico di Milano" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cred;

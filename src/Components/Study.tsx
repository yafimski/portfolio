function Study() {
  return (
    <div className="center flex">
      <h1 className="text-intro center inter mr-16 italic">
        I graduated with honors from
      </h1>
      <div className="relative mr-16 max-w-24">
        <a
          href="https://www.tudelft.nl/en/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../../public/tu_delft.png" alt="TU Delft, NL" />
        </a>
      </div>
      <div className="relative max-w-36">
        <a
          href="https://www.polimi.it/il-politecnico/chi-siamo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="polimi.png" alt="Politecnico di Milano" />
        </a>
      </div>
    </div>
  );
}

export default Study;

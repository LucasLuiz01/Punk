import { Header } from "../../components/Header/Header";
import { useState, useEffect } from "react";
import "./home.css";
import ReactPaginate from "react-paginate";
import Beerinformation from "../../components/BeerInformations/BeerInformations";
function Home() {
  const [beers, setBeers] = useState([]); // Array de cervejas
  const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
  const [searchTermRef, setSearchTermRef] = useState(""); // Comparar termo de pesquisa
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [numberOfPages, setnumberOfPages] = useState(1); // numero de paginas
  const [timeoutId, setTimeoutId] = useState(null); // Para setar o timeout caso digite outra letra em menos de 1 segundo para busca
  const [selectedBeer, setSelectedBeer] = useState(null); // Cerveja selecionada para exibir no modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura/fechamento do modal
  const beersPerPage = 10; // Número de cervejas por página
  useEffect(() => {
    if (searchTerm) {
      clearTimeout(timeoutId);
      const newtimeoutId = setTimeout(fetchBeers, 1000);
      setTimeoutId(newtimeoutId);
    } else {
      fetchBeers();
    }
  }, [searchTerm, currentPage]);
  const handlePageClick = (page) => {
    setCurrentPage(page.selected + 1); // Atualizar a página atual
  };
  const openModal = (beer) => {
    setSelectedBeer(beer);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedBeer(null);
    setIsModalOpen(false);
  };
  const fetchBeers = () => {
    if (searchTerm !== searchTermRef) {
      setSearchTermRef(searchTerm);
      setCurrentPage(1);
      let cicloDeVida = 1;
      setnumberOfPages(cicloDeVida);
    }
    const apiUrl = searchTerm
      ? `https://api.punkapi.com/v2/beers?per_page=${beersPerPage}&page=${currentPage}&beer_name=${searchTerm}`
      : `https://api.punkapi.com/v2/beers?per_page=${beersPerPage}&page=${currentPage}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBeers(data);
        if (data.length == 10 && numberOfPages === currentPage) {
          let numberOfPage = numberOfPages + 1;
          setnumberOfPages(numberOfPage);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search beers by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="beer-list">
        {beers.map((beer) => (
          <div key={beer.id} className="beer-item">
            <img src={beer.image_url} alt={beer.name} className="beer-image" />
            <div className="beer-info">
              <h3 className="beer-name">{beer.name}</h3>
              <p className="beer-description">{beer.description}</p>
            </div>
            <button
              className="more-info-button"
              onClick={() => openModal(beer)}
            >
              More Information
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <ul>
          <ReactPaginate
            pageCount={numberOfPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            previousLabel={"< previous"}
            nextLabel={"next >"}
            breakLabel={"..."}
            onPageChange={handlePageClick}
            containerClassName={"pagination-container"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            activeClassName={"active"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            forcePage={currentPage - 1}
          />
        </ul>
      </div>
      {isModalOpen && (
        <Beerinformation beer={selectedBeer} onClose={closeModal} />
      )}
    </>
  );
}

export { Home };

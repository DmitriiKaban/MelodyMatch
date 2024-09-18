import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Gigs.scss";
import { GigCard } from "../../components";
import { gigs } from "../../data";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSubmittedSearchTerm(searchParams.get("search") || "");
  }, [location.search]);

  const genre = new URLSearchParams(location.search).get("genre") || "";

  const breadcrumbs = genre
    ? `TUNIFY > ${genre.toUpperCase()}`
    : `TUNIFY > ${
        submittedSearchTerm.charAt(0).toUpperCase() +
        submittedSearchTerm.slice(1)
      }`;

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch =
      (gig.genre &&
        gig.genre.toLowerCase().includes(submittedSearchTerm.toLowerCase())) ||
      (gig.desc &&
        gig.desc.toLowerCase().includes(submittedSearchTerm.toLowerCase())) ||
      (gig.username &&
        gig.username.toLowerCase().includes(submittedSearchTerm.toLowerCase()));

    const matchesGenre =
      genre === "all" ||
      genre === "" ||
      (gig.genre && gig.genre.toLowerCase() === genre);

    return matchesGenre && matchesSearch;
  });

  const handleSearch = () => {
    setSubmittedSearchTerm(searchTerm);
    navigate(`?search=${encodeURIComponent(searchTerm)}`);
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">{breadcrumbs}</span>
        <h1>
          {submittedSearchTerm
            ? submittedSearchTerm.charAt(0).toUpperCase() +
              submittedSearchTerm.slice(1)
            : "Artists"}
        </h1>
        <p>
          Explore the boundaries of{" "}
          {submittedSearchTerm.toLowerCase() || "your chosen genre"} with our
          talented artists
        </p>

        <div className="menu">
          <div className="left">
            <input
              type="text"
              placeholder="Search again"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <span>Budget</span>
            <input type="number" placeholder="min" />
            <input type="number" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? " Best Selling" : "Newest"}
            </span>
            <img
              src="/img/icons/Down_Arrow_3_.png"
              alt=""
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {filteredGigs.length > 0 ? (
            filteredGigs.map((gig) => <GigCard key={gig.id} item={gig} />)
          ) : (
            <div className="no-matches">
              <img src="/img/icons/404.png" alt="" />
              <span>No matches. Try again.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;

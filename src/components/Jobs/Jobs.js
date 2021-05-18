import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Jobs.css";
import { faClipboard, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Jobs = () => {
  const ALL_JOBS_URL =
    "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [searchByLocation, setSearchByLocation] = useState("");
  const [query, setQuery] = useState("");
  const [queryByLocation, setQueryByLocation] = useState("");

  const SEARCH_JOBS_URL = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${query}`;

  const SEARCH_JOBS_LOCATION_URL = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location=${queryByLocation}`;

  useEffect(() => {
    const searchJobsByDescription = async () => {
      try {
        const response = await fetch(SEARCH_JOBS_URL);
        const results = await response.json();
        setJobs(results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    searchJobsByDescription();
  }, [query]);

  useEffect(() => {
    const searchJobsByLocation = async () => {
      try {
        const response = await fetch(SEARCH_JOBS_LOCATION_URL);
        const results = await response.json();
        setJobs(results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    searchJobsByLocation();
  }, [queryByLocation]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const updateSearchByLocation = (e) => {
    setSearchByLocation(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);

    setSearch("");
    setQueryByLocation(searchByLocation);

    setSearchByLocation("");
  };

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const response = await fetch(ALL_JOBS_URL);
        const results = await response.json();
        setJobs(results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllJobs();
  }, []);

  const history = useHistory();
  const handleJobDetails = (jobId) => {
    history.push(`/job/${jobId}`);
  };

  const [pageNumber, setPageNumber] = useState(0);
  const jobsCardsPerPage = 20;
  const pagesVisited = pageNumber * jobsCardsPerPage;

  const displayJobsCards = jobs
    .slice(pagesVisited, pagesVisited + jobsCardsPerPage)
    .map((job) => (
      <div className="job__card">
        {" "}
        <div className="job__card__header">
          <img src={job.company_logo} alt={job.company} />
        </div>
        <div
          onClick={() => handleJobDetails(job.id)}
          className="job__card__title"
        >
          {job.title}
        </div>
        <div className="job__card__subtitle">
          <a target="__blank" href={job.company_url}>
            {job.company}
          </a>{" "}
          <br />
          {job.location} <br />
          {new Date(job.created_at).toLocaleDateString()}
        </div>
        <div className="job__detail">{job.type}</div>
        <div className="job__card__button">
          <button
            onClick={() => handleJobDetails(job.id)}
            className=" card__buttons"
          >
            See Details
          </button>
        </div>
      </div>
    ));

  const pageCount = Math.ceil(jobs.length / jobsCardsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="jobs">
      <div className="search__container">
        <div className="search__description">
          <label for="jobDescription">Job Description</label>
          <form onSubmit={getSearch}>
            <input
              placeholder="Search by title, benefits, companies, expertise"
              type="text"
              value={search}
              onChange={updateSearch}
            />
            <FontAwesomeIcon
              className="clip__icon"
              icon={faClipboard}
              size="lg"
              color="gray"
            />
          </form>
        </div>
        <div className="search__location">
          <label for="Location">Location</label>
          <form onSubmit={getSearch}>
            <input
              placeholder="Search by city, state, zip code or country"
              type="text"
              value={searchByLocation}
              onChange={updateSearchByLocation}
            />
            <FontAwesomeIcon
              className="location__icon"
              icon={faMapMarkerAlt}
              size="lg"
              color="gray"
            />
          </form>
        </div>
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous__btn"}
        nextLinkClassName={"next__btn"}
        disabledClassName={"pagination__disabled"}
        activeClassName={"pagination__active"}
      />

      <div className="jobs__cards">
        {loading ? <div className="spinner"></div> : displayJobsCards}
      </div>
    </div>
  );
};

export default Jobs;

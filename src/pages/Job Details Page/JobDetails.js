import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import "./JobDetails.css";

const JobDetails = () => {
  const { jobId } = useParams();
  const JOB_DETAIL_URL = `/positions/${jobId}.json?markdown=true`;
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobDetail = async () => {
      try {
        const response = await fetch(JOB_DETAIL_URL);
        const results = await response.json();
        setJobDetails(results);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getJobDetail();
  }, []);

  return loading ? (
    <div className="job__description-spinner"></div>
  ) : (
    <div className="job__description">
      <div className="job__description-header">
        <a target="__blank" href={jobDetails.company_url}>
          <img src={jobDetails.company_logo} alt={jobDetails.company} />
        </a>
        <div className="job__description-title">
          <h3>{jobDetails.title}</h3>
          <div className="job__description-subtitle">
            {jobDetails.company}|{jobDetails.location}
          </div>
          <div className="job__description-subtitle2">{jobDetails.type}</div>
          <div className="job__description-subtitle3">
            Posted {new Date(jobDetails.created_at).toLocaleDateString()}
          </div>
          <div className="job__description-btn">
            <ReactMarkdown children={jobDetails.how_to_apply} />
          </div>
        </div>
      </div>

      <div className="job__description-markdown">
        <ReactMarkdown children={jobDetails.description} />
      </div>
    </div>
  );
};

export default JobDetails;

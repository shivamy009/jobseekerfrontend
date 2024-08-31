import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import 'src/App.css'
//C:\Users\Krishna\Downloads\Desktop\jarurat\my-app\src\App.css
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
// import { UserContext } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

//   const { isAuthorized, user } = useContext(Context);
  let {userAuth,userAuth:{access_token},setUserAuth}=useContext(UserContext)


  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN+`/${id}`,
        {
          headers:{
            'authorization': `${access_token}`
          }
        }, {
        // withCredentials: true,
      })
      .then((res) => {
        console.log(res)
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!access_token) {
    navigateTo("/login");
  }

  return (
    //jobDetail
    <section className="jobDetail   page">
      <div className="container">
        <h3 className=" text-5xl">Job Details</h3>
        <div className="banner mt-0">
          <p>
            Title: <span> {job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {userAuth && userAuth.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
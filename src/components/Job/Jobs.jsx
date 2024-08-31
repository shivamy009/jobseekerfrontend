import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../../main";
// import { Context } from "../../main";
import '../../App.css';
import { UserContext } from "../../App";


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  // const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  let {userAuth:{access_token},setUserAuth}=useContext(UserContext)
  useEffect(() => {
    try {
      axios.get(import.meta.env.VITE_SERVER_DOMAIN+'/getall', 
        {
          headers:{
            'authorization': `${access_token ? access_token :""}`
          }
        }
        )
        .then((res) => {
            console.log(res)
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!access_token) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card " key={element._id}>
                  <p >{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`} className=" mb-3">Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
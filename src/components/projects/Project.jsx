import React, { useEffect, useState } from "react"
// import { product } from "../../assets/data/data"
import "./project.css"
import { ProjectItem } from "./ProjectItem";
import axios from "axios";
import { BASE_URL, PROJECTS } from "../../utils/constants";

export const Project = () => {

  let [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}${PROJECTS}`).then((resp) => {
      console.log(resp.data)
      setProjects(resp.data);
    })
  }, []);

  return (
    <>
      <section className='product'>
        <h5 className='home-page-title'>Explore Products</h5>
        <div className='container grid3'>
          {projects.map((item) => (
            <ProjectItem id={item.id} cover={item.thumbnailUrl} name={item.projectName} price={item.targetAmount} />
          ))}
        </div>
      </section>
    </>
  )
}

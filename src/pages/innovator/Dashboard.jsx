// InnovatorPage.js
import React, { useState, useEffect } from "react";
import PastProjects from "../../components/projects/PastProjects";
import ProjectForm from "../../components/projects/ProjectForm";
import axios from "axios";
import { BASE_URL, PROJECT_BY_INNO_ID } from "../../utils/constants";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Dashboard = () => {
  let { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };

  useEffect(() => {
    const payload = { id: id };
    axios.post(`${BASE_URL}${PROJECT_BY_INNO_ID}`, payload).then((response) => {
      setProjects(response.data);
    });
    // getAllProjects();
  }, [id]);

  const getAllProjects =
    (() => {
      // Fetch past projects from an API endpoint
      const payload = { id: id };
      axios
        .post(`${BASE_URL}${PROJECT_BY_INNO_ID}`, payload)
        .then((response) => {
          setProjects(response.data);
        });
    },
    []);

  return (
    <div>
      <p className="m-2">Innovator' Dashboard</p>
      <button className="btn btn-info m-2" onClick={toggleProjectForm}>
        {showProjectForm ? "Hide Project Form" : "Create New Project"}
      </button>
      {showProjectForm && (
        <ProjectForm
        onCloseForm={() => {
          toggleProjectForm(); // Close the form
          getAllProjects(); // Refresh the project list
        }}
          // onCloseForm={toggleProjectForm}
          // getAllProjectsAPI={getAllProjects}
        />
      )}
      <hr />

      <PastProjects projects={projects} />
    </div>
  );
};

export default Dashboard;

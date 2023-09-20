// ProjectForm.js
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { BASE_URL, CREATE_PROJECT } from "../../utils/constants";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ProjectForm({ onCloseForm, getAllProjects }) {
  let { id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [images, setImages] = useState([]);
  const [targetAmount, setTargetAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a project object with the form data
    const newProject = {
      projectName: projectName,
      projectDesc: projectDesc,
      thumbnailUrl:
        "https://www.modernquests.com/cdn/shop/files/ColumnsDeskOrganizer-LightGrey_3.jpg?v=1693803519",
      imageUrls: [
        "https://www.modernquests.com/cdn/shop/files/ColumnsDeskOrganizer-LightGrey_3.jpg?v=1693803519",
        "https://www.modernquests.com/cdn/shop/files/ColumnsDeskOrganizer-LightGrey_3.jpg?v=1693803519",
        "https://www.modernquests.com/cdn/shop/files/ColumnsDeskOrganizer-LightGrey_3.jpg?v=1693803519",
        "https://www.modernquests.com/cdn/shop/files/ColumnsDeskOrganizer-LightGrey_3.jpg?v=1693803519",
        "https://www.modernquests.com/cdn/shop/files/ColumnsDeskOrganizer-LightGrey_3.jpg?v=1693803519",
        "https://www.modernquests.com/cdn/shop/files/ColumnsDeskOrganizer-LightGrey_3.jpg?v=1693803519",
      ],
      targetAmount: targetAmount,
      innovatorId: id,
      status: "DRAFT",
    };

    try {
      // Send the project data to the API for creation
      const response = await axios.post(
        `${BASE_URL}${CREATE_PROJECT}`,
        newProject
      );
      console.log(response);
      if(response.status == 200) {
        onCloseForm();
        getAllProjects();
      }
    } catch (error) {
      console.error("API Error:", error);
    }

    // Clear the form fields after submission
    setProjectName("");
    setProjectDescription("");
    setThumbnailUrl("");
    setImages([]);
    setTargetAmount("");
  };

  return (
    <Container>
      <h1>Create Project</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="projectDescription">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={projectDesc}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="thumbnailUrl">
          <Form.Label>Thumbnail URL</Form.Label>
          <Form.Control
            type="url"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="images">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
        </Form.Group>
        <Form.Group controlId="targetAmount">
          <Form.Label>Target Amount</Form.Label>
          <Form.Control
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Project
        </Button>
      </Form>
    </Container>
  );
}

export default ProjectForm;

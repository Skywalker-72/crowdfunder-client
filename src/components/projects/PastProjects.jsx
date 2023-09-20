// PastProjects.js
import React from 'react';
import { Card, Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';

function PastProjects({projects}) {

  return (
    <Container>
      <h1>Past Projects</h1>
      <Row>
        {projects.map((project) => (
          <Col key={project.id} md={4}>
            <Card>
              <Card.Img variant="top" src={project.thumbnailUrl} id="thumbnail"/>
              <Card.Body>
                <Card.Title>{project.projectName}</Card.Title>
                <Card.Text class="project-desc">{project.projectDesc}</Card.Text>
                <Card.Text className='status-text'>{project.status}</Card.Text>
                <p>${project.receivedAmount}/${project.targetAmount}</p>
                <ProgressBar now={project.receivedAmount*100/project.targetAmount} />
                <Button variant="primary" className='mt-2'>View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PastProjects;

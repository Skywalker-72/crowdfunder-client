import React, { useEffect, useState } from "react";
import "./project.css";
import axios from "axios";
import { BASE_URL, PROJECT_BY_ID } from "../../utils/constants";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { projectActions } from "../../store/projectSlice";

export const ProjectDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { whichProject } = useParams();
  let [project, setProject] = useState({});
  let [twoImages, setTwoImages] = useState([]);
  let [fourImages, setFourImages] = useState([]);

  useEffect(() => {
    axios
      .post(`${BASE_URL}${PROJECT_BY_ID}`, { id: whichProject })
      .then((resp) => {
        let result = resp.data;
        result.imageUrls = result.imageUrls.split(",");

        setProject(result);
        setTwoImages(result.imageUrls.slice(0, 2));
        setFourImages(result.imageUrls.slice(-4));
        // setTwoImages(slide.slice(0, 2));
        // setFourImages(slide.slice(-4));
      });
  }, [whichProject]);

  // Function to open the modal
  const payNow = () => {
    dispatch(
      projectActions.setProjectInfo({
        projectName: project.projectName,
        projectDescription: project.projectDesc,
        targetAmount: project.targetAmount,
        thumbnailUrl: project.thumbnailUrl,
      })
    );
    history.push(`/payment/${project.id}`);
  };

  return (
    <div>
      <section className="product-images">
        <div className="container-fluid">
          <div className="header">
            <h4>{project.projectName}</h4>
          </div>
          <div className="row img-wrapper">
            {twoImages.map((item) => {
              return (
                <div className="img-1">
                  <img src={item} alt="random text" />
                </div>
              );
            })}

            <div className="img-3">
              {fourImages.map((item) => {
                return <img src={item} alt="random text" />;
              })}
            </div>
            {/* <ImageContainer imageUrls={project.imageUrls} /> */}
          </div>

          <section className="project-details">
            <div className="left-container">
              <h5 className="m-4">Project Details</h5>
              <p className="m-4">{project.projectDesc}</p>
              <p className="m-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Inventore nobis eaque, pariatur voluptatum ipsa harum fugit
                doloribus delectus, atque, asperiores voluptate. Omnis, quam
                possimus blanditiis nesciunt, ipsum suscipit corporis error sunt
                accusamus, minus eaque? Temporibus excepturi error obcaecati rem
                dicta, accusamus cumque quae esse eos voluptate, magnam,
                distinctio accusantium adipisci suscipit maiores in minima!
                Debitis laboriosam ipsa assumenda repellendus, eaque iure
                temporibus pariatur enim dolorum est eligendi error incidunt
                suscipit explicabo nulla, adipisci repellat reiciendis dolore
                commodi aliquid rerum labore! Odit facere nostrum reprehenderit
                assumenda inventore quas sit aliquam? Ex quasi eius aliquid
                repudiandae quo rerum dignissimos quaerat pariatur fuga.
              </p>
            </div>
            <div className="right-container">
              <div className="fund-details">
                <h6>
                  Total funds to be raised:{" "}
                  <span className="fund-amount">${project.targetAmount}</span>
                </h6>
                <br />
                <h6>Funds contributed:</h6>
                <p className="fund-amount">
                  {" "}
                  ${project.receivedAmount} / $ {project.targetAmount}{" "}
                </p>
                <div class="progress">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    style={{
                      width:
                        (project.receivedAmount / project.targetAmount) * 100 +
                        "%",
                    }}
                  ></div>
                </div>
                <button className="btn btn-warning pay-now" onClick={payNow}>
                  Contribute Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

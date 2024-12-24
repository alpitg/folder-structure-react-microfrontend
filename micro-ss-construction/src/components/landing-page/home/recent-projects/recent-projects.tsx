import "./recent-projects.scss";

import MicroButton from "../../../ui/button/button";
import MicroHeaderDescribe from "../../../ui/header-describe/header-describe";

const RecentProjects = () => {
  return (
    <section className="recent-projects">
      <div className="text-align-center">
        <MicroHeaderDescribe header="RECENT PROJECTS">
          <p>
            Here are a few of many projects we have completed for our customers.
            We provide a professional service
            which includes consultation, free estimate, design, supply of
            materials and installation.
          </p>
        </MicroHeaderDescribe>

        <div className="project-image-section">
          <ul className="projects-list">
            <li>
              <a href="?page=project_design_build" title="Design and Build">
                <img src="/src/assets/images/projects/project1.png" alt="" />
              </a>
              <div className="view align-center">
                <div className="vertical-align-table">
                  <div className="vertical-align-cell">
                    <p className="description">Design and Build</p>
                    <MicroButton variant="secondary" title="VIEW PROJECT">
                      VIEW PROJECT
                    </MicroButton>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a
                href="?page=project_garden_renovation"
                title="Garden Renovation"
              >
                <img src="/src/assets/images/projects/project2.png" alt="" />
              </a>
              <div className="view align-center">
                <div className="vertical-align-table">
                  <div className="vertical-align-cell">
                    <p className="description">Garden Renovation</p>
                    <MicroButton variant="secondary" title="VIEW PROJECT">
                      VIEW PROJECT
                    </MicroButton>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a
                href="?page=project_interior_renovation"
                title="Interior Renovation"
              >
                <img src="/src/assets/images/projects/project3.png" alt="" />
              </a>
              <div className="view align-center">
                <div className="vertical-align-table">
                  <div className="vertical-align-cell">
                    <p className="description">Interior Renovation</p>
                    <MicroButton variant="secondary" title="VIEW PROJECT">
                      VIEW PROJECT
                    </MicroButton>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href="?page=project_solar_systems" title="Solar Systems">
                <img src="/src/assets/images/projects/project4.png" alt="" />
              </a>
              <div className="view align-center">
                <div className="vertical-align-table">
                  <div className="vertical-align-cell">
                    <p className="description">Solar Systems</p>
                    <MicroButton variant="secondary" title="VIEW PROJECT">
                      VIEW PROJECT
                    </MicroButton>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="explore-our-project bg-grey d-inline-flex">
          <h3>
            <span className="button-label">EXPLORE OUR PROJECTS</span>
          </h3>
          <div className="align-content-center view-all-projects">
            <MicroButton href="?page=services" title="VIEW ALL PROJECTS">
              VIEW ALL PROJECTS
            </MicroButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;

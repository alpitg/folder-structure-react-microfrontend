import { GetEnvConfig } from "../../../app.config";

const HeaderApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <h1 className="sitename">{appSettings?.name}</h1>
        </a>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <a href="#home" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>Dropdown</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li>
                  <a href="#">Dropdown 1</a>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <span>Deep Dropdown</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Deep Dropdown 1</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 2</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 3</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 4</a>
                    </li>
                    <li>
                      <a href="#">Deep Dropdown 5</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Dropdown 2</a>
                </li>
                <li>
                  <a href="#">Dropdown 3</a>
                </li>
                <li>
                  <a href="#">Dropdown 4</a>
                </li>
              </ul>
            </li>

            <li className="dropdown extended-dropdown-2">
              <a href="#">
                <span>Extended Dropdown</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li>
                  <a href="#">
                    <div className="menu-item-content">
                      <div className="menu-icon">
                        <i className="bi bi-speedometer2"></i>
                      </div>
                      <div className="menu-text">
                        <span className="menu-title">Analytics Dashboard</span>
                        <span className="menu-description">
                          Track your performance metrics
                        </span>
                      </div>
                    </div>
                    <div className="menu-badge">New</div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="menu-item-content">
                      <div className="menu-icon">
                        <i className="bi bi-people"></i>
                      </div>
                      <div className="menu-text">
                        <span className="menu-title">Team Management</span>
                        <span className="menu-description">
                          Manage your team members
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="menu-item-content">
                      <div className="menu-icon">
                        <i className="bi bi-graph-up"></i>
                      </div>
                      <div className="menu-text">
                        <span className="menu-title">Sales Reports</span>
                        <span className="menu-description">
                          Review financial statistics
                        </span>
                      </div>
                    </div>
                    <div className="menu-badge hot">Hot</div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="menu-item-content">
                      <div className="menu-icon">
                        <i className="bi bi-shield-lock"></i>
                      </div>
                      <div className="menu-text">
                        <span className="menu-title">Security Center</span>
                        <span className="menu-description">
                          Manage privacy settings
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="menu-item-content">
                      <div className="menu-icon">
                        <i className="bi bi-chat-dots"></i>
                      </div>
                      <div className="menu-text">
                        <span className="menu-title">Message Center</span>
                        <span className="menu-description">
                          Check your notifications
                        </span>
                      </div>
                    </div>
                    <div className="menu-badge updates">5</div>
                  </a>
                </li>
              </ul>
            </li>

            <li className="megamenu-2">
              <a href="#">
                <span>Megamenu</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>

              <ul className="mobile-megamenu">
                <li>
                  <a href="#">Product Analytics</a>
                </li>
                <li>
                  <a href="#">Customer Insights</a>
                </li>
                <li>
                  <a href="#">Market Research</a>
                </li>

                <li className="dropdown">
                  <a href="#">
                    <span>Enterprise Software</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">CRM Solutions</a>
                    </li>
                    <li>
                      <a href="#">ERP Systems</a>
                    </li>
                    <li>
                      <a href="#">Workflow Automation</a>
                    </li>
                    <li>
                      <a href="#">Document Management</a>
                    </li>
                    <li>
                      <a href="#">Business Intelligence</a>
                    </li>
                    <li>
                      <a href="#">Integration Platform</a>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <a href="#">
                    <span>Development Tools</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Code Editors</a>
                    </li>
                    <li>
                      <a href="#">Version Control</a>
                    </li>
                    <li>
                      <a href="#">Testing Frameworks</a>
                    </li>
                    <li>
                      <a href="#">Deployment Tools</a>
                    </li>
                    <li>
                      <a href="#">API Management</a>
                    </li>
                    <li>
                      <a href="#">Performance Monitoring</a>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <a href="#">
                    <span>Creative Suite</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Design Software</a>
                    </li>
                    <li>
                      <a href="#">Video Editing</a>
                    </li>
                    <li>
                      <a href="#">Audio Production</a>
                    </li>
                    <li>
                      <a href="#">Animation Tools</a>
                    </li>
                    <li>
                      <a href="#">Photo Editing</a>
                    </li>
                    <li>
                      <a href="#">3D Modeling</a>
                    </li>
                  </ul>
                </li>

                <li className="dropdown">
                  <a href="#">
                    <span>Resources</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Documentation</a>
                    </li>
                    <li>
                      <a href="#">Tutorials</a>
                    </li>
                    <li>
                      <a href="#">Community</a>
                    </li>
                    <li>
                      <a href="#">Blog Posts</a>
                    </li>
                  </ul>
                </li>
              </ul>

              <div className="desktop-megamenu">
                <div className="tab-navigation">
                  <ul
                    className="nav nav-tabs flex-column"
                    id="7525-megamenu-tabs"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="7525-tab-1-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#7525-tab-1"
                        type="button"
                        role="tab"
                        aria-controls="7525-tab-1"
                        aria-selected="true"
                      >
                        <i className="bi bi-building-gear"></i>
                        <span>Enterprise Software</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="7525-tab-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#7525-tab-2"
                        type="button"
                        role="tab"
                        aria-controls="7525-tab-2"
                        aria-selected="false"
                        tabIndex={-1}
                      >
                        <i className="bi bi-code-slash"></i>
                        <span>Development Tools</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="7525-tab-3-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#7525-tab-3"
                        type="button"
                        role="tab"
                        aria-controls="7525-tab-3"
                        aria-selected="false"
                        tabIndex={-1}
                      >
                        <i className="bi bi-palette"></i>
                        <span>Creative Suite</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="7525-tab-4-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#7525-tab-4"
                        type="button"
                        role="tab"
                        aria-controls="7525-tab-4"
                        aria-selected="false"
                        tabIndex={-1}
                      >
                        <i className="bi bi-journal-text"></i>
                        <span>Resources</span>
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="7525-tab-1"
                    role="tabpanel"
                    aria-labelledby="7525-tab-1-tab"
                  >
                    <div className="content-grid">
                      <div className="product-section">
                        <h4>Core Solutions</h4>
                        <div className="product-list">
                          <a href="#" className="product-link">
                            <i className="bi bi-people"></i>
                            <div>
                              <span>CRM Solutions</span>
                              <small>
                                Manage customer relationships effectively
                              </small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-diagram-3"></i>
                            <div>
                              <span>ERP Systems</span>
                              <small>Integrate all business processes</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-gear-wide"></i>
                            <div>
                              <span>Workflow Automation</span>
                              <small>Streamline repetitive tasks</small>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div className="product-section">
                        <h4>Data &amp; Analytics</h4>
                        <div className="product-list">
                          <a href="#" className="product-link">
                            <i className="bi bi-file-earmark-text"></i>
                            <div>
                              <span>Document Management</span>
                              <small>Organize and secure documents</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-bar-chart"></i>
                            <div>
                              <span>Business Intelligence</span>
                              <small>Make data-driven decisions</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-share"></i>
                            <div>
                              <span>Integration Platform</span>
                              <small>Connect all your systems</small>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="featured-banner">
                      <div className="banner-content">
                        <img
                          src="assets/img/misc/misc-7.webp"
                          alt="Enterprise Solutions"
                          className="banner-image"
                        />
                        <div className="banner-info">
                          <h5>Enterprise Package</h5>
                          <p>
                            Comprehensive business management solution with
                            advanced features and 24/7 support.
                          </p>
                          <a href="#" className="cta-btn">
                            Get Started <i className="bi bi-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="7525-tab-2"
                    role="tabpanel"
                    aria-labelledby="7525-tab-2-tab"
                  >
                    <div className="content-grid">
                      <div className="product-section">
                        <h4>Code &amp; Build</h4>
                        <div className="product-list">
                          <a href="#" className="product-link">
                            <i className="bi bi-code-square"></i>
                            <div>
                              <span>Code Editors</span>
                              <small>Advanced development environment</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-git"></i>
                            <div>
                              <span>Version Control</span>
                              <small>Track changes and collaborate</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-check2-square"></i>
                            <div>
                              <span>Testing Frameworks</span>
                              <small>Ensure code quality</small>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div className="product-section">
                        <h4>Deploy &amp; Monitor</h4>
                        <div className="product-list">
                          <a href="#" className="product-link">
                            <i className="bi bi-cloud-upload"></i>
                            <div>
                              <span>Deployment Tools</span>
                              <small>Seamless application deployment</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-api"></i>
                            <div>
                              <span>API Management</span>
                              <small>Design and manage APIs</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-speedometer2"></i>
                            <div>
                              <span>Performance Monitoring</span>
                              <small>Track application performance</small>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="featured-banner">
                      <div className="banner-content">
                        <img
                          src="assets/img/misc/misc-12.webp"
                          alt="Development Tools"
                          className="banner-image"
                        />
                        <div className="banner-info">
                          <h5>Developer Suite</h5>
                          <p>
                            Complete toolkit for modern development teams with
                            integrated CI/CD pipelines.
                          </p>
                          <a href="#" className="cta-btn">
                            Explore Tools <i className="bi bi-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="7525-tab-3"
                    role="tabpanel"
                    aria-labelledby="7525-tab-3-tab"
                  >
                    <div className="content-grid">
                      <div className="product-section">
                        <h4>Design &amp; Visual</h4>
                        <div className="product-list">
                          <a href="#" className="product-link">
                            <i className="bi bi-brush"></i>
                            <div>
                              <span>Design Software</span>
                              <small>Professional graphic design tools</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-camera-video"></i>
                            <div>
                              <span>Video Editing</span>
                              <small>Professional video production</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-image"></i>
                            <div>
                              <span>Photo Editing</span>
                              <small>Advanced image manipulation</small>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div className="product-section">
                        <h4>Media Production</h4>
                        <div className="product-list">
                          <a href="#" className="product-link">
                            <i className="bi bi-music-note"></i>
                            <div>
                              <span>Audio Production</span>
                              <small>Professional audio editing</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-play-circle"></i>
                            <div>
                              <span>Animation Tools</span>
                              <small>Create stunning animations</small>
                            </div>
                          </a>
                          <a href="#" className="product-link">
                            <i className="bi bi-box"></i>
                            <div>
                              <span>3D Modeling</span>
                              <small>Advanced 3D design software</small>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="featured-banner">
                      <div className="banner-content">
                        <img
                          src="assets/img/misc/misc-5.webp"
                          alt="Creative Suite"
                          className="banner-image"
                        />
                        <div className="banner-info">
                          <h5>Creative Pro</h5>
                          <p>
                            Everything you need for creative projects, from
                            concept to final production.
                          </p>
                          <a href="#" className="cta-btn">
                            Start Creating <i className="bi bi-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="7525-tab-4"
                    role="tabpanel"
                    aria-labelledby="7525-tab-4-tab"
                  >
                    <div className="resources-layout">
                      <div className="resource-categories">
                        <div className="resource-category">
                          <i className="bi bi-book"></i>
                          <h5>Documentation</h5>
                          <p>
                            Comprehensive guides and API references for all our
                            products and services.
                          </p>
                          <a href="#" className="resource-link">
                            Browse Docs <i className="bi bi-arrow-right"></i>
                          </a>
                        </div>
                        <div className="resource-category">
                          <i className="bi bi-play-circle"></i>
                          <h5>Video Tutorials</h5>
                          <p>
                            Step-by-step video guides to help you get the most
                            out of our solutions.
                          </p>
                          <a href="#" className="resource-link">
                            Watch Tutorials{" "}
                            <i className="bi bi-arrow-right"></i>
                          </a>
                        </div>
                        <div className="resource-category">
                          <i className="bi bi-chat-square-dots"></i>
                          <h5>Community Forum</h5>
                          <p>
                            Connect with other users, share tips, and get
                            answers to your questions.
                          </p>
                          <a href="#" className="resource-link">
                            Join Community <i className="bi bi-arrow-right"></i>
                          </a>
                        </div>
                        <div className="resource-category">
                          <i className="bi bi-newspaper"></i>
                          <h5>Blog &amp; Articles</h5>
                          <p>
                            Latest insights, best practices, and industry trends
                            from our experts.
                          </p>
                          <a href="#" className="resource-link">
                            Read Blog <i className="bi bi-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>
  );
};
export default HeaderApp;

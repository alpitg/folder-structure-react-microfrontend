import "./testimonial.scss";

const Testimonial = () => {
  return (
    <div className="testimonial">
      <br />
      <br />
      <br />
      <br />

      <div className="row testimonials-container">
        <a href="#" className="slider-control left template-arrow-left-1"></a>
        <div className="caroufredsel_wrapper caroufredsel_wrapper_testimonials">
          <ul className="testimonials-list">
            <li className="sl-small-conversation">
              <div className="ornament"></div>
              <p>
                "We would like to thank Renovate Company for an outstanding
                effort on this recently completed project located in the Moscow.
                The project involved a very aggressive schedule and it was
                completed on time. We would certainly like to use their
                professional services again."
              </p>
              <div className="author">MITCHEL SMITH</div>
              <div className="author-details">CEO OF NEW PORT COMPANY</div>
            </li>
            <li className="sl-small-conversation">
              <div className="ornament"></div>
              <p>
                "We would like to thank Renovate Company for an outstanding
                effort on this recently completed project located in the Moscow.
                The project involved a very aggressive schedule and it was
                completed on time. We would certainly like to use their
                professional services again."
              </p>
              <div className="author">MITCHEL SMITH</div>
              <div className="author-details">CEO OF NEW PORT COMPANY</div>
            </li>
            <li className="sl-small-conversation">
              <div className="ornament"></div>
              <p>
                "We would like to thank Renovate Company for an outstanding
                effort on this recently completed project located in the Moscow.
                The project involved a very aggressive schedule and it was
                completed on time. We would certainly like to use their
                professional services again."
              </p>
              <div className="author">MITCHEL SMITH</div>
              <div className="author-details">CEO OF NEW PORT COMPANY</div>
            </li>
          </ul>
        </div>
        <a href="#" className="slider-control right template-arrow-left-1"></a>
      </div>
    </div>
  );
};

export default Testimonial;

interface QuoteFormProps {
  formData: {
    name: string;
    mobile: string;
    homeType: string;
  };
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  submitError: unknown;
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  submitted,
  setSubmitted,
  isSubmitting,
  submitError,
}) => {
  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <h3>Get your free quote</h3>
      <p>Share your details to receive a personalised estimate.</p>

      {submitted ? (
        <div className="success-message" role="status">
          <h3>Thank You for Your Enquiry!</h3>
          <p>
            Your request for a free home interior quote has been received
            successfully. Our design team will get in touch with you shortly to
            discuss your requirements.
          </p>
          <p className="success-note">
            <i>We look forward to helping you create your dream home.</i>
          </p>
          <button
            className="btn btn-success"
            type="button"
            onClick={() => setSubmitted(false)}
          >
            Submit another request
            <i className="bi bi-arrow-right ps-2" aria-hidden="true"></i>
          </button>
        </div>
      ) : (
        <>
          <label htmlFor="customer-name">Your name</label>
          <input
            id="customer-name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <label htmlFor="customer-mobile">Mobile number</label>
          <input
            id="customer-mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            placeholder="10-digit mobile number"
            value={formData.mobile}
            onChange={handleChange}
            autoComplete="tel-national"
            pattern="[6-9][0-9]{9}"
            title="Enter a valid 10-digit Indian mobile number"
            maxLength={10}
            required
          />

          <label htmlFor="home-type">Your home type</label>
          <select
            id="home-type"
            name="homeType"
            value={formData.homeType}
            onChange={handleChange}
            required
          >
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4+ BHK">4+ BHK</option>
            <option value="Villa">Villa / Independent House</option>
          </select>

          <button
            className="primary-button form-submit"
            // className="btn btn-primary w-100 form-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <span>
                GET FREE QUOTE
                <i className="bi bi-arrow-right ps-2" aria-hidden="true"></i>
              </span>
            )}
          </button>

          {submitError && (
            <p className="form-error" role="alert">
              We couldn't submit your request right now. Please try again.
            </p>
          )}

          <small className="form-disclaimer">
            By submitting, you agree to be contacted about your interior design
            enquiry.
          </small>
        </>
      )}
    </form>
  );
};

export default QuoteForm;

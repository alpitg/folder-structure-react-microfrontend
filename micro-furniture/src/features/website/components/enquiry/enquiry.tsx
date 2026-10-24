import "./enquiry.scss";

import React, { useRef, useState } from "react";

type EnquiryForm = {
  projectType: string;
  propertyStatus: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  budget: string;
  timeline: string;
  requirements: string;
};

const initialForm: EnquiryForm = {
  projectType: "",
  propertyStatus: "",
  fullName: "",
  phone: "",
  email: "",
  city: "",
  budget: "",
  timeline: "",
  requirements: "",
};

const projectOptions = [
  { value: "Full Home Interior", icon: "🏡" },
  { value: "Modular Kitchen", icon: "🍽️" },
  { value: "Living Room", icon: "🛋️" },
  { value: "Bedroom", icon: "🛏️" },
  { value: "Architecture & Construction", icon: "🏗️" },
  { value: "Commercial Space", icon: "🏢" },
];

const requiredFields: (keyof EnquiryForm)[] = [
  "projectType",
  "propertyStatus",
  "fullName",
  "phone",
  "email",
  "city",
  "budget",
  "timeline",
];

const fieldLabels: Record<keyof EnquiryForm, string> = {
  projectType: "project type",
  propertyStatus: "property status",
  fullName: "full name",
  phone: "mobile number",
  email: "email address",
  city: "project location",
  budget: "budget",
  timeline: "project timeline",
  requirements: "additional requirements",
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isValidPhone = (value: string) =>
  /^[6-9]\d{9}$/.test(value.replace(/\D/g, ""));

const getFieldError = (field: keyof EnquiryForm, form: EnquiryForm): string => {
  const value = form[field].trim();

  if (field === "phone" && value && !isValidPhone(value)) {
    return "Enter a valid 10-digit Indian mobile number.";
  }

  if (field === "email" && value && !isValidEmail(value)) {
    return "Enter a valid email address.";
  }

  if (requiredFields.includes(field) && !value) {
    return `Please enter your ${fieldLabels[field]}.`;
  }

  return "";
};

const EnquiryApp = () => {
  const [form, setForm] = useState<EnquiryForm>(initialForm);
  const [touched, setTouched] = useState<
    Partial<Record<keyof EnquiryForm, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [showAssistant, setShowAssistant] = useState(true);

  const fieldRefs = useRef<
    Partial<Record<keyof EnquiryForm, HTMLElement | null>>
  >({});

  const updateField = (field: keyof EnquiryForm, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setTouched((previous) => ({ ...previous, [field]: true }));
    setSubmitted(false);
  };

  const missingFields = requiredFields.filter((field) => !form[field].trim());

  const invalidFields = requiredFields.filter(
    (field) => getFieldError(field, form) !== "",
  );

  const completion = Math.round(
    ((requiredFields.length - missingFields.length) / requiredFields.length) *
      100,
  );

  const nextField = requiredFields.find(
    (field) => getFieldError(field, form) !== "",
  );

  const assistantMessage = (() => {
    if (submitted) {
      return "Wonderful! Your enquiry is ready. Our team will connect with you once your details are submitted to the enquiry service.";
    }

    if (attempted && invalidFields.length > 0) {
      return `Almost there! Please check ${fieldLabels[invalidFields[0]]}. I'll guide you through the remaining details.`;
    }

    if (completion === 100 && invalidFields.length === 0) {
      return "Everything looks good! Your enquiry is ready to submit.";
    }

    if (!form.projectType) {
      return "Hi there! 👋 Let's start with your dream space. What would you like to design?";
    }

    if (!form.propertyStatus) {
      return "Great choice! Is your property ready, under construction, or still being planned?";
    }

    if (!form.fullName.trim()) {
      return "Lovely! What name should our design consultant use when contacting you?";
    }

    if (!form.phone.trim() || getFieldError("phone", form)) {
      return "Could you share your 10-digit mobile number so our team can reach you?";
    }

    if (!form.email.trim() || getFieldError("email", form)) {
      return "What is your email address? We'll use it for your enquiry details.";
    }

    if (!form.city.trim()) {
      return "Which city or locality is your project in?";
    }

    if (!form.budget) {
      return "Let's understand your plans. What is your approximate budget?";
    }

    if (!form.timeline) {
      return "When would you like to start your project?";
    }

    return "You're doing great! You can add more details about your dream space before submitting.";
  })();

  const focusField = (field: keyof EnquiryForm) => {
    fieldRefs.current[field]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    const element = fieldRefs.current[field];

    window.setTimeout(() => {
      if (element instanceof HTMLElement) {
        const input = element.matches("input, select, textarea")
          ? element
          : element.querySelector<HTMLElement>(
              "input, select, textarea, button",
            );

        input?.focus();
      }
    }, 250);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);

    const firstInvalid = requiredFields.find(
      (field) => getFieldError(field, form) !== "",
    );

    if (firstInvalid) {
      focusField(firstInvalid);
      setShowAssistant(true);
      return;
    }

    setSubmitted(true);

    // Connect your enquiry API here.
    // Example: await submitEnquiry(form);
  };

  const showError = (field: keyof EnquiryForm) =>
    (touched[field] || attempted) && getFieldError(field, form);

  return (
    <main className="enquiry-page">
      <section className="enquiry-hero">
        <div className="enquiry-hero__image" aria-hidden="true" />

        <div className="enquiry-hero__content">
          <span className="enquiry-eyebrow">YOUR SPACE. YOUR STORY.</span>

          <h1>
            Let's create
            <br />
            something <span>beautiful.</span>
          </h1>

          <p>
            From thoughtful interiors to complete construction, tell us what you
            have in mind. We'll help you bring it to life.
          </p>

          <div className="enquiry-hero__benefits">
            <span>✓ Personalised design</span>
            <span>✓ Expert consultation</span>
            <span>✓ Transparent planning</span>
          </div>
        </div>

        <div className="enquiry-hero__note">
          <span className="enquiry-hero__note-icon">✳</span>
          <div>
            <strong>Made for your lifestyle</strong>
            <span>Spaces designed around you.</span>
          </div>
        </div>
      </section>

      <section className="enquiry-main">
        <div className="enquiry-heading">
          <span className="enquiry-eyebrow">
            LET'S GET TO KNOW YOUR PROJECT
          </span>

          <h2>Start your enquiry</h2>

          <p>A few details are all we need to get started.</p>
        </div>

        <div className="enquiry-layout">
          <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
            <div className="enquiry-progress">
              <div className="enquiry-progress__top">
                <span>Your project details</span>
                <strong>{completion}% completed</strong>
              </div>

              <div
                className="enquiry-progress__track"
                role="progressbar"
                aria-label="Enquiry form completion"
                aria-valuenow={completion}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${completion}%` }} />
              </div>
            </div>

            {submitted ? (
              <div className="enquiry-success" role="status">
                <span className="enquiry-success__icon">✓</span>
                <h3>You're all set!</h3>
                <p>
                  Your form passed validation. Connect the enquiry API to send
                  these details to your team.
                </p>

                <button
                  type="button"
                  className="enquiry-button enquiry-button--outline"
                  onClick={() => {
                    setForm(initialForm);
                    setTouched({});
                    setAttempted(false);
                    setSubmitted(false);
                  }}
                >
                  Create another enquiry
                </button>
              </div>
            ) : (
              <>
                <div className="enquiry-section">
                  <div className="enquiry-section__heading">
                    <span className="enquiry-section__number">01</span>
                    <div>
                      <h3>What would you like to design?</h3>
                      <p>Select the service you're looking for.</p>
                    </div>
                  </div>

                  <div className="enquiry-project-grid">
                    {projectOptions.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        ref={(element) => {
                          if (option === projectOptions[0]) {
                            fieldRefs.current.projectType = element;
                          }
                        }}
                        className={`enquiry-project-card ${
                          form.projectType === option.value ? "is-selected" : ""
                        }`}
                        aria-pressed={form.projectType === option.value}
                        onClick={() => updateField("projectType", option.value)}
                      >
                        <span className="enquiry-project-card__icon">
                          {option.icon}
                        </span>
                        <span>{option.value}</span>
                        <span className="enquiry-project-card__check">
                          {form.projectType === option.value ? "✓" : "+"}
                        </span>
                      </button>
                    ))}
                  </div>

                  {showError("projectType") && (
                    <p className="enquiry-error" role="alert">
                      {getFieldError("projectType", form)}
                    </p>
                  )}
                </div>

                <div className="enquiry-section">
                  <div className="enquiry-section__heading">
                    <span className="enquiry-section__number">02</span>
                    <div>
                      <h3>Tell us about your property</h3>
                      <p>We'll tailor our suggestions to your needs.</p>
                    </div>
                  </div>

                  <div className="enquiry-field">
                    <label htmlFor="propertyStatus">
                      What is the property status? <span>*</span>
                    </label>

                    <div className="enquiry-choice-row">
                      {[
                        "Ready to move in",
                        "Under construction",
                        "Planning to buy",
                      ].map((status) => (
                        <button
                          type="button"
                          key={status}
                          className={`enquiry-choice ${
                            form.propertyStatus === status ? "is-selected" : ""
                          }`}
                          aria-pressed={form.propertyStatus === status}
                          onClick={() => updateField("propertyStatus", status)}
                          ref={(element) => {
                            if (status === "Ready to move in") {
                              fieldRefs.current.propertyStatus = element;
                            }
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    {showError("propertyStatus") && (
                      <p className="enquiry-error" role="alert">
                        {getFieldError("propertyStatus", form)}
                      </p>
                    )}
                  </div>

                  <div className="enquiry-field-grid">
                    <div className="enquiry-field">
                      <label htmlFor="fullName">
                        Full name <span>*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        ref={(element) => {
                          fieldRefs.current.fullName = element;
                        }}
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={form.fullName}
                        onChange={(event) =>
                          updateField("fullName", event.target.value)
                        }
                        aria-invalid={Boolean(showError("fullName"))}
                      />
                      {showError("fullName") && (
                        <p className="enquiry-error" role="alert">
                          {getFieldError("fullName", form)}
                        </p>
                      )}
                    </div>

                    <div className="enquiry-field">
                      <label htmlFor="phone">
                        Mobile number <span>*</span>
                      </label>
                      <div className="enquiry-phone-input">
                        <span>+91</span>
                        <input
                          id="phone"
                          name="phone"
                          ref={(element) => {
                            fieldRefs.current.phone = element;
                          }}
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={form.phone}
                          onChange={(event) =>
                            updateField(
                              "phone",
                              event.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10),
                            )
                          }
                          aria-invalid={Boolean(showError("phone"))}
                        />
                      </div>
                      {showError("phone") && (
                        <p className="enquiry-error" role="alert">
                          {getFieldError("phone", form)}
                        </p>
                      )}
                    </div>

                    <div className="enquiry-field">
                      <label htmlFor="email">
                        Email address <span>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        ref={(element) => {
                          fieldRefs.current.email = element;
                        }}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        aria-invalid={Boolean(showError("email"))}
                      />
                      {showError("email") && (
                        <p className="enquiry-error" role="alert">
                          {getFieldError("email", form)}
                        </p>
                      )}
                    </div>

                    <div className="enquiry-field">
                      <label htmlFor="city">
                        Project city / locality <span>*</span>
                      </label>
                      <input
                        id="city"
                        name="city"
                        ref={(element) => {
                          fieldRefs.current.city = element;
                        }}
                        type="text"
                        autoComplete="address-level2"
                        placeholder="e.g. Pune, Baner"
                        value={form.city}
                        onChange={(event) =>
                          updateField("city", event.target.value)
                        }
                        aria-invalid={Boolean(showError("city"))}
                      />
                      {showError("city") && (
                        <p className="enquiry-error" role="alert">
                          {getFieldError("city", form)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="enquiry-section">
                  <div className="enquiry-section__heading">
                    <span className="enquiry-section__number">03</span>
                    <div>
                      <h3>Let's plan your dream space</h3>
                      <p>Help us understand your expectations.</p>
                    </div>
                  </div>

                  <div className="enquiry-field-grid">
                    <div className="enquiry-field">
                      <label htmlFor="budget">
                        Approximate budget <span>*</span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        ref={(element) => {
                          fieldRefs.current.budget = element;
                        }}
                        value={form.budget}
                        onChange={(event) =>
                          updateField("budget", event.target.value)
                        }
                        aria-invalid={Boolean(showError("budget"))}
                      >
                        <option value="">Select your budget</option>
                        <option value="Below ₹5 lakh">Below ₹5 lakh</option>
                        <option value="₹5-10 lakh">₹5-10 lakh</option>
                        <option value="₹10-20 lakh">₹10-20 lakh</option>
                        <option value="₹20-40 lakh">₹20-40 lakh</option>
                        <option value="₹40 lakh-₹1 crore">
                          ₹40 lakh-₹1 crore
                        </option>
                        <option value="Above ₹1 crore">Above ₹1 crore</option>
                        <option value="Need guidance">Need guidance</option>
                      </select>
                      {showError("budget") && (
                        <p className="enquiry-error" role="alert">
                          {getFieldError("budget", form)}
                        </p>
                      )}
                    </div>

                    <div className="enquiry-field">
                      <label htmlFor="timeline">
                        When would you like to start? <span>*</span>
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        ref={(element) => {
                          fieldRefs.current.timeline = element;
                        }}
                        value={form.timeline}
                        onChange={(event) =>
                          updateField("timeline", event.target.value)
                        }
                        aria-invalid={Boolean(showError("timeline"))}
                      >
                        <option value="">Select a timeline</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                      {showError("timeline") && (
                        <p className="enquiry-error" role="alert">
                          {getFieldError("timeline", form)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="enquiry-field">
                    <label htmlFor="requirements">
                      Anything else we should know?{" "}
                      <span className="enquiry-optional">(Optional)</span>
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={4}
                      placeholder="Share your ideas, preferred style, space requirements..."
                      value={form.requirements}
                      onChange={(event) =>
                        updateField("requirements", event.target.value)
                      }
                    />
                  </div>
                </div>

                {attempted && invalidFields.length > 0 && (
                  <div className="enquiry-form-alert" role="alert">
                    <span>!</span>
                    Please complete the required fields and correct any errors
                    before submitting.
                  </div>
                )}

                <div className="enquiry-submit-area">
                  <p>
                    By submitting, you agree to be contacted about your project
                    enquiry.
                  </p>

                  <button type="submit" className="enquiry-button">
                    Submit enquiry <span>→</span>
                  </button>
                </div>
              </>
            )}
          </form>

          <aside className="enquiry-sidebar">
            <div className="enquiry-sidebar__card">
              <span className="enquiry-sidebar__sparkle">✳</span>
              <h3>A space you'll love coming home to.</h3>
              <p>
                Good design starts with understanding you. Tell us your vision,
                and let's take the first step together.
              </p>

              <div className="enquiry-sidebar__features">
                <div>
                  <span>01</span>
                  <p>
                    <strong>Understand your vision</strong>
                    <small>We listen to your needs.</small>
                  </p>
                </div>
                <div>
                  <span>02</span>
                  <p>
                    <strong>Plan with experts</strong>
                    <small>Explore ideas and possibilities.</small>
                  </p>
                </div>
                <div>
                  <span>03</span>
                  <p>
                    <strong>Bring it to life</strong>
                    <small>Move forward with confidence.</small>
                  </p>
                </div>
              </div>
            </div>

            <div className="enquiry-sidebar__help">
              <span>Need help deciding?</span>
              <p>
                Our guided assistant can help you complete your enquiry one step
                at a time.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowAssistant(true);
                  focusField(nextField || "requirements");
                }}
              >
                Get assistance <span>↗</span>
              </button>
            </div>
          </aside>
        </div>
      </section>

      {showAssistant && (
        <div className="enquiry-assistant">
          <div className="enquiry-assistant__header">
            <div className="enquiry-assistant__avatar">
              <span>✳</span>
              <i />
            </div>
            <div className="enquiry-assistant__identity">
              <strong>Space Buddy</strong>
              <span>YOUR DESIGN ASSISTANT</span>
            </div>
            <button
              type="button"
              className="enquiry-assistant__close"
              aria-label="Minimize assistant"
              onClick={() => setShowAssistant(false)}
            >
              -
            </button>
          </div>

          <div className="enquiry-assistant__body" aria-live="polite">
            <p className="enquiry-assistant__bubble">{assistantMessage}</p>

            {!submitted && (
              <>
                <div className="enquiry-assistant__progress">
                  <div>
                    <span>Form progress</span>
                    <strong>{completion}%</strong>
                  </div>
                  <div className="enquiry-assistant__track">
                    <span style={{ width: `${completion}%` }} />
                  </div>
                </div>

                <button
                  type="button"
                  className="enquiry-assistant__action"
                  onClick={() => {
                    if (nextField) {
                      focusField(nextField);
                    } else {
                      setAttempted(true);
                      const invalid = requiredFields.find(
                        (field) => getFieldError(field, form) !== "",
                      );

                      if (invalid) {
                        focusField(invalid);
                      } else {
                        document
                          .querySelector<HTMLFormElement>(".enquiry-form")
                          ?.requestSubmit();
                      }
                    }
                  }}
                >
                  {nextField
                    ? `Help me with ${fieldLabels[nextField]}`
                    : "Review & submit"}{" "}
                  <span>→</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {!showAssistant && (
        <button
          type="button"
          className="enquiry-assistant-launcher"
          aria-label="Open Space Buddy assistant"
          onClick={() => setShowAssistant(true)}
        >
          <span>✳</span>
          <small>Need help?</small>
        </button>
      )}
    </main>
  );
};

export default EnquiryApp;

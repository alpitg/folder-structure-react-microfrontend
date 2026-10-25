import "./artisanstudios.scss";

import React, { useEffect, useState } from "react";

import { GetEnvConfig } from "../../../app.config";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import {
  useSubmitWebsiteQuoteMutation,
  type QuoteHomeType,
} from "../../../app/redux/website/quote/website-quote.api";
import ModelApp from "../../../components/ui/model/model";

const interiorCategories = [
  {
    title: "Living Room",
    subtitle: "Comfort meets style",
    image:
      "https://artisanstudios.blob.core.windows.net/website/LivingRoom/FullSizeRender.jpg",
    galleryImages: [
      "https://artisanstudios.blob.core.windows.net/website/LivingRoom/FullSizeRender.jpg",
      "https://artisanstudios.blob.core.windows.net/website/LivingRoom/FullSizeRender(1).jpg",
      "https://artisanstudios.blob.core.windows.net/website/LivingRoom/IMG_0202.jpg",
      "https://artisanstudios.blob.core.windows.net/website/LivingRoom/IMG_0220.jpg",
      "https://artisanstudios.blob.core.windows.net/website/LivingRoom/IMG_2732.jpg",
      "https://artisanstudios.blob.core.windows.net/website/LivingRoom/IMG_7032.jpg",
    ],
  },
  {
    title: "Modular Kitchen",
    subtitle: "Designed around you",
    image:
      "https://artisanstudios.blob.core.windows.net/website/ModularKitchen/FullSizeRender.jpg",
    galleryImages: [
      "https://artisanstudios.blob.core.windows.net/website/ModularKitchen/FullSizeRender.jpg",
      "https://artisanstudios.blob.core.windows.net/website/ModularKitchen/FullSizeRender(1).jpg",
      "https://artisanstudios.blob.core.windows.net/website/ModularKitchen/FullSizeRender(2).jpg",
      "https://artisanstudios.blob.core.windows.net/website/ModularKitchen/FullSizeRender(3).jpg",
    ],
  },
  {
    title: "Master Bedroom",
    subtitle: "Your personal retreat",
    image:
      "https://artisanstudios.blob.core.windows.net/website/MasterBedroom/C-15.JPEG",
    galleryImages: [
      "https://artisanstudios.blob.core.windows.net/website/MasterBedroom/C-15.JPEG",
      "https://artisanstudios.blob.core.windows.net/website/MasterBedroom/DSC08470.JPEG",
      "https://artisanstudios.blob.core.windows.net/website/MasterBedroom/IMG_2708.jpg",
      "https://artisanstudios.blob.core.windows.net/website/MasterBedroom/IMG_7049.jpg",
      "https://artisanstudios.blob.core.windows.net/website/MasterBedroom/IMG_7050.jpg",
      "https://artisanstudios.blob.core.windows.net/website/MasterBedroom/F243D9CD-3544-477C-A337-7908515FB794.JPG",
    ],
  },
  {
    title: "Dining Room",
    subtitle: "Make every meal special",
    image:
      "https://artisanstudios.blob.core.windows.net/website/DiningRoom/IMG_5379.JPG",
    galleryImages: [
      "https://artisanstudios.blob.core.windows.net/website/DiningRoom/IMG_5379.JPG",
    ],
  },
];

const benefits = [
  {
    icon: "✦",
    title: "Personalised designs",
    description: "Interiors tailored to your lifestyle and budget.",
  },
  {
    icon: "₹",
    title: "Transparent pricing",
    description: "Clear estimates and options for every budget.",
  },
  {
    icon: "⌂",
    title: "End-to-end execution",
    description: "From planning to installation.",
  },
];

const offerCategories = [
  {
    title: "Our Services",
    icon: "⌂",
    items: [
      "Modular kitchens",
      "Modular wardrobes",
      "Lighting",
      "Flooring",
      "Electrical work",
      "Civil work",
      "False ceiling",
      "Wall design & painting",
    ],
  },
  {
    title: "Price Benefits",
    icon: "₹",
    items: [
      "Flexible payment options",
      "EMI options",
      "Transparent pricing",
      "No hidden costs",
    ],
  },
  {
    title: "Warranty & Support",
    icon: "✓",
    items: [
      "Product warranty options",
      "After-installation support",
      "Quality-assured materials",
      "Dedicated customer assistance",
    ],
  },
  {
    title: "Design & Technology",
    icon: "✦",
    items: [
      "Personalised interior designs",
      "Space-saving solutions",
      "Durable modular materials",
      "Smart storage solutions",
    ],
  },
];

const ArtisanStudios = () => {
  const appSettings = GetEnvConfig();

  const [submitWebsiteQuote, { isLoading: isSubmitting, error: submitError }] =
    useSubmitWebsiteQuoteMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    homeType: "2 BHK",
  });

  const [submitted, setSubmitted] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<
    (typeof interiorCategories)[number] | null
  >(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openGallery = (category: (typeof interiorCategories)[number]) => {
    setSelectedCategory(category);
    setActiveImageIndex(0);
  };

  const showPreviousImage = () => {
    if (!selectedCategory) return;

    setActiveImageIndex((current) =>
      current === 0 ? selectedCategory.galleryImages.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    if (!selectedCategory) return;

    setActiveImageIndex(
      (current) => (current + 1) % selectedCategory.galleryImages.length,
    );
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await submitWebsiteQuote({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        homeType: formData.homeType as QuoteHomeType,
      }).unwrap();

      if (response.success) {
        setSubmitted(true);
      }
    } catch {
      // Keep the form visible and display an error message.
      setSubmitted(false);
    }
  };
  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const LogoComponent = () => (
    <a
      className="brand-logo"
      href="#home"
      aria-label={`${appSettings.artisanStudios.name} ${appSettings.artisanStudios.subName}`}
    >
      {appSettings.artisanStudios.name}
      <span>{appSettings.artisanStudios.subName}</span>
    </a>
  );

  const QuoteSection = () => (
    <section className="quote-section" id="quote">
      <div className="quote-content">
        <span className="eyebrow">LET'S CREATE YOUR DREAM HOME</span>

        <h2>Ready to transform your space?</h2>

        <p>
          Share a few details. Our design team can help you explore
          possibilities for your home.
        </p>

        <div className="quote-points">
          <span>✓ Personalised design ideas</span>
          <span>✓ Budget-focused recommendations</span>
          <span>✓ A quote tailored to your home</span>
        </div>
      </div>

      <QuoteForm />
    </section>
  );

  const QuoteForm = () => {
    return (
      <form className="quote-form" onSubmit={handleSubmit}>
        <h3>Get your free quote</h3>
        <p>Share your details to receive a personalised estimate.</p>

        {submitted ? (
          <div className="success-message" role="status">
            <h3>Thank You for Your Enquiry!</h3>
            <p>
              Your request for a free home interior quote has been received
              successfully. Our design team will get in touch with you shortly
              to discuss your requirements.
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

            <label htmlFor="customer-phone">Mobile number</label>
            <input
              id="customer-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              placeholder="10-digit mobile number"
              value={formData.phone}
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
              By submitting, you agree to be contacted about your interior
              design enquiry.
            </small>
          </>
        )}
      </form>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setShowQuoteForm(true);
    }, 2000);
  }, []);

  return (
    <main className="home-interiors">
      <div className="announcement-bar">
        Make your dream home a reality
        <span> · </span>
        Get your free interior quote
      </div>

      <header className="site-header">
        <LogoComponent />

        <nav className="main-navigation" aria-label="Main navigation">
          <a href="#designs">Designs</a>
          <a href="#benefits">Why Us</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <button
          className="button primary-button header-cta"
          type="button"
          onClick={scrollToQuote}
        >
          GET FREE QUOTE
          <i className="bi bi-arrow-right" aria-hidden="true"></i>
        </button>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-content">
          <span className="eyebrow">YOUR HOME, YOUR STYLE</span>

          <h1>
            Beautiful homes.
            <br />
            <span>Made for you.</span>
          </h1>

          <p className="hero-description">
            Thoughtfully designed interiors for every home. Discover designs
            that match your taste, space and budget.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              type="button"
              onClick={scrollToQuote}
            >
              GET FREE QUOTE
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </button>

            <a className="text-link" href="#designs">
              Explore designs
            </a>
          </div>

          <div className="hero-highlights">
            <div className="highlight-item">
              <strong>Custom</strong>
              <span>Made for your home</span>
            </div>

            <div className="highlight-item">
              <strong>On budget</strong>
              <span>Options for every space</span>
            </div>

            <div className="highlight-item">
              <strong>End to end</strong>
              <span>Design to installation</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90"
            alt="Modern living room with warm neutral interiors"
          />

          <div className="hero-image-label">
            <span>DESIGN INSPIRATION</span>
            <strong>Spaces that feel like home.</strong>
          </div>
        </div>
      </section>

      <div className="design-section" id="designs">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR STYLE</span>
            <h2>Spaces you'll love coming home to</h2>
            <p>Explore ideas for every corner of your home.</p>
          </div>
          <a className="text-link" href="#quote">
            Design my home →
          </a>
        </div>
        <div className="category-grid">
          {interiorCategories.map((category) => (
            <article className="category-card" key={category.title}>
              <div
                className="category-image-link"
                onClick={() => openGallery(category)}
                data-bs-toggle="modal"
                data-bs-target="#interiorGalleryModal"
                aria-label={`View ${category.title} gallery`}
              >
                <img
                  src={category.image}
                  alt={`${category.title} interior`}
                  loading="lazy"
                />

                <span className="category-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>

              <div className="category-details">
                <h3>{category.title}</h3>
                <p>{category.subtitle}</p>

                <button
                  className="preview-link"
                  type="button"
                  onClick={() => openGallery(category)}
                  data-bs-toggle="modal"
                  data-bs-target="#interiorGalleryModal"
                >
                  View all designs
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <section className="benefits-section" id="benefits">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A BETTER WAY TO DESIGN</span>
            <h2>Everything your home needs</h2>
          </div>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <div className="benefit-icon" aria-hidden="true">
                {benefit.icon}
              </div>

              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="pricing-content">
          <span className="eyebrow">YOUR DREAM HOME STARTS HERE</span>

          <h2>Great design. Thoughtful budgets.</h2>

          <p>
            Tell us about your home and get a personalised interior estimate
            based on your requirements.
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={scrollToQuote}
          >
            GET FREE QUOTE
            <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </button>

          <small>
            Final pricing depends on your space, materials and design choices.
          </small>
        </div>

        <img
          src="https://artisanstudios.blob.core.windows.net/website/DesignConcepts/IMG_7018.JPG"
          alt="Elegant modern home interior"
          loading="lazy"
        />
      </section>

      <QuoteSection />

      <section className="offers-section" id="offers">
        <div className="offers-container">
          <div className="offers-heading">
            <div className="offers-heading-content">
              <span className="eyebrow">DESIGNED AROUND YOU</span>
              <h2>What we offer</h2>
              <p>
                Everything you need to create a beautiful, functional home, from
                design to installation.
              </p>
            </div>

            <button
              className="primary-button offers-cta"
              type="button"
              onClick={scrollToQuote}
            >
              GET FREE QUOTE
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </button>
          </div>

          <div className="offers-grid">
            {offerCategories.map((category) => (
              <article className="offer-card" key={category.title}>
                <div className="offer-card-heading">
                  <div className="offer-icon" aria-hidden="true">
                    {category.icon}
                  </div>

                  <h3>{category.title}</h3>
                </div>

                <ul className="offer-list">
                  {category.items.map((item) => (
                    <li key={item}>
                      <span className="offer-list-marker" aria-hidden="true">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="offer-link"
                  type="button"
                  onClick={scrollToQuote}
                >
                  Enquire now <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-content">
          <h2>Connect with us</h2>

          <p>
            Reach out on WhatsApp or give us a call for the best home design
            experience.
          </p>

          <div className="contact-actions">
            <a
              className="contact-button"
              href={`tel:${appSettings?.artisanStudios.contact.contactnumber}`}
              aria-label="Call us now"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
              </svg>

              <span>Call Now</span>
            </a>

            <a
              className="contact-button whatsapp-button"
              href={`https://wa.me/${appSettings?.artisanStudios.contact.whatsapp.number}?text=${encodeURIComponent(
                appSettings?.artisanStudios.contact.whatsapp.message || "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
            >
              <svg
                viewBox="0 0 32 32"
                width="24"
                height="24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16.01 3C8.84 3 3 8.82 3 15.98c0 2.29.61 4.52 1.77 6.48L3 29l6.72-1.76a13.05 13.05 0 0 0 6.28 1.6h.01C23.17 28.84 29 23.02 29 15.86A12.83 12.83 0 0 0 16.01 3Zm0 23.68c-1.91 0-3.79-.51-5.42-1.49l-.39-.23-3.99 1.04 1.06-3.89-.25-.4a10.7 10.7 0 0 1-1.65-5.73c0-5.9 4.8-10.69 10.71-10.69 2.86 0 5.55 1.12 7.57 3.14a10.62 10.62 0 0 1 3.13 7.56c0 5.9-4.8 10.69-10.71 10.69Zm5.88-8.01c-.32-.16-1.89-.93-2.18-1.04-.29-.1-.5-.16-.71.16-.21.31-.81 1.04-.99 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.84-1.59-1.88-1.78-2.2-.18-.31-.02-.48.14-.64.15-.14.32-.37.48-.55.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.72-.97-2.35-.25-.61-.51-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61 0 1.54 1.12 3.02 1.28 3.23.16.21 2.2 3.36 5.33 4.71.74.32 1.32.51 1.77.65.74.24 1.41.21 1.94.13.59-.09 1.89-.77 2.15-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
              </svg>

              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <LogoComponent />

        <p>Thoughtful interiors for modern homes.</p>

        <div className="footer-links">
          <a href="#designs">Explore designs</a>
          <a href="#benefits">Why choose us</a>
          <a href="#quote">Get a quote</a>
        </div>

        <small>
          <i className="bi bi-c-circle"></i>
          {new Date().getFullYear()} {appSettings.name}. All rights reserved.
          <NavLink
            to={ROUTE_URL.WEBSITE.TERMS_OF_USE}
            className="footer-link ps-2"
          >
            Terms of Use
          </NavLink>
        </small>
      </footer>

      <a
        className="whatsapp-floating"
        href={`https://wa.me/${appSettings?.artisanStudios.contact.whatsapp.number}?text=${encodeURIComponent(
          appSettings?.artisanStudios.contact.whatsapp.message || "",
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.01 3C8.84 3 3 8.82 3 15.98c0 2.29.61 4.52 1.77 6.48L3 29l6.72-1.76a13.05 13.05 0 0 0 6.28 1.6h.01C23.17 28.84 29 23.02 29 15.86A12.83 12.83 0 0 0 16.01 3Zm0 23.68c-1.91 0-3.79-.51-5.42-1.49l-.39-.23-3.99 1.04 1.06-3.89-.25-.4a10.7 10.7 0 0 1-1.65-5.73c0-5.9 4.8-10.69 10.71-10.69 2.86 0 5.55 1.12 7.57 3.14a10.62 10.62 0 0 1 3.13 7.56c0 5.9-4.8 10.69-10.71 10.69Zm5.88-8.01c-.32-.16-1.89-.93-2.18-1.04-.29-.1-.5-.16-.71.16-.21.31-.81 1.04-.99 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.84-1.59-1.88-1.78-2.2-.18-.31-.02-.48.14-.64.15-.14.32-.37.48-.55.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.72-.97-2.35-.25-.61-.51-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61 0 1.54 1.12 3.02 1.28 3.23.16.21 2.2 3.36 5.33 4.71.74.32 1.32.51 1.77.65.74.24 1.41.21 1.94.13.59-.09 1.89-.77 2.15-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </a>

      <ModelApp
        show={showQuoteForm}
        modelSize="sm"
        onClose={() => setShowQuoteForm(false)}
      >
        <QuoteForm />
      </ModelApp>

      <div
        className="modal fade interior-gallery-modal"
        id="interiorGalleryModal"
        tabIndex={-1}
        aria-labelledby="interiorGalleryTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <span className="eyebrow">DESIGN INSPIRATION</span>

                <h2 className="gallery-title" id="interiorGalleryTitle">
                  {selectedCategory?.title ?? "Explore designs"}
                </h2>

                <p className="gallery-subtitle">{selectedCategory?.subtitle}</p>
              </div>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close gallery"
              />
            </div>

            {selectedCategory && (
              <div className="gallery-content">
                <div className="gallery-main-image">
                  <img
                    src={selectedCategory.galleryImages[activeImageIndex]}
                    alt={`${selectedCategory.title} design ${activeImageIndex + 1}`}
                  />

                  {selectedCategory.galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="gallery-nav gallery-prev"
                        onClick={showPreviousImage}
                        aria-label="Previous image"
                      >
                        ‹
                      </button>

                      <button
                        type="button"
                        className="gallery-nav gallery-next"
                        onClick={showNextImage}
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </>
                  )}

                  <span className="gallery-counter">
                    {activeImageIndex + 1} /{" "}
                    {selectedCategory.galleryImages.length}
                  </span>
                </div>

                <div className="gallery-thumbnails">
                  {selectedCategory.galleryImages.map((image, index) => (
                    <button
                      type="button"
                      className={`gallery-thumbnail ${
                        activeImageIndex === index ? "active" : ""
                      }`}
                      key={`${image}-${index}`}
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={activeImageIndex === index}
                    >
                      <img src={image} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArtisanStudios;

import "./image-viewer.scss";

import { useEffect } from "react";

const ImageViewer = () => {
  useEffect(() => {
    // Ensure the elements are properly typed
    const images = document.querySelectorAll<HTMLImageElement>(".images img");
    const fullImage = document.getElementById("full-image") as HTMLImageElement;
    const imageViewer = document.getElementById("image-viewer") as HTMLElement;
    const closeButton = document.querySelector(
      "#image-viewer .close"
    ) as HTMLElement;

    // Add click event listeners for image elements
    images.forEach((image) => {
      image.addEventListener("click", () => {
        if (fullImage && imageViewer) {
          fullImage.src = (image as HTMLImageElement).src;
          imageViewer.style.display = "block";
          document.body.classList.add("no-scroll"); // Disable body scroll
        }
      });
    });

    // Add click event listener for close button
    if (closeButton && imageViewer) {
      closeButton.addEventListener("click", () => {
        imageViewer.style.display = "none";
        document.body.classList.remove("no-scroll"); // Re-enable body scroll
      });
    }
  }, []);

  return (
    <>
      <div className="images">
        &times;
        <img
          src="https://www.w3schools.com/howto/img_fjords.jpg"
          alt=""
          width="300"
          height="200"
        />
        <img
          src="https://www.w3schools.com/howto/img_fjords.jpg"
          alt=""
          width="300"
          height="200"
        />
        <img
          src="https://www.w3schools.com/howto/img_fjords.jpg"
          alt=""
          width="300"
          height="200"
        />
      </div>

      <div id="image-viewer">
        <span className="close">&times;</span>
        <img className="modal-content" id="full-image" />
      </div>
    </>
  );
};

export default ImageViewer;

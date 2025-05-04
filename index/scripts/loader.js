const loader = document.getElementById("loader");

export function showLoader(message = "Loading...") {
  if (loader) {
    // Check if the message div already exists
    let messageDiv = loader.querySelector(".loader-message");
    if (!messageDiv) {
      // If it doesn't exist, create it
      messageDiv = document.createElement("div");
      messageDiv.className = "loader-message font-medium text-md lg:text-lg";
      loader.appendChild(messageDiv);
    }
    // Update the message
    messageDiv.textContent = message;
    loader.style.display = "flex";
    loader.style.flexDirection = "column";
    loader.style.alignItems = "center";
    loader.style.justifyContent = "center";
    loader.style.gap = "4px";
  } else {
    console.error("Loader element not found");
  }
}

export function hideLoader() {
  if (loader) {
    loader.style.display = "none";
  } else {
    console.error("Loader element not found");
  }
}

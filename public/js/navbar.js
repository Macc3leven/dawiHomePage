const closeBtn = document.getElementById("closeBtn");
const toggleNavButton = document.getElementById("toggleNavButton");
const sidePanel = document.getElementById("sidePanel");

// Function to toggle the side panel
function toggleSidePanel() {
  sidePanel.classList.toggle("open");
}

// Add click event listener to the button
toggleNavButton.addEventListener("click", toggleSidePanel);
closeBtn.addEventListener("click", toggleSidePanel);
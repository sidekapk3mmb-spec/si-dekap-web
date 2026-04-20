document.addEventListener("DOMContentLoaded", () => {
  // Load Footer
  fetch("footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal memuat footer.");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
});
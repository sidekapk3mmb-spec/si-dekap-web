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
      
      // Initialize SOS Button functionality
      const sosBtn = document.getElementById("sosBtn");
      const sosMenu = document.getElementById("sosMenu");
      
      if(sosBtn && sosMenu) {
        sosBtn.addEventListener("click", function(e) {
          e.stopPropagation();
          sosMenu.classList.toggle("active");
          sosBtn.classList.toggle("active");
        });

        document.addEventListener("click", function(e) {
          if (!sosMenu.contains(e.target) && !sosBtn.contains(e.target)) {
            sosMenu.classList.remove("active");
            sosBtn.classList.remove("active");
          }
        });
      }
    })
    .catch((error) => console.error("Error loading footer:", error));
});
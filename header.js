// File: header.js

document.addEventListener("DOMContentLoaded", () => {
  // Mencari elemen dengan id="header-placeholder" di HTML kamu
  const headerPlaceholder = document.getElementById("header-placeholder");

  if (headerPlaceholder) {
    // Memuat isi header.html
    fetch("header.html")
      .then((response) => {
        if (!response.ok) throw new Error("Gagal memuat header");
        return response.text();
      })
      .then((data) => {
        headerPlaceholder.innerHTML = data;
        // Jalankan logika menu setelah header berhasil dimuat
        setupUnifiedMobileNav();
      })
      .catch((error) => console.error(error));
  }
});

// Fungsi mengatur logika aktif dan dropdown menu
function setupUnifiedMobileNav() {
  const menuToggle = document.getElementById("menu-toggle");
  const navItems = document.querySelectorAll(".nav-item.has-dropdown");
  const allNavLinks = document.querySelectorAll(".nav-menu a");
  
  // Deteksi halaman saat ini
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  
  // Peta penanda menu aktif
  const groupMap = {
    "k3.html": "k3",
    "peraturan.html": "k3",
    "hazards.html": "bahaya",
    "simbol-b3.html": "bahaya",
    "limbah.html": "limbah",
    "msds.html": "msds",
    "p3k.html": "bantuan",
    "form-lapor.html": "bantuan",
  };

  // Menandai menu yang sedang aktif
  allNavLinks.forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === path) {
      link.classList.add("is-active");
    }
  });

  const activeGroup = groupMap[path];
  if (activeGroup) {
    const groupItem = document.querySelector('.nav-item[data-group="' + activeGroup + '"]');
    if (groupItem && groupItem.classList.contains("has-dropdown")) {
      groupItem.classList.add("group-active");
    }
  }

  // Interaksi klik dropdown untuk versi Mobile
  navItems.forEach((item) => {
    const trigger = item.querySelector(".nav-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        navItems.forEach((other) => {
          if (other !== item) other.classList.remove("active");
        });
        item.classList.toggle("active");
      }
    });
  });

  // Tutup menu jika link diklik
  allNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const isTrigger = link.classList.contains("nav-trigger");
      if (window.innerWidth <= 992 && menuToggle && !isTrigger) {
        menuToggle.checked = false;
        navItems.forEach((item) => item.classList.remove("active"));
      }
    });
  });

  // Tutup menu jika klik area luar navbar
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 992 && menuToggle && menuToggle.checked) {
      const navbar = document.querySelector(".navbar");
      if (navbar && !navbar.contains(e.target)) {
        menuToggle.checked = false;
        navItems.forEach((item) => item.classList.remove("active"));
      }
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const heroImages = [
    "mmb.jpg",
    "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80",
  ];

  const heroSection = document.getElementById("beranda");
  const slideIndicator = document.getElementById("slideIndicator");
  const bgLayerA = document.getElementById("heroBgA");
  const bgLayerB = document.getElementById("heroBgB");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  const checkboxes = document.querySelectorAll(".k3-check");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const checkHint = document.getElementById("checkHint");
  const resetChecklist = document.getElementById("resetChecklist");

  const backToTop = document.getElementById("backToTop");
  const scrollProgress = document.getElementById("scrollProgress");
  const reveals = document.querySelectorAll(".reveal");

  const smartSearch = document.getElementById("smartSearch");
  const resultCards = document.querySelectorAll(".search-card");
  const noResults = document.getElementById("noResults");

  const featureCards = document.querySelectorAll(".feature-card");
  const previewIcon = document.getElementById("previewIcon");
  const previewTitle = document.getElementById("previewTitle");
  const previewDesc = document.getElementById("previewDesc");
  const previewCard1Title = document.getElementById("previewCard1Title");
  const previewCard1Desc = document.getElementById("previewCard1Desc");
  const previewCard2Title = document.getElementById("previewCard2Title");
  const previewCard2Desc = document.getElementById("previewCard2Desc");
  const previewTags = document.getElementById("previewTags");

  let currentIndex = 0;
  let activeLayer = 0;

  heroImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  if (bgLayerA) {
    bgLayerA.style.backgroundImage = `url('${heroImages[0]}')`;
    bgLayerA.classList.add("active");
  }

  if (bgLayerB) {
    bgLayerB.style.backgroundImage = `url('${heroImages[1] || heroImages[0]}')`;
  }

  if (slideIndicator) {
    slideIndicator.innerText = `1 / ${heroImages.length}`;
  }

  function updateBackground() {
    const incomingLayer = activeLayer === 0 ? bgLayerB : bgLayerA;
    const outgoingLayer = activeLayer === 0 ? bgLayerA : bgLayerB;

    if (incomingLayer) {
      incomingLayer.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
      incomingLayer.classList.add("active");
    }

    if (outgoingLayer) {
      outgoingLayer.classList.remove("active");
    }

    activeLayer = activeLayer === 0 ? 1 : 0;

    if (heroSection) {
      heroSection.style.backgroundImage = "none";
    }

    if (slideIndicator) {
      slideIndicator.innerText = `${currentIndex + 1} / ${heroImages.length}`;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % heroImages.length;
      updateBackground();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + heroImages.length) % heroImages.length;
      updateBackground();
    });
  }

  if (heroImages.length > 1) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % heroImages.length;
      updateBackground();
    }, 6500);
  }

  function updateChecklistProgress() {
    if (!progressFill || !progressText || !checkHint || checkboxes.length === 0) return;
    const checkedCount = document.querySelectorAll(".k3-check:checked").length;
    const percentage = Math.round((checkedCount / checkboxes.length) * 100);

    progressFill.style.width = percentage + "%";

    if (percentage === 100) {
      progressText.innerText = "100% - Anda Siap Masuk Lab!";
      progressText.style.color = "var(--white)";
      checkHint.textContent = "Mantap. Secara simulasi kamu siap masuk lab. Tinggal pastikan praktik aslinya juga nggak zonk.";
    } else if (percentage >= 60) {
      progressText.innerText = percentage + "% - Hampir Siap";
      progressText.style.color = "var(--white)";
      checkHint.textContent = "Sudah lumayan aman, tapi jangan sok pede dulu. Lengkapi sampai full biar nggak jadi episode insiden.";
    } else {
      progressText.innerText = percentage + "% Selesai";
      progressText.style.color = percentage > 50 ? "var(--white)" : "var(--dark-blue)";
      checkHint.textContent = "Checklist ini simulasi dasar. Lengkapi semua item supaya kesiapanmu nggak cuma formalitas lucu.";
    }
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      this.parentElement.classList.toggle("active", this.checked);
      updateChecklistProgress();
    });
  });

  if (resetChecklist) {
    resetChecklist.addEventListener("click", () => {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.parentElement.classList.remove("active");
      });
      updateChecklistProgress();
    });
  }

  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + "%";

    if (scrollTop > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((item) => revealObserver.observe(item));

  function filterSearch() {
    if (!smartSearch || !noResults) return;
    const keyword = smartSearch.value.toLowerCase().trim();
    let visibleCount = 0;

    resultCards.forEach((card) => {
      const text = card.dataset.search.toLowerCase();
      if (text.includes(keyword)) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }

  if (smartSearch) {
    smartSearch.addEventListener("input", filterSearch);
  }

  function updatePreview(card) {
    featureCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");

    const iconClass = card.dataset.previewIcon;
    const title = card.dataset.previewTitle;
    const desc = card.dataset.previewDesc;
    const card1 = card.dataset.previewCard1.split("|");
    const card2 = card.dataset.previewCard2.split("|");
    const tags = card.dataset.previewTags.split(",");

    previewIcon.innerHTML = `<i class="bi ${iconClass}"></i>`;
    previewTitle.textContent = title;
    previewDesc.textContent = desc;
    previewCard1Title.textContent = card1[0];
    previewCard1Desc.textContent = card1[1];
    previewCard2Title.textContent = card2[0];
    previewCard2Desc.textContent = card2[1];

    previewTags.innerHTML = "";
    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "mock-badge";
      span.textContent = tag.trim();
      previewTags.appendChild(span);
    });
  }

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => updatePreview(card));
    card.addEventListener("focusin", () => updatePreview(card));
    card.addEventListener("click", () => updatePreview(card));
  });

  window.addEventListener("scroll", updateScrollUI);
  updateScrollUI();
  updateChecklistProgress();
  filterSearch();
});
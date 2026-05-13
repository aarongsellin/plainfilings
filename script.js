// Coming soon modal
var modal = document.getElementById("comingSoonModal");

// Section anchors that should scroll normally, not open the modal
var NAV_ANCHORS = ["#pricing", "#how-it-works", "#faq"];

document
  .querySelectorAll(".btn--primary, .btn--outline, .btn--cta")
  .forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var href = btn.getAttribute("href");
      if (href && NAV_ANCHORS.indexOf(href) !== -1) return; // let nav/scroll links through
      e.preventDefault();
      window.location.href = "https://accounts.plainfilings.com";
    });
  });

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  // Reset form
  modal.querySelector(".modal__input").value = "";
  modal.querySelector(".modal__form").hidden = false;
  modal.querySelector(".modal__note").hidden = true;
}

function handleModalSubmit(e) {
  e.preventDefault();
  modal.querySelector(".modal__form").hidden = true;
  modal.querySelector(".modal__note").hidden = false;
}

// FAQ accordion
document.querySelectorAll(".faq-item__question").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var item = btn.closest(".faq-item");
    var answer = item.querySelector(".faq-item__answer");
    var isOpen = !answer.hidden;

    // Close all items first
    document.querySelectorAll(".faq-item").forEach(function (i) {
      i.querySelector(".faq-item__answer").hidden = true;
      i.querySelector(".faq-item__question").setAttribute(
        "aria-expanded",
        "false",
      );
      i.classList.remove("faq-item--open");
    });

    // Open the clicked item if it was previously closed
    if (!isOpen) {
      answer.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      item.classList.add("faq-item--open");
    }
  });
});

// Pricing toggle (index2.html)
var pricingToggle = document.querySelector(".pricing-toggle");
if (pricingToggle) {
  var pricing2Grid = document.getElementById("pricing2Grid");

  function setPricingBilling(billing) {
    pricingToggle
      .querySelectorAll(".pricing-toggle__btn")
      .forEach(function (btn) {
        var active = btn.getAttribute("data-billing") === billing;
        btn.classList.toggle("pricing-toggle__btn--active", active);
        btn.setAttribute("aria-pressed", String(active));
      });
    if (pricing2Grid) {
      pricing2Grid
        .querySelectorAll("[data-price-annual]")
        .forEach(function (el) {
          el.hidden = billing !== "annual";
        });
      pricing2Grid
        .querySelectorAll("[data-price-monthly]")
        .forEach(function (el) {
          el.hidden = billing !== "monthly";
        });
    }
  }

  pricingToggle
    .querySelectorAll(".pricing-toggle__btn")
    .forEach(function (btn) {
      btn.addEventListener("click", function () {
        setPricingBilling(btn.getAttribute("data-billing"));
      });
    });
}

// Scroll animations
setupScrollAnimations();

function setupScrollAnimations() {
  var roadmap = document.querySelector(".discovery-roadmap");
  var revealTargets = document.querySelectorAll(
    ".video-card, .pricing-card, .feature-card, .faq-item, .final-cta__inner",
  );

  revealTargets.forEach(function (el, idx) {
    el.classList.add("scroll-fade");
    el.style.setProperty("--reveal-delay", (idx % 4) * 90 + "ms");
  });

  var roadmapNodes = document.querySelectorAll(".discovery-roadmap__node");
  roadmapNodes.forEach(function (node, idx) {
    node.style.setProperty("--node-delay", idx * 140 + "ms");
  });

  if (!window.IntersectionObserver) {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    if (roadmap) roadmap.classList.add("discovery-roadmap--visible");
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });

  if (roadmap) {
    var roadmapObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          roadmap.classList.add("discovery-roadmap--visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    roadmapObserver.observe(roadmap);
  }
}

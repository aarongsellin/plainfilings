// Coming soon modal
var modal = document.getElementById('comingSoonModal');

// Section anchors that should scroll normally, not open the modal
var NAV_ANCHORS = ['#pricing', '#how-it-works', '#faq'];

document.querySelectorAll('.btn--primary, .btn--outline, .btn--cta').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    var href = btn.getAttribute('href');
    if (href && NAV_ANCHORS.indexOf(href) !== -1) return; // let nav/scroll links through
    e.preventDefault();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal__input').focus();
  });
});

document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  // Reset form
  modal.querySelector('.modal__input').value = '';
  modal.querySelector('.modal__form').hidden = false;
  modal.querySelector('.modal__note').hidden = true;
}

function handleModalSubmit(e) {
  e.preventDefault();
  modal.querySelector('.modal__form').hidden = true;
  modal.querySelector('.modal__note').hidden = false;
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

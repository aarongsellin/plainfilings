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

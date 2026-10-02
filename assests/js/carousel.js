document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((container) => {
    const track = container.querySelector(".carousel-track");
    const items = track.querySelectorAll(".carousel-item");
    const leftArrow = container.querySelector(".carousel-arrow.left");
    const rightArrow = container.querySelector(".carousel-arrow.right");

    let currentIndex = 0;
    // const itemsPerView = 1; // Adjust based on your layout
    // const itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(items[0]).marginRight || 0);
    // const totalItems = items.length;

    const itemStyle = getComputedStyle(items[0]);
    const itemWidth = items[0].offsetWidth;
    const gap = parseFloat(itemStyle.marginRight) || parseFloat(getComputedStyle(track).gap) || 0;

    const scrollAmount = itemWidth + gap;
    const itemsPerView = Math.floor(track.offsetWidth / scrollAmount);
    const maxIndex = items.length - itemsPerView;

    // Function to update carousel position
    function updateCarousel() {
      const offset = currentIndex * scrollAmount;
      track.style.transform = `translateX(-${offset}px)`;
    }

    // Arrow navigation
    leftArrow.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    rightArrow.addEventListener("click", () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Touch support
    let startX = 0;
    let currentTranslate = 0;
    let isDragging = false;

    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    track.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - startX;
      track.style.transition = "none";
      track.style.transform = `translateX(${currentTranslate + deltaX}px)`;
    });

    track.addEventListener("touchend", (e) => {
      isDragging = false;
      const deltaX = e.changedTouches[0].clientX - startX;
      track.style.transition = "transform 0.5s ease-in-out";

      if (deltaX > 50 && currentIndex > 0) {
        currentIndex--;
      } else if (deltaX < -50 && currentIndex < maxIndex) {
        currentIndex++;
      }

      currentTranslate = -(currentIndex * scrollAmount);
      track.style.transform = `translateX(${currentTranslate}px)`;
    });

    // Initialize position
    updateCarousel();
  });
});
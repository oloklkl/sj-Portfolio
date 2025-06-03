const intro = document.querySelector(".contact-intro");
const wrapper = document.querySelector(".contact-img-wrapper");
let isAnimating = false;
let currentlyVisible = false;

function openAnimation() {
  if (isAnimating || currentlyVisible) return;

  isAnimating = true;
  currentlyVisible = true;

  // 초기 상태 복구
  wrapper.classList.remove("split");
  intro.classList.remove("hide");

  // 리플로우 강제
  void wrapper.offsetWidth;

  // 1.5초 기다린 후 찢어지는 애니메이션 시작
  setTimeout(() => {
    wrapper.classList.add("split");

    setTimeout(() => {
      intro.classList.add("hide"); // 사라짐 효과

      setTimeout(() => {
        isAnimating = false;
      }, 500); // fade out 시간과 맞춤
    }, 2000); // split 애니메이션 시간과 맞춤
  }, 1500); // 1.5초 딜레이
}

function resetToClosed() {
  if (isAnimating) return; // 애니메이션 중에는 리셋하지 않음

  currentlyVisible = false;
  intro.classList.add("hide");
  wrapper.classList.remove("split");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        if (!currentlyVisible) {
          openAnimation();
        }
      } else {
        if (currentlyVisible && !isAnimating) {
          resetToClosed();
        }
      }
    });
  },
  {
    threshold: 0.5, // 단일 threshold 값 사용
    rootMargin: "0px",
  }
);

observer.observe(intro);

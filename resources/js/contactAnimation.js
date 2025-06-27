const intro = document.querySelector(".contact-intro");
const wrapper = document.querySelector(".contact-img-wrapper");
let isAnimating = false;
let currentlyVisible = false;

// 📌 화면 너비에 따라 이미지 src 바꾸는 함수
function updateContactImages() {
  const contactImg = document.querySelector(".contact-img");
  const meImg = document.querySelector(".me-img");
  const width = window.innerWidth;

  if (width <= 499) {
    contactImg.src = "../resources/images/component/contact/499-up.png";
    meImg.src = "../resources/images/component/contact/499-down.png";
  } else if (width <= 599) {
    contactImg.src = "../resources/images/component/contact/599-up.png";
    meImg.src = "../resources/images/component/contact/599-down.png";
  } else if (width <= 799) {
    contactImg.src = "../resources/images/component/contact/799-up.png";
    meImg.src = "../resources/images/component/contact/799-down.png";
  } else if (width <= 999) {
    contactImg.src = "../resources/images/component/contact/999-up.png";
    meImg.src = "../resources/images/component/contact/999-down.png";
  } else if (width <= 1399) {
    contactImg.src = "../resources/images/component/contact/1399-up.png";
    meImg.src = "../resources/images/component/contact/1399-down.png";
  } else {
    contactImg.src = "../resources/images/component/contact/contact.png";
    meImg.src = "../resources/images/component/contact/me.png";
  }
}

// 📌 섹션 등장 시 애니메이션 실행
function openAnimation() {
  if (isAnimating || currentlyVisible) return;

  isAnimating = true;
  currentlyVisible = true;

  // 초기 상태 복구
  wrapper.classList.remove("split");
  intro.classList.remove("hide");

  // 리플로우 강제
  void wrapper.offsetWidth;

  // 1초 기다린 후 찢어지는 애니메이션 시작
  setTimeout(() => {
    wrapper.classList.add("split");

    setTimeout(() => {
      intro.classList.add("hide"); // 사라짐 효과

      setTimeout(() => {
        isAnimating = false;
      }, 500); // fade out 시간
    }, 2000); // split 애니메이션 시간
  }, 1000); // 딜레이
}

// 📌 화면에서 벗어날 때 원상태로 복귀
function resetToClosed() {
  if (isAnimating) return;

  currentlyVisible = false;
  intro.classList.add("hide");
  wrapper.classList.remove("split");
}

// 📌 섹션 보일 때 자동 실행 감지
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
    threshold: 0.5,
    rootMargin: "0px",
  }
);

observer.observe(intro);

// 📌 로딩 & 리사이즈 시 이미지 경로 반응형 적용
window.addEventListener("load", updateContactImages);
window.addEventListener("resize", updateContactImages);

let aboutHasRun = false; // 애니메이션 실행 여부 체크

function runAboutAnimation() {
  const aboutMotion = document.querySelector(".about-motion");
  if (!aboutMotion || aboutHasRun) return; // 이미 실행됐으면 종료

  const letters = aboutMotion.querySelectorAll(".letter");

  letters.forEach((letter) => {
    if (letter.textContent.trim() === "" || letter.textContent === "\u00A0") return;

    const wordElements = Array.from(letters).filter((el) => el.textContent.trim() !== "" && el.textContent !== "\u00A0");
    const wordIndex = wordElements.indexOf(letter);
    const isEven = wordIndex % 2 === 0;
    const delay = isEven ? 0.3 : 0.6;
    const startDistance = isEven ? -2000 : -2500;
    const startY = isEven ? 0 : -150;

    gsap.fromTo(
      letter,
      { opacity: 0, scale: 0.1, rotateY: 0, z: startDistance, y: startY },
      {
        opacity: 1,
        scale: 1,
        rotateY: 360,
        z: 0,
        y: 0,
        duration: 1.7,
        delay: delay,
        ease: "back.out(1.4)",
      }
    );
  });

  aboutHasRun = true; // 실행 완료 체크
}

// 스크롤 진입 감지
function checkAboutInView() {
  const aboutMotion = document.querySelector(".about-motion");
  if (!aboutMotion) return;

  const rect = aboutMotion.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 화면 50% 정도 들어오면 실행
  if (rect.top < windowHeight * 0.5 && rect.bottom > 0) {
    runAboutAnimation();
  } else {
    // 섹션 벗어나면 초기화 -> 다시 진입 시 재실행 가능
    aboutHasRun = false;
  }
}

let scrollTimer = null;
window.addEventListener("scroll", () => {
  if (scrollTimer) return;
  scrollTimer = setTimeout(() => {
    checkAboutInView();
    scrollTimer = null;
  }, 16);
});

// 초기 실행 체크 (페이지 진입 시 바로 보이면)
checkAboutInView();

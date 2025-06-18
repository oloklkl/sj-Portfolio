function updateScrollAnimation() {
  const aboutMotion = document.querySelector(".about-motion");
  const letters = aboutMotion.querySelectorAll(".letter");
  const rect = aboutMotion.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 애니메이션 시작/끝 지점을 더 넓게 설정 (150vh 활용)
  if (rect.top < windowHeight * 0.8 && rect.bottom > -windowHeight * 0.3) {
    // 전체 스크롤 구간을 더 넓게 설정
    const startPoint = windowHeight * 0.7;
    const endPoint = -windowHeight * 0.3;
    const totalDistance = startPoint - endPoint;

    // 0~1 사이의 전체 진행률
    const overallProgress = Math.max(0, Math.min(1, (startPoint - rect.top) / totalDistance));

    letters.forEach((letter, index) => {
      // 공백(&nbsp;)은 애니메이션 적용하지 않음
      if (letter.textContent.trim() === "" || letter.textContent === "\u00A0") {
        return;
      }

      // 실제 단어들만 카운트해서 홀수/짝수 구분
      const wordElements = Array.from(letters).filter((el) => el.textContent.trim() !== "" && el.textContent !== "\u00A0");
      const wordIndex = wordElements.indexOf(letter);
      const isEven = wordIndex % 2 === 0;

      // 홀수/짝수 시간차를 더 명확하게 (0.2 차이)
      const baseDelay = isEven ? 0.1 : 0.3;

      // 각 레터의 애니메이션 구간을 0.5로 설정 (더 천천히)
      const animationDuration = 0.5;

      // 개별 레터 진행률 계산
      const letterProgress = Math.max(0, Math.min(1, (overallProgress - baseDelay) / animationDuration));

      // 부드러운 easing 적용 (easeOutCubic)
      const easedProgress = 1 - Math.pow(1 - letterProgress, 3);

      // 애니메이션 효과 (늦게 시작하는 단어는 더 멀리서 + 위에서)
      const startDistance = isEven ? -2500 : -3000; // 홀수(늦게 시작)는 더 멀리서
      const startY = isEven ? 0 : -200; // 홀수는 위에서 시작
      const endY = isEven ? 0 : 0; // 홀수는 정면 위치로 도착

      const scale = 0.1 + 0.9 * easedProgress;
      const translateZ = startDistance + Math.abs(startDistance) * easedProgress;
      const translateY = startY + (endY - startY) * easedProgress; // 위에서 아래로
      const rotateY = 360 * easedProgress;
      const opacity = easedProgress;

      letter.style.opacity = opacity;
      letter.style.transform = `translateZ(${translateZ}px) translateY(${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`;
    });
  } else {
    // 애니메이션 범위를 벗어나면 초기 상태로 (늦게 시작하는 단어는 더 멀리 + 위에서)
    letters.forEach((letter, index) => {
      // 공백은 건드리지 않음
      if (letter.textContent.trim() === "" || letter.textContent === "\u00A0") {
        return;
      }

      const wordElements = Array.from(letters).filter((el) => el.textContent.trim() !== "" && el.textContent !== "\u00A0");
      const wordIndex = wordElements.indexOf(letter);
      const isEven = wordIndex % 2 === 0;

      const startDistance = isEven ? -1500 : -2500;
      const startY = isEven ? 0 : -200;
      letter.style.opacity = 0;
      letter.style.transform = `translateZ(${startDistance}px) translateY(${startY}px) scale(0.1) rotateY(0deg)`;
    });
  }
}

// 스크롤 이벤트 최적화 (throttle)
let scrollTimer = null;
window.addEventListener("scroll", () => {
  if (scrollTimer) return;
  scrollTimer = setTimeout(() => {
    updateScrollAnimation();
    scrollTimer = null;
  }, 16); // 60fps
});

// 초기 실행
updateScrollAnimation();

window.addEventListener("scroll", () => {
  const introTitle = document.querySelector(".contact-title");
  const introSection = document.querySelector(".contact-intro");

  const introTop = introSection.getBoundingClientRect().top;
  const introBottom = introSection.getBoundingClientRect().bottom;
  const triggerPoint = window.innerHeight * 0.5;

  // 뷰포트 중간을 지나면 실행
  if (introTop < triggerPoint && introBottom > 0) {
    if (!introSection.classList.contains("animating")) {
      // 애니메이션 중복 방지
      introSection.classList.add("animating");

      // 초기화 (이미 숨겨져 있으면 다시 보이게)
      introTitle.classList.remove("split");
      introSection.classList.remove("hide");

      setTimeout(() => {
        introTitle.classList.add("split");

        setTimeout(() => {
          introSection.classList.add("hide");
          introSection.classList.remove("animating"); // 애니메이션 끝나면 플래그 해제
        }, 1000); // split 애니메이션 시간
      }, 2000); // 트리거 후 대기 시간
    }
  }
});

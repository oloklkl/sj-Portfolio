document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const heroLine = document.getElementById("heroLine");
  const aboutSection = document.querySelector(".about");

  let isTransitioning = false;
  let hasTransitioned = false;
  let transitionStarted = false;

  function getInitialHeroLineHeight() {
    const width = window.innerWidth;
    if (width < 600) return 50;
    if (width < 1000) return 80;
    if (width < 1400) return 100;
    return 140;
  }

  function getInitialHeroLineWidth() {
    return 700;
  }

  function startTransition() {
    isTransitioning = true;
    transitionStarted = true;
    document.body.style.overflow = "hidden";

    const rect = heroLine.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const originalLeft = rect.left + scrollLeft;
    const originalTop = rect.top + scrollTop;
    const originalWidth = rect.width;
    const originalHeight = rect.height;

    const placeholder = document.createElement("div");
    placeholder.style.width = originalWidth + "px";
    placeholder.style.height = originalHeight + "px";
    placeholder.style.visibility = "hidden";
    placeholder.id = "heroLinePlaceholder";
    heroLine.parentNode.insertBefore(placeholder, heroLine.nextSibling);

    heroLine.style.position = "fixed";
    heroLine.style.left = rect.left + "px";
    heroLine.style.top = rect.top + "px";
    heroLine.style.width = originalWidth + "px";
    heroLine.style.height = originalHeight + "px";
    heroLine.style.zIndex = "100";
    heroLine.style.transition = "all 2s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(() => {
      heroLine.style.width = "100vw";
      heroLine.style.height = "100vh";
      heroLine.style.left = "0";
      heroLine.style.top = "0";
      heroLine.style.transform = "none";
    }, 100);

    setTimeout(() => {
      heroSection.style.opacity = "0";
      heroSection.style.pointerEvents = "none";
      aboutSection.style.position = "relative";
      aboutSection.style.zIndex = "10";

      document.body.style.overflow = "auto";
      hasTransitioned = true;
      isTransitioning = false;

      setTimeout(() => {
        heroLine.style.display = "none";
      }, 1000);
    }, 1600);
  }

  function resetTransition() {
    isTransitioning = true;

    document.body.style.overflow = "auto";
    heroSection.style.opacity = "1";
    heroSection.style.pointerEvents = "auto";

    heroLine.style.display = "block";
    heroLine.style.position = "relative";
    heroLine.style.width = getInitialHeroLineWidth() + "px";
    heroLine.style.height = getInitialHeroLineHeight() + "px";
    heroLine.style.left = "auto";
    heroLine.style.top = "auto";
    heroLine.style.transform = "none";
    heroLine.style.zIndex = "auto";
    heroLine.style.transition = "none";

    aboutSection.style.position = "static";

    const existingPlaceholder = document.getElementById("heroLinePlaceholder");
    if (existingPlaceholder) existingPlaceholder.remove();

    hasTransitioned = false;
    isTransitioning = false;
    transitionStarted = false;
  }

  // ✅ about 섹션이 화면에 딱 맞게 보일 때
  function isAboutFullyInView() {
    const rect = aboutSection.getBoundingClientRect();
    const isTopAligned = Math.abs(rect.top) < 1;
    const isBottomAligned = Math.abs(rect.bottom - window.innerHeight) < 1;
    return isTopAligned && isBottomAligned;
  }

  // ✅ about 섹션이 조금 지나서 멈췄거나 20px 정도 위에 잘린 상태도 허용
  function isAboutNearlyInView() {
    const rect = aboutSection.getBoundingClientRect();
    // top이 0보다 작거나, 20px 이내로 화면 상단에 잘린 상태면 true
    const topInRange = rect.top <= 0 && rect.top >= -20;
    // bottom이 화면 아래에서 -20px ~ 100px 사이로 잘린 경우도 허용
    const bottomInRange = rect.bottom >= window.innerHeight - 80 && rect.bottom <= window.innerHeight + 20;

    return topInRange || bottomInRange;
  }

  // ✅ wheel 이벤트 - 두 조건 중 하나라도 만족하면 transition 실행
  window.addEventListener(
    "wheel",
    function (e) {
      if (isTransitioning || hasTransitioned || transitionStarted) return;

      if ((isAboutFullyInView() || isAboutNearlyInView()) && e.deltaY > 0) {
        e.preventDefault();
        startTransition();
      }
    },
    { passive: false }
  );

  // ✅ 스크롤 올릴 때 초기화
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (hasTransitioned && scrollY < window.innerHeight / 2 && !isTransitioning) {
      resetTransition();
    }
  });

  // ✅ 새로고침 시 초기 상태 복원
  window.addEventListener("beforeunload", function () {
    document.body.style.overflow = "auto";
    heroSection.style.opacity = "1";
    heroSection.style.pointerEvents = "auto";
    heroLine.style.position = "relative";
    heroLine.style.width = getInitialHeroLineWidth() + "px";
    heroLine.style.height = getInitialHeroLineHeight() + "px";
    heroLine.style.left = "auto";
    heroLine.style.top = "auto";
    heroLine.style.transform = "none";
    heroLine.style.display = "block";
    heroLine.style.transition = "none";
    heroLine.style.zIndex = "auto";
    aboutSection.style.position = "static";

    const existingPlaceholder = document.getElementById("heroLinePlaceholder");
    if (existingPlaceholder) existingPlaceholder.remove();

    hasTransitioned = false;
    isTransitioning = false;
    transitionStarted = false;
  });
});

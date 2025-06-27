document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const heroLine = document.getElementById("heroLine");
  const aboutSection = document.querySelector(".about");

  let isTransitioning = false;
  let hasTransitioned = false;

  // 디바이스 너비에 따라 초기 height 설정 (SCSS 기준)
  function getInitialHeroLineHeight() {
    const width = window.innerWidth;

    if (width < 600) return 50;
    if (width < 1000) return 80;
    if (width < 1400) return 100;
    return 140;
  }

  function getInitialHeroLineWidth() {
    return 700; // 고정값 그대로 유지
  }

  // 스크롤 이벤트 리스너
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const triggerPoint = window.innerHeight * 0.9;

    if (!hasTransitioned && scrollY > triggerPoint && scrollY < window.innerHeight && !isTransitioning) {
      startTransition();
    }

    if (hasTransitioned && scrollY < triggerPoint / 2 && !isTransitioning) {
      resetTransition();
    }
  });

  function startTransition() {
    isTransitioning = true;

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
    if (existingPlaceholder) {
      existingPlaceholder.remove();
    }

    hasTransitioned = false;
    isTransitioning = false;
  }

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
    hasTransitioned = false;
    isTransitioning = false;

    const existingPlaceholder = document.getElementById("heroLinePlaceholder");
    if (existingPlaceholder) {
      existingPlaceholder.remove();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const heroLine = document.getElementById("heroLine");
  const aboutSection = document.querySelector(".about");

  let isTransitioning = false;
  let hasTransitioned = false;

  // 스크롤 이벤트 리스너
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const triggerPoint = window.innerHeight * 0.9;

    // 아래로 스크롤할 때 hero 안에서만 작동
    if (!hasTransitioned && scrollY > triggerPoint && scrollY < window.innerHeight && !isTransitioning) {
      startTransition();
    }

    // 위로 올라오면 초기화
    if (hasTransitioned && scrollY < triggerPoint / 2 && !isTransitioning) {
      resetTransition();
    }
  });

  function startTransition() {
    isTransitioning = true;

    // 스크롤 막기
    document.body.style.overflow = "hidden";

    const rect = heroLine.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const originalLeft = rect.left + scrollLeft;
    const originalTop = rect.top + scrollTop;
    const originalWidth = rect.width;
    const originalHeight = rect.height;

    // placeholder 삽입
    const placeholder = document.createElement("div");
    placeholder.style.width = originalWidth + "px";
    placeholder.style.height = originalHeight + "px";
    placeholder.style.visibility = "hidden";
    placeholder.id = "heroLinePlaceholder";
    heroLine.parentNode.insertBefore(placeholder, heroLine.nextSibling);

    // 고정 위치로 이동
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

      // 스크롤 다시 허용
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

    // 스크롤 다시 잠깐 허용
    document.body.style.overflow = "auto";

    // hero 복원
    heroSection.style.opacity = "1";
    heroSection.style.pointerEvents = "auto";

    heroLine.style.display = "block";
    heroLine.style.position = "relative";
    heroLine.style.width = "700px"; // 초기 크기
    heroLine.style.height = "140px"; // 초기 크기
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

  // 새로고침 또는 페이지 떠날 때도 초기화
  window.addEventListener("beforeunload", function () {
    document.body.style.overflow = "auto";
    heroSection.style.opacity = "1";
    heroSection.style.pointerEvents = "auto";
    heroLine.style.position = "relative";
    heroLine.style.width = "700px";
    heroLine.style.height = "140px";
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

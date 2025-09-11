document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const heroLine = document.getElementById("heroLine");
  const aboutSection = document.querySelector(".about");

  if (!heroSection || !heroLine || !aboutSection) return;

  let isTransitioning = false;
  let hasTransitioned = false;
  let canTriggerTransition = false;
  let isHeaderClick = false;

  function getInitialHeroLineHeight() {
    const width = window.innerWidth;
    if (width < 600) return 60;
    if (width < 1000) return 90;
    if (width < 1400) return 100;
    return 140;
  }

  function getInitialHeroLineWidth() {
    return 700;
  }

  function startTransition() {
    if (isTransitioning || hasTransitioned) return;
    isTransitioning = true;

    const rect = heroLine.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const originalLeft = rect.left + scrollLeft;
    const originalTop = rect.top + scrollTop;
    const originalWidth = rect.width;
    const originalHeight = rect.height;

    // placeholder 생성
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

    const transitionDuration = isHeaderClick ? 2 : 0.8; // 헤더 클릭 느리게, 스크롤 빠르게
    heroLine.style.transition = `all ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1)`;

    setTimeout(() => {
      heroLine.style.width = "100vw";
      heroLine.style.height = "100vh";
      heroLine.style.left = "0";
      heroLine.style.top = "0";
      heroLine.style.transform = "none";
    }, 50);

    // 박스가 커지는 시간 이후 바로 내용 등장
    setTimeout(() => {
      heroSection.style.opacity = "0";
      heroSection.style.pointerEvents = "none";

      aboutSection.style.position = "relative";
      aboutSection.style.zIndex = "10";

      document.body.style.overflow = "auto";
      hasTransitioned = true;
      isTransitioning = false;

      // 박스 숨기기
      setTimeout(() => {
        heroLine.style.display = "none";
      }, 300); // 살짝 지연
    }, transitionDuration * 1000);
  }

  function resetTransition() {
    if (isTransitioning) return;

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
    canTriggerTransition = false;
    isHeaderClick = false;
  }

  // IntersectionObserver로 스크롤 진입 감지
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.9 && !hasTransitioned && !isHeaderClick) {
          canTriggerTransition = true;
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
          canTriggerTransition = false;
        }
      });
    },
    { root: null, threshold: [0.7, 0.9, 1.0] }
  );
  heroObserver.observe(heroSection);

  // 헤더 버튼 클릭
  function handleHeaderHeroClick() {
    if (!isTransitioning && !hasTransitioned) {
      isHeaderClick = true;
      document.body.style.overflow = "hidden";
      heroSection.scrollIntoView({ behavior: "auto" });
      setTimeout(() => {
        canTriggerTransition = true;
      }, 100);
    }
  }

  const headerHeroButtons = document.querySelectorAll('.m0 a[href="#hero"]');
  headerHeroButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      handleHeaderHeroClick();
    });
  });

  // 휠 이벤트
  window.addEventListener(
    "wheel",
    (e) => {
      if (!isTransitioning && !hasTransitioned && canTriggerTransition && e.deltaY > 0) {
        e.preventDefault();
        document.body.style.overflow = "hidden";
        startTransition();
        canTriggerTransition = false;
      }
    },
    { passive: false }
  );

  // 모바일 터치 이벤트
  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => (touchStartY = e.touches[0].clientY));
  window.addEventListener("touchend", (e) => {
    const deltaY = touchStartY - e.changedTouches[0].clientY;
    if (!isTransitioning && !hasTransitioned && canTriggerTransition && deltaY > 120) {
      document.body.style.overflow = "hidden";
      startTransition();
      canTriggerTransition = false;
    }
  });

  // 스크롤 위로 올리면 리셋
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (hasTransitioned && window.scrollY < heroSection.offsetHeight * 0.3 && !isTransitioning) {
        resetTransition();
      }
    }, 50);
  });

  // 초기화
  function initializePage() {
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
    canTriggerTransition = false;
    isHeaderClick = false;
  }

  initializePage();
  window.addEventListener("beforeunload", initializePage);
  window.addEventListener("resize", () => {
    if (!hasTransitioned && !isTransitioning) {
      heroLine.style.width = getInitialHeroLineWidth() + "px";
      heroLine.style.height = getInitialHeroLineHeight() + "px";
    }
  });
});

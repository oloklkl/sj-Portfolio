document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const heroLine = document.getElementById("heroLine");
  const aboutSection = document.querySelector(".about");

  let isTransitioning = false;
  let hasTransitioned = false;
  let canTriggerTransition = false;
  let isHeaderClick = false;

  if (!heroSection || !heroLine || !aboutSection) return;

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
    if (isTransitioning || hasTransitioned) return;

    isTransitioning = true;

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
    }, 50);

    setTimeout(() => {
      heroSection.style.opacity = "0";
      heroSection.style.pointerEvents = "none";
      aboutSection.style.position = "relative";
      aboutSection.style.zIndex = "10";

      document.body.style.overflow = "auto"; // 트랜지션 끝난 후 스크롤 가능
      hasTransitioned = true;
      isTransitioning = false;

      setTimeout(() => {
        heroLine.style.display = "none";
      }, 800);
    }, 1600);
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

  // ✅ hero 섹션 감시 (스크롤로 도달했을 때 트리거 준비)
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8 && !hasTransitioned && !isHeaderClick) {
          canTriggerTransition = true;
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
          canTriggerTransition = false;
        }
      });
    },
    {
      root: null,
      threshold: [0.5, 0.8, 1.0],
    }
  );

  heroObserver.observe(heroSection);

  function handleHeaderHeroClick() {
    if (!isTransitioning && !hasTransitioned) {
      isHeaderClick = true;
      document.body.style.overflow = "hidden"; // ✅ 바로 스크롤 방지
      heroSection.scrollIntoView({ behavior: "auto" }); // 즉시 이동
      setTimeout(() => {
        canTriggerTransition = true;
      }, 100);
    }
  }

  // ✅ header에서 hero로 이동하는 버튼 처리
  const headerHeroButtons = document.querySelectorAll('.m0 a[href="#hero"]');
  if (headerHeroButtons.length > 0) {
    headerHeroButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        handleHeaderHeroClick();
      });
    });
  }

  // ✅ wheel 이벤트에서 트리거
  window.addEventListener(
    "wheel",
    function (e) {
      if (!isTransitioning && !hasTransitioned && canTriggerTransition && e.deltaY > 0) {
        e.preventDefault();
        document.body.style.overflow = "hidden"; // ✅ 스크롤 막고
        startTransition(); // 트랜지션 실행
        canTriggerTransition = false;
      }
    },
    { passive: false }
  );

  // ✅ 스크롤 위로 올릴 때 리셋
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      if (hasTransitioned && scrollY < heroSection.offsetHeight * 0.3 && !isTransitioning) {
        resetTransition();
      }
    }, 50);
  });

  // ✅ 초기화 함수
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

  // ✅ 초기화 실행
  initializePage();

  // 새로고침 시 초기화
  window.addEventListener("beforeunload", initializePage);

  // 리사이즈 시 heroLine 크기 조정
  window.addEventListener("resize", () => {
    if (!hasTransitioned && !isTransitioning) {
      heroLine.style.width = getInitialHeroLineWidth() + "px";
      heroLine.style.height = getInitialHeroLineHeight() + "px";
    }
  });
});

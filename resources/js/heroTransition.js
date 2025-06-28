document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const heroLine = document.getElementById("heroLine");
  const aboutSection = document.querySelector(".about");
  let isTransitioning = false;
  let hasTransitioned = false;
  let canTriggerTransition = false;
  let isHeaderClick = false; // header 클릭 여부 플래그

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
    }, 50);

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

    // 다음 프레임에서 transition 가능하도록 설정
    setTimeout(() => {
      isTransitioning = false;
    }, 100);
  }

  // ✅ hero 섹션을 관찰하고 threshold를 낮춤
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // hero가 화면에 거의 다 보이면 트랜지션 준비 (header 클릭이 아닐 때만)
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8 && !hasTransitioned && !isHeaderClick) {
          canTriggerTransition = true;
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
          canTriggerTransition = false;
        }
      });
    },
    {
      root: null,
      threshold: [0.5, 0.8, 1.0], // 여러 임계점으로 더 정확한 감지
    }
  );

  heroObserver.observe(heroSection);

  function handleHeaderHeroClick() {
    if (!isTransitioning && !hasTransitioned) {
      isHeaderClick = true;

      // 즉시 스크롤 막기
      document.body.style.overflow = "hidden";

      // hero 섹션으로 부드럽게 이동
      heroSection.scrollIntoView({ behavior: "smooth" });

      // 이동 완료 후 트랜지션 준비
      setTimeout(() => {
        canTriggerTransition = true;
      }, 1000);
    }
  }

  // ✅ 수정된 부분: 헤더의 ABOUT 링크들을 정확히 선택
  const headerHeroButtons = document.querySelectorAll('.m0 a[href="#hero"]');
  if (headerHeroButtons.length > 0) {
    headerHeroButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        handleHeaderHeroClick();
      });
    });
  }

  // ✅ wheel 이벤트로 트리거 실행
  let wheelTimeout;
  window.addEventListener(
    "wheel",
    function (e) {
      // 연속 wheel 이벤트 중복 방지
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (!isTransitioning && !hasTransitioned && canTriggerTransition && e.deltaY > 0) {
          e.preventDefault();

          // header 클릭 후 첫 스크롤 시도인 경우 스크롤 완전 방지
          if (isHeaderClick) {
            document.body.style.overflow = "hidden";
          }

          startTransition();
          canTriggerTransition = false;
        }
      }, 10);
    },
    { passive: false }
  );

  // ✅ 스크롤 올릴 때 리셋 (디바운스 추가)
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      // hero 섹션 상단 근처로 돌아왔을 때 리셋
      if (hasTransitioned && scrollY < heroSection.offsetHeight * 0.3 && !isTransitioning) {
        resetTransition();
      }
    }, 50);
  });

  // ✅ 페이지 로드/새로고침 시 초기화
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
  }

  // 페이지 로드 시 초기화
  initializePage();

  // beforeunload 이벤트
  window.addEventListener("beforeunload", initializePage);

  // 윈도우 리사이즈 시 heroLine 크기 조정
  window.addEventListener("resize", () => {
    if (!hasTransitioned && !isTransitioning) {
      heroLine.style.width = getInitialHeroLineWidth() + "px";
      heroLine.style.height = getInitialHeroLineHeight() + "px";
    }
  });
});

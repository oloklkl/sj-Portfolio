const introWrapper = document.querySelector(".intro-wrapper");
if (!introWrapper) {
  console.log("intro-wrapper가 없어서 애니메이션 실행 안함");
} else {
  function runAnimation() {
    const headerMenuItems = document.querySelectorAll(".inner .header-wrapper .gnb li .text-top a");
    // 텍스트 요소들 선택
    const titleH2 = document.querySelector(".title-wrap h2");
    const contentH3 = document.querySelector(".content-wrap h3");
    const contentPs = document.querySelectorAll(".content-wrap p");

    // 헤더 메뉴 초기 세팅
    if (headerMenuItems.length > 0) {
      gsap.set(headerMenuItems, { opacity: 0, x: -20 });
    }

    // H2 초기 세팅 (SCSS에 없는 속성만)
    gsap.set(titleH2, { opacity: 0, scale: 0.8 });

    // 문 열기
    introWrapper.classList.add("open");

    // 헤더 메뉴 애니메이션
    if (headerMenuItems.length > 0) {
      gsap.to(headerMenuItems, {
        duration: 0.6,
        opacity: 1,
        x: 0,
        stagger: 0.2,
        ease: "power2.out",
        delay: 1,
      });
    }

    // 텍스트 애니메이션 (문 열린 후 시작)
    setTimeout(() => {
      // H2 애니메이션
      gsap.to(titleH2, {
        duration: 1.2,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.4)",
      });

      // H3 애니메이션 (SCSS에서 설정한 초기값 사용)
      gsap.to(contentH3, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        delay: 0.4,
      });

      // P 태그들 순차 애니메이션 (SCSS에서 설정한 초기값 사용)
      gsap.to(contentPs, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.7,
      });
    }, 1600);
  }

  // 페이지 로드시 실행
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(runAnimation, 500);
  });
}

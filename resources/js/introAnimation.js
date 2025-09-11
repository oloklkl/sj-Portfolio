function initGnb() {
  const wrappers = document.querySelectorAll(".gnb .text-wrapper");

  wrappers.forEach((wrapper) => {
    const topLink = wrapper.querySelector(".text-top a");
    if (topLink) {
      const temp = document.createElement("span");
      temp.style.position = "absolute";
      temp.style.visibility = "hidden";
      temp.style.whiteSpace = "nowrap";
      temp.style.fontSize = getComputedStyle(topLink).fontSize;
      temp.style.fontWeight = getComputedStyle(topLink).fontWeight;
      temp.style.fontFamily = getComputedStyle(topLink).fontFamily;
      temp.innerText = topLink.innerText;

      document.body.appendChild(temp);
      const width = temp.offsetWidth;
      document.body.removeChild(temp);

      wrapper.style.width = width + "px";
    }
  });
}

window.addEventListener("load", () => {
  initGnb();

  const introWrapper = document.querySelector(".intro-wrapper");
  const headerMenuItems = document.querySelectorAll(".gnb li .text-top a");
  const titleH2 = document.querySelector(".title-wrap h2");
  const contentH3 = document.querySelector(".content-wrap h3");
  const contentPs = document.querySelectorAll(".content-wrap p");

  // ✅ GNB 메뉴 초기 상태 바로 숨김 (깜빡임 방지)
  if (headerMenuItems.length > 0) {
    gsap.set(headerMenuItems, { opacity: 0, x: -20 });
  }
  if (titleH2) gsap.set(titleH2, { opacity: 0, scale: 0.8 });
  if (contentH3) gsap.set(contentH3, { opacity: 0, y: 20 });
  if (contentPs.length > 0) gsap.set(contentPs, { opacity: 0, y: 20 });

  function runAnimation() {
    // GNB 메뉴
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

    // 타이틀
    if (titleH2) {
      gsap.to(titleH2, {
        duration: 1.2,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.4)",
        delay: 1.6,
      });
    }

    // 서브 타이틀
    if (contentH3) {
      gsap.to(contentH3, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        delay: 2,
      });
    }

    // 본문
    if (contentPs.length > 0) {
      gsap.to(contentPs, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 2.3,
      });
    }
  }

  // intro-wrapper 있으면 class 추가
  if (introWrapper) {
    introWrapper.classList.add("open");
  }

  // 애니메이션 실행
  setTimeout(runAnimation, 500);
});

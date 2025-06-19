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
  if (!introWrapper) {
    console.log("intro-wrapper가 없어서 애니메이션 실행 안함");
    return;
  }

  function runAnimation() {
    const headerMenuItems = document.querySelectorAll(".gnb li .text-top a");
    const titleH2 = document.querySelector(".title-wrap h2");
    const contentH3 = document.querySelector(".content-wrap h3");
    const contentPs = document.querySelectorAll(".content-wrap p");

    if (headerMenuItems.length > 0) {
      gsap.set(headerMenuItems, { opacity: 0, x: -20 });
    }

    gsap.set(titleH2, { opacity: 0, scale: 0.8 });

    introWrapper.classList.add("open");

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

    setTimeout(() => {
      gsap.to(titleH2, {
        duration: 1.2,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.4)",
      });

      gsap.to(contentH3, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        delay: 0.4,
      });

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

  setTimeout(runAnimation, 500);
});

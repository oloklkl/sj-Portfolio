// ─────────────────────────────────────────
// GNB 텍스트 너비 계산
// ─────────────────────────────────────────
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

// ─────────────────────────────────────────
// 카운터 애니메이션 (000 → 100)
// ─────────────────────────────────────────
function animateCounter(el, duration) {
  let start = null;
  const totalMs = duration * 1000;

  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / totalMs, 1);
    const val = Math.floor(progress * 100);
    el.textContent = String(val).padStart(3, "0");
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = "100";
  }
  requestAnimationFrame(step);
}

// ─────────────────────────────────────────
// 글리치 라인 폭발
// ─────────────────────────────────────────
function triggerGlitch(door) {
  const lines = door.querySelectorAll(".glitch-line");
  lines.forEach((line) => {
    const duration = 0.05 + Math.random() * 0.08;
    const delay = Math.random() * 0.3;
    gsap.fromTo(
      line,
      { opacity: 0, scaleX: 0, transformOrigin: "left center" },
      {
        opacity: 0.8,
        scaleX: 1,
        duration: duration,
        delay: delay,
        ease: "none",
        onComplete: () => gsap.to(line, { opacity: 0, duration: 0.05 }),
      },
    );
  });
}

// ─────────────────────────────────────────
// 글레어 스윕 (빛이 문을 가로질러 쓸고 지나감)
// ─────────────────────────────────────────
function triggerGlare(glareEl) {
  gsap.fromTo(glareEl, { x: "-200%" }, { x: "400%", duration: 0.55, ease: "power2.inOut" });
}

// ─────────────────────────────────────────
// 화이트 플래시
// ─────────────────────────────────────────
function triggerFlash() {
  const flash = document.getElementById("flash-overlay");
  if (!flash) return;
  gsap.to(flash, { opacity: 0.35, duration: 0.08, ease: "none" });
  gsap.to(flash, { opacity: 0, duration: 0.25, ease: "power2.out", delay: 0.08 });
}

// ─────────────────────────────────────────
// 콘텐츠 등장 애니메이션
// ─────────────────────────────────────────
function runContentAnimation() {
  const headerMenuItems = document.querySelectorAll(".gnb li .text-top a");
  const titleH2 = document.querySelector(".title-wrap h2");
  const contentH3 = document.querySelector(".content-wrap h3");
  const contentPs = document.querySelectorAll(".content-wrap p");

  // GNB 메뉴
  if (headerMenuItems.length > 0) {
    gsap.to(headerMenuItems, {
      duration: 0.6,
      opacity: 1,
      x: 0,
      stagger: 0.2,
      ease: "power2.out",
      delay: 0,
    });
  }

  // 타이틀
  if (titleH2) {
    gsap.to(titleH2, {
      duration: 1.1,
      opacity: 1,
      scale: 1,
      ease: "back.out(1.3)",
      delay: 0,
    });
  }

  // 서브 타이틀
  if (contentH3) {
    gsap.to(contentH3, {
      duration: 0.7,
      opacity: 1,
      y: 0,
      ease: "power2.out",
      delay: 0.35,
    });
  }

  // 본문
  if (contentPs.length > 0) {
    gsap.to(contentPs, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.55,
    });
  }
}

// ─────────────────────────────────────────
// 문 오픈 시퀀스
// ─────────────────────────────────────────
function runDoorSequence() {
  const introWrapper = document.querySelector(".intro-wrapper");
  const leftDoor = document.getElementById("leftDoor");
  const rightDoor = document.getElementById("rightDoor");
  const leftCounter = document.getElementById("leftCounter");
  const rightCounter = document.getElementById("rightCounter");
  const leftGlare = document.getElementById("leftGlare");
  const rightGlare = document.getElementById("rightGlare");

  // intro-wrapper가 없으면 그냥 콘텐츠 애니메이션만 실행
  if (!introWrapper) {
    runContentAnimation();
    return;
  }

  // 1. 카운터 시작 (1.1초간)
  if (leftCounter) animateCounter(leftCounter, 1.1);
  if (rightCounter) animateCounter(rightCounter, 1.1);

  // 2. 첫 번째 글리치 — 0.3s
  setTimeout(() => {
    if (leftDoor) triggerGlitch(leftDoor);
    if (rightDoor) triggerGlitch(rightDoor);
  }, 300);

  // 3. 두 번째 글리치 — 0.7s
  setTimeout(() => {
    if (leftDoor) triggerGlitch(leftDoor);
    if (rightDoor) triggerGlitch(rightDoor);
  }, 700);

  // 4. 글레어 스윕 — 1.0s (문 열리기 직전)
  setTimeout(() => {
    if (leftGlare) triggerGlare(leftGlare);
    if (rightGlare) triggerGlare(rightGlare);
  }, 1000);

  // 5. 화이트 플래시 + 문 열기 — 1.15s
  setTimeout(() => {
    triggerFlash();
    introWrapper.classList.add("open");
  }, 1150);

  // 6. 콘텐츠 등장 — 1.6s (문이 어느 정도 열린 후)
  setTimeout(() => {
    runContentAnimation();
  }, 1600);
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
window.addEventListener("load", () => {
  initGnb();

  const headerMenuItems = document.querySelectorAll(".gnb li .text-top a");
  const titleH2 = document.querySelector(".title-wrap h2");
  const contentH3 = document.querySelector(".content-wrap h3");
  const contentPs = document.querySelectorAll(".content-wrap p");

  // ✅ 초기 상태 바로 숨김 (깜빡임 방지)
  if (headerMenuItems.length > 0) {
    gsap.set(headerMenuItems, { opacity: 0, x: -20 });
  }
  if (titleH2) gsap.set(titleH2, { opacity: 0, scale: 0.92 });
  if (contentH3) gsap.set(contentH3, { opacity: 0, y: 20 });
  if (contentPs.length > 0) gsap.set(contentPs, { opacity: 0, y: 20 });

  // 문 시퀀스 실행
  runDoorSequence();
});

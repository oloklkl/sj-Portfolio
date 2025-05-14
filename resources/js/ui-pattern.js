const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

// 기본 a 태그 클릭 이벤트 방지
const preventDefaultAnchor = () => {
  const $links = getAll('a[href="#"]');
  $links.forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault());
  });
};

// Skip Navigation (Tab 키로 이동 문제 해결)
const skipNav = () => {
  const $skipLinks = getAll("#skip-nav a");

  $skipLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = get(targetId);

      if (targetElement) {
        targetElement.setAttribute("tabindex", "-1");
        targetElement.focus();
      }
    });
  });
};

// 전체 실행
document.addEventListener("DOMContentLoaded", () => {
  preventDefaultAnchor();
  skipNav();
});

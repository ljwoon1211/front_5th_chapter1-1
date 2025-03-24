import authService from "../../services/authService";

const createNav = (router) => {
  // 현재 경로에 따라 활성 링크 클래스 결정
  const getActiveClass = (linkPath) => {
    const currentPath = router.getCurrentPath();
    return currentPath === linkPath
      ? "text-blue-600 font-bold nav-link"
      : "text-gray-600 nav-link";
  };

  const loggedIn = authService.loggedIn();

  const html = `
    <nav class="bg-white shadow-md p-2 sticky top-14" id="main-nav">
      <ul class="flex justify-around">
        <li><a href="/" class="${getActiveClass("/")}" id="home-link">홈</a></li>
           ${
             loggedIn
               ? `
      <li><a href="/profile" class="${getActiveClass("/profile")}" id="profile-link">프로필</a></li>
      <li><a href="#" class="text-gray-600" id="logout">로그아웃</a></li>`
               : `<li><a href="/login" class="text-gray-600" id="login">로그인</a></li>`
           }
      </ul>
    </nav>
  `;

  return {
    html,
    mount: () => {
      const navElement = document.getElementById("main-nav");
      if (!navElement) return;

      navElement.addEventListener("click", (e) => {
        // 클릭된 요소나 그 부모가 a 태그인지 확인
        const linkElement = e.target.closest("a");
        if (!linkElement || e.defaultPrevented) return;

        e.preventDefault(); // 모든 링크 클릭에 대해 기본 동작 방지

        // ID에 따른 동작 처리
        const linkId = linkElement.id;
        switch (linkId) {
          case "logout":
            authService.logout(router);
            break;
          case "login":
            router.navigateTo("/login");
            break;
          default: {
            // 내부 링크인 경우 라우팅 처리
            const href = linkElement.getAttribute("href");
            if (href && href.startsWith("/")) {
              router.navigateTo(href);
            }
            break;
          }
        }
      });
    },
  };
};

export default createNav;

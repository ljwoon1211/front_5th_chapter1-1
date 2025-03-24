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
      if (navElement) {
        navElement.addEventListener("click", (e) => {
          // 클릭된 요소나 그 부모가 a 태그인지 확인
          const linkElement = e.target.closest("a");

          // a 태그가 아니거나 이벤트가 이미 처리되었으면 무시
          if (!linkElement || e.defaultPrevented) {
            return;
          }

          // 로그아웃 버튼 클릭 처리
          if (linkElement.id === "logout") {
            e.preventDefault();
            authService.logout(router);
            return;
          }

          // 로그인 링크 클릭 처리
          if (linkElement.id === "login") {
            e.preventDefault();
            router.navigateTo("/login");
            return;
          }

          // 다른 내비게이션 링크 처리
          if (
            linkElement.getAttribute("href") &&
            linkElement.getAttribute("href").startsWith("/")
          ) {
            e.preventDefault();
            router.navigateTo(linkElement.getAttribute("href"));
          }
        });
      }
    },
  };
};

export default createNav;

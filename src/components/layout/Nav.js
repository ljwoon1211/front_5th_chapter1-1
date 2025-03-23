import authService from "../../services/authService";

const Nav = (router) => {
  // 현재 경로에 따라 활성 링크 클래스 결정
  const getActiveClass = (linkPath) => {
    const currentPath = router.getCurrentPath();
    return currentPath === linkPath
      ? "text-blue-600 font-bold nav-link"
      : "text-gray-600 nav-link";
  };

  const loggedIn = authService.loggedIn();

  const html = `
    <nav class="bg-white shadow-md p-2 sticky top-14">
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
      // 로그아웃 이벤트 핸들러 설정
      const logoutButton = document.getElementById("logout");
      if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
          e.preventDefault();
          // 로그아웃 처리 - 라우터 객체 전달
          authService.logout(router);
        });
      }
    },
  };
};

export default Nav;

import authService from "../../services/authService";
import { userStore } from "../../store/userStore";
import { renderComponent } from "../../utils/renderUtils";

const createNav = (router) => {
  const renderNav = () => {
    // 상태에서 로그인 정보 가져오기
    const loggedIn = authService.loggedIn();

    // 현재 경로에 따라 활성 링크 클래스 결정
    const getActiveClass = (linkPath) => {
      const currentPath = router.getCurrentPath();
      return currentPath === linkPath
        ? "text-blue-600 font-bold nav-link"
        : "text-gray-600 nav-link";
    };

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

    return { html };
  };

  // 이벤트 리스너 설정 함수
  const setupEventListeners = () => {
    const navElement = document.getElementById("main-nav");
    if (!navElement) return;

    // 이전 이벤트 리스너 제거 (중복 방지)
    const navClone = navElement.cloneNode(true);
    navElement.parentNode.replaceChild(navClone, navElement);

    // 새 이벤트 리스너 설정
    navClone.addEventListener("click", (e) => {
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
  };

  // mount 함수 정의
  const mount = () => {
    setupEventListeners();

    // 상태 변경 구독 - 로그인/로그아웃 시 내비게이션 업데이트
    const unsubscribe = userStore.subscribe((newState, prevState) => {
      if (newState.loggedIn !== prevState.loggedIn) {
        renderComponent(renderNav, "main-nav");
      }
    });

    return unsubscribe;
  };

  return {
    ...renderNav(),
    mount: mount,
  };
};

export default createNav;

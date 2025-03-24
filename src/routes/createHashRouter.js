// router/createHashRouter.js (해시 기반 라우터)
import authService from "../services/authService.js";

/**
 * 해시 기반 라우터 생성
 * @returns {Object} 해시 라우터 인스턴스
 */
const createHashRouter = () => {
  // 라우트 저장 객체
  const routes = {};

  /**
   * 라우트 추가
   */
  const addRoute = (path, handler) => {
    routes[path] = handler;
  };

  /**
   * 현재 경로 가져오기 (해시에서 경로 추출)
   */
  const getCurrentPath = () => {
    // // 일반적인 #/ 형식 처리
    // return hash.replace(/^#\/?/, "/") || "/";
    return window.location.hash.replace(/^#/, "") || "/";
  };

  /**
   * 다른 경로로 이동 (해시 변경)
   */
  const navigateTo = (path) => {
    window.location.hash = path;
    // hashchange 이벤트가 자동으로 발생하므로 handleRoute 호출 불필요
  };

  /**
   * 현재 경로 처리
   */
  const handleRoute = () => {
    const path = getCurrentPath();
    const protectedRoutes = ["/profile"];
    // 로그인 확인이 필요한 페이지 처리
    if (protectedRoutes.includes(path) && !authService.loggedIn()) {
      window.location.hash = "/login";
      return;
    }

    if (path === "/login" && authService.loggedIn()) {
      // history.replaceState(null, "", "/");
      // routes["/"]();
      window.location.hash = "/";
      return;
    }

    // 등록된 라우트 처리
    if (routes[path]) {
      routes[path]();
    } else {
      // 404 처리
      if (routes["/error"]) {
        routes["/error"]();
      } else {
        console.log("404 Not Found");
      }
    }
  };

  /**
   * 이벤트 리스너 설정
   */
  const setupListeners = () => {
    // 해시 변경 이벤트 처리
    window.addEventListener("hashchange", handleRoute);

    // 내부 링크 클릭 처리
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      const href = link?.getAttribute("href");

      // 내부 링크인 경우에만 처리
      if (href?.startsWith("/") && href !== "#") {
        e.preventDefault();
        navigateTo(href);
      }
    });
  };

  /**
   * 라우터 초기화
   */
  const init = () => {
    // 초기 해시가 없으면 기본 경로로 설정
    if (!window.location.hash) {
      // window.location.hash = "/index.hash.html#";
      window.location.hash = "/"; // 단순화
    } else {
      // 현재 해시에 맞는 경로 처리
      handleRoute();
    }
  };

  return {
    addRoute,
    navigateTo,
    handleRoute,
    getCurrentPath,
    init,
    setupListeners,
  };
};

export default createHashRouter;

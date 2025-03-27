// router/createBrowserRouter.js (히스토리 API 기반 라우터)
import authService from "../services/authService.js";

/**
 * 브라우저 히스토리 API 기반 라우터 생성
 * @returns {Object} 브라우저 라우터 인스턴스
 */
const createBrowserRouter = () => {
  const basename = import.meta.env.VITE_BASE_PATH || "";

  // 라우트 저장 객체
  const routes = {};

  /**
   * 라우트 추가
   * @param {string} path - 경로
   * @param {Function} handler - 해당 경로 처리 함수
   */
  const addRoute = (path, handler) => {
    const fullPath = basename + `${path}`;
    routes[fullPath] = handler;
  };

  /**
   * 현재 경로 가져오기
   */
  const getCurrentPath = () => {
    return window.location.pathname;
  };

  /**
   * 다른 경로로 이동
   */
  const navigateTo = (path) => {
    const fullPath = basename + `${path}`;
    history.pushState(null, "", fullPath);
    handleRoute();
  };

  /**
   * 현재 경로 처리
   */
  const handleRoute = () => {
    const path = getCurrentPath();

    // 로그인이 필요한 경로 목록
    const protectedRoutes = ["/profile"];

    // 로그인 확인이 필요한 페이지 처리
    if (protectedRoutes.includes(path) && !authService.loggedIn()) {
      // history.replaceState(null, "", "/login");
      history.replaceState(null, "", basename + "/login");

      routes["/login"]();
      return;
    }

    if (path === "/login" && authService.loggedIn()) {
      // history.replaceState(null, "", "/");
      history.replaceState(null, "", basename + "/");
      routes["/"]();
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
    // 브라우저 네비게이션 처리
    window.addEventListener("popstate", handleRoute);

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
    handleRoute();
  };

  return {
    addRoute,
    navigateTo,
    handleRoute,
    getCurrentPath,
    init,
    setupListeners,
    basename,
  };
};

export default createBrowserRouter;

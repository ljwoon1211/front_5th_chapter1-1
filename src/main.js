import createLayout from "./components/layout/Layout";
import createMain from "./pages/Main";
import createRouter from "./routes/createRouter";
import createProfile from "./pages/Profile";
import createLogin from "./pages/Login";
import createNav from "./components/layout/Nav";
import createError from "./pages/Error";

const createApp = () => {
  const router = createRouter({ type: "browser" });

  // 구독 해제 함수들을 저장할 변수들
  let currentPageUnsubscribe = null;

  /**
   * 페이지 렌더링 함수
   * @param {Object} pageComponent - 페이지 컴포넌트
   */
  const renderPage = (pageComponent) => {
    // 이전 페이지의 구독 해제 함수가 있다면 호출
    if (
      currentPageUnsubscribe &&
      typeof currentPageUnsubscribe === "function"
    ) {
      currentPageUnsubscribe();
    }

    // 페이지 콘텐츠 렌더링
    document.getElementById("root").innerHTML = createLayout({
      content: pageComponent,
      router,
    });

    // 네비게이션 초기화 - createNav에서 이미 HTML을 구성했으므로 여기서는 mount만 수행
    const nav = createNav(router);
    nav.mount();

    // 페이지 컴포넌트에 있는 이벤트 핸들러 설정 및 구독 해제 함수 저장
    if (typeof pageComponent.mount === "function") {
      currentPageUnsubscribe = pageComponent.mount();
    }
  };

  /**
   * createNav 함수를 수정하여 중복 문제 방지
   * 이 부분은 Nav.js 파일에서 수정해야 합니다
   */
  // 여기서는 수정된 Nav.js 예시 코드를 제공하지 않습니다

  /**
   * 라우트 설정 및 앱 초기화
   */
  const init = () => {
    // 라우트 등록
    router.addRoute("/", () => renderPage(createMain()));
    router.addRoute("/profile", () => renderPage(createProfile(router)));
    router.addRoute("/login", () => {
      const loginComponent = createLogin(router);
      document.getElementById("root").innerHTML = loginComponent.html;
      loginComponent.mount();
    });
    router.addRoute(
      "/error",
      () => (document.getElementById("root").innerHTML = createError().html),
    );

    // 이벤트 리스너 등록
    router.setupListeners();

    // 라우터 초기화
    router.init();
  };

  return {
    init,
  };
};

const app = createApp();
app.init();

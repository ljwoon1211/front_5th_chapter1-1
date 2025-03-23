import Layout from "./components/layout/Layout";
import Nav from "./components/layout/Nav";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import createRouter from "./routes/createRouter";

const App = () => {
  const router = createRouter({ type: "hash" });

  // 렌더링 함수
  /**
   * 페이지 렌더링 함수
   * @param {Object} pageComponent - 페이지 컴포넌트
   */
  const renderPage = (pageComponent) => {
    // 페이지 콘텐츠 렌더링
    document.getElementById("root").innerHTML = Layout({
      content: pageComponent,
      router,
    });

    // 네비게이션 초기화
    Nav(router).mount();

    // 페이지 컴포넌트에 있는 이벤트 핸들러 설정
    if (pageComponent.mount) {
      pageComponent.mount();
    }
  };

  /**
   * 라우트 설정 및 앱 초기화
   */
  const init = () => {
    // 라우트 등록
    router.addRoute("/", () => renderPage(Main()));
    router.addRoute("/profile", () => renderPage(Profile(router)));
    router.addRoute("/login", () => {
      const loginComponent = Login(router);
      document.getElementById("root").innerHTML = loginComponent.html;
      loginComponent.mount();
    });
    router.addRoute(
      "/error",
      () => (document.getElementById("root").innerHTML = Error()),
    );

    /**
     * 이벤트 리스너 등록
     * popstate
     */
    router.setupListeners();

    /**
     * 라우터 초기화
     * main.ts => router 초기화 =>  handleRoute() 실행
     * handleRoute()로 로그인 유무에 따라 다른 페이지로 리다이렉트 시킴
     */
    router.init();
  };

  return {
    init,
  };
};
const app = App();
app.init();

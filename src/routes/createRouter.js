import createBrowserRouter from "./createBrowserRouter.js";
import createHashRouter from "./createHashRouter.js";

/**
 * 라우터 생성 팩토리 함수
 * @param {Object} options - 라우터 옵션
 * @param {string} options.type - 라우터 타입 ('browser' 또는 'hash')
 * @returns {Object} 라우터 인스턴스
 */
const createRouter = (options = {}) => {
  const { type = "browser" } = options;
  // 라우터 타입에 따라 적절한 구현체 반환
  if (type === "hash") {
    return createHashRouter();
  }

  return createBrowserRouter();
};

export default createRouter;

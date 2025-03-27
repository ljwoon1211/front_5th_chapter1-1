import { userStore, userActions } from "../store/userStore.js";

/**
 * 사용자 인증 관련 기능을 제공하는 서비스
 * - 로그인, 로그아웃, 사용자 정보 관리
 */
const createAuthService = () => {
  /**
   * 사용자 정보 가져오기
   * @returns {Object|null} 사용자 정보 또는 null
   */
  const getUser = () => {
    const { currentUser } = userStore.getState();
    return currentUser;
  };

  /**
   * 로그인 상태 확인
   * @returns {boolean} 로그인 여부
   */
  const loggedIn = () => {
    const { loggedIn } = userStore.getState();
    return loggedIn;
  };

  /**
   * 로그인 처리
   * @param {string} username - 사용자 이름
   * @param {string} email - 이메일 (선택)
   * @param {string} bio - 자기소개 (선택)
   * @returns {Object} 사용자 정보
   */
  const login = (username, email = "", bio = "") => {
    return userActions.login(username, email, bio);
  };

  /**
   * 로그아웃 처리
   * @param {Object} router - 라우터 객체
   */
  const logout = (router) => {
    userActions.logout();
    if (router && router.navigateTo) {
      router.navigateTo("/login");
    }
  };

  /**
   * 프로필 정보 업데이트
   * @param {string} username - 사용자 이름
   * @param {string} email - 이메일
   * @param {string} bio - 자기소개
   * @returns {Object} 업데이트된 사용자 정보
   */
  const updateProfile = (username, email, bio) => {
    return userActions.updateProfile(username, email, bio);
  };

  return {
    getUser,
    loggedIn,
    login,
    logout,
    updateProfile,
  };
};

const authService = createAuthService();
export default authService;

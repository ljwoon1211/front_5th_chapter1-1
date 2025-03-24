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
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  };

  /**
   * 로그인 상태 확인
   * @returns {boolean} 로그인 여부
   */
  const loggedIn = () => {
    return localStorage.getItem("user") !== null;
  };

  /**
   * 로그인 처리
   * @param {string} username - 사용자 이름
   * @param {string} email - 이메일 (선택)
   * @param {string} bio - 자기소개 (선택)
   * @returns {Object} 사용자 정보
   */
  const login = (username, email = "", bio = "") => {
    const userData = { username, email, bio };
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  };

  /**
   * 로그아웃 처리
   * @param {Object} router - 라우터 객체
   */
  const logout = (router) => {
    localStorage.removeItem("user");
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
    const userData = getUser();
    const updatedUserData = { ...userData, username, email, bio };
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    return updatedUserData;
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

/**
 * 상태 관리 스토어 생성 함수
 * @param {Object} initialState - 초기 상태 값
 * @returns {Object} 스토어 인스턴스
 */
const createStore = (initialState = {}) => {
  // 상태 저장
  let state = { ...initialState };

  // 상태 변경 리스너 배열
  const listeners = [];

  /**
   * 현재 상태 가져오기
   * @returns {Object} 현재 상태
   */
  const getState = () => ({ ...state });

  /**
   * 상태 업데이트
   * @param {Object} newState - 새로운 상태 값 (부분 업데이트 가능)
   */
  const setState = (newState) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener(state));
    return state;
  };

  /**
   * 상태 변경 리스너 등록
   * @param {Function} listener - 상태 변경 시 호출될 콜백 함수
   * @returns {Function} 리스너 제거 함수
   */
  const subscribe = (listener) => {
    listeners.push(listener);

    // 구독 해제 함수 반환
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  };

  // 로컬 스토리지 통합
  const load = (key) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) setState({ ...JSON.parse(stored) });
    } catch (error) {
      console.error("로컬 스토리지 로드 오류:", error);
    }
  };

  const save = (key) => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("로컬 스토리지 저장 오류:", error);
    }
  };

  return { getState, setState, subscribe, load, save };
};

export default createStore;

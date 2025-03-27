// utils/renderUtils.js
export const renderComponent = (
  componentFactory,
  containerId,
  shouldMount = true,
) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const component = componentFactory();
  container.outerHTML = component.html;

  // shouldMount 파라미터가 true일 때만 mount 호출
  if (shouldMount && component.mount) {
    component.mount();
  }
};

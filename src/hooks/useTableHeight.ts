export const maxHeight = ref(0);

const setHeight = () => {
  const bodyHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const navBarHeight =
    document.querySelector(".navigation-bar")?.clientHeight || 0;
  const headerHeight = document.querySelector(".header")?.clientHeight || 0;
  return bodyHeight - navBarHeight - headerHeight - 82;
};
window.onresize = () => {
  maxHeight.value = setHeight();
};

export const useTableHeight = () => {
  return onMounted(() => {
    maxHeight.value = setHeight();
  });
};

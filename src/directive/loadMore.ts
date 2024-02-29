import { Directive, DirectiveBinding } from "vue";

/**
 * 使用的时候必须给select组件的自定义类名'more-select-dropdown'
 *  */
const loadMore: Directive = {
  beforeMount(el: any, binding: DirectiveBinding) {
    const selectDom = document.querySelector(
      ".more-select-dropdown .el-select-dropdown__wrap"
    ) as any;
    function loadMores() {
      const isBase =
        selectDom.scrollHeight - selectDom.scrollTop <= selectDom.clientHeight;
      if (isBase) {
        binding.value && binding.value();
      }
    }
    el.selectDomInfo = selectDom;
    el.userLoadMore = loadMores;
    nextTick(() => {
      selectDom?.addEventListener("scroll", loadMores);
    });
  },
  beforeUnmount(el: any) {
    if (el.userLoadMore) {
      el.selectDomInfo.removeEventListener("scroll", el.userLoadMore);
      delete el.selectDomInfo;
      delete el.userLoadMore;
    }
  },
};
export default loadMore;

import { defineStore } from "pinia";
import { ref } from "vue";
import defaultSettings from "@/setting";

const { show, fixedHeader, sidebarLogo, title } = defaultSettings;
const useSettingsStore = defineStore("setting", () => {
  // 显示右边设置
  const showSettings = ref(show);

  // 固定头部
  const headerFixed = ref(fixedHeader);

  // 显示logo
  const showLogo = ref(sidebarLogo);

  // 改变设置
  const changeSettings = (type: string, value: boolean) => {
    switch (type) {
      case "showSettings": {
        showSettings.value = value;
        break;
      }
      case "headerFixed": {
        headerFixed.value = value;
        break;
      }
      case "showLogo": {
        showLogo.value = value;
        break;
      }
      default: {
        throw new Error("不能存在该设置项");
      }
    }
  };

  return {
    showSettings,
    headerFixed,
    showLogo,
    title,
    changeSettings,
  };
});
export default useSettingsStore;

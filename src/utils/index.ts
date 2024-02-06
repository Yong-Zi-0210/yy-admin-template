import dayjs from "dayjs";
/** 用 JS 获取全局 css 变量 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = "";
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(cssVariableName);
  } catch (error) {
    console.error(error);
  }
  return cssVariableValue;
};

/** 获取随机串 */
export function getRandomString(length: number) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

/** 格式化时间 */
export const formatDateTime = (
  time: string | number | Date,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  return time ? dayjs(new Date(time)).format(format) : "N/A";
};

/** 获取时间戳 */
export const timestamp = (time: string | number | Date) => {
  return time ? dayjs(new Date(time)).unix() : "N/A";
};

/** 获取多个数组的元素所有组合 */
export function combinations(arrays: any[]) {
  if (!arrays || !arrays.length) {
    return [];
  }

  // 递归辅助函数
  function combine(currentIndex: number, currentCombination: any[]): any[] {
    // 递归终止条件：如果已经迭代到了最后一个数组，返回当前组合
    if (currentIndex === arrays.length) {
      return [currentCombination];
    }

    // 获取当前数组
    const currentArray = arrays[currentIndex];
    const result = [];

    // 遍历当前数组的每个元素
    for (let i = 0; i < currentArray.length; i++) {
      // 递归调用，将当前元素与下一个数组的组合进行递归拼接
      const nextCombination = combine(currentIndex + 1, [
        ...currentCombination,
        currentArray[i],
      ]);

      // 将当前组合与下一个数组的组合合并起来
      result.push(...nextCombination);
    }

    return result;
  }

  return combine(0, []);
}

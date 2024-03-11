export const webOprtions = reactive([
  { value: "000", label: "首页" },
  { value: "001", label: "二手车" },
  { value: "002", label: "招聘" },
  { value: "003", label: "商城" },
  { value: "004", label: "酒店" },
]);

export const typeOptions = reactive<any>({
  "000": [
    { value: "001", label: "主推荐位" },
    { value: "002", label: "为你推荐" },
    { value: "003", label: "热门景点" },
    { value: "004", label: "精选好车" },
    { value: "005", label: "品质优选" },
    { value: "006", label: "权益商品" },
    { value: "007", label: "热门兑换" },
    { value: "008", label: "途途热搜" },
  ],
  "001": [
    { value: "001", label: "主推荐位" },
    { value: "002", label: "首推荐位" },
    { value: "003", label: "推荐位" },
  ],
  "002": [
    { value: "001", label: "主推荐位" },
    { value: "002", label: "热招岗位" },
    { value: "003", label: "热门企业" },
    { value: "004", label: "精选热点" },
  ],
  "003": [
    { value: "001", label: "主推荐位" },
    { value: "002", label: "首推荐位" },
    { value: "003", label: "推荐位" },
  ],
  "004": [
    { value: "001", label: "热门度假村" },
    { value: "002", label: "推荐酒店" },
  ],
});

export const productTypeOptions = [
  { value: "001", label: "二手车" },
  { value: "002", label: "招聘企业" },
  { value: "003", label: "商城" },
  { value: "004", label: "酒店" },
  { value: "005", label: "招聘职位" },
];

interface PageItems {
  [key: string]: any;
}
export interface Condition {
  [key: string]: any;
}
export interface usedCarResponse {
  currentIndex: number;
  totalCount: number;
  totalPage: number;
  pageItems: PageItems[];
}
export interface usedCarRequest {
  pageSize: number;
  currentPage: number;
  condition: Condition;
}

interface Condition {
  status: string;
}

export interface CommunicationRequest {
  currentPage: number;
  pageSize: number;
  condition: Condition;
}

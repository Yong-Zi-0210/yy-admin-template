interface RowData {
  id: string;
  createTime: string;
  modifyTime: string;
  dealerId: number;
  carId: number;
  carTitle: string;
  userId: number;
  userRealName: string;
  userContactPhone: string;
  status: string;
  confirmTime: string;
  confirmOperatorId: number;
  statusDescription: string;
  confirmOperatorName: string;
}
export interface CommunicationResponse {
  communicates: RowData[];
}
export interface CommunicationRequest {}

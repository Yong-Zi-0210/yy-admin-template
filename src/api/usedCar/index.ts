import { request } from "@/utils/request";
import { type CommunicationResponse, CommunicationRequest } from "./types";
export function communication(data: CommunicationRequest) {
  return request<CommunicationResponse>({
    url: "/cardealer-server/communicate/getCommunicates",
    method: "post",
    data,
  });
}

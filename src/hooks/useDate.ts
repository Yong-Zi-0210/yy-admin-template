import { formatDateTime, timestamp } from "@/utils";

export function useDate() {
  const formatDate = (time: string | number | Date | null) => {
    return time ? formatDateTime(time) : "N/A";
  };
  const formatTimestamp = (time: string | number | Date) => {
    return timestamp(time);
  };
  return {
    formatDate,
    formatTimestamp,
  };
}

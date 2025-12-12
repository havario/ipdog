import type { GeoData } from "~/../types";

export const useIpQuery = async (ip: string) => {
  return await useFetch<GeoData>("/api", {
    method: "POST",
    // 模拟表单提交
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ ip }).toString(),
    immediate: !!ip,
    key: `ip-${ip}`,
    watch: false,
  });
};

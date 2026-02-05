import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useStores() {
  return useQuery({
    queryKey: [api.stores.list.path],
    queryFn: async () => {
      const res = await fetch(api.stores.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stores");
      return api.stores.list.responses[200].parse(await res.json());
    },
  });
}

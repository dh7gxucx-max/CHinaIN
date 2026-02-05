import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertParcel } from "@shared/routes";

export function useParcels() {
  return useQuery({
    queryKey: [api.parcels.list.path],
    queryFn: async () => {
      const res = await fetch(api.parcels.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch parcels");
      return api.parcels.list.responses[200].parse(await res.json());
    },
  });
}

export function useParcel(id: number) {
  return useQuery({
    queryKey: [api.parcels.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.parcels.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch parcel");
      return api.parcels.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateParcel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertParcel) => {
      const res = await fetch(api.parcels.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create parcel");
      return api.parcels.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.parcels.list.path] });
    },
  });
}

export function useInitiateVoiceVerification() {
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.parcels.initiateVoiceVerification.path, { id });
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to initiate voice verification");
      return api.parcels.initiateVoiceVerification.responses[200].parse(await res.json());
    },
  });
}

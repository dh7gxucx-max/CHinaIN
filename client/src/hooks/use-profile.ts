import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertProfile } from "@shared/routes";

export function useProfile() {
  return useQuery({
    queryKey: [api.profiles.get.path],
    queryFn: async () => {
      const res = await fetch(api.profiles.get.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) {
        // If 404, it might mean profile hasn't been created yet, which is fine
        if (res.status === 404) return null;
        throw new Error("Failed to fetch profile");
      }
      return api.profiles.get.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<InsertProfile>) => {
      const res = await fetch(api.profiles.update.path, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update profile");
      return api.profiles.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.profiles.get.path] });
    },
  });
}

export function useUploadKyc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { aadhaarUrl: string }) => {
      const res = await fetch(api.profiles.uploadKyc.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to upload KYC");
      return api.profiles.uploadKyc.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.profiles.get.path] });
    },
  });
}

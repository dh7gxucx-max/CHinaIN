import { z } from 'zod';
import { insertParcelSchema, insertProfileSchema, parcels, profiles, stores, sipCalls } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  profiles: {
    get: {
      method: 'GET' as const,
      path: '/api/profile',
      responses: {
        200: z.custom<typeof profiles.$inferSelect>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/profile',
      input: insertProfileSchema.partial(),
      responses: {
        200: z.custom<typeof profiles.$inferSelect>(),
        401: errorSchemas.unauthorized,
        500: errorSchemas.internal,
      },
    },
    uploadKyc: {
      method: 'POST' as const,
      path: '/api/profile/kyc',
      input: z.object({ aadhaarUrl: z.string().url() }),
      responses: {
        200: z.custom<typeof profiles.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  parcels: {
    list: {
      method: 'GET' as const,
      path: '/api/parcels',
      responses: {
        200: z.array(z.custom<typeof parcels.$inferSelect>()),
        401: errorSchemas.unauthorized,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/parcels/:id',
      responses: {
        200: z.custom<typeof parcels.$inferSelect>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/parcels',
      input: insertParcelSchema,
      responses: {
        201: z.custom<typeof parcels.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    // Admin or System update
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/parcels/:id/status',
      input: z.object({ 
        status: z.enum(["registered", "received", "weighing", "checking", "ready_to_ship", "shipped", "delivered"]),
        weight: z.number().optional(),
        images: z.array(z.string()).optional(),
        codAmount: z.number().optional()
      }),
      responses: {
        200: z.custom<typeof parcels.$inferSelect>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    initiateVoiceVerification: {
      method: 'POST' as const,
      path: '/api/parcels/:id/verify-voice',
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
  },
  stores: {
    list: {
      method: 'GET' as const,
      path: '/api/stores',
      responses: {
        200: z.array(z.custom<typeof stores.$inferSelect>()),
      },
    },
  },
  calculator: {
    calculate: {
      method: 'POST' as const,
      path: '/api/calculate',
      input: z.object({ weight: z.number() }),
      responses: {
        200: z.object({ 
          freight: z.number(),
          customs: z.number(),
          commission: z.number(),
          total: z.number()
        }),
      },
    },
  },
  admin: {
    dashboard: {
      method: 'GET' as const,
      path: '/api/admin/dashboard',
      responses: {
        200: z.object({
          totalParcels: z.number(),
          pendingVerification: z.number(),
          revenue: z.number(),
        }),
        401: errorSchemas.unauthorized,
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// Type Exports
export type ProfileResponse = z.infer<typeof api.profiles.get.responses[200]>;
export type ParcelResponse = z.infer<typeof api.parcels.get.responses[200]>;
export type StoreResponse = z.infer<typeof api.stores.list.responses[200]>;

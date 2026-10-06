import { z } from "zod";
export const registerSchema=z.object({username:z.string().trim().toLowerCase().regex(/^[a-z0-9_]{3,24}$/),displayName:z.string().trim().min(2).max(60),password:z.string().min(10).max(128)});
export const loginSchema=z.object({username:z.string().trim().toLowerCase(),password:z.string().min(1)});
export const commentSchema=z.object({body:z.string().trim().min(2).max(2000)});

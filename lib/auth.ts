import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { db } from "./db";

const scrypt = promisify(scryptCallback);
const COOKIE = "astro_session";
const DAYS = 30;
export async function hashPassword(password:string) { const salt=randomBytes(16).toString("hex"); const key=await scrypt(password,salt,64) as Buffer; return `scrypt:${salt}:${key.toString("hex")}`; }
export async function verifyPassword(password:string,encoded:string) { const [kind,salt,hex]=encoded.split(":"); if(kind!=="scrypt"||!salt||!hex)return false; const expected=Buffer.from(hex,"hex"); const actual=await scrypt(password,salt,expected.length) as Buffer; return expected.length===actual.length&&timingSafeEqual(expected,actual); }
const digest=(token:string)=>createHash("sha256").update(token).digest("hex");
export async function createSession(userId:string) { const token=randomBytes(32).toString("base64url"); const expiresAt=new Date(Date.now()+DAYS*86400000); await db.session.create({data:{userId,tokenHash:digest(token),expiresAt}}); (await cookies()).set(COOKIE,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",expires:expiresAt}); }
export async function currentUser() { const token=(await cookies()).get(COOKIE)?.value; if(!token)return null; const session=await db.session.findUnique({where:{tokenHash:digest(token)},include:{user:true}}); if(!session||session.expiresAt<=new Date())return null; return session.user; }
export async function destroySession() { const jar=await cookies(); const token=jar.get(COOKIE)?.value; if(token)await db.session.deleteMany({where:{tokenHash:digest(token)}}); jar.delete(COOKIE); }

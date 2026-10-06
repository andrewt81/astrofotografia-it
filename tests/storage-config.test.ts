import { describe,expect,it } from "vitest";import { storageDriver } from "../lib/storage";
describe("storage configuration",()=>{it("uses the portable S3 protocol",()=>{expect(storageDriver()).toBe("s3")})});

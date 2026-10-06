export const allowedExtensions = new Set(["jpg","jpeg","png","webp","gif","tif","tiff","mp4","webm","cr2","cr3","nef","nrw","fits","fit","fts"]);
export function extension(name: string) { return name.toLowerCase().split(".").pop() ?? ""; }
export function mediaKind(name: string) {
  const ext = extension(name);
  if (["mp4","webm"].includes(ext)) return "VIDEO";
  if (["cr2","cr3","nef","nrw"].includes(ext)) return "RAW";
  if (["fits","fit","fts"].includes(ext)) return "FITS";
  if (ext === "gif") return "GIF";
  return "IMAGE";
}

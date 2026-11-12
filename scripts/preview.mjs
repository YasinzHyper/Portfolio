import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stat } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../out");
const prefix = "/Portfolio";
const port = Number(process.env.PORT || 4173);
const mime = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".json":"application/json", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp", ".woff2":"font/woff2", ".ico":"image/x-icon", ".txt":"text/plain; charset=utf-8", ".vcf":"text/vcard", ".mp4":"video/mp4" };

if (!existsSync(path.join(root, "index.html"))) {
  console.error("Run npm run build before starting the export preview.");
  process.exit(1);
}
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname === "/" || pathname === prefix) { response.writeHead(302, { Location: `${prefix}/` }); response.end(); return; }
    if (!pathname.startsWith(`${prefix}/`) || !["GET", "HEAD"].includes(request.method)) { response.writeHead(404); response.end("Not found"); return; }
    let file = path.resolve(root, `.${pathname.slice(prefix.length)}`);
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) { response.writeHead(403); response.end(); return; }
    let info = await stat(file);
    if (info.isDirectory()) { file = path.join(file,"index.html"); info = await stat(file); }
    response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "Content-Length": info.size, "Cache-Control":"no-cache", "X-Content-Type-Options":"nosniff" });
    if (request.method === "HEAD") { response.end(); return; }
    const stream = createReadStream(file);
    stream.on("error", () => response.destroy());
    stream.pipe(response);
  } catch { response.writeHead(404); response.end("Not found"); }
});
server.listen(port, "127.0.0.1", () => console.log(`Portfolio export: http://127.0.0.1:${port}${prefix}/`));
process.on("SIGINT", () => server.close(() => process.exit(0)));
process.on("SIGTERM", () => server.close(() => process.exit(0)));

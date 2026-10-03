const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const server = http.createServer((req, res) => {
  const requestedPath = decodeURIComponent(req.url.split("?")[0]);
  const safePath = path.normalize(requestedPath).replace(/^([.][.][\/\\])+/, "");
  const relativePath = safePath === "/" ? "index.html" : safePath;
  const rootFilePath = path.join(root, relativePath);
  const filePath = fs.existsSync(rootFilePath)
    ? rootFilePath
    : path.join(root, "govprocessos", relativePath);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(error.code === "ENOENT" ? "Página não encontrada" : "Erro interno do servidor");
      return;
    }

    const extension = path.extname(filePath);
    const contentTypes = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".txt": "text/plain; charset=utf-8",
    };
    res.writeHead(200, { "Content-Type": contentTypes[extension] || "application/octet-stream" });
    res.end(content);
  });
});

server.listen(process.env.PORT || 3000, "0.0.0.0");

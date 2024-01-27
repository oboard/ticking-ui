// vite-plugin-inject-file.js
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

export default function ZenLiteVitePlugin() {
  return {
    name: "zen-lite-vite-plugin",
    buildStart() {
      // this.emitFile({
      //   type: "asset",
      //   fileName: 'index.js',
      //   source: readFileSync(resolve(process.cwd(), "src/index.js"), "utf-8"),
      // });
      // this.emitFile({
      //   type: "asset",
      //   fileName: 'index.ts',
      //   source: readFileSync(resolve(process.cwd(), "src/index.ts"), "utf-8"),
      // });
      // // // 读取文件内容
      // const filePath = resolve(process.cwd(), "src/pages/index.zlt");
      // const fileContent = readFileSync(filePath, "utf-8");

      // // 将文件内容注入到全局变量中
      // this.emitFile({
      //   type: "asset",
      //   fileName: "index.txt",
      //   source: fileContent,
      // });

      // 扫描文件夹，把所有的文件都注入到全局变量中
      // const dirPath = resolve(process.cwd(), "src/pages");
      // const files = readdirSync(dirPath);

      // files.forEach((file) => {
      //   // 读取文件内容
      //   const filePath = resolve(process.cwd(), "src/pages/" + file);
      //   const fileContent = readFileSync(filePath, "utf-8");

      //   // 将文件内容注入到全局变量中
      //   this.emitFile({
      //     type: "asset",
      //     fileName: file,
      //     source: fileContent,
      //   });
      // });
      // 包括文件夹，递归扫描
      // const dirPath = resolve(process.cwd(), "src/pages");
      // const files = readdirSync(dirPath, { withFileTypes: true });
      // const filesPath = [];
      // const filesContent = [];
      // const getFiles = (files) => {
      //   files.forEach((file) => {
      //     if (file.isDirectory()) {
      //       const dirFiles = readdirSync(dirPath + "/" + file.name, {
      //         withFileTypes: true,
      //       });
      //       getFiles(dirFiles);
      //     } else {
      //       filesPath.push(file.name);
      //       const filePath = resolve(process.cwd(), "src/pages/" + file.name);
      //       const fileContent = readFileSync(filePath, "utf-8");
      //       filesContent.push(fileContent);
      //     }
      //   });
      // };
      // getFiles(files);
      // filesPath.forEach((path, index) => {
      //   this.emitFile({
      //     type: "asset",
      //     fileName: path,
      //     source: filesContent[index],
      //   });
      // });
      // 要按照目录摆放，不然会出现文件名重复的情况
      // const dirStr = "src/pages";
      // const dirPath = resolve(process.cwd(), dirStr);
      // const files = readdirSync(dirPath, { withFileTypes: true });
      // const filesPath = [];
      // const filesContent = [];
      // const getFiles = (dirStr, files) => {
      //   files.forEach((file) => {
      //     if (file.isDirectory()) {
      //       const dirFiles = readdirSync(dirPath + "/" + file.name, {
      //         withFileTypes: true,
      //       });
            
      //       getFiles(dirStr + "/" + file.name, dirFiles);
      //     } else {
      //       filesPath.push(dirStr + "/" + file.name);
      //       const filePath = resolve(process.cwd(), "src/pages/" + file.name);
      //       const fileContent = readFileSync(filePath, "utf-8");
      //       filesContent.push(fileContent);
      //     }
      //   });
      // };
      // getFiles(dirStr, files);
      // filesPath.forEach((path, index) => {
      //   this.emitFile({
      //     type: "asset",
      //     fileName: path,
      //     source: filesContent[index],
      //   });
      // });
    },
  };
}

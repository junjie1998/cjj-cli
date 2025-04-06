import { input, select } from "@inquirer/prompts";
import { clone } from "../utils/clone";
import path from "path";
import fs from "fs-extra";

export interface TemplateInfo {
  name: string; //模版名称
  downloadUrl: string; //模版下载地址
  description: string; //模版描述
  branch: string; //模版分支
}

export const templates: Map<string, TemplateInfo> = new Map([
  [
    "react-template",
    {
      name: "react-template",
      downloadUrl: "https://github.com/junjie1998/music.git",
      description: "react模版",
      branch: "main",
    },
  ],
  [
    "Vite-Vue3-Typescript-template-test",
    {
      name: "Vite-Vue3-Typescript-template-test",
      downloadUrl: "",
      description: "Vite + Vue3 + Typescript 测试模版",
      branch: "dev",
    },
  ],
]);

export function isOverwrite(fileName: string) {
  console.warn(`${fileName}文件夹存在`);
  return select({
    message: "是否覆盖文件?",
    choices: [
      {
        name: "覆盖",
        value: true,
      },
      {
        name: "取消",
        value: false,
      },
    ],
  });
}

export async function create(projectName: string) {
  // 初始化模板列表
  const templateList = Array.from(templates).map(
    (item: [string, TemplateInfo]) => {
      const [name, info] = item;
      return {
        name,
        value: name,
        description: info.description,
      };
    }
  );
  if (!projectName) {
    await input({
      message: "请输入项目名称",
    });
  }
  const filePath = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(filePath);
    if (run) {
      await fs.remove(filePath);
    } else {
      return;
    }
  }
  const templateName = await select({
    message: "请选择模板",
    choices: templateList,
  });
  const info = templates.get(templateName);
  if (info) {
    const { downloadUrl, branch } = info;
    clone(downloadUrl, projectName, ["-b", branch]);
  }
  console.log(info);
}

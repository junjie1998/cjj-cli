import { Command } from "commander";
import { version } from "../package.json";

import { create } from "./command/create";
// 这里我们用 cjj 当作我的指令名称
// 命令行中使用 cjj xxx 即可触发
const program = new Command("cjj");
program.version(version, "-v, --version", "output the current version");

program
  .command("create")
  .description("创建一个新项目")
  .argument("name", "项目名称")
  .action(async (dirName) => {
    create(dirName);
    // if (!dirName) {
    //   create(dirName);
    // } else {
    //   console.log(`create${dirName}`);
    // }
  });

program.parse();

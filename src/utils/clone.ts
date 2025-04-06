import simpleGit, { SimpleGitOptions } from "simple-git";
const createLogger = require("progress-estimator");
import chalk from "chalk";

const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((item) =>
      chalk.blue(item)
    ),
  },
});

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), //当前工作目录
  binary: "git", //指定git二进制文件路径
  maxConcurrentProcesses: 6, //最大并发进程数
};

export const clone = async (
  url: string,
  projectName: string,
  options: string[]
) => {
  const git = simpleGit(gitOptions);
  try {
    await logger(git.clone(url, projectName, options), "代码下载中...", {
      estimate: 7000,
    });
    console.log(chalk.green("代码下载完成"));
    console.log(chalk.blueBright(`==================================`));
    console.log(chalk.blueBright(`=== 欢迎使用 cjj的 脚手架 ===`));
    console.log(chalk.blueBright(`==================================`));
    console.log();
    console.log(`cd ${chalk.blueBright(projectName)}`);
    console.log(`${chalk.yellow("pnpm")} install`);
    console.log(`${chalk.yellow("pnpm")} run dev`);
  } catch (error) {
    console.log("下载失败");
    console.log(error);
  }
};

import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from 'rollup-plugin-typescript2';

export default defineConfig([{
    input :{
        index:'src/index.ts' //打包入口文件
    },
    output:{
        dir:'dist',  //打包输出目录
        format:'cjs', //输出为commonjs格式
    },
    plugins:[
        nodeResolve(), // 解析node_modules中的模块
        commonjs(), // 将CommonJS模块转换为ES6
        externals({
            // preserveModules: true // 排除node_modules中的模块
            devDeps: false, //可以识别package.json中的devDependencies
        }), 
        json(), // 支持json文件的导入
        terser(), // 压缩代码
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    module: 'ESNext', // 设置为ESNext以支持ESM
                },
            },
        }), // 支持TypeScript
    ]
}])
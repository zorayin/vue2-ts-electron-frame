/*
 * @Author: 陈诗文
 * @Date: 2020-06-01 14:06:45
 * @LastEditTime: 2022-10-17 18:03:05
 * @LastEditors: chenshiwen 171287313@qq.com
 * @Description: 远程部署
 * @FilePath: \audio-vision-platform\deploy.js
 */
// let client = require('scp2');
// client.scp('dist/', 'gdcs:gdcs123@192.168.1.248:/home/gdcs/media_jar/dist', function (err) {
//   if (err == undefined) {
//     console.log('deploy success!');
//   } else {
//     console.log("deploy error:" + err);
//   }

// })

const dotenv = require("dotenv");
const scpClient = require("scp2");

// 驱动读取.env文件
dotenv.config();
const { host, port, username, password, path, extraCmd } = require("./deployconfig");
let lastIndex = path.lastIndexOf("/");
let renameDir = path.substring(0, lastIndex + 1) + "webhistory";

let env = process.env.DEPLOY_ENV;
let isRollback = env === "rollback";
let rollBackCommand = `rm -rf ${path}; mv ${renameDir}/${process.env.VUE_APP_PRE_VERSION} ${path}`;
let cmd =
  env === "devdeploy" || env === "hotfix"
    ? `rm -rf ${path}`
    : isRollback
    ? rollBackCommand
    : `mkdir -p ${renameDir}; mv ${path} ${renameDir}/${process.env.VUE_APP_PRE_VERSION}`;

console.log(cmd);
console.log(env);
var Client = require("ssh2").Client;
const conn = new Client();

const handleExtraCMD = function () {
  if(!extraCmd){
    console.log(`没有额外命令执行`);
    return;
  }
  console.log(`正在执行额外命令${extraCmd}`);
  const conn2 = new Client();
  conn2
    .on("ready", function () {
      conn2.exec(extraCmd, function (err, stream) {
        if (err) throw err;
        stream
          .on("close", function (code, signal) {
            if (code === 0) {
              console.log("执行额外命令成功!!");
            } else {
              console.log("执行额外命令失败!!");
            }
            conn.end();
          })
          .on("data", function (data) {
            console.log("STDOUT: " + data);
          })
          .stderr.on("data", function (data) {
            console.log("STDERR: " + data);
          });
      });
    })
    .connect({
      host,
      port,
      username,
      // 使用本地的私钥或者password登录服务器
      password,
      // privateKey: require('fs').readFileSync('/Users/ngto/.ssh/id_rsa')
    });
};

conn
  .on("ready", function () {
    // rm 删除服务器已存在文件夹
    conn.exec(cmd, function (err, stream) {
      if (err) throw err;
      stream
        .on("close", function (code, signal) {
          // 回滚不需再上传
          if (isRollback) {
            console.log(
              `回滚至${process.env.VUE_APP_PRE_VERSION} 结果为:${code} ${signal}`
            );
            conn.end();
            return;
          }
          // 部署远程服务器
          scpClient.scp(
            "dist/",
            `${username}:${password}@${host}:${port}:${path}`,
            function (err) {
              if (err == undefined) {
                console.log("deploy success!");

                handleExtraCMD();
              } else {
                console.log("deploy error:" + err);
              }
            }
          );
          conn.end();
        })
        .on("data", function (data) {
          console.log("STDOUT: " + data);
        })
        .stderr.on("data", function (data) {
          console.log("STDERR: " + data);
        });
    });
  })
  .connect({
    host,
    port,
    username,
    // 使用本地的私钥或者password登录服务器
    password,
    // privateKey: require('fs').readFileSync('/Users/ngto/.ssh/id_rsa')
  });

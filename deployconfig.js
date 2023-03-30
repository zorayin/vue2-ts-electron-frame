/*
 * @Author: csw
 * @Date: 2021-12-02 17:07:02
 * @LastEditTime: 2022-10-17 17:38:56
 * @LastEditors: chenshiwen 171287313@qq.com
 * @Description: 远程部署的服务器信息
 * @FilePath: \audio-vision-platform\deployconfig.js
 */

/*
 *读取env变量判断发布环境
 */
const env = process.env.DEPLOY_ENV;
const IS_RELEASE_ENV =
  env === "deploy" || env === "hotfix" || env === "rollback";
const SERVER_ID = env === "testdeploy" ? 2 : IS_RELEASE_ENV ? 1 : 0; // 0：开发部署, 1：正式部署、2：测试部署
/*
 *定义多个服务器账号 及 根据 SERVER_ID 导出当前环境服务器账号
 */
const SERVER_LIST = [
  {
    host: "192.168.11.247",
    port: "22",
    username: "root", // 登录服务器的账号
    password: "root", // 登录服务器的密码
    path: "/home/cjj/media_v2.0_8099/dist", // 发布至静态服务器的项目路径
    extraCmd: null,
  },
  {
    host: "192.168.1.248",
    port: "22",
    username: "gdcs", // 登录服务器的账号
    password: "gdcs123", // 登录服务器的密码
    path: "/home/gdcs/media_jar/dist", // 发布至静态服务器的项目路径
    extraCmd: null,
  },
  //  {
  //   host: '192.168.1.248',
  //   port: '22',
  //   username: 'gdcs', // 登录服务器的账号
  //   password: 'gdcs123',// 登录服务器的密码
  //   path: '/home/gdcs/media_jar_test/dist'// 发布至静态服务器的项目路径
  //  },
  {
    host: "192.168.11.110",
    port: "22",
    username: "root", // 登录服务器的账号
    password: "root", // 登录服务器的密码
    path: "/home/media-compose/nginx/web/media", // 发布至静态服务器的项目路径
    extraCmd: "cd /home/media-compose/mediaDocker/; docker-compose restart",
  },
];

module.exports = SERVER_LIST[SERVER_ID];

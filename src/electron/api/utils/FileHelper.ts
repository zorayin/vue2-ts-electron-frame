/*
 * @Author: wfy
 * @Date: 2021-12-27 14:20:17
 * @LastEditTime: 2022-11-18 10:11:08
 * @LastEditors: 罗振辉 185912680@qq.com
 * @Description: 判断是否有文件或者文件夹，没有则创建并写入
 * @FilePath: \audio-vision-platform\src\electron\api\utils\fileHelper.ts
 */
import fs from "fs";
import path from "path";

export class FileHelper {
  //判断这串路径的每一个文件夹是否都存在
  mkDirsOrFile(filePath: string, dataType?: unknown): Promise<string | null> {
    const asyncRes: Promise<string | null> = new Promise((resolve, reject) => {
      //判断文件或者文件夹是否存在
      if (!fs.existsSync(filePath)) {
        //不存在
        if (dataType !== undefined) {
          /*
           * 如果是普通的.json文件等
           * 可以根据是什么系统就用什么路径分隔符，通过path模块的sep属性来获取当前使用系统的路径分隔符。如果是Windows系统则输出\，如果是Linux系统则输出/。
           */
          const upperFilePath = filePath.slice(0, filePath.lastIndexOf(path.sep)); //获取文件的上一级目录地址
          let content = null;
          if (typeof dataType === "object") {
            content = dataType;
          } else {
            if (dataType === "map") {
              content = {};
            } else if (dataType === "array") {
              content = [];
            } else if (dataType === "string") {
              content = "";
            }
          }

          fs.mkdirSync(upperFilePath, { recursive: true });
          fs.appendFileSync(filePath, JSON.stringify(content), "utf-8");
        } else {
          //如果是资源管理器，需要新建resource文件夹 以及 resource下的audio、document、image、video、thimbnail文件夹
          fs.mkdirSync(filePath, { recursive: true });
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });

    return asyncRes;
  }

  //初始化
  async initFile<R>(
    filePath: string,
    dataType: string,
    state: string,
    cb: (data: R | null) => void
  ): Promise<void> {
    const fPath = path.join(__dirname, filePath);
    await this.mkDirsOrFile(fPath, dataType);

    if (state === "file") {
      //如果是文件
      fs.readFile(fPath, "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
        // if(!cb) return;
        if (!err) {
          try {
            cb(JSON.parse(data) as unknown as R);
          } catch (error) {
            cb(data as unknown as R);
          }
        } else {
          cb(null);
        }
      });
    } else {
      const tem = "utf-8";

      //文件夹
      fs.readdir(
        fPath,
        {
          encoding: "utf-8",
          withFileTypes: true
        },
        (err: NodeJS.ErrnoException | null, data: unknown): void => {
          if (!err) {
            console.log("文件夹", data);
            cb(data as R);
          } else {
            cb(null);
          }
        }
      );
    }
  }
}

const instance = new FileHelper();
export default instance;

/* * @Author: chenshiwen 171287313@qq.com * @Date: 2022-09-02 09:12:13 * @LastEditors: chenshiwen 171287313@qq.com * @LastEditTime: 2022-09-14 17:14:35 * @FilePath: \rule\.prettierrc.js * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  printWidth: 100, // **指定print换行的行长度** 为了可读性，我们不建议使用超过80个字符
  tabWidth: 2, // **指定每个缩进的空格数**
  embeddedLanguageFormatting: "auto", // 是否对被引号包裹的代码使用智能格式化 必须开始不然vue文件没法格式化
  singleQuote: false, // **代码的引号限制**
  quoteProps: "as-needed", // **引用对象中属性时更改**
  trailingComma: "none", //在多行逗号分隔的语法结构中，尽可能打印尾随逗号。(例如，单行数组从不使用逗号末尾。)
  bracketSpacing: true, // **在对象文字中的括号之间打印空格**
  bracketSameLine: false, // 把多行HTML (HTML, JSX, Vue, Angular)元素的' > '放在最后一行的末尾，而不是单独放在下一行(不适用于自关闭元素)
  arrowParens: "always", // > **在箭头函数唯一的参数周围包含圆括号**
  vueIndentScriptAndStyle: false, // 是否缩进Vue文件中的' <script> '和' <style> '标签内的代码
  endOfLine: "auto" // 每行的结束符
};

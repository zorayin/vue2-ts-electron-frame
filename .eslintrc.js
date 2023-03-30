/*
 * @Author: chenshiwen 171287313@qq.com
 * @Date: 2022-09-02 09:12:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-20 11:48:19
 * @FilePath: \rule\.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: "tsconfig.json",
  },
  rules: {
    // ******************************************************（typescript-eslint）规则***********************************************************
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/adjacent-overload-signatures": "error", // 要求成员重载是连续的
    "@typescript-eslint/array-type": ["error", { default: "array" }], // 要求对数组声明时的格式（T[]或Array<T>）
    "@typescript-eslint/await-thenable": "error", // 不允许等待非Thenable(一个有方法的对象，比如Promise)的值
    // 不允许@ts-<directive的>注释或要求在directive后面有描述
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": true,
        "ts-nocheck": true,
        "ts-check": true,
        minimumDescriptionLength: 3
      }
    ],
    // 不允许的类型
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          object: {
            message: [
              'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.'
            ].join("\n")
          },
          Function: {
            message: [
              "The `Function` type accepts any function-like value.",
              "It provides no type safety when calling the function, which can be a common source of bugs.",
              "such as () => number instead"
            ].join("\n")
          }
        }
      }
    ],
    "@typescript-eslint/class-literal-property-style": ["error", "fields"], // 强制类上的字面值以一致的样式公开
    "@typescript-eslint/consistent-generic-constructors": ["error", "type-annotation"], // 强制在构造函数调用的类型注释或构造函数名称上指定泛型类型参数
    "@typescript-eslint/consistent-indexed-object-style": ["error", "record"], // 要求或不允许Record类型
    // 强制使用一致的类型断言
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      { assertionStyle: "as", objectLiteralTypeAssertions: "never" }
    ],
    // 强制类型定义一致地使用`interface`或`type`
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    // 强制使用一致的类型导入
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "no-type-imports", disallowTypeAnnotations: true }
    ],
    // 强制默认参数放在最后
    "@typescript-eslint/default-param-last": "off",
    // 要求函数和类方法显式返回类型
    "@typescript-eslint/explicit-function-return-type": "off",
    // 要求对类属性和方法使用显式的可访问性修饰符
    "@typescript-eslint/explicit-member-accessibility": "off",
    // 要求对导出的函数和类的公共类方法显式地返回和参数类型
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 要求接口和类型文字使用特定的成员分隔符样式
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        //单行，多行配置是完全独立的，互不影响
        multiline: { delimiter: "semi", requireLast: true }, //多行配置只适用于多行接口/类型定义
        singleline: { delimiter: "semi", requireLast: false }, //单行配置只适用于单行接口/类型定义
        multilineDetection: "brackets"
      }
    ],
    "@typescript-eslint/method-signature-style": ["error", "property"], // 强制使用特定的方法签名语法
    // "@typescript-eslint/naming-convention": ["error", "property"], // 强制使用特定的方法签名语法
    // 要求void类型的表达式出现在语句位置
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      { ignoreArrowShorthand: false, ignoreVoidOperator: true }
    ],
    "@typescript-eslint/no-duplicate-enum-values": "error", // 禁止重复的enum成员值
    "@typescript-eslint/no-dynamic-delete": "off", // 禁止对计算键表达式使用delete操作符
    "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: false }], // 禁止声明空接口
    "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: false, fixToUnknown: false }], // 不允许any类型
    "@typescript-eslint/no-floating-promises": ["warn", { ignoreVoid: true }], // 要求对Promise-like语句进行适当处理，只检测未处理的Promise语句
    "@typescript-eslint/no-for-in-array": "error", // 禁止使用for-in循环遍历数组
    // 禁止显式声明初始化为数字、字符串或布尔值的变量或参数
    "@typescript-eslint/no-inferrable-types": [
      "error",
      { ignoreParameters: true, ignoreProperties: false }
    ],
    // 禁止在泛型或返回类型之外使用void类型 (void类型意味着函数不返回任何值，而隐式未定义类型则意味着函数返回的值未定义)
    "@typescript-eslint/no-invalid-void-type": [
      "off",
      { allowInGenericTypeArguments: false, allowAsThisParameter: false }
    ],
    "@typescript-eslint/no-meaningless-void-operator": "error", // 除非用于丢弃值，否则禁止使用void操作符
    // 禁止在不合适的地方使用Promises ，只检测那些向错误逻辑位置提供promise的代码
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksConditionals: true, checksVoidReturn: true, checksSpreads: true }
    ],
    // 禁用自定义的TypeScript模块和命名空间
    "@typescript-eslint/no-namespace": [
      "off",
      { allowDeclarations: false, allowDefinitionFiles: false }
    ],
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error", // 禁止在空合并操作符的左操作数中使用非空断言
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error", // 禁止在可选的链表达式后使用非空断言 如果可选属性为空在链表达式之后使用非空断言是错误的，并且会在代码中引入严重的类型安全漏洞
    "@typescript-eslint/no-non-null-assertion": "error", // 禁止使用 ! 后缀运算符
    "@typescript-eslint/no-redundant-type-constituents": "error", // 禁止不执行任何操作 或 覆盖类型信息的联合和交叉的成员
    // 不允许类型别名
    "@typescript-eslint/no-type-alias": [
      "error",
      {
        allowAliases: "always",
        allowCallbacks: "always",
        allowConditionalTypes: "never",
        allowConstructors: "never",
        allowLiterals: "never",
        allowMappedTypes: "always",
        allowTupleTypes: "always",
        allowGenerics: "always"
      }
    ],
    // 禁止类型总是为真或总是为假的条件
    "@typescript-eslint/no-unnecessary-condition": [
      "error",
      {
        allowConstantLoopConditions: true
      }
    ],
    "@typescript-eslint/no-unnecessary-qualifier": "error", // 禁用不必要的名称空间限定符
    "@typescript-eslint/no-unnecessary-type-arguments": "error", // 禁止与默认值相等的类型参数
    "@typescript-eslint/no-unnecessary-type-assertion": "error", // 禁止不改变表达式类型的类型断言
    "@typescript-eslint/no-unnecessary-type-constraint": "error", // 禁止对泛型类型进行不必要的约束

    "@typescript-eslint/no-useless-empty-export": "warn", // 禁止不更改模块文件中的任何内容的空导出
    "@typescript-eslint/non-nullable-type-assertion-style": "error", // 禁止用非空断言
    "@typescript-eslint/parameter-properties": "error", // 要求或禁止在类构造函数中使用参数属性
    "@typescript-eslint/prefer-function-type": "error", // 强制使用函数类型而不是具有调用签名的接口
    "@typescript-eslint/prefer-reduce-type-parameter": "error", // 强制在调用 `Array#reduce` 而不是强制类型转换时使用类型参数
    "@typescript-eslint/prefer-string-starts-ends-with": "error", // 强制使用`String#startsWith`和`String#endsWith`而不是其他等价的检查子字符串的方法
    "@typescript-eslint/require-array-sort-compare": "error", // 要求数组排序调用始终提供一个compareFunction
    "@typescript-eslint/restrict-plus-operands": ["error", { checkCompoundAssignments: true }], // 要求数组排序调用始终提供一个compareFunction
    "@typescript-eslint/switch-exhaustiveness-check": "error", // 要求数组排序调用始终提供一个compareFunction
    "@typescript-eslint/typedef": ["off", { propertyDeclaration: true }], // 指定某类型代码需要类型声明
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      { selector: "function", format: ["camelCase"] },
      { selector: "parameter", format: ["camelCase"] },
      { selector: "typeParameter", format: ["PascalCase"] },
      { selector: "class", format: ["PascalCase"] },
      { selector: "interface", format: ["PascalCase"] },
      { selector: "typeProperty", format: ["camelCase", "snake_case"] },
      { selector: "accessor", format: ["camelCase"] },
      { selector: "enumMember", format: ["PascalCase", "UPPER_CASE"] },
      { selector: "enum", format: ["PascalCase"] },
      { selector: "typeAlias", format: ["PascalCase", "UPPER_CASE"] }
    ],

    // *****************************************************更漂亮格式化（Prettier）规则*********************************************************
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        endOfLine: "auto",
        singleQuote: false,
        trailingComma: "none",
        bracketSpacing: true,
        bracketSameLine: false
      }
    ],

    // ***********************************************可能出现问题（Possible Problems）规则******************************************************

    "array-callback-return": ["error", { checkForEach: true }], // return在数组方法的回调中强制执行语句。它还可以通过使用选项强制forEach数组方法回调不返
    "for-direction": "error", // 强制“for”循环更新子句将计数器移动到正确的方向,例如一个计数器向错误方向移动的循环，将无限运行
    "getter-return": ["error", { allowImplicit: false }], // 每个getter都应该返回一个值
    "no-async-promise-executor": "error", // **禁止使用异步函数作为 Promise 执行器**
    "constructor-super": "error", // **派生类的构造函数必须调用super(). 非派生类的构造函数不得调用super()
    "no-await-in-loop": "error", // **禁止使用异步函数作为 Promise 执行器**
    "no-class-assign": "error", // 该规则旨在标记修改类声明的变量。
    "no-const-assign": "error", // 不允许重新分配const变量
    "no-constant-condition": ["error", { checkLoops: false }], //**此规则不允许在以下测试条件中使用常量表达式：**
    "no-constructor-return": "error", // **禁止从构造函数返回值**
    "no-dupe-args": "error", // 此规则不允许函数声明或表达式中出现重复的参数名称。
    "no-dupe-class-members": "error", // **禁止重复class中的名称**
    "no-dupe-else-if": "error", // **禁止 if-else-if 链中的重复条件**
    "no-dupe-keys": "error", // **禁止对象字面量中的重复键，对象文字中具有相同键的多个属性可能会导致应用程序出现意外行为。**
    "no-duplicate-case": "error", // **此规则不允许语句case子句中出现重复的测试表达式switch**
    "no-duplicate-imports": ["error", { includeExports: true }], // 此规则要求来自单个模块的所有可以合并的导入都存在于单个import语句中
    "no-empty-pattern": "error", // 禁止空的解构模式
    "no-ex-assign": "error", // **catch禁止在子句中重新分配异常**
    "no-fallthrough": "error", // **不允许case语句落空**
    "no-import-assign": "error", // 不允许分配给导入的绑定
    "no-inner-declarations": ["error", "both"], // **function禁止嵌套块中的变量或声明**
    "no-irregular-whitespace": "error", // **禁止不规则空格**
    "no-loss-of-precision": "error", // **禁止失去精度的文字数字**
    "no-obj-calls": "error", //**禁止将全局对象属性作为函数调用**
    "no-promise-executor-return": "error", // 禁止从 Promise 执行器函数返回值，只return允许没有值，因为它是一个控制流语句。
    "no-self-assign": "error", // **禁止两边完全相同的赋值**
    "no-self-compare": "error", // **禁止双方完全相同的比较**
    "no-setter-return": "error", // 此规则不允许从 setter 函数返回值并return 在 setter 函数中报告语句
    "no-sparse-arrays": "error", // **禁止稀疏数组**
    "no-this-before-super": "error", // **在调用构造函数之前禁止this/supersuper()**
    "no-undef": "off", // **/除非在注释中提及，否则不允许使用未声明的变量 可用/*global someFunction, a*/忽略 **
    "no-unreachable": "error", // **禁止在return、throw、continue和break语句之后出现无法访问的代码**
    "no-unreachable-loop": "error", // **禁止带有仅允许一次迭代的主体的循环**
    "no-unsafe-finally": "error", // 当return, throw, break, continue用于finally, 内部的控制流语句try并被catch覆盖时，这被认为是意外行为
    "no-unsafe-negation": "off", // **禁止对关系运算符的左操作数求反**
    // **undefined不允许在不允许值的上下文中使用可选链接**
    "no-unsafe-optional-chaining": ["error", { disallowArithmeticOperators: false }],
    // **禁止未使用的变量**
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "none",
        ignoreRestSiblings: false,
        caughtErrors: "none"
      }
    ],
    // **在定义之前禁止使用变量**
    "no-use-before-define": [
      "error",
      {
        functions: true,
        variables: true,
        classes: true
      }
    ],
    // **isNaN()检查时要求调用NaN, 此规则不允许与“NaN”进行比较，switch(NaN)永远不能匹配 case 子句。**
    "use-isnan": ["error", { enforceForSwitchCase: true, enforceForIndexOf: true }],
    "valid-typeof": ["error", { requireStringLiterals: true }], // **此规则强制将typeof表达式与有效的字符串文字进行比较。**

    // *****************************************************提议（Suggestions）规则**************************************************************

    /**
     * 针对全局的属性
     */
    /*
     * "no-alert": "error", //TODO 备用 **禁止使用alert、confirm和prompt**
     * "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 不允许使用console
     * "no-throw-literal": "error", // **禁止将字面量作为异常抛出 **只允许有可能是Error对象的表达式
     * "prefer-exponentiation-operator": "error", // **幂运算符\*\*代替Math.pow** 如const foo = 2 ** 8;
     * "require-yield":"error", // **要求生成器函数包含yield**
     */
    "no-eval": "error", // 禁止使用eval()
    "no-global-assign": "error", // **禁止对原生对象或只读全局变量赋值**
    "no-implied-eval": "error", // 当任何一个setTimeout()、setInterval()或execScript()函数使用字符串作为第一个参数时，都会发出警告
    "no-labels": "error", // **不允许标记语句**
    "no-lone-blocks": "error", // **禁止不必要的嵌套块**
    "no-new-wrappers": "error", // **禁止使用String、Number和Boolean对象的new操作符**
    "no-proto": "error", // **禁止使用__proto__属性**  应使用 getPrototypeOf() 和 setPrototypeOf() 代替
    "no-script-url": "error", // **禁止使用脚本location.href = "javascript:void(0)";**
    "no-shadow": [
      "off",
      {
        builtinGlobals: false,
        hoist: "all",
        allow: ["LayoutNames", "DragState", "Transform", "PollingType"]
      }
    ], // **禁止变量声明覆盖在外部作用域中声明的变量**
    "no-void": "off", // **不允许使用void** void操作符接受一个操作数并返回undefined，常用来最小化代码，void 0 比 undefined短
    "no-with": "error", // **不允许with语句**
    radix: ["error", "as-needed"], // 当使用parseInt()函数时，通常会省略第二个参数，即radix参数（取值范围为2-32，允许十六进制，十进制，八进制）
    "prefer-numeric-literals": "error", // **禁用parseInt()和Number.parseInt()，而使用二进制、八进制和十六进制文字**
    "prefer-object-spread": "error", // **使用Object.assign()时，禁止使用字面量最为第一个参数，建议使用object作为第一个参数**
    "prefer-rest-params": "error", // **将剩余参数用作可变参数函数，而不是参数变量**
    "prefer-spread": "error", // **使用扩展操作符而不是.apply()**
    "prefer-template": "error", // **更希望使用模板字面量而不是字符串拼接**
    "require-await": "error", // **禁止异步函数没有await**
    yoda: ["error", "never", { onlyEquality: true }], // **要求或禁止“yoda”条件**  yoda条件：条件的字面值在前面，而变量在后面

    /**
     * 针对 模块化
     */
    // **禁止将导入、导出和解构的赋值重命名为相同的名称**
    "no-useless-rename": [
      "error",
      { ignoreImport: false, ignoreExport: false, ignoreDestructuring: false }
    ],

    /**
     * 针对 注释
     */
    "multiline-comment-style": ["error", "starred-block"], // **多行注释使用特定样式**
    // "spaced-comment": "never", // 有需要再了解 **强制注释中的//或/*后面有一致的空格**

    /**
     * 针对if、else if、else、for、while或do
     */
    curly: ["error", "multi-line"], // **强制块语句使用大括号 multi-line: (if、else if、else、for、while或do 与之同一行的单行语句可省略花括号，否则都不可省略)**
    "default-case-last": "error", // 强制switch语句中的default 位于最后
    "max-depth": ["error", { max: 5 }], // **强制块可以嵌套的最大深度**
    "no-else-return": ["error", { allowElseIf: true }], // 如果If块包含return语句，则不需要else块
    "no-empty": "error", // **禁止空语句**
    "no-lonely-if": "off", // **禁止if语句作为else块中唯一的语句**

    /**
     * 针对表达式
     */
    complexity: ["error", { max: 30 }], // **程序中允许的最大圈复杂度阈值规则**
    eqeqeq: ["error", "always", { null: "always" }], // **需要使用===和!==**
    "no-extra-boolean-cast": "error", // **禁用不必要的布尔类型转换**
    "no-extra-semi": "error", // **禁止不必要的分号**
    "no-multi-assign": "error", // **禁止使用链式赋值表达式**
    "no-nested-ternary": "error", // **禁止嵌套三元表达式**
    "no-unneeded-ternary": "error", // **当存在更简单的操作符时，禁止使用三元操作符**
    "no-sequences": "error", // 不允许逗号操作符
    // **不允许未使用的表达式**  一个或多个字符串表达式语句(带或不带分号)被认为是未使用的
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true, // 是否允许在表达式中使用短路计算
        allowTernary: true
      }
    ],
    "no-useless-concat": "error", // **禁止不必要的字面值或模板字面值的连接**

    /**
     * 针对变量 限制
     */
    "no-var": "error", // **要求使用let或const而不是var**
    "block-scoped-var": "error", // var 在{}定义范围外使用变量是否报错，默认off不报错
    camelcase: [
      // 是否强制属性名称驼峰命名
      "error",
      {
        properties: "never", // always/never 对象属性名称驼峰命名
        ignoreGlobals: true, // 检查驼峰时是否忽略全局变量
        allow: ["kvm_status", "frame_rate", "rc_bitrate", "rc_type", "rc_qp"]
      }
    ],
    "init-declarations": ["error", "always"], // **要求或禁止在变量声明中初始化**
    "no-delete-var": "error", // **禁止对变量使用delete操作符**
    // 指在代码中多次出现但没有明确含义的数字。最好将它们替换为已命名常量。
    "no-magic-numbers": [
      "error",
      {
        ignore: [
          -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 21, 22, 23, 24, 25, 26, 27, 28, 39, 30, 43, 44,
          45, 53, 60, 68, 90, 180, 255, 360, 100, 500, -500, 1000, 3600, 999, 1920, 1080, 9999,
          0x53, 0x43, 0x68, 0x20, 0xd5, 0x11, 0x32, 0xaa, 30000
        ],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        enforceConst: true,
        detectObjects: false
      }
    ],
    "no-redeclare": "error", // **不允许重复声明**
    "no-undef-init": "error", // **禁止将变量初始化为undefined**
    // 禁止在标识符中使用下划线
    "no-underscore-dangle": [
      "error",
      { allow: ["_markToDelete"], allowFunctionParams: false, enforceInMethodNames: true }
    ],
    //**要求对声明后永远不会重新赋值的变量进行const声明**
    "prefer-const": ["error", { destructuring: "any", ignoreReadBeforeAssign: false }],

    /**
     * 针对function 方法限制
     */
    "consistent-this": ["error", "that"], // 捕获当前上下文时命名一致的规则
    "arrow-body-style": ["error", "as-needed"], // 箭头函数体周围的大括号规则
    "func-style": ["error", "declaration", { allowArrowFunctions: true }], // **强制使用一致的函数声明或表达式**
    // 强制函数中代码的最大行数
    "max-lines-per-function": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
    // "max-statements": ["error", { max: 100 }], //TODO 备用**函数块中允许的最大语句数**
    "no-caller": "error", // **禁止使用 `arguments.caller` 或`arguments.callee`**
    "no-empty-function": "warn", // 不允许空函数
    "no-extra-bind": "error", // **禁止对.bind()的不必要调用**
    "no-param-reassign": "off", // **禁止重新分配函数参数**
    "no-return-assign": "error", // **禁止在return语句中使用赋值操作符**
    "no-return-await": "error", // **不允许不必要的return await**
    "no-useless-call": "error", // **禁止对.call()和.apply()的不必要调用**
    "no-useless-return": "error", // **禁止冗余的返回语句**

    /**
     * 针对回调方法
     */
    "max-nested-callbacks": ["error", { max: 3 }], // **强制回调函数可以嵌套的最大深度**

    /**
     * 针对class类 Object限制
     */
    "no-useless-constructor": "warn", // **禁止不必要的构造函数**
    "accessor-pairs": [
      "error",
      {
        setWithoutGet: true, // setter没有getter时是否警告
        getWithoutSet: false, // getter没有setter时是否警告
        enforceForClassMembers: true // 是否让该规则忽略类声明和类表达式 (false时，在同一文件内,忽略class类的域范围)
      }
    ],
    "grouped-accessor-pairs": ["error", "setBeforeGet"], // 针对getter和setter，要求相邻定义
    // **要求构造函数名称以大写字母开头**
    "new-cap": [
      "error",
      {
        newIsCap: true, // new 后面的构造函数是否要求首字母大写
        capIsNew: false, // 构造函数首字母大写时是否需要new
        newIsCapExceptions: [], // 允许使用new调用指定的以小写开头的函数名import Component, { mixins } from 'vue-class-component';
        capIsNewExceptions: [
          // "Component",
          // "Emit",
          // "Inject",
          // "InjectReactive",
          // "Model",
          // "Prop",
          // "ModelSync",
          // "Provide",
          // "PropSync",
          // "Watch",
          // "Ref",
          // "ProvideReactive",
          // "State",
          // "Getter",
          // "Action",
        ], // 允许在不使用new的情况下调用任何匹配指定regex模式的首字母大写的构造函数
        properties: true
      }
    ],
    "no-useless-computed-key": ["error", { enforceForClassMembers: true }], // **在对象和类中禁止不必要的计算属性键**
    // **要求或禁止对象字面量的方法和属性简写语法**  该规则不标记对象字面量中的箭头函数
    "object-shorthand": ["error", "always", { avoidQuotes: true, ignoreConstructors: false }],
    // **要求对数组和/或对象进行解构**
    "prefer-destructuring": [
      "error",
      { array: true, object: true },
      { enforceForRenamedProperties: false }
    ],
    "quote-props": ["error", "as-needed"], // **要求在对象字面属性名称周围加引号**

    // ***********************************************布局格式化（Layout & Formatting）规则******************************************************
    "array-bracket-spacing": "error"
  },
  overrides: [
    {
      // 为TypeScript文件启用该规则
      files: ["*.ts", "*.mts", "*.cts", "*.tsx", "*.vue"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowedNames: [
              "beforeCreate",
              "created",
              "beforeMount",
              "mounted",
              "beforeUpdate",
              "updated",
              "beforeDestroy",
              "destroyed"
            ]
          }
        ],
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
      }
    }
  ]
};

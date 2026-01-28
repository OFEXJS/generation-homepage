## 未来趋势

### TypeScript

TypeScript 是 JavaScript 的一个超集，它添加了静态类型检查和其他一些功能。约束了 JavaScript 的动态类型，使代码更加可靠和可维护。

> Node.js 不能直接启动 TS 文件，生产环境需要先将 TS 文件编译成 JS 文件，然后再启动 JS 文件。想要在开发过程中直接启动 TS 文件，需要借助 `ts-node-dev` 等工具来启动 Node.js + TS 项目。

**安装相关依赖：**

```bash
npm install ts-node-dev typescript @types/node @types/express --save-dev
```

**Package Scripts：**

```js
// package.json
{
  "scripts": {
    "dev": "ts-node-dev ./bin/www",
    "start": "npm run build && node dist/bin/www",
    "build": "tsc && npm run copy-assets",
    "copy-assets": "npm run copy-views && npm run copy-public",
    "copy-views": "xcopy /E /I /Y views dist\\views",
    "copy-public": "xcopy /E /I /Y public dist\\public"
  },
}
```

**我的 TypeScript 配置（可以直接使用）：**

配置项说明：https://www.typescriptlang.org/tsconfig/

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "allowJs": true,
    "checkJs": true,
    "jsx": "react",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./",
    "removeComments": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": false,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": false,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": false,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": false,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["bin/**/*", "routes/**/*", "app.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### 模块化

#### ESM - 异步加载

ESM 是 ES6（2015） 中的现代模块化标准，它使用 `import` 和 `export` 关键字来导入和导出模块。

> Node.js 需要 ≥ 14 才稳定支持 ESM。

```js
// 导入模块
import { add } from "./math.js";
// 导出模块
export { add };

// 导入模块（不用解构赋值）
import add, { sub } from "./math.js";
// 导出其他模块
export { sub };
export const PI = 3.14;
// 导出默认模块
export default add;
```

#### CommonJS - 同步加载

CommonJS 是 Node.js 中使用的传统模块化标准，它使用 `require` 和 `module.exports` 来导入和导出模块。

```js
// 导入模块
const { add } = require("./math.js");
// 导出模块
module.exports = { add }; // 初始导出
module.exports.PI = 3.14; // 添加属性
```

**exports 别名（module.exports 的引用）**

```js
// 别名导出
exports.sub = sub;
exports.PI = 3.14;

// 等价于：
module.exports.sub = sub;
module.exports.PI = 3.14;

// 不能混合使用 module.exports 和 exports，
// 因为 module.exports 是一个对象，而 exports 是 module.exports 的引用。
// 当你给 module.exports 赋值一个新对象时，exports 就会断开引用，指向新对象。
module.exports = { add: () => {} }; // 改变了 module.exports 的引用，导出新的对象
exports.PI = 3.14; // ❌ 这行不会生效！引用的是 module.exports.PI
```

### Promise

Promise 是 ES6 中的一种新的异步编程模式。它可以将异步操作以同步的方式表达出来，避免了回调地狱的问题。

Promise 状态：

- pending：初始状态，不是成功或失败。
- fulfilled：操作成功完成。
- rejected：操作失败。

```js
// 异步操作
function asyncOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("操作成功");
    }, 2000);
  });
}

// 调用异步操作
asyncOperation()
  .then((result) => {
    console.log(result); // 输出：操作成功
    return Promise.resolve("操作成功2"); // 可以返回 Promise 或普通值
  })
  .then((result2) => {
    console.log(result2); // 输出：操作成功2
    return Promise.resolve("操作成功3"); // 可以返回 Promise 或普通值
  })
  .then((result3) => {
    console.log(result3); // 输出：操作成功3
    return Promise.reject("操作失败3"); // 可以返回 Promise 或普通值，
    // 后续的 then 方法不会执行，而是直接跳转到 catch 方法
  })
  .then((result4) => {
    // 不会执行，而是直接跳转到 catch 方法
    console.log(result4);
  })
  .catch((error) => {
    console.error(error); // 错误信息, 操作失败3
  });
```

Promise 方法：

- 链式调用：可以使用 `then` 方法来链式调用多个异步操作，避免回调地狱。
- 错误处理：可以使用 `catch` 方法来处理 Promise 链中的错误。
- 并行执行：可以使用 `Promise.all` 方法来并行执行多个 Promise 操作。
- 等待所有 Promise 完成：可以使用 `Promise.allSettled` 方法来等待所有 Promise 操作完成，无论是否成功。
- 等待第一个 Promise 完成：可以使用 `Promise.race` 方法来等待第一个 Promise 操作完成（无论成功或失败）。
- 可以使用 `Promise.any` 方法来等待第一个成功的 Promise 操作完成。
- 使用 `Promise.resolve` 方法来创建一个已成功完成的 Promise 对象，返回指定的值。
- 使用 `Promise.reject` 方法来创建一个已失败的 Promise 对象，返回指定的错误信息。

### async/await

async/await 是 ES8（2017） 中的一种新的异步编程模式。它基于 Promise，使异步代码看起来更像同步代码，提高了代码的可读性和维护性。

```js
// 上面的 Promise 代码可以用 async/await 重写
function asyncOperation(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`操作成功${num}`);
      resolve(num + 1);
    }, 2000);
  });
}

// 注意：await 只能在 async 函数中使用，这是因为 await 会暂停 async 函数的执行，等待 Promise 完成。
async function callAsyncOperation() {
  try {
    const result = await asyncOperation(0); // 操作成功1
    // 依赖 result 进行后续操作
    const result2 = await asyncOperation(result); // 操作成功2
  } catch (error) {
    console.error(error); // 错误信息
  }
}

// 调用异步操作
callAsyncOperation();
```

### Try/Catch

Try/Catch 是一种错误处理机制，用于捕获和处理代码操作中的错误。它不只是 JavaScript 才有，其他语言也有类似的机制。

工作流：

1. 执行代码操作。
2. 如果操作成功，继续执行后续代码。
3. 如果操作失败，跳转到 catch 块。
4. 在 catch 块中处理错误，例如打印错误信息或执行备用操作。
5. 如果不管是否成功，都需要执行一些代码，例如关闭文件或数据库连接，在 finally 块。
6. finally 块中的代码无论是否发生错误都会执行。

```js
// 注意：finally 块中的代码无论是否发生错误都会执行，
// 但是如果在 finally 块中使用 return 语句，
// 就会终止后续代码的执行，外层 try/catch 块也会终止。
try {
  // 支持嵌套 try/catch
  try {
    throw new Error("操作失败");
  } catch (error) {
    console.error(error.message); // 操作失败
    throw error; // 重新抛出错误，外部 catch 块可以捕获
  } finally {
    console.log("finally 1"); // 无论是否发生错误，都会执行
    return; // 终止后续代码执行，外层 try/catch 块也会终止
  }
} catch (error) {
  console.error(error.message); // 操作失败
} finally {
  console.log("finally 2"); // 无论是否发生错误，都会执行
}
```

### Throw 语句

throw 语句用于抛出一个错误对象。当 throw 语句被执行时，当前函数的执行会立即停止，
并且控制流会跳转到最近的 catch 块。如果没有 catch 块来处理错误，
错误会冒泡到调用栈的上层，直到被处理或导致程序终止。

```js
function throwError() {
  throw new Error("这是一个错误");
}

try {
  throwError();
} catch (error) {
  console.error(error.message); // 这是一个错误
}
```

### 特殊情况

**异步回调函数内的错误无法被 try/catch 捕获**

```js
// setTimeout 回调函数内的错误无法被 try/catch 捕获，
try {
  setTimeout(() => {
    // 错误会传递到全局
    // Uncaught Error: 异步错误
    throw new Error("异步错误");
  }, 0);
} catch (error) {
  console.log("这里捕获不到错误"); // 不会执行
}

// 解决方案：将 try/catch 移动到异步操作中
setTimeout(() => {
  try {
    throw new Error("异步错误");
  } catch (error) {
    console.log("捕获到:", error.message);
  }
}, 0);
// or 使用 Promise 来处理异步错误
new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      throw new Error("异步错误");
    } catch (error) {
      reject(error);
    }
  }, 0);
}).catch((error) => {
  console.log("Promise捕获:", error.message);
});

// Promise 链中捕获错误
try {
  new Promise((resolve, reject) => {
    throw new Error("Promise内部错误");
  });
} catch (error) {
  console.log("捕获不到Promise构造函数中的错误");
}
// 使用 .then() 也一样
try {
  Promise.resolve().then(() => {
    throw new Error("then中的错误");
  });
} catch (error) {
  console.log("捕获不到then中的错误");
}

// 解决方案：在 Promise 链中使用 catch 方法来捕获错误
new Promise((resolve, reject) => {
  throw new Error("Promise内部错误");
}).catch((error) => {
  console.log("捕获到Promise链中的错误:", error.message);
});
// or 使用 async/await 来处理异步错误
// 方案2：async/await + try-catch
async function example() {
  try {
    await Promise.resolve().then(() => {
      throw new Error("then中的错误");
    });
  } catch (error) {
    console.log("async/await捕获:", error.message);
  }
}
example();
```

### ENV

Node 环境中，我们可以使用 `process.env` 来访问环境变量。根据不同的环境，我们可以启动不同的环境配置。

例如，我们可以在开发环境中使用 `process.env.NODE_ENV` 来判断当前环境是否为开发环境。

```js
// config.js 代码块（供参考）
if (process.env.NODE_ENV === "development") {
  // 开发环境配置
} else {
  // 生产环境配置
}
```

### Log

Node 环境中，我们可以使用 `console` 模块来打印日志。根据不同的 `process.env.NODE_ENV` 环境变量，我们可以打印不同级别的日志。

例如，我们可以在开发环境中打印详细的日志，而在生产环境中只打印必要的日志。可以使用主流的日志库，例如 `pino`、`winston` 等。

### API 分层思想

在代码开发中，需要具备 API 分层思想来组织代码结构。

将应用程序的不同功能模块分离开来，每个模块负责处理特定的业务逻辑。

这样做的好处是提高了代码的可维护性、可扩展性和可测试性。

例如，我们可以将一个简单的 Express 应用程序分为以下几个模块并遵循单向依赖 Controller → Service → Repository：

1. Controller 模块：负责处理 HTTP 请求和响应，参数验证和转换，定义路由和处理函数，调用 Service 模块处理业务逻辑，处理异常（转换为 HTTP 状态码）。
2. Service 模块：负责处理业务逻辑，调用 Repository 数据访问层，业务异常处理，数据转换和验证。
3. Repository 模块：负责与数据库交互，执行 CRUD 操作，查询构建，缓存处理。

每个模块都有自己的职责和功能，它们之间通过依赖注入的方式进行通信。我们可以独立地开发、测试和部署每个模块，而不会影响到其他模块。

### Generator 函数

Generator 函数是一种特殊的函数，它可以暂停执行并在稍后恢复。它**自动实现了迭代器协议**，可以看作是一个更优雅的迭代器创建方式。

> 特殊情况下，如果不使用 Generator 函数来生成迭代器，我们可以给普通对象手动添加 `Symbol.iterator` 属性，使该对象成为可迭代对象。

**核心特点：**

1. 使用 `function*` 定义
2. 使用 `yield` 暂停执行并返回值
3. 调用后返回一个迭代器对象
4. 可以通过 `next()` 方法恢复执行

```js
// 例子1：简单的 Generator 函数
function* generatorFunction(num) {
  // 函数体
  yield num + 1;
}

// 调用 Generator 函数
const generator = generatorFunction(0);
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }

// 例子2：传值
function* twoWayGenerator() {
  const question1 = yield "你叫什么名字？";
  const question2 = yield `你好 ${question1}！你多大了？`;
  return `信息已记录：${question1}，${question2}岁`;
}

const chat = twoWayGenerator();
console.log(chat.next().value); // "你叫什么名字？"
console.log(chat.next("小明").value); // "你好 小明！你多大了？"
console.log(chat.next(25).value); // "信息已记录：小明，25岁"

// 例子3：异步操作
function* fetchUserData() {
  console.log("开始获取用户数据...");
  const userId = yield fetch("/api/user/id");
  console.log("获取到用户ID:", userId);
  const userData = yield fetch(`/api/user/${userId}`);
  return userData;
}

// 更多使用场景：
// - 异步操作控制
// - 无限数据序列
// - 状态机
// - 数据流处理
// - 递归遍历
```

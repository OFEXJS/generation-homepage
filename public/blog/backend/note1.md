## 后端篇-整体架构、请求生命周期

### 整体架构 ✨

![整体架构](/blog/backend/images/img1.png)

### 五个问题 🎯

**1.请求是谁发起的？**

答: 请求通常是由前端发起，用户操作浏览器点击发起 HTTP 请求，后端接收请求并处理。

**2.中间件在生命周期中处在哪个位置？**

答：中间件处在接收到请求但未开始路由匹配处理函数之前，用来处理一些通用的逻辑，如日志记录、权限验证、请求参数解析等。

**3.为什么要分 Controller / Service？**

答：Controller 负责处理 HTTP 请求和响应，调用 Service 层处理业务逻辑。这样可以保持代码的清晰分离，Controller 只负责处理请求和响应，而 Service 层负责处理业务逻辑。

**4.数据库能不能写业务逻辑？为什么？**

答：数据库只是存储数据的工具。业务逻辑是在 Service 层处理，将业务逻辑写在数据库中会增加代码的耦合度，使应用变得复杂和难以维护。

**5.一个接口慢，可能慢在哪几层？**

答：一个接口慢，可能慢在数据库查询、Service 业务逻辑处理、HTTP 网络传输方面。

### 状态码 🔥

- 1xx：信息性状态码，表示请求已被接受，继续处理。

- 2xx：成功状态码，表示请求已被成功处理。

- 3xx：重定向状态码，表示需要进一步的操作才能完成请求。

- 4xx：客户端错误状态码，表示请求包含错误的语法或无法完成请求。

- 5xx：服务器错误状态码，表示服务器处理请求时发生错误。

| 状态码 | 含义 |
| - | - |
| 200 | OK 请求成功 |
| 201 | Created 创建成功 |
| 202 | Accepted 接受请求 |
| 204 | No Content 无内容 |
| 301 | Moved Permanently 永久移动 |
| 302 | Found 临时移动 |
| 304 | Not Modified 未修改 |
| 400 | Bad Request 请求错误 |
| 401 | Unauthorized 未授权 |
| 403 | Forbidden 无权限 |
| 404 | Not Found 未找到 |
| 405 | Method Not Allowed 请求方法不允许 |
| 408 | Request Timeout 请求超时 |
| 409 | Conflict 资源冲突 |
| 410 | Gone 资源已删除 |
| 411 | Length Required 请求长度必需 |
| 412 | Precondition Failed 前提条件失败 |
| 413 | Request Entity Too Large 请求实体过大 |
| 414 | Request-URI Too Long 请求URI太长 |
| 415 | Unsupported Media Type 不支持的媒体类型 |
| 416 | Requested Range Not Satisfiable 请求范围不满足 |
| 417 | Expectation Failed 期望失败 |
| 422 | Unprocessable Entity 无法处理的实体 |
| 429 | Too Many Requests 太多请求 |
| 500 | Internal Server Error 内部服务器错误 |
| 501 | Not Implemented 未实现 |
| 502 | Bad Gateway 错误网关 |
| 503 | Service Unavailable 服务不可用 |
| 504 | Gateway Timeout 网关超时 |
| 505 | HTTP Version Not Supported 不支持的HTTP版本 |

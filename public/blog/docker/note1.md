## 速通 Docker

> 怎么安装 [Docker？](https://docs.docker.com/desktop/)

[Docker](https://www.docker.com/) 是一个开源的容器化平台，用于打包、分发和运行应用程序。它基于容器化技术，将应用程序及其依赖项打包在一个独立的容器中，确保在任何环境中都能一致运行。

Docker 提供了一个简单而强大的命令行工具，用于管理容器。通过 Docker 命令，您可以构建、运行、停止、删除容器，以及管理容器的网络、存储和其他资源。

Docker 核心组件：

- Docker 引擎(docker 自身)：负责构建、运行和管理容器。
- Docker 镜像(docker 对代码进行打包后的包)：用于创建容器的模板，包含应用程序及其依赖项。
- Docker 容器(docker 基于镜像运行后的服务)：运行中的应用程序实例，基于镜像创建。
- Docker 仓库(docker 镜像的发布和分享平台)：用于存储和分享 Docker 镜像的地方，如 [Docker Hub](https://hub.docker.com/)。

## Docker 常用命令

- `docker version`：显示 Docker 版本信息。
- `docker info`：显示 Docker 系统信息（需要启动 Docker）。
- `docker pull`：从 Docker 仓库拉取镜像到本地。
- `docker run`：基于镜像创建并运行一个容器。
- `docker stop`：停止运行中的容器。
- `docker rm`：删除容器。
- `docker images`：列出本地镜像。
- `docker ps`：列出运行中的容器。
- `docker exec`：在运行中的容器中执行命令。
- `docker logs`：查看容器的日志输出。
- `docker build`：基于 Dockerfile 构建镜像。
- `docker tag`：为镜像添加标签。
- `docker push`：将镜像推送到 Docker 仓库。
- `docker search`：搜索 Docker 仓库中的镜像。

## Docker 的操作

Docker 操作很简单，分为镜像操作和容器操作。

### 镜像操作

```bash
# 搜索 Docker 云上仓库的镜像
docker search nginx
# 下载 nginx 镜像
docker pull nginx
# 查看本地下载的镜像
docker images
# 删除本地镜像
docker rmi nginx
# 删除所有镜像
docker rmi $(docker images -q)
# 删除所有未使用的镜像
docker rmi $(docker images -f "dangling=true" -q)
```

### 容器操作

```bash
# 基于 nginx 镜像创建并运行一个容器
# -d 表示在后台运行容器
# -p 80:80 表示将容器的 80 端口映射到主机的 80 端口
# --name my-nginx 表示为容器自定义一个名称，这里是 my-nginx
# container_name 表示容器的名称，这里是 my-nginx
docker run -d -p 80:80 --name my-nginx nginx
# 停止运行中的容器
docker stop <container_id | container_name>
# 重启容器
docker restart <container_id | container_name>
# 列出运行中的容器
docker ps
# 列出所有容器（包括已停止的）
docker ps -a
# 删除容器
docker rm <container_id | container_name>
# 删除所有容器（包括已停止的）
docker rm $(docker ps -a -q)
# 删除所有未使用的容器
docker rm $(docker ps -a -f "status=exited" -q)

# 在运行中的容器中执行命令
# 基于 bash 执行命令
docker exec -it <container_id | container_name> /bin/bash
# 基于 sh 执行命令
docker exec -it <container_id | container_name> sh
# 查看容器的日志输出  -f 表示实时输出
docker logs -f <container_id | container_name>
```

## 其他命令

```bash
# 删除所有未使用的卷
docker volume prune
# 删除所有未使用的网络
docker network prune
```

## 组合操作

docker-compose 是一个用于定义和运行多容器的工具。它使用 YAML 文件来配置应用程序的服务、网络和卷，每个容器都有属于自己的配置。

[语法参考](https://docs.docker.com/reference/compose-file/)

> 容器环境配置项需要到仓库查看，例如 [openresty/openresty 配置项](https://hub.docker.com/r/openresty/openresty#image-labels)

### docker-compose.yml 例子

```yaml
# docker-compose.yml
services:
  # 数据库服务
  openresty:
    image: openresty/openresty:alpine
    container_name: my-openresty
    ports:
      - "6954:6954"
    environment:
      TZ: Asia/Shanghai # 时区设置
    volumes:
      # 配置文件
      - ./conf/my.conf:/usr/local/openresty/nginx/conf/nginx.conf
      # Lua脚本目录
      - ./services:/usr/local/openresty/nginx/services
      # 日志目录
      - ./logs:/usr/local/openresty/nginx/logs
    restart: unless-stopped
```

配置完成后，执行以下命令启动服务：

> 更多命令请参考 [docker-compose 命令](https://docs.docker.com/reference/cli/docker/compose/)

```bash
# 基于 docker-compose.yml 文件启动服务
docker-compose up -d
# 停止并删除所有服务
docker-compose down
# 查看所有服务的状态 -a 表示显示所有服务，包括已停止的
docker-compose ps -a
# 查看服务的日志输出
docker-compose logs -f <service_name>
```

## 构建自己的镜像

想要构建一个属于自己的镜像，需要在项目根目录新建 Dockerfile 文件（没有文件后缀）。Dockerfile 文件中包含了构建镜像的指令，例如基于哪个镜像、安装依赖、复制文件等。[语法参考](https://docs.docker.com/reference/dockerfile/)

### Dockerfile 例子

```yml
FROM openresty/openresty:alpine

RUN mkdir -p /app/logs

WORKDIR /app/openresty-demo

COPY ./ ./

EXPOSE 6954

CMD ["openresty", "-p", "./", "-c", "conf/my.conf", "-g", "daemon off;"]
```

配置完成后，执行以下命令构建镜像：

> 更多命令请参考 [build 命令](https://docs.docker.com/reference/cli/docker/buildx/build/)

```bash
# 基于 Dockerfile 构建镜像
# -t 表示指定规范镜像的名称和标签，例如 my-openresty:v1
docker build -t my-openresty:v1 .
# 查看本地镜像
docker images
```

打包后，就可以当成一个普通的镜像来使用，例如：

```bash
# 打包后启动容器
docker run -d -p 6954:6954 --name my-openresty my-openresty:v1
# 停止容器
docker stop my-openresty
# 删除容器
docker rm my-openresty
# 删除本地镜像
docker rmi my-openresty:v1
```

# .dockerignore 文件

用于指定在构建镜像时要忽略的文件和目录，跟 .gitignore 类似功能，写法一致。

# 容器集群解决方案

[Kubernetes](https://kubernetes.io/)

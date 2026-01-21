## Ubuntu 入门

当你购买了Linux服务器，或者自己本地搭建了Linux服务器，你就需要通过命令行工具来管理服务器。

### 什么是Linux

Linux是一种免费的、开源的操作系统内核，稳定、安全性高、高效、可定制、多用户、多任务处理是 Linux 的主要特点。广义上基于该内核的一系列操作系统的统称（通常称为 Linux 发行版）。

Linux有很多不同的发行版用于服务器、个人电脑、移动设备等。例如Debian、Fedora、Arch Linux等。都是基于Linux内核的操作系统，每个发行版都有自己的特点和适用场景。

例如：

- Ubuntu是一个基于Debian的发行版，它的设计目标是提供一个简单、易用的操作系统，适用于个人电脑。
- CentOS是一个基于Red Hat的发行版，它的设计目标是提供一个稳定、安全的操作系统，适用于服务器。
- 国产系统：如 统信 UOS、麒麟 OS 等也基于 Linux 内核。

Linux 大多数情况下都是作为服务器操作系统使用。命令行工具是管理服务器的主要方式。也是 Linux 操作系统的一个特色。如果不掌握日常操作命令行，你将寸步难行。

## 常用命令行

| 类别     | 常用命令                  | 说明             |
| -------- | ------------------------- | ---------------- |
| 文件操作 | `cp`, `mv`, `rm`, `ls`    | 基本文件操作     |
| 权限管理 | `chmod`, `chown`, `chgrp` | 修改权限和所有者 |
| 进程管理 | `ps`, `top`, `kill`       | 进程查看和控制   |
| 网络管理 | `ip`, `ping`, `curl`      | 网络配置和测试   |
| 包管理   | `apt`, `snap`, `flatpak`  | 软件安装和更新   |
| 服务管理 | `systemctl`               | 系统服务管理     |
| 防火墙   | `ufw`                     | 简单防火墙配置   |

### 进程管理⭐

**进程查看：**

| 命令                           | 说明                                                    | 命令                  | 说明                                                        |
| ------------------------------ | ------------------------------------------------------- | --------------------- | ----------------------------------------------------------- |
| `ps aux`                       | 显示所有进程，`-e` 显示所有进程，`-f` 显示详细信息      | `top`                 | 动态显示进程,`htop`更全面， 需要安装`sudo apt install htop` |
| `ps aux  \| grep process_name` | 查找指定进程名                                          | `pstree`              | 显示进程树                                                  |
| `uptime`                       | 显示系统运行时间和负载平均值                            | `free -h`             | 显示内存使用情况，`-h` 以人类可读的格式显示                 |
| `df -h`                        | 显示文件系统磁盘空间使用情况，`-h` 以人类可读的格式显示 | `du -sh dir_name`     | 显示目录占用空间大小，`-h` 以人类可读的格式显示             |
| `lsof -i:port`                 | 查看占用端口的进程                                      | `ps -ef \| grep port` | 查进程（更通用）                                            |

**进程控制：**

| 命令                   | 说明                     | 命令                    | 说明                         |
| ---------------------- | ------------------------ | ----------------------- | ---------------------------- |
| `kill -9 pid`          | 强制终止进程             | `kill pid`              | 正常终止进程                 |
| `kill -STOP PID`       | 暂停进程                 | `kill -CONT PID`        | 继续进程                     |
| `killall process_name` | 终止指定进程名的所有进程 | `pkill -9 process_name` | 强制终止指定进程名的所有进程 |

### 服务管理⭐

**服务查看：**

| 命令                                | 说明                                              | 命令                            | 说明         |
| ----------------------------------- | ------------------------------------------------- | ------------------------------- | ------------ |
| `systemctl is-active service_name`  | 检查服务是否正在运行，返回`active`或`inactive`    | `systemctl status service_name` | 查看服务状态 |
| `systemctl is-enabled service_name` | 检查服务是否开机自启动，返回`enabled`或`disabled` | `uname -a`                      | 查看内核版本 |
| `lsb_release -a`                    | 查看 Linux 发行版信息                             | `uptime`                        | 查看负载     |
| `ps --no-headers -o comm 1`         | 查看 init 初始主进程（systemd/service）           |                                 |              |

**服务控制：**

| 命令                             | 说明           | 命令                             | 说明               |
| -------------------------------- | -------------- | -------------------------------- | ------------------ |
| `systemctl start service_name`   | 启动服务       | `systemctl stop service_name`    | 停止服务           |
| `systemctl enable service_name`  | 开机自启动服务 | `systemctl disable service_name` | 取消开机自启动服务 |
| `systemctl restart service_name` | 重启服务       | `systemctl reload service_name`  | 重新加载服务配置   |

### 包管理

**apt 软件包管理：⭐**

| 命令                                      | 说明                 | 命令                                     | 说明                                     |
| ----------------------------------------- | -------------------- | ---------------------------------------- | ---------------------------------------- |
| `apt update`                              | 更新软件包列表       | `apt upgrade`                            | 升级已安装的软件包                       |
| `apt install package_name1 package_name2` | 安装软件包           | `apt remove package_name1 package_name2` | 移除软件包                               |
| `apt purge package_name`                  | 移除软件包和配置文件 | `apt search package_name --names-only`   | 搜索软件包，`--names-only`只显示软件包名 |
| `apt show package_name`                   | 显示软件包信息       | `apt-cache depends package_name`         | 显示软件包依赖                           |
| `apt full-upgrade`                        | 升级所有软件包       | `apt autoremove`                         | 移除未使用的软件包                       |
| `apt autoclean`                           | 清理旧的软件包缓存   | `apt list --installed`                   | 显示已安装的软件包                       |

**Snap 软件包管理：**

| 命令                          | 说明               | 命令                       | 说明                   |
| ----------------------------- | ------------------ | -------------------------- | ---------------------- |
| `snap install package_name`   | 安装Snap软件包     | `snap remove package_name` | 移除Snap软件包         |
| `snap refresh [package_name]` | 更新Snap软件包     | `snap find package_name`   | 搜索Snap软件包         |
| `snap info package_name`      | 显示Snap软件包信息 | `snap list`                | 显示已安装的Snap软件包 |

**Flatpak 软件包管理：**

`flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo` 需要添加Flathub远程仓库

| 命令                            | 说明                  | 命令                             | 说明                      |
| ------------------------------- | --------------------- | -------------------------------- | ------------------------- |
| `flatpak install package_name`  | 安装Flatpak软件包     | `flatpak uninstall package_name` | 移除Flatpak软件包         |
| `flatpak update [package_name]` | 更新Flatpak软件包     | `flatpak run package_name`       | 运行Flatpak软件包         |
| `flatpak info package_name`     | 显示Flatpak软件包信息 | `flatpak list`                   | 显示已安装的Flatpak软件包 |

**源码编译安装：⭐**

| 命令                              | 说明                | 命令                             | 说明                        |
| --------------------------------- | ------------------- | -------------------------------- | --------------------------- |
| `./configure`                     | 配置编译选项        | `make`                           | 编译源代码                  |
| `sudo make install`               | 安装软件            | `sudo ldconfig`                  | 更新动态链接库缓存          |
| `sudo checkinstall`               | 安装软件并生成deb包 | `sudo dpkg -i package_name.deb`  | 安装deb软件包               |
| `sudo dpkg --remove package_name` | 移除deb软件包       | `sudo dpkg --purge package_name` | 移除deb软件包并删除配置文件 |

### 权限管理

**文件权限：⭐**

| 命令                        | 说明                                        | 命令                            | 说明                                             |
| --------------------------- | ------------------------------------------- | ------------------------------- | ------------------------------------------------ |
| `ls -l`                     | 显示文件权限，`ls -la`包含隐藏文件          | `stat filename`                 | 显示文件详细信息，包括权限、所有者、大小等       |
| `chmod 755 filename`        | 修改文件权限                                | `chmod -R 755 directory`        | 修改目录及其子目录下所有文件的权限为755          |
| `chown user:group filename` | 修改文件所有者                              | `chown -R user:group directory` | 修改目录及其子目录下所有文件的所有者为user:group |
| `chgrp groupname filename`  | 修改文件所属组                              | `chgrp -R groupname directory`  | 修改目录及其子目录下所有文件的所属组为group      |
| `chmod u+s filename`        | 设置 SUID（以文件所有者身份执行）           | `chmod +t directory`            | 设置 Sticky Bit（仅文件所有者可删除）            |
| `chmod g+s directory`       | 设置 SGID（新创建的文件所属组为目录所属组） |                                 |                                                  |

**用户管理：**

| 命令          | 说明                         | 命令            | 说明                   |
| ------------- | ---------------------------- | --------------- | ---------------------- |
| `adduser`     | 添加用户                     | `deluser`       | 删除用户               |
| `usermod`     | 修改用户                     | `passwd`        | 修改密码               |
| `whoami`      | 显示当前用户                 | `who`           | 显示登录用户           |
| `id username` | 显示用户信息                 | `su - username` | 切换用户并加载环境变量 |
| `sudo -i`     | 切换到root用户并加载环境变量 |

**组管理：**

| 命令                              | 说明           | 命令                            | 说明           |
| --------------------------------- | -------------- | ------------------------------- | -------------- |
| `groupadd`                        | 创建组         | `groupdel`                      | 删除组         |
| `usermod -aG group_name username` | 将用户添加到组 | `gpasswd -d username groupname` | 从组中删除用户 |
| `groups username`                 | 显示用户所属组 |                                 |                |

### 文件操作

**文件编辑：⭐**

| 命令                         | 说明                   | 命令                         | 说明                    |
| ---------------------------- | ---------------------- | ---------------------------- | ----------------------- |
| `nano`                       | 简单文本编辑器         | `vi`                         | 功能强大的vim文本编辑器 |
| `echo "text" > file.txt`     | 写入文件               | `diff file1.txt file2.txt`   | 比较两个文件的差异      |
| `grep "pattern" file.txt`    | 搜索文件内容           | `grep -r "pattern" /path`    | 递归搜索目录下所有文件  |
| `grep -i "pattern" file.txt` | 忽略大小写搜索文件内容 | `grep -v "pattern" file.txt` | 搜索不包含指定模式的行  |
| `sort file.txt`              | 对文件内容进行排序     | `uniq file.txt`              | 去重                    |
| `wc -l file.txt`             | 统计文件行数           | `wc -w file.txt`             | 统计文件单词数          |

**文件查看：**

| 命令                       | 说明                        | 命令                             | 说明                              |
| -------------------------- | --------------------------- | -------------------------------- | --------------------------------- |
| `pwd`                      | 显示当前工作目录            | `ls`                             | 列出目录内容                      |
| `cd`                       | 切换目录                    | `cat`                            | 查看文件内容                      |
| `less`                     | 分页查看                    | `tail -f`                        | 实时查看文件内容                  |
| `find /path -name "*.txt"` | 查找指定目录下所有的txt文件 | `find /path -type f -size +100M` | 查找指定目录下所有大于100MB的文件 |

**文件创建：**

| 命令                     | 说明           | 命令                  | 说明                         |
| ------------------------ | -------------- | --------------------- | ---------------------------- |
| `touch`                  | 创建空文件     | `cp`                  | 复制文件或`-r`目录           |
| `mkdir`                  | 创建目录       | `rmdir`               | 删除目录                     |
| `mv`                     | 移动文件或目录 | `rm`                  | 删除文件或`-r`目录，`-f`强制 |
| `ln -s target link_name` | 创建软链接     | `ln target link_name` | 创建硬链接                   |

### 网络管理

| 命令             | 说明                                                 | 命令                                 | 说明                       |
| ---------------- | ---------------------------------------------------- | ------------------------------------ | -------------------------- |
| `ifconfig`（旧） | 显示网络接口信息                                     | `ping IP/url`                        | 测试与目标主机的连接       |
| `ip addr`（新）  | 显示网络接口信息                                     | `ip link`                            | 查看网络接口状态           |
| `ss -lntup`      | 查看端口监听情况                                     | `telnet`                             | 连接到远程主机             |
| `wget url`       | 下载文件                                             | `curl url`                           | 发送HTTP请求并显示响应内容 |
| `crontab -e`     | 编辑定时任务，`-l`显示定时任务列表，`-r`删除定时任务 | `sudo systemctl status service_name` | 查看服务状态               |

### 防火墙⭐

| 命令                          | 说明                 | 命令                       | 说明                 |
| ----------------------------- | -------------------- | -------------------------- | -------------------- |
| `ufw enable`                  | 启用防火墙           | `ufw disable`              | 禁用防火墙           |
| `ufw status`                  | 查看防火墙状态       | `ufw allow port/from IP`   | 允许指定端口或者IP   |
| `ufw deny port/from IP`       | 拒绝指定端口或者IP   | `ufw delete allow port`    | 删除允许指定端口     |
| `ufw default allow`（不安全） | 默认允许所有入站流量 | `ufw default deny`（推荐） | 默认拒绝所有入站流量 |
| `ufw reset`                   | 重置防火墙规则       | `ufw limit port/tcp`       | 限制指定端口的流量   |

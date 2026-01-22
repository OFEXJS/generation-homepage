## Ubuntu 目录结构说明

### `/etc` - 系统配置目录

系统全局配置文件，类似 Windows 的注册表。

```text
/etc/
├── passwd                    # 用户账户信息
├── shadow                    # 加密密码
├── group                     # 用户组信息
├── fstab                     # 文件系统挂载表
├── hosts                     # 主机名解析
├── hostname                  # 系统主机名
├── resolv.conf               # DNS配置
├── apt/                      # APT包管理配置
│   ├── sources.list         # 软件源
│   └── sources.list.d/      # 额外源
├── network/                  # 网络配置
├── ssh/                      # SSH配置
│   ├── sshd_config          # 服务器配置
│   └── ssh_config           # 客户端配置
├── nginx/                    # Nginx配置
│   ├── nginx.conf           # 主配置
│   ├── sites-available/     # 可用站点
│   └── sites-enabled/       # 启用站点
├── apache2/                  # Apache配置
├── mysql/                    # MySQL配置
├── systemd/                  # systemd配置
│   ├── system/              # 系统服务
│   └── user/                # 用户服务
├── cron.d/                   # 定时任务
│   ├── cron.daily/          # 每日任务
│   ├── cron.hourly/         # 每小时任务
│   ├── cron.monthly/        # 每月任务
│   └── cron.weekly/         # 每周任务
├── pam.d/                    # 认证模块
├── sudoers                   # sudo权限
├── profile                   # 系统环境
├── environment               # 环境变量
├── bash.bashrc              # 全局bash配置
├── default/                  # 默认配置
│   └── useradd              # 用户添加默认值
├── skel/                     # 用户模板
├── ld.so.conf               # 动态链接库配置
├── modprobe.d/              # 内核模块
├── sysctl.conf              # 内核参数
├── udev/                    # 设备管理规则
├── logrotate.d/             # 日志轮转
├── rsyslog.d/               # 系统日志
└── tmpfiles.d/              # 临时文件
```

### `/home` - 用户主目录

每个用户的个人文件和配置。

```text
/home/ubuntu/
├── Desktop/           # 桌面文件
├── Documents/         # 文档
├── Downloads/         # 下载文件
├── Music/             # 音乐
├── Pictures/          # 图片
├── Videos/            # 视频
├── Public/            # 公共文件
├── Templates/         # 模板文件
├── .bashrc            # Bash 配置
├── .profile           # 环境配置
├── .ssh/              # SSH 密钥
│   ├── id_rsa         # 私钥
│   └── id_rsa.pub     # 公钥
├── .config/           # 应用程序配置
├── .local/            # 本地用户程序
├── .cache/            # 用户缓存
└── .mozilla/          # Firefox 配置

# 重要配置文件：
~/.bashrc      # Bash shell 配置
~/.profile     # 登录环境变量
~/.vimrc       # Vim 编辑器配置
~/.gitconfig   # Git 配置
~/.ssh/config  # SSH 客户端配置
```

### `/bin` - 基础命令目录

存储系统启动和运行必需的基础命令，如 `bash`、`ls`、`cd`, `cat`, `chown` 等。

### `/sbin` - 系统管理命令目录

存储系统管理命令，通常需要 root 权限才能执行。如 `ifconfig`、`reboot`、`su` 等。

### `/tmp` - 临时文件目录

存储临时文件，如临时文件、临时目录等。

### `/opt` - 可选软件目录

存储可选软件，如数据库、Web 服务器等。如 `/opt/mysql`、`/opt/apache2` 等。

### `/usr` - 用户程序资源目录

类似于 Windows 的 Program Files，用户级程序和数据，用户安装的程序主要在这里。

```text
/usr/
├── bin/               # 用户命令（大部分命令在这里）
├── sbin/              # 非关键系统管理命令
├── lib/               # 应用程序库文件
├── share/             # 架构无关的共享数据
│   ├── man/           # 手册页
│   ├── doc/           # 文档
│   ├── applications/  # 桌面菜单项
│   └── icons/         # 图标文件
├── include/           # C/C++ 头文件
├── local/             # 本地编译安装的软件
├── src/               # 源代码
└── games/             # 游戏程序
```

### `/var` - 可变数据目录

存储经常变化的文件：日志、缓存、数据库等。

```text
/var/
├── log/          # 系统日志
│   ├── syslog    # 综合系统日志
│   ├── auth.log  # 认证日志
│   ├── kern.log  # 内核日志
│   ├── apt/      # 包管理日志
│   └── nginx/    # Web 服务器日志
├── cache/        # 应用程序缓存
│   ├── apt/      # APT 包缓存
│   └── man/      # 手册页缓存
├── lib/          # 状态信息
│   ├── dpkg/     # 包数据库
│   └── mysql/    # MySQL 数据库
├── run/          # 运行时数据
├── tmp/          # 临时文件
├── spool/        # 队列数据
│   ├── mail/     # 邮件队列
│   └── cron/     # 定时任务
└── www/          # Web 内容（部分系统）
```

### `/boot` - 启动文件目录

引导加载程序和内核文件。

```text
/boot/
├── grub/                    # GRUB 引导程序
│   ├── grub.cfg            # GRUB 配置文件
│   └── fonts/              # 引导菜单字体
├── vmlinuz-5.4.0-xx        # 压缩的内核镜像
├── initrd.img-5.4.0-xx     # 初始 RAM 磁盘
├── System.map-5.4.0-xx     # 内核符号表
├── config-5.4.0-xx         # 内核编译配置
└── efi/                    # UEFI 引导文件（UEFI系统）
```

### `/lib` - 系统库目录

系统启动和运行所需的核心库。

```text
/lib/
├── modules/                # 内核模块
│   └── 5.4.0-xx-generic/  # 特定内核版本的模块
├── systemd/                # systemd 系统管理器
├── udev/                   # 设备管理器
└── 各种 .so 文件           # 共享库
```

### `/snap` - Snap 包目录

Ubuntu Snap 应用程序的安装目录。

```text
/snap/
├── snapd/              # Snap 守护进程
├── core/               # 核心运行时
├── firefox/            # Firefox 浏览器（Snap 包）
└── code/               # VS Code（Snap 包）
```

### `/run` - 运行时数据目录

系统运行时数据目录，存储正在运行的进程和应用程序的临时数据。

### `/proc` - 进程信息虚拟文件系统

内核和进程信息的虚拟文件系统。如 `/proc/cpuinfo`、`/proc/meminfo` 等。

### `/dev` - 设备文件目录

硬件设备的文件接口。

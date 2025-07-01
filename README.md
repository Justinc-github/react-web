# 代码结构

## 一、src

### 1、components

> 此文件下放着所有的公共组件。

* TopNavBar：网站的顶部导航栏
* Unauthorized：网站的错误页面
* VideoPlayer：网页播放器

### 2、pages

> 每个功能界面

#### 2.1 Auth

> 用户的认证模块，例如登录注册等

##### 2.1.1 components

* requireAuth.tsx：用户验证守卫

##### 2.1.2 utils

* logout.ts：退出函数
* supabaseClient.ts：supabase链接函数
* userCurrent.ts：获取当前用户函数

#### 2.2 help

> 帮助界面，App与网页共用

##### 2.2.1 components

* docs：对应的md文档，修改帮助文档内容
* pages：对应的托管函数

##### 2.2.2 utils

* 共用的模板

#### 2.3 Home

> 网站的首页

#### 2.4 Music

> 音乐界面

#### 2.5 WindowsDownload

> 桌面应用版本托管界面

### 3、routes

> 对所有的路由进行统一管理

### 4、utils

> 共用的工具


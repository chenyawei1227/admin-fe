项目可能遇到初始化问题的解决方案
------------------------------------------------------------------------------------------------------------------------------------------------
一：使用淘宝镜像

直接运行下面的命令即可：

	SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

我们可能更希望能直接使用 npm install 安装所有依赖，所以我的做法是在项目内添加一个 .npmrc 文件：

	phantomjs_cdnurl=http://cnpmjs.org/downloads
	sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
	registry=https://registry.npm.taobao.org
 

这样使用 npm install 安装 node-sass 和 phantomjs 时都能自动从淘宝源上下载，但是在使用 npm publish 的时候要把 registry 这一行给注释掉，否则就会发布到淘宝源上去了。

二：使用梯子

假设你的梯子在你本地机器上开启了一个第三方服务器 127.0.0.1:1080，那么只需按照下面的方法配置一下就能正常安装 node-sass 了（如果你开启的是 PAC 模式而不是全局模式，那还需要将 s3.amazonaws.com 加入 PAC 列表）：

	npm config set proxy http://127.0.0.1:1080
	npm i node-sass

下载完成后删除 http 代理
	npm config delete proxy
嗯，这样下来就能正常安装了。

------------------------------------------------------------------------------------------------------------------------------------------------

项目初始化步骤

1.安装nodejs环境,推荐使用v4.4.7
    下载地址 : https://nodejs.org/download/release/v4.4.7/

2.全局安装webpack v2.x
	
	命令: (sudo) npm install -g webpack@2.2.1 --registry=http://registry.npm.taobao.org

3.全局安装webpack-dev-server
   
    命令: (sudo) npm install -g webpack-dev-server@1.16.2 --registry=http://registry.npm.taobao.org

4.下载源码，解压缩

5.在项目根目录执行npm初始化
    
    命令: npm install (--registry=http://registry.npm.taobao.org)

6.启动项目
    
    开发模式: npm run dev (windows系统上为npm run dev_win)
    生产模式: npm run dist (windows系统上为npm run dist_win)

7.开发模式下预览项目
    
	访问：http://localhost:8086/dist/view/index.html


#### 注意
1.后台管理系统使用了sass, 需要安装ruby和sass
## 一、npm install 事报错

```
No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:351:16)
gyp ERR! stack     at ChildProcess.emit (events.js:310:20)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
gyp ERR! System Darwin 19.5.0
gyp ERR! command "/usr/local/bin/node" "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /Users/chenyawei/learn_React/my-app/node_modules/watchpack-chokidar2/node_modules/fsevents
gyp ERR! node -v v12.16.2
gyp ERR! node-gyp -v v5.1.0
gyp ERR! not ok

```

### 1. 尝试用如下命令进行修复

```bash
$ xcode-select --install
```

系统提示如下信息：

```bash
xcode-select: error: command line tools are already installed, use "Software Update" to install updates
```

而事实上并没有所谓的"Software Update"可以更新

### 2. 正确姿势

一筹莫展之际，找到如下解决方案：

```bash
$ sudo rm -rf $(xcode-select -print-path)
$ xcode-select --install
```

## 二、npm install 报错如下

```
npm ERR! Unexpected end of JSON input while parsing near '...,"dist":{"shasum":"af' 错误
```

解决办法：

```
npm cache clean --force
命令提示: npm WARN using --force I sure hope you know what you are doing.说明操作成功.
```

三、webpack 打包报错

```
Error: Chunk.parents: Use ChunkGroup.getParents() instead #67
```

解决办法：

```bash
npm install --save-dev preload-webpack-plugin@next
```

## 三、[Webpack + Babel: Couldn't find preset “es2015” relative to directory](https://stackoverflow.com/questions/40188578/webpack-babel-couldnt-find-preset-es2015-relative-to-directory)

![image-20200611192740525](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfokpmb9zjj30u00vn7do.jpg)

## 四、Unhandled rejection Error: "dependency" is not a valid chunk sort mode at HtmlWebpackPlugin.sortEntryChunks 

解决方法：chunksSortMode: 'none',

```
new HtmlWebpackPlugin({
            filename        : 'view/index.html',
            title           : 'MMall 后台管理系统',
            template        : './src/index.html',
            favicon         : './favicon.ico',
            inject          : true,
            hash            : true,
            chunks          : ['vendors', 'app'],
            //chunksSortMode  : 'dependency',
            chunksSortMode: 'none',
            minify          : {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
```

## 五、富文本编辑器插件： "simditor": "^2.3.28"，报错simditor.js:2537 Uncaught TypeError: Simditor.connect is not a function

```
Install simditor at the version 2.3.22 with webpack(Run yarn add simditor@2.3.22 in Rails 6)
换成： npm install simditor@2.3.22
```


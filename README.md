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


# FindThePairJS

[试一下](https://jasonleaster.github.io/FindThePairJS/dist/index)

当前项目的架构是基于webpack工具链的，你可以在release中找到早期没有引入webpack的版本。完善这个小游戏是个非常有意思的过程，通过它，我开始慢慢接触前端项目构建的技术。

### 作者
EOF

### 用法

运行
> npm install && npm run build

项目所需资源均打包生成在`dist`目录中，在浏览器中打开 `dist/index.html`。

### 内容

实现“翻牌找对”游戏功能，考验玩家记忆能力。玩家连续翻出两张相同的牌则视为一组成功的操作，如果牌面样式花色不一样，牌会重新翻转覆盖回去。玩家翻出所有相同花色的牌则游戏结束。

### 用途
了解掌握基础的前端项目构建方法，熟悉 webpack + npm + vue + 前端三板斧 的工程经验，熟悉vue使用特点。
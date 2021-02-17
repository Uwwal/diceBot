# diceBot
一个基于mirai-http-api和mirai-js的骰子机器人.

## 准备工作

按照[mirai-js文档](https://drincann.github.io/Mirai-js/#/Preparation?id=%e4%b8%8d%e4%bc%9a%e5%bc%80%e5%90%af%ef%bc%9f)及[mirai-http-api文档](https://github.com/project-mirai/mirai-api-http/blob/master/API-Tester/install.md)完成准备工作.

## 部署

<p>请用控制台在mirai-js目录执行`npm i`语句.<p>
<p>克隆本项目. 并更改main.js文件中路径/你的bot信息/指令开头...更改dice.js文件中路径.<p>
<p>使用控制台执行`node main.js`<p>

## 使用说明
<p>指令由指令开头+指令本体组成.~~当然你不想用指令开头可以注释掉main.js中的语句.~~<p>
<p>如:指令开头r30d40+5 开锁<p>
<p>其中r30非必须, 表示一共要roll30次骰子. 如果r后无数字则取默认值1. 最大不能超过两位数.<p>
<p>d必须, 表示这是骰子.<p>
<p>40非必须, 表示骰子面数, 返回1~40中的随机值. 如果d后无数字则取默认值100. 最大不能超过两位数. 如需使用百面骰建议直接使用指令开头d.<p>
<p>+5非必须, 表示数学表达式, 可使用四则运算~~不过只匹配一次~~.<p>
<p>开锁非必须(前面的空格也不是必须), 表示骰骰子目的. 可以在后面接图片/At.<p>

<p>其他例子: <p>
<p>指令开头r3d5+2 表示roll两次五面骰子, 结果+2.<p>
<p>指令开头d 表示roll一次百面骰子.<p>
<p>指令开头rd 同上.<p>

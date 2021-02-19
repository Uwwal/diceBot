const { Bot, Message, Middleware } = require('你的mirai-js路径/src/Mirai-js');
const { dice } = require('./dice');

(async () => {
    try {
        const baseUrl = '你的http-api网络位置:8080';
        const authKey = '你的authKey';
        const qq = 你的qq;
        const password = '你的密码';
        const bot = new Bot();

        const INSTRUCTION_HEAD = '你的指令开头';


        // 创建一个会话
        await bot.open({
            // mirai-api-http 的服务端地址，
            baseUrl,
            // 要绑定的 qq，须确保该用户已在 mirai-console 登录
            qq,
            // authKey 用于验证连接者的身份，在插件配置文件中设置
            authKey,
        });

        // 监听好友消息事件
        bot.on('FriendMessage', async ({
            messageChain,
            sender: {
                id: fromQQ,
                nickname: fromQQNickName,
                remark
            }
        }) => {
            console.log({ fromQQ, fromQQNickName, remark });
            if(messageChain[1].type == 'Plain' && messageChain[1].text[0] == INSTRUCTION_HEAD){
                if(dice.match(messageChain[1].text)){
                    bot.sendMessage({
                        friend: fromQQ,
                        messageChain: dice.getMessageChain(messageChain, fromQQNickName)
                    });
                }
            }
        });
        
        // 监听群消息事件
        bot.on('GroupMessage', async ({
            messageChain,
            sender: {
                id: fromQQ,
                memberName: fromNickname,
                permission: fromQQPermission,
                group: {
                    id: fromGroup,
                    name: groupName,
                    permission: botPermission
                }
            }
        }) => {
            console.log({ fromQQ, fromNickname, fromQQPermission });
            console.log({ fromGroup, groupName, botPermission });

            
            if (messageChain[1].type == 'Plain') {
                if (messageChain[1].text[0] == INSTRUCTION_HEAD) {
                    // INSTRUCTION_HEADaa => aa
                    var command = messageChain[1].text.split(INSTRUCTION_HEAD)[1];

                    if (dice.match(command)) {
                        bot.sendMessage({
                            group: fromGroup,
                            messageChain: dice.getMessageChain(messageChain, fromNickname,command);
                        });
                    }
                }
            }
            
            // 你可以像这样来判断群成员的权限
            switch (fromQQPermission) {
                case Bot.GroupPermission.OWNER:
                    // 群主
                    break;
                case Bot.GroupPermission.ADMINISTRATOR:
                    // 管理员
                    break;
                case Bot.GroupPermission.MEMBER:
                    // 普通群成员
                    break;
            }
        });

        // 自动重新登陆
        bot.on('BotOfflineEventForce',
            new Middleware()
                .autoReLogin({ bot, baseUrl, authKey, password })
                .done()
        );
    } catch (err) {
        console.log(err)
    }
})();

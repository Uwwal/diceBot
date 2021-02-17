'use strict'

const { Message } = require('你的mirai-js路径/src/Mirai-js');

const dice = {
    pattern: /^[*](?:r([0-9]{0,2}))?d([0-9]{0,2})([+\-*/][0-9]{0,3})?(.*)$/,

    time: 1,   //次数 对应r
    face: 100, //面数 对应d 100 = 1~100

    match: function (string) {
        //检测是否存在匹配
        //true or false
        return this.pattern.test(string);
    },

    getValue: function (string) {
        //输入 *r3d5+1 吃苹果
        //返回 *r3d5+1 吃苹果,3,5,+1,吃苹果
        return this.pattern.exec(string);
    },

    checkValueisEmpty: function (any) {
        return any == '' || any == undefined;
    },

    roll: function (face) {
        if (this.checkValueisEmpty(face)) { face = this.face; }
        //向下取整 face=100 范围为1~100
        return Math.floor(Math.random() * face) + 1;
    },

    workOutwithString: function (string) {
        return eval(string);
    },

    getMessageChain: function (messageChain, fromNickname) {
        // valueList 0: 匹配到的字符串 1:投掷次数 2:骰子面数 3:数学表达式 4:目的
        var valueList = dice.getValue(messageChain[1].text);

        var sum = 0;

        var frontString = '';
        var backString = '';

        var containPurpose = false;

        frontString += information.getPreface();
        frontString += information.getStringwithNickName(fromNickname);

        if (!this.checkValueisEmpty(valueList[4])) {
            frontString += information.getStringwithPurpose(valueList[4]);
            containPurpose = !containPurpose;
        }

        if (this.checkValueisEmpty(valueList[1])) {
            backString += information.getStringwithRollTime(this.time);

            var temNumber = this.roll(valueList[2]);
            sum += temNumber;

            backString += information.getStringwithRollNumber(temNumber);
        } else {
            backString += information.getStringwithRollTime(valueList[1]);

            for (var i = 0; i < valueList[1]; i += 1) {
                var temNumber = this.roll(valueList[2]);
                sum += temNumber;

                backString += information.getStringwithRollNumber(temNumber);

                if (i != valueList[1] - 1) {
                    backString += information.getRollNumberIntervalString(temNumber);
                }
            }
        }

        backString += information.getRollNumberEndString(sum);

        if (!this.checkValueisEmpty(valueList[3])) {
            backString += information.getStringwithMathFormula(sum, valueList[3]);
        } else {
            backString += '点. ';
        }

        backString += information.getEndString();

        var temMessage = new Message().addText(frontString);

        if (containPurpose) {
            for (var i = 2; i < messageChain.length; i += 1) {
                switch (messageChain[i].type) {
                    case 'Plain':
                        temMessage.addText(messageChain[i].text);
                        break;
                    case 'At':
                        temMessage.addAt(messageChain[i].target);
                        break;
                    case 'Image':
                        temMessage.addImageId(messageChain[i].imageId);
                        break;
                }
            }
        }

        temMessage.addText(backString);

        return temMessage.getMessageChain();
    },

};

const information = {
    preface: ['我看看.. ', '骰子是如此显示的. '],

    endString: ['这骰子果然灌铅了吧?', '这结果属实有点离谱了!'],

    getPreface: function () {
        //front
        return this.preface[Math.floor(Math.random() * this.preface.length)];
    },

    getStringwithNickName: function (fromNickname) {
        //front
        return '我帮' + fromNickname;
    },

    getStringwithPurpose: function (purpose) {
        //front
        //然后接messageChain剩下部分
        return '判定' + purpose;
    },

    getStringwithRollTime: function (time) {
        //back
        return '一共投掷了' + time.toString() + '次骰子, 分别为: { ';
    },

    getStringwithRollNumber: function (rollNumber) {
        //back
        return rollNumber.toString();
    },

    getRollNumberIntervalString: function () {
        //back
        return ' , ';
    },

    getRollNumberEndString: function (sum) {
        //back
        return ' }. 共' + sum.toString() + ' ';
    },

    getStringwithMathFormula: function (sum, mathFormula) {
        //back
        //slice : *120 => ... * 120 = ...
        return mathFormula[0] + ' ' + mathFormula.slice(1) + ' = ' + dice.workOutwithString(sum.toString() + mathFormula).toFixed(3) + '点. ';
    },

    getEndString: function () {
        //back
        return this.endString[Math.floor(Math.random()) * this.preface.length];
    }
};

module.exports = {
    dice
};
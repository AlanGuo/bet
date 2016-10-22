var total,
    bigBetAmount,
    smallBetAmount,
    baoziBetAmount,
    //0 = 大, 1 = 小, 3，4，5，6 = 豹子
    betOptions,
    totalWin,
    totalLose,
    maxBet

//初始化
var totalElem = document.getElementById('total'),
    bigAmountElem = document.getElementById('big-amount'),
    smallAmountElem = document.getElementById('small-amount'),
    baoziAmountElem = document.getElementById('baozi-amount'),
    diceElemArray = document.getElementById('dice-ul').querySelectorAll('li'),
    bigRadio = document.getElementById('big'),
    smallRadio = document.getElementById('small'),
    baoziRadio = document.getElementById('baozi'),
    baoziInput = document.getElementById('baozi-input'),
    resultUl = document.getElementById('result-ul'),
    resultSum = document.getElementById('result-sum'),
    luckResult = document.getElementById('luck-result')

function init(){
    total = 10000
    bigBetAmount = 100,
    smallBetAmount = 100,
    baoziBetAmount = 100,
    //0 = 大, 1 = 小, 3，4，5，6 = 豹子
    betOptions = -1
    totalWin = 0
    totalLose = 0
    maxBet = 0
    resultUl.innerHTML = ''
}

init()
//开局
function go() {
    bigBetAmount = bigAmountElem.value * 1
    smallBetAmount = smallAmountElem.value * 1
    baoziBetAmount = baoziAmountElem.value * 1

    maxBet = bigBetAmount>maxBet?bigBetAmount:maxBet
    maxBet = smallBetAmount>maxBet?smallBetAmount:maxBet
    maxBet = baoziBetAmount>maxBet?baoziBetAmount:maxBet

    var r = [-1,-1,-1]

    betOptions = -1
    if((total - bigBetAmount -smallBetAmount-baoziBetAmount)  <= 0){
        //console.log('赌本不足')
        return -1
    }
    if((bigRadio.checked || smallRadio.checked || baoziRadio.checked) && (bigBetAmount>=100 || smallBetAmount>=100 || baoziBetAmount>=100)){
        if(baoziRadio.checked){
            betOptions = baoziInput.value * 1
            if(betOptions >=3 && betOptions <=6){
                //合法数值
            }
            else{
                console.log('非法豹子')
                return -2
            }
        }
        //出结果
        var result = 0,
            resultArray =[],
            resultString = '',
            baozi = false

        for(var i=0;i<diceElemArray.length;i++){
            var num = Math.floor(Math.random()*6+1)
            diceElemArray[i].innerText = num
            result += num
            resultArray.push(num)
        }

        if(resultArray[0] == resultArray[1] && resultArray[1] == resultArray[2]){
            resultString = '豹子:'+betOptions
            baozi = true
        }else if(result >= 11){
            resultString = '大'
        }else{
            resultString = '小'
        }

        //豹子
        if(baoziRadio.checked && betOptions != -1){
            if(betOptions == resultArray[0] && betOptions == resultArray[1] && betOptions == resultArray[2]){
                //win
                totalWin++
                resultString += ', 豹子:win'
                total += baoziBetAmount*10
                r[2] = 1
            }else{
                //lose
                totalLose++
                resultString += ', 豹子:lose'
                total -= baoziBetAmount
                r[2] = 0
            }
        }

        //大
        if(bigRadio.checked){
            betOptions = 0
            if(!baozi && result >= 11){
                //win
                totalWin++
                resultString += ', 大:win'
                total += bigBetAmount
                r[0] = 1
            }else{
                //lose
                totalLose++
                resultString += ', 大:lose'
                total -= bigBetAmount
                r[0] = 0
            }
        }

        //小
        if(smallRadio.checked){
            betOptions = 1
            if(!baozi && result < 11){
                //win
                totalWin++
                resultString += ', 小:win'
                total += smallBetAmount
                r[1] = 1
            }else{
                //lose
                totalLose++
                resultString += ', 小:lose'
                total -= smallBetAmount
                r[1] = 0
            }
        }
        
        if(resultArray[0] == resultArray[1] &&  resultArray[1] == resultArray[2]){
            //console.log(resultArray)
            resultUl.innerHTML += '<li style="color:red">'+resultArray[0]+'+'+resultArray[1]+'+'+resultArray[2]+'='+result+' '+resultString+'</li>'
        }else{
            resultUl.innerHTML += '<li>'+resultArray[0]+'+'+resultArray[1]+'+'+resultArray[2]+'='+result+' '+resultString+'</li>'
        }
        totalElem.innerText = total
        resultSum.innerText = 'all: '+(totalWin+totalLose) + ', win: '+totalWin + ', lose: '+ totalLose+', maxBet: '+maxBet

        return r
    }
}

var totalGoodLuck = 0,
    totalBadLuck = 0

function win(){
    var targetBig = [], targetSmall = []
    for(var i=0;i<10;i++){
        targetBig.push(1)
        //targetSmall.push(1)
    }

    init()
    var recursiveBet = function(){
        if(targetBig.length){
            //押大
            bigRadio.checked = true
            //大
            if(targetBig.length == 1){
                //大
                bigAmountElem.value = (targetBig[0])*100
            }else{
                //大
                bigAmountElem.value = (targetBig[0] + targetBig[targetBig.length-1])*100
            }
        }
        else{
            bigAmountElem.value = 0
            bigRadio.checked = false
        }
        if(targetSmall.length){
            //押小
            smallRadio.checked = true
            //小
            if(targetSmall.length == 1){
                //小
                smallAmountElem.value = (targetSmall[0])*100
            }else{
                //小
                smallAmountElem.value = (targetSmall[0] + targetSmall[targetSmall.length-1])*100
            }
        }
        else{
            smallRadio.checked = false
            smallAmountElem.value = 0
        }

        if(targetBig.length || targetSmall.length){
            var r = go()
            if(r == -1){
                //停止模拟
                totalBadLuck++
                return
            }else{
                //大
                if(r[0] == 1){
                    targetBig.shift()
                    targetBig.pop()
                }else if(r[0] == 0){
                    targetBig.push(targetBig[0] + targetBig[targetBig.length-1])
                }
                //小
                if(r[1] == 1){
                    targetSmall.shift()
                    targetSmall.pop()
                }else if(r[1] == 0){
                    targetSmall.push(targetSmall[0] + targetSmall[targetSmall.length-1])
                }
            }
            //模拟下注
            recursiveBet()
        }else{
            totalGoodLuck++
        }
    }

    recursiveBet()
    luckResult.innerText = 'GoodLuck: '+totalGoodLuck+', BadLuck: '+totalBadLuck+', 胜率: '+(totalGoodLuck/(totalGoodLuck+totalBadLuck))
}
var total = 10000,
    betAmount = 100,
    //0 = 大, 1 = 小, 3，4，5，6 = 豹子
    betOptions = -1


//初始化
var totalElem = document.getElementById('total'),
    betAmountElem = document.getElementById('amount'),
    diceElemArray = document.getElementById('dice-ul').querySelectorAll('li'),
    bigRadio = document.getElementById('big'),
    smallRadio = document.getElementById('small'),
    baoziRadio = document.getElementById('baozi'),
    baoziInput = document.getElementById('baozi-input'),
    resultUl = document.getElementById('result-ul')
//开局
function go() {
    betAmount = betAmountElem.value * 1
    betOptions = -1
    if(total - betAmount <= 0){
        console.log('赌本不足')
        return
    }
    if((bigRadio.checked || smallRadio.checked || baoziRadio.checked) && betAmount>=100){
        if(baoziRadio.checked){
            betOptions = baoziInput.value * 1
            if(betOptions >=3 && betOptions <=6){
                //合法数值
            }
            else{
                console.log('非法豹子')
                return;
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
        }
        else if(result >= 10){
            resultString = '大'
        }
        else{
            resultString = '小'
        }

        //豹子
        if(baoziRadio.checked && betOptions != -1){
            if(betOptions == resultArray[0] && betOptions == resultArray[1] && betOptions == resultArray[2]){
                //win
                resultString += ', win'
                total += betAmount
            }
            else{
                resultString += ', lose'
                total -= betAmount
            }
        }


        //大
        if(bigRadio.checked){
            betOptions = 0
            if(!baozi && result >= 10){
                resultString += ', win'
                total += betAmount
            }
            else{
                resultString += ', lose'
                total -= betAmount
            }
        }

        //小
        if(smallRadio.checked){
            betOptions = 1
            if(!baozi && result < 10){
                //win
                resultString += ', win'
                total += betAmount
            }
            else{
                resultString += ', lose'
                total -= betAmount
            }
        }
        
        if(resultArray[0] == resultArray[1] &&  resultArray[1] == resultArray[2]){
            console.log(resultArray)
            resultUl.innerHTML += '<li style="color:red">'+resultArray[0]+'+'+resultArray[1]+'+'+resultArray[2]+'='+result+' '+resultString+'</li>'
        }
        else{
            resultUl.innerHTML += '<li>'+resultArray[0]+'+'+resultArray[1]+'+'+resultArray[2]+'='+result+' '+resultString+'</li>'
        }
        totalElem.innerText = total
    }
}
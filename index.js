let screen = document.getElementById('screen')
let buttons = document.getElementsByTagName('button')
let calculatorStr = ''
for(let i = 0; i<buttons.length ; i++){
   buttons[i].addEventListener('click',() => {
    if(buttons[i].textContent.includes("=")){
        oneOp()
    }else if(buttons[i].textContent.includes("AC")){
        calculatorStr = ''
        screen.textContent = calculatorStr
    }else if(buttons[i].textContent.includes("CL")){
        calculatorStr = calculatorStr.substr(0, calculatorStr.length-1)
        screen.textContent = calculatorStr
    }else{
        calculatorStr += buttons[i].textContent
        screen.textContent = calculatorStr
    }
   })
}


function oneOp(){
    let result = recursiveStr(calculatorStr)
    calculatorStr = ''
    calculatorStr += result
    screen.textContent = calculatorStr
}


function convertData(str1, op){
    let result = 0
    if(op == '+'){
        let num1 = parseFloat(str1.split("\+")[0])
        let num2 = parseFloat(str1.split("\+")[1])
        result = calculator(num1, num2, '+')
    }else if(op == '-'){
        let num1 = parseFloat(str1.split("-")[0])
        let num2 = parseFloat(str1.split("-")[1])
        result = calculator(num1, num2, '-')
    }else if(op == '*'){
        let num1 = parseFloat(str1.split("\*")[0])
        let num2 = parseFloat(str1.split("\*")[1])
        result = calculator(num1, num2, '*')
    }else if(op == '/'){
        let num1 = parseFloat(str1.split("\/")[0])
        let num2 = parseFloat(str1.split("\/")[1])
        result = calculator(num1, num2, '/')
    }else if(op == '^'){
        let num1 = parseFloat(str1.split("\^")[0])
        let num2 = parseFloat(str1.split("\^")[1])
        result = calculator(num1, num2, '^')
    }
    return result
}

function calculator(num1, num2, op){
    switch(op){
        case '+':
            return num1+num2;
        case '-':
            return num1-num2
        case '*':
            return num1*num2
        case '/':
            return num1/num2
        case '^':
            return Math.pow(num1, num2)    
        default:
            return 0            
    }
}
/**
 * 
 * @param {String} str 
 */

function recursiveStr(str){
    if(str.search(/([\d]+[\^][\d]+)+/) != -1){
        let clone = str.match(/([\d]+[\^][\d]+)+/)[0]
        let result = convertData(clone,'^')
        console.log(result)
        str = str.replace(/([\d]+[\^][\d]+)+/, result)
        console.log(str)
        return recursiveStr(str)
    }else if(str.search(/([\d]+[\*][\d]+)+/) != -1){
        let clone = str.match(/([\d]+[\*][\d]+)+/)[0]
        let result = convertData(clone,'*')
        console.log(result)
        str = str.replace(/([\d]+[\*][\d]+)+/, result)
        console.log(str)
        return recursiveStr(str)
    }else if(str.search(/([\d]+[\/][\d]+)+/) != -1){
        let clone = str.match(/([\d]+[\/][\d]+)+/)[0]
        console.log(clone)
        let result = convertData(clone,'/')
        str = str.replace(/([\d]+[\/][\d]+)+/, result)
        console.log(str)
        return recursiveStr(str)
    }else{
        if(str.indexOf('+') == -1 && str.indexOf('-') == -1) return parseFloat(str)
        let clone = str.match(/([\d]+[\+-][\d]+)+/)[0]
        let result = 0
        if(clone.indexOf('+') != -1){
            result = convertData(clone, '+')
            str = str.replace(/([\d]+[\+][\d]+)+/, result)
        }else if(clone.indexOf('-') != -1){
            result = convertData(clone, '-')
            str = str.replace(/([\d]+[-][\d]+)+/, result)
            console.log(str)
        }
        if(str.indexOf('+') == -1 && str.indexOf('-') == -1) return result
        else return recursiveStr(str)
    }
    
}
console.log(recursiveStr("5+4*133/3"))
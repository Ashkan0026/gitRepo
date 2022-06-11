let screen = document.getElementById('screen')
let buttons = document.getElementsByTagName('button')
let calculatorStr = ''
for(let i = 0; i<buttons.length ; i++){
   buttons[i].addEventListener('click',() => {
    if(buttons[i].textContent.includes("=")){
        if(counter(calculatorStr) <= 1){
            oneOp()
        }else if(counter(calculatorStr) == 2){
            let result = calculateResult(calculatorStr)
            calculatorStr = ''
            calculatorStr += result
            screen.textContent = calculatorStr
        }
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

function counter(str){
    let howmany = 0;
    for(let i = 0; i<str.length ; i++){
        if(str.charAt(i) == '+' || str.charAt(i) == '-' || str.charAt(i) == '*' || str.charAt(i) == '/'){
            howmany++
        }
    }
    return howmany
}

function oneOp(){
    let result
    if(calculatorStr.includes("+")){
        result = calculator(parseFloat(calculatorStr.split("\+")[0]),parseFloat(calculatorStr.split("\+")[1]),'+')                    
    }else if(calculatorStr.includes("-")){
            result = calculator(parseFloat(calculatorStr.split("-")[0]),parseFloat(calculatorStr.split("-")[1]),'-')
    }else if(calculatorStr.includes("*")){
        result = calculator(parseFloat(calculatorStr.split("\*")[0]),parseFloat(calculatorStr.split("\*")[1]),'*')
    }else if(calculatorStr.includes("\/")){
        result = calculator(parseFloat(calculatorStr.split("\/")[0]),parseFloat(calculatorStr.split("\/")[1]),'/')
    }else if(calculatorStr.includes("sin")){
        result = Math.sin(parseFloat(calculatorStr.substr(calculatorStr.indexOf('n')+1,calculatorStr.length)))
    }else if(calculatorStr.includes('^')){
        result = calculator(parseFloat(calculatorStr.split("\^")[0]), parseFloat(calculatorStr.split("\^")[1]), '^')
    }
    calculatorStr = ''
    calculatorStr += result
    screen.textContent = calculatorStr
}

function calculateResult(str){
    if(str.includes("*")){
        if(str.includes("+")){
            if(str.indexOf('*') > str.indexOf('+')){
                let secondStr = str.substr(str.indexOf('+')+1,str.length)
                let firstNum = parseFloat(str.substr(0,str.indexOf('+')))
                let secondNum = calculator(parseFloat(secondStr.split("\*")[0]),parseFloat(secondStr.split("\*")[1]),'*')
                console.log(secondNum)
                return (firstNum+secondNum)
            }else if(str.indexOf('*') < str.indexOf('+')){
                let newStr = str.substr(0,str.indexOf('+'))
                let firstNum = parseFloat(str.substr(str.indexOf('+')+1,str.length))
                let secondNum = calculator(parseFloat(newStr.split("\*")[0]),parseFloat(newStr.split("\*")[1]),'*')
                console.log(newStr)
                return (secondNum+firstNum)
            }
            return 0
        }else if(str.includes("-")){
            if(str.indexOf('*') > str.indexOf('-')){
                let secondStr = str.substr(str.indexOf('-')+1,str.length)
                let firstNum = parseFloat(str.substr(0,str.indexOf('-')))
                let secondNum = calculator(parseFloat(secondStr.split("\*")[0]),parseFloat(secondStr.split("\*")[1]),'*')
                return (firstNum-secondNum)
            }else if(str.indexOf('*') < str.indexOf('-')){
                let newStr = str.substr(0,str.indexOf('-'))
                let firstNum = parseFloat(str.substr(str.indexOf('-')+1,str.length))
                let secondNum = calculator(parseFloat(newStr.split("\*")[0]),parseFloat(newStr.split("\*")[1]),'*')
                return (secondNum-firstNum)
            }
            return 0
        }
        return 0
    }else if(str.includes("/")){
        if(str.includes("+")){
            if(str.indexOf('/') > str.indexOf('+')){
                let secondStr = str.substr(str.indexOf('+')+1,str.length)
                let firstNum = parseFloat(str.substr(0,str.indexOf('+')))
                let secondNum = calculator(parseFloat(secondStr.split("\/")[0]),parseFloat(secondStr.split("\/")[1]),'/')
                return (firstNum+secondNum)
            }else if(str.indexOf('/') < str.indexOf('+')){
                let newStr = str.substr(0,str.indexOf('+'))
                let firstNum = parseFloat(str.substr(str.indexOf('+')+1,str.length))
                let secondNum = calculator(parseFloat(newStr.split("\/")[0]),parseFloat(newStr.split("\/")[1]),'/')
                
                return (secondNum+firstNum)
            }
            return 0
        }else if(str.includes("-")){
            if(str.indexOf('/') > str.indexOf('-')){
                let secondStr = str.substr(str.indexOf('-')+1,str.length)
                let firstNum = parseFloat(str.substr(0,str.indexOf('-')))
                let secondNum = calculator(parseFloat(secondStr.split("\/")[0]),parseFloat(secondStr.split("\/")[1]),'/')
                
                return (firstNum-secondNum)
            }else if(str.indexOf('/') < str.indexOf('-')){
                let newStr = str.substr(0,str.indexOf('-'))
                let firstNum = parseFloat(str.substr(str.indexOf('-')+1,str.length))
                let secondNum = calculator(parseFloat(newStr.split("\/")[0]),parseFloat(newStr.split("\/")[1]),'/')
                
                return (secondNum-firstNum)
            }
            return 0
        }
        return 0
    }
    return 0
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

class Calculator {
    constructor (currentTextcontent,previusTextcontent,operations,containerBoxHistory) {
        this.currentTextcontent = currentTextcontent
        this.previusTextcontent = previusTextcontent
        this.operationsEl = operations
        this.currentOperand = ""
        this.perviusOperand = ""
        this.operation = ""
        this.containerBoxHistory = containerBoxHistory
    }

    clearAll() {
        this.currentOperand = ""
        this.perviusOperand = ""
        this.operation = ""
        this.currentTextcontent.innerHTML = "0"
        this.previusTextcontent.innerText = ""
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        this.currentTextcontent.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.getDisplayNumber(this.currentOperand).length == 0) {
            this.currentTextcontent.innerText = "0"
        }
    }

    getNumber(number) {
        if(number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    getOperation(operation) {
        if(this.currentOperand === "") return
        if(this.currentOperand != "") {
            this.compute()
        } 
        this.operation = operation
        this.perviusOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute () {
        let computation
        const perv = parseFloat(this.perviusOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(perv) || isNaN(current)) return
        if(this.operation === "+") computation = perv + current
        if(this.operation === "-") computation = perv - current
        if(this.operation === "*" || this.operation === "&times") computation = perv * current
        if(this.operation === "/" || this.operation === "&divide") computation = perv / current

        this.currentOperand = computation
        this.perviusOperand = ""
        this.operation = ""
        
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
        integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    ClearHistoryContainer() {
        this.containerBoxHistory.innerHTML = ""
    }

    history() {
        if(this.currentOperand === "") return
        const clock = new Date()
        const div = document.createElement("div")
        div.classList.add("single-box")
        const span = document.createElement("span")
        const p_1 = document.createElement("p")
        const p_2 = document.createElement("p")

        this.containerBoxHistory.appendChild(div)
        div.appendChild(span)
        div.appendChild(p_1)
        div.appendChild(p_2)
        span.innerText = `${clock.getHours()}:${clock.getMinutes()}`
        p_1.innerText = `${this.operation}`
        p_2.innerText = `${this.getDisplayNumber(this.currentOperand)}`

        div.addEventListener("click" ,() => {
            this.currentOperand = p_2.innerHTML
            this.currentTextcontent.innerText = this.currentOperand
        })
    }

    updateDis() {
        this.currentTextcontent.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.currentTextcontent.innerText === "") {
            this.currentTextcontent.innerText = "0"
        }
        
        if (this.operation === "/") this.operation = "&divide"
        if (this.operation === "*") this.operation = "&times"
        
        if (this.operation != null) {
        this.previusTextcontent.innerHTML =
        `${this.getDisplayNumber(this.perviusOperand)} <span>${this.operation}</span>`
        } else {this.previusTextcontent.innerHTML = ""}
    }
}

const numbers = document.querySelectorAll("[data-number]")
const operations = document.querySelectorAll("[data-operation]")
const delet = document.querySelector("[data-delete]")
const clearAll = document.querySelector("[data-clearAll]")
const equals = document.querySelector("[data-equals]")
const overlay = document.querySelector(".overlay")
const historyContainer = document.querySelector(".historyContainer")
const historyBtn = document.querySelector(".historyBtn")
const historytext = document.querySelector(".text")
const containerBoxHistory = document.querySelector(".boxContainer")
const calculatorContainer = document.querySelector(".calculator")
const currentTextcontent = document.querySelector("[data-current]")
const previusTextcontent = document.querySelector("[data-previus]")
const spann = document.querySelector(".spann")

const calculator = new Calculator(currentTextcontent,previusTextcontent,operations,containerBoxHistory)

numbers.forEach(button => {
    button.addEventListener("click" , ()=> {
        calculator.getNumber(button.innerText)
        calculator.updateDis()
    })
})

operations.forEach(button => {
    button.addEventListener("click" , ()=> {
        calculator.getOperation(button.value)
        calculator.updateDis()
    })
})

equals.addEventListener("click" , () => {
    calculator.compute()
    calculator.updateDis()
    calculator.history()
})

clearAll.addEventListener("click" , () => {
    calculator.clearAll()
})

delet.addEventListener("click", () => {
    calculator.delete()
})

historyBtn.addEventListener("click", () =>{
    historyContainer.classList.toggle("active");
})

spann.addEventListener("click" ,()=> {
    calculator.ClearHistoryContainer()
})
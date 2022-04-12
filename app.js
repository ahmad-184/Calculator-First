
class Calculator {

    constructor (previusTextContent,currentTextContent,containerBoxHistory,calculatorContainer,historyContainer) {
        this.previusTextContent = previusTextContent
        this.currentTextContent = currentTextContent
        this.containerBoxHistory = containerBoxHistory
        this.calculatorContainer = calculatorContainer
        this.historyContainer = historyContainer
        this.clear()
    }

    clear() {
        this.previusOperand = ""
        this.currentOperand = ""
        this.operation = ""
    }

    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    getNumber (number) {
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation (operation) {
        if (this.currentOperand === "") return
        if (this.previusOperand !== "") {
            this.cmpute ()
        }
        this.operation = operation
        this.previusOperand = this.currentOperand
        this.currentOperand = ""
    }

    cmpute() {
        let computation
        const perv = parseFloat(this.previusOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(perv) || isNaN(current)) return
        if (this.operation === "+") computation = perv + current
        if (this.operation === "&times") computation = perv * current
        if (this.operation === "&divide") computation = perv / current
        if (this.operation === "-") computation = perv - current

        this.currentOperand = computation
        this.previusOperand = ""
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

    updateDisplay () { 
        this.currentTextContent.innerText = this.getDisplayNumber(this.currentOperand)

        if (this.operation === "*") this.operation = `&times`
        if (this.operation === "/") this.operation = `&divide`

        if (this.operation != null) {
            this.previusTextContent.innerHTML = `${this.getDisplayNumber(this.previusOperand)} <span>${this.operation}</span>`
        } else {
            this.previusTextContent.innerHTML = ""
        }
    }

    Check() {
        if (this.currentOperand == "") return
        this.creatHistoryBox()
    }

    creatHistoryBox (A,B,C,D) {
        const clock = new Date()
        const myBGboxes = ["blue","orange","pink","red","skyBlue","orangeLight","green","gray"]
        const myBboxes = ["#1b2f55d1","#392714d1","#461d40d1","#5b2323d1","#274553d1","#534a27d1","#304f2ad1","#59595982"]
        const getRandomColor = Math.floor(Math.random()*8)

        let box = document.createElement("div")
        let span = document.createElement("span")
        let p_1 = document.createElement("p")
        let p_2 = document.createElement("p")

        box.classList.add("single-box")

        this.containerBoxHistory.appendChild(box)
        box.appendChild(span)
        box.appendChild(p_1)
        box.appendChild(p_2)
        box.classList.add(`${myBGboxes[getRandomColor]}`)
        this.calculatorContainer.style.borderColor = `${myBboxes[getRandomColor]}`
        this.historyContainer.style.borderColor = `${myBboxes[getRandomColor]}`

        span.innerText = `${clock.getHours()}:${clock.getMinutes()}`
        // p_1.innerText = `${A} ${B} ${C} ${D}`
        p_2.innerText = `${this.getDisplayNumber(this.currentOperand)}`

        // box.addEventListener("click", () => {
        //     // this.updateDisplay()
        //     // this.previusTextContent.innerHTML = p_1.innerText
        //     this.currentTextContent.innerHTML = p_2.innerHTML
        // })
    }
}



const numbers = document.querySelectorAll("[data-number]")
const operations = document.querySelectorAll("[data-operation]")
const delet = document.querySelector("[data-delete]")
const cleaerAll = document.querySelector("[data-clearAll]")
const equals = document.querySelector("[data-equals]")
const overlay = document.querySelector(".overlay")
const historyContainer = document.querySelector(".historyContainer")
const historyBtn = document.querySelector(".historyBtn")
const historytext = document.querySelector(".text")
const containerBoxHistory = document.querySelector(".boxContainer")
const calculatorContainer = document.querySelector(".calculator")

const currentTextcontent = document.querySelector("[data-current]")
const previusTextcontent = document.querySelector("[data-previus]")

const calculator = new Calculator(previusTextcontent,currentTextcontent,containerBoxHistory,calculatorContainer,historyContainer)


numbers.forEach(button => {
    button.addEventListener("click", () => {
        calculator.getNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operations.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.value)
        calculator.updateDisplay()
    })
})
delet.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})
equals.addEventListener("click", () => {
    calculator.cmpute()
    calculator.updateDisplay()
    calculator.Check()
})
cleaerAll.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})
historyBtn.addEventListener("click", () => {
    overlay.style.display= "block"
    setTimeout(() => {
        historyContainer.classList.toggle("active")
    }, 70);
})
overlay.addEventListener("click", () => {
    historyContainer.classList.toggle("active")
    setTimeout(() => {
        overlay.style.display= "none"
    }, 170);
})
class Numbers{ // All numbers input, listeners for all numbers
    constructor(fields){
        this.numberOne = document.getElementById('1');
        this.numberTwo = document.getElementById('2');
        this.numberThree = document.getElementById('3');
        this.numberFour = document.getElementById('4');
        this.numberFive = document.getElementById('5');
        this.numberSix = document.getElementById('6');
        this.numberSeven = document.getElementById('7');
        this.numberEight = document.getElementById('8');
        this.numberNine = document.getElementById('9');
        this.numberZero = document.getElementById('0');
        this.tocka = document.getElementById('tocka');

        this.numberOne.addEventListener('click', () => { this.number('1') });
        this.numberTwo.addEventListener('click', () => { this.number('2') });
        this.numberThree.addEventListener('click', () => { this.number('3') });
        this.numberFour.addEventListener('click', () => { this.number('4') });
        this.numberFive.addEventListener('click',  () => { this.number('5') });
        this.numberSix.addEventListener('click', () => { this.number('6') });
        this.numberSeven.addEventListener('click', () => { this.number('7') });
        this.numberEight.addEventListener('click', () => { this.number('8') });
        this.numberNine.addEventListener('click', () => { this.number('9') });
        this.numberZero.addEventListener('click', () => { this.number('0') });
        this.tocka.addEventListener('click', () => { this.number('.') });

        // this.temporaryNumber = fields.temporaryNumber;
        this.resultLabel = fields.resultLabel;
        this.inputField = fields.inputField;
    }

    number(num){
        let arr = this.resultLabel.textContent.split(' ');
        if(arr[arr.length-1] === ''){
            arr = arr.splice(0, arr.length-1);
        }
        if( arr[arr.length-1] === '=' ){
            this.inputField.textContent = '';
            this.resultLabel.textContent = 0;
        }
        if(parseInt(this.inputField.textContent) === temporaryNumber){
            this.inputField.textContent = '';
        }
        else if(this.inputField.textContent === arr[0]){
            this.inputField.textContent = '';
        }
        else if(arr[arr.length-1] === '='){
            this.inputField.textContent = ''; 
            this.resultLabel.textContent = '0';
        }
        this.inputField.textContent = this.inputField.textContent + num;
    }
}

class Operators { // All operators input, listeners for all operations and equal, abs, delete, clear
    constructor(fields){
        this.plus = document.getElementById('plus');
        this.minus = document.getElementById('minus');
        this.multiply = document.getElementById('multiply');
        this.devide = document.getElementById('devide');
        this.modul = document.getElementById('modul');
        this.clearAll = document.getElementById('clear');
        this.deleteLast = document.getElementById('delete');
        this.plusOrMinus = document.getElementById('plus-or-minus');
        this.equal = document.getElementById('equal');
        this.inputField = document.getElementById('input-calculation');
        this.resultLabel = document.getElementById('result-label');

        this.clearAll.addEventListener('click', () => { this.inputField.textContent = '0';  this.resultLabel.textContent = '0';});
        this.deleteLast.addEventListener('click', () => { this.inputField.textContent = this.inputField.textContent.substring(0, this.inputField.textContent.length - 1);  });
        this.plus.addEventListener('click', () => { this.operator(' + ') });
        this.minus.addEventListener('click', () => { this.operator(' - ') });
        this.multiply.addEventListener('click', () => { this.operator(' x ') });
        this.devide.addEventListener('click', () => { this.operator(' / ') });
        this.modul.addEventListener('click', () => { this.operator(' % ') });
        this.plusOrMinus.addEventListener('click', () => {
            if(parseInt(this.inputField.textContent) > 0){ this.inputField.textContent = '-' + this.inputField.textContent;}
            else if(parseInt(this.inputField.textContent) < 0){
                this.inputField.textContent = this.inputField.textContent.slice(1, this.inputField.textContent.length);
        }});

        this.resultLabel = fields.resultLabel;
        this.inputField = fields.inputField;
    }

    operator(oper){
        const calcu = new Calculations(new Fields());
        calcu.calculateResult();
        let arr = this.resultLabel.textContent.split(' ');
        if(arr[arr.length-1] === ''){
            arr = arr.splice(0, arr.length-1);
        }
        if(arr.length <= 1){
            this.resultLabel.textContent = this.inputField.textContent + oper;
        } else if( arr[arr.length-1] === '='){
            this.resultLabel.textContent = this.inputField.textContent + oper;
        } else{
            this.resultLabel.textContent = this.resultLabel.textContent + tempNumberBefore + oper;
        } 
    }
}

class Fields { // fields where result and current number are writen and functions for operations
    constructor(){
        this.inputField = document.getElementById('input-calculation');
        this.resultLabel = document.getElementById('result-label');
    }
    plusNum(num1, num2){ return num1 + num2; }
    minusNum(num1, num2){ return num1 - num2; }
    multiplyNum(num1, num2){ return num1 * num2; }
    devideNum(num1, num2){ return num1 / num2; }
    modulNum(num1, num2){ return num1 % num2; }
}

class Calculations{ // all posible calculations
    constructor(fields){
        this.resultLabel = fields.resultLabel;
        this.inputField = fields.inputField;
        this.plusNum = fields.plusNum;
        this.minusNum = fields.minusNum;
        this.multiplyNum = fields.multiplyNum;
        this.devideNum = fields.devideNum;
        this.modulNum = fields.modulNum;
        
        equal.addEventListener('click', () => { // equal sign listener
            if(this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === '+' ){
                this.equalListener(this.plusNum);
            } else if( this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === '-' ){
                this.equalListener(this.minusNum);
            } else if( this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === 'x' ){
                this.equalListener(this.multiplyNum);
            } else if( this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === '/' ){
                this.equalListener(this.devideNum);
            } else if( this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === '%' ){
                this.equalListener(this.modulNum);
            }
        });

    }
    calculation(operator, operatorFunc){ // calculation result
        let arr = this.resultLabel.textContent.split(' ');
        if(arr[arr.length-1] === ''){
            arr = arr.splice(0, arr.length-1);
        }
        if( ( arr[arr.length-1] ) === operator ){ // '+' or other operators
            if(arr.length <= 2){
                tempNumberBefore = this.inputField.textContent;
                let rezTemp = operatorFunc( parseInt(arr[arr.length-2]), parseInt(this.inputField.textContent) );
                this.inputField.textContent = rezTemp;
                temporaryNumber = rezTemp;
            }
            else{
                tempNumberBefore = this.inputField.textContent;
                let rezTemp = operatorFunc( temporaryNumber, parseInt(this.inputField.textContent) );
                this.inputField.textContent = rezTemp;
                temporaryNumber = rezTemp;
            }
        } 
    }
    calculateResult(){ // where we are calling calculation();
        if(this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === '+' ){
            this.calculation('+', this.plusNum);
        }  else if( this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === '-' ){
            this.calculation('-', this.minusNum);
        } else if( this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === 'x' ){
            this.calculation('x', this.multiplyNum);
        } else if( this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === '/' ){
            this.calculation('/', this.devideNum);
        } else if( this.resultLabel.textContent.charAt(this.resultLabel.textContent.length-2) === '%' ){
            this.calculation('%', this.modulNum);
        }
    }
    equalListener (operator){ // Equal sign listener / what it actualy do
        let arr = this.resultLabel.textContent.split(' ');
        const hist = new History();
        if(arr[arr.length-1] === ''){
            arr = arr.splice(0, arr.length-1);
        }
        if(arr.length <= 3){
            let result = operator( parseInt(arr[0] ), parseInt(this.inputField.textContent) );
            this.resultLabel.textContent = this.resultLabel.textContent + this.inputField.textContent + ' =';
            temporaryNumber = result;
            this.inputField.textContent = temporaryNumber;
            hist.renderHistory(this.resultLabel.textContent, this.inputField.textContent);
        }
        else{
            let result = operator(  temporaryNumber, parseInt(this.inputField.textContent) );
            this.resultLabel.textContent = this.resultLabel.textContent + this.inputField.textContent + ' =';
            temporaryNumber = result;
            this.inputField.textContent = temporaryNumber;
            hist.renderHistory(this.resultLabel.textContent, this.inputField.textContent);
        }
    }
}

class History { // for adding history of calculations in history tab
    constructor(){
        this.hisBoard = document.getElementById('his-board');
    }
    checkWidth(x) { // check for width of screen if is less than 700px hide History tab
        const rightHistory = document.getElementById('right-history');
        const leftCalculator = document.getElementById('left-calculator');
        if (x.matches) { 
            rightHistory.classList.add('display');
            leftCalculator.classList.add('width');
        } else{
            leftCalculator.classList.remove('width');
            rightHistory.classList.remove('display');
        } 
    }
    renderHistory(calculations, result){ // to add new elements in history after pressing equal sign
        const paragraphCalculations = document.createElement('p');
        const paragraphResult = document.createElement('p');
        paragraphCalculations.textContent = calculations;
        paragraphCalculations.className = ('paragraph-normal');
        paragraphResult.textContent = result;
        paragraphResult.className = ('paragraph-bold');
        this.hisBoard.appendChild(paragraphCalculations);
        this.hisBoard.appendChild(paragraphResult);
    }
    historyMedia(){ // where we are checking width of our pagee
        const x = window.matchMedia("(max-width: 700px)");
        this.checkWidth(x);
        x.addListener(this.checkWidth);
    }
}

class App{ // class for calling everything we need
    constructor(){
        this.nmb = new Numbers(new Fields());
        this.opr = new Operators(new Fields());
        this.hist = new History();
    }
}

let temporaryNumber; // global variable which we need for calculations
let tempNumberBefore; // global variable which we need for calculations

const app = new App();
app.hist.historyMedia(); // always check for width of page


import { Component } from '@angular/core';
import { CalculatorService } from '../app/calculator.service';
import { Memory } from '../app/memory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { 
  constructor(private CalculatorService: CalculatorService) {}

  result: string = "0"; 
  equation: string = ""; //A felhasználó által összeállított, kiszámolandó egyenlet
  operatorError: boolean = false;

  //Gomb leütés kezelése - Műveleti jelek duplikált bevitelének megelőzése
  pressKey(key: string) {
    let examinedChars: string[] = [];
    if (this.equation.length > 0) {
      let previousKey: string = this.equation[this.equation.length - 1];
      examinedChars.push(key,previousKey);
    } else {
      examinedChars.push(key);   
    }
    this.operatorError = examinedChars.every(val => ["+", "-", "x", "/", "."].includes(val));
    if (this.operatorError) return; 
    this.equation += key;
  }

  //Eredmény kiszámítása Eval()-val
  getAnswerEval() {    
    if (this.equation === "") return this.result = "Error";
    let repairedEquation: string = this.equation.replace(/x/g, "*");    
    this.result = eval(repairedEquation).toString();
  }

  //Alaphelyzetbe állítás, törlés
  allClear() {
    this.equation = "";
    this.result = "0";
    this.operatorError = false;
  }

  //Tárolt memória olvasása
  readMem() {
    this.CalculatorService.readMem()
      .subscribe((memory: Memory) => this.equation += memory.data);   
  }

  //Memória tárolása
  updateMem() {
    let memory: Memory = {data: this.result};
    this.CalculatorService.updateMem(memory)
      .subscribe(() => this.result = "Saved");
  }
  
  //NINCS HASZNÁLATBAN
  //Eredmény kiszámítása Eval() nélkül, saját algoritmussal
  getAnswer() {
    if (this.equation === "") return this.result = "Error";
   
    //Egyenlet operandusainak eltárolása számként tömbben
    let elements: number[] = (this.equation.split(/[+\-x\/]/))
      .map(currentElement => parseFloat(currentElement));
    let elementsLength: number = elements.length;

    //Egyenlet műveleti jeleinek eltárolása stringként tömbben
    let operators: string[] = []; 
    let equationLength: number = this.equation.length;     
    for (let i = 0; i < equationLength; i++) {
      if (["+", "-", "x", "/"].includes(this.equation[i])) {
        operators.push(this.equation[i]);
      }
    }
    let operatorsLength: number = operators.length;

    //Ha több műveleti jel van, mint operandus - Error
    if (elementsLength <= operatorsLength) return this.result = "Error";

    //Felsőbbrendű művelet (x,/) keresése és elvégzése
    let counter: number = 0; //Aktuálisan vizsgált elem indexe
    for (let i = 0; i < operatorsLength; i++) {   
      if (["x","/"].includes(operators[counter])) {
        operators[counter] === "x" ?
          elements[counter + 1] = elements[counter] * elements[counter + 1] :        
          elements[counter + 1] = elements[counter] / elements[counter + 1];
        
        //Az éppen elvégzett felsőbbrendű művelet és operandusok helyét elvátolítjuk a tömbökből
        elements.splice(counter, 1);
        operators.splice(counter, 1);
      } else {
        counter++; 
      }
    }

    //Az alsóbbrendű műveletek (+,-) elvégzése
    let actualResult: number = elements[0];
    operatorsLength = operators.length;
    for (let i = 0; i < operatorsLength; i++) {
      operators[i] == '+' ? 
        actualResult += elements[i+1] :     
        actualResult -= elements[i+1];           
    }
    this.result = (actualResult).toString();      
  }
}
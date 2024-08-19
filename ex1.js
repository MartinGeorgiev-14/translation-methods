"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Enter a word: ', function (answer) {
    // Израз за проверка дали дума съдържа 0, 1, ε
    var regex = /^[01 ]+$/;
    // Думата се разделя по букви в масив
    var answerArray = answer.split("");
    // Валидация която проверява дали въведената дума съдържа елементите 0, 1, ε
    if (!regex.test(answer)) {
        displayAnswer("The word is not part of the language");
        return;
    }
    else {
        // Валидация която проверява дали първия елемент от думата e ε и дали е единствения елемент в думата
        if (answerArray.length > 1 && answerArray[0] === " ") {
            displayAnswer("The word is not part of the language");
            return;
        }
        // Валидация която проверява дали думата не започва с 1
        else if (answerArray[0] === "1") {
            displayAnswer("The word is not part of the language");
            return;
        }
        // Валидация която проверява дали думата не свършва на 0
        else if (answerArray[answerArray.length - 1] === "0" && answerArray[answerArray.length - 2] === "1") {
            displayAnswer("The word is not part of the language");
            return;
        }
        // Валидация която проверява колко интервали има в думата
        else if (answerArray.filter(function (el) { return el === " "; }).length > 1) {
            displayAnswer("The word is not part of the language");
            return;
        }
        // Валидация която проверява дали има елементи след интервала
        else if (answerArray.findIndex(function (el) { return el === " "; }) !== -1) {
            if (answerArray[answerArray.findIndex(function (el) { return el === " "; }) + 1] === "0" ||
                answerArray[answerArray.findIndex(function (el) { return el === " "; }) + 1] === "1") {
                displayAnswer("The word is not part of the language");
                return;
            }
        }
        // Крайна валидация която se изпълнява ако останалите валидации са грешни   
        // което показва че думата е вярна
        else {
            displayAnswer("The word is part of the language");
            return;
        }
    }
});
// Фунцкия за принтиране на текст в конзолата
function displayAnswer(answer) {
    console.log(answer);
    rl.close();
}

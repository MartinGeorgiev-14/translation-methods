"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Масив с обекти в който са записани състоянията и инфромация за следващите състовяния
var states = [
    {
        stateNumber: 0,
        stateName: "z0",
        nextState: [
            { stateNumber: 0, value: "1" },
            { stateNumber: 1, value: "0" }
        ]
    },
    {
        stateNumber: 1,
        stateName: "z1",
        nextState: [
            { stateNumber: 2, value: "1" },
            { stateNumber: 4, value: "0" }
        ]
    },
    {
        stateNumber: 2,
        stateName: "z2",
        nextState: [
            { stateNumber: 1, value: "0" },
            { stateNumber: 3, value: "1" },
        ]
    },
    {
        stateNumber: 3,
        stateName: "z0z2",
        nextState: [
            { stateNumber: 1, value: "0" },
            { stateNumber: 3, value: "1" }
        ]
    },
    {
        stateNumber: 4,
        stateName: "Ø",
        nextState: []
    }
];
// Масив който съдържа числата на крайните състояния
var endStates = [1, 2, 3];
// Променлива съдържащо нулевото състояние
var nullState = 4;
rl.question("Enter a word: ", function (answer) {
    var _a, _b, _c, _d, _e, _f;
    // Разделя въведената дума на масив
    var split = answer.split("");
    // Променлива която съдържа текущото състояние
    var currentState = 0;
    // Променлива която съдържа всички състояния през които е преминато
    var travel = [];
    var _loop_1 = function (i) {
        // Валидация която проверява дали думата не съдържа излишни елементи
        if (split[i] !== "0" || split[i] !== "1") {
            console.log("The word is not part of the language");
            rl.close();
            return { value: void 0 };
        }
        // Променлива която съдържа информация за следващото състояние
        var find = (_b = (_a = states[currentState]) === null || _a === void 0 ? void 0 : _a.nextState) === null || _b === void 0 ? void 0 : _b.find(function (s) { return s.value === split[i]; });
        console.log("".concat(states[currentState].stateName, " -> ").concat(states[(_c = find === null || find === void 0 ? void 0 : find.stateNumber) !== null && _c !== void 0 ? _c : 0].stateName, " : ").concat((_d = find === null || find === void 0 ? void 0 : find.value) !== null && _d !== void 0 ? _d : 0));
        // Валидация която проверява ако се достигне нулевото състояние      
        if ((find === null || find === void 0 ? void 0 : find.stateNumber) === nullState) {
            currentState = find === null || find === void 0 ? void 0 : find.stateNumber;
            return "break";
        }
        // Записване на състояние
        travel.push(states[(_e = find === null || find === void 0 ? void 0 : find.stateNumber) !== null && _e !== void 0 ? _e : 0].stateName);
        // Задаване на ново състояние
        currentState = (_f = find === null || find === void 0 ? void 0 : find.stateNumber) !== null && _f !== void 0 ? _f : 0;
    };
    // Цикъл който обхожда думата по отделни елементи като проверява прехода
    for (var i = 0; i < split.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
        if (state_1 === "break")
            break;
    }
    // Валидация която проверява дали състоянието е крайно състояние
    if (endStates.includes(currentState)) {
        console.log("The word is part of the language");
        console.log("Exit state: ".concat(travel.join("-")));
    }
    else {
        console.log("The word is not part of the language");
    }
    rl.close();
});

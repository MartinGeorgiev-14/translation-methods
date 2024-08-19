    import * as readline from 'readline';

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Създаване на нов тип
    type State = {
        stateNumber: number,
        stateName: string,
        nextState: { stateNumber: number, value: string }[]
    }

    // Масив с обекти в който са записани състоянията и инфромация за следващите състовяния
    const states: State[] = [
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
            nextState: [

            ]
        }
    ]

    // Масив който съдържа числата на крайните състояния
    const endStates: number[] = [1, 2, 3]
    // Променлива съдържащо нулевото състояние
    const nullState: number = 4

    rl.question("Enter a word: ", function (answer: string) {
        
        // Разделя въведената дума на масив
        const split: string[] = answer.split("");
        // Променлива която съдържа текущото състояние
        let currentState: number = 0;
        // Променлива която съдържа всички състояния през които е преминато
        const travel: string[] = [];



        // Цикъл който обхожда думата по отделни елементи като проверява прехода
        for (let i = 0; i < split.length; i++) {

            // Валидация която проверява дали думата не съдържа излишни елементи
            if (split[i] !== "0" || split[i] !== "1") {
                console.log("The word is not part of the language");
                rl.close();
                return;
            }

            // Променлива която съдържа информация за следващото състояние
            const find = states[currentState]?.nextState?.find(s => s.value === split[i]);

            console.log(`${states[currentState].stateName} -> ${states[find?.stateNumber ?? 0].stateName} : ${find?.value ?? 0}`);
            // Валидация която проверява ако се достигне нулевото състояние      
            if (find?.stateNumber === nullState) {
                currentState = find?.stateNumber
                break;
            }
            // Записване на състояние
            travel.push(states[find?.stateNumber ?? 0].stateName);
            // Задаване на ново състояние
            currentState = find?.stateNumber ?? 0;
        }
        // Валидация която проверява дали състоянието е крайно състояние
        if (endStates.includes(currentState)) {
            console.log("The word is part of the language");
            console.log(`Exit state: ${travel.join("-")}`);
        } else {
            console.log("The word is not part of the language");
        }

        rl.close();
    })
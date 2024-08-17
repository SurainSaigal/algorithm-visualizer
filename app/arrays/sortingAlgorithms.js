import { colorAnimate, swapBars, sleep } from "./page";

const comparisonColor = "#FFC300";
const swapColor = "#ff03fb";
const sortedColor = "#0cff00";
const originalColor = "#ffffff";

const arrLengthToAnimationDelay = {
    5: 300,
    10: 200,
    15: 100,
    20: 85,
    30: 60,
    40: 50,
    45: 25,
    100: 0,
};

function getAnimationDelay(arrayLength) {
    const arrLengths = Object.keys(arrLengthToAnimationDelay)
        .map(Number)
        .sort((a, b) => a - b);
    for (let i = arrLengths.length - 1; i >= 0; i--) {
        if (arrLengths[i] <= arrayLength) {
            return arrLengthToAnimationDelay[arrLengths[i]];
        }
    }
    return 0;
}

export async function bubbleSort(array, setArray) {
    // let testSort = array.slice().sort((a, b) => a - b);
    let delay = getAnimationDelay(array.length);
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            colorAnimate([j, j + 1], comparisonColor);
            await sleep(delay);
            if (array[j] > array[j + 1]) {
                colorAnimate([j, j + 1], swapColor);
                if (delay > 100) {
                    await sleep(delay);
                }
                swapBars(j, j + 1, array, setArray);
                await sleep(delay);
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
            colorAnimate([j, j + 1], originalColor);
        }
        colorAnimate([array.length - i - 1], sortedColor);
    }
    // console.log(arraysEqual(testSort, array)); // test sorting algorithm
    return array;
}

/* test if two arrays are equal */
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

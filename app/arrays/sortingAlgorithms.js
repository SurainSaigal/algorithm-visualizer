import { colorAnimate, swapBars, sleep } from "./page";

const comparisonColor = "#FFC300";
const swapColor = "#ff03fb";
const sortedColor = "#0cff00";
const originalColor = "#ffffff";

/* bubble sort with delays for animation purposes */
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
                await swapBars(j, j + 1, array, setArray);
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

export async function insertionSort(array, setArray) {
    // let testSort = array.slice().sort((a, b) => a - b);
    let delay = getAnimationDelay(array.length);
    for (let i = 0; i < array.length; i++) {
        let key = array[i];
        colorAnimate([i], comparisonColor);
        await sleep(delay);

        let j = i - 1;
        while (j >= 0) {
            let cur = array[j];
            if (key < cur) {
                await swapBars(j, j + 1, array, setArray);
                colorAnimate([j], comparisonColor);
                colorAnimate([j + 1], sortedColor);
                await sleep(delay);
                array[j + 1] = cur;
                array[j] = key;
            } else {
                break;
            }
            j--;
        }
        colorAnimate([i, j + 1], sortedColor); // ith element is sorted
        await sleep(delay);
    }
    console.log(array);

    // console.log(arraysEqual(testSort, array));
    return array;
}

export function mergesort(array) {
    if (array.length === 1) {
        return array;
    }
    const mid = Math.floor(array.length / 2);
    let left = mergesort(array.slice(0, mid));
    let right = mergesort(array.slice(mid, array.length + 1));
    let i1 = 0;
    let i2 = 0;
    let res = [];
    while (i1 < left.length && i2 < right.length) {
        if (left[i1] <= right[i2]) {
            res.push(left[i1++]);
        } else {
            res.push(right[i2++]);
        }
    }

    while (i1 < left.length) {
        res.push(left[i1++]);
    }

    while (i2 < right.length) {
        res.push(right[i2++]);
    }
    return res;
}

/* test if two arrays are equal */
export function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

const arrLengthToAnimationDelay = {
    5: 300,
    10: 200,
    15: 100,
    20: 72,
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

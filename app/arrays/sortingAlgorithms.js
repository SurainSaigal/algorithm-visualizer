import { colorAnimate, swapBars, sleep, changeBar } from "./page";

const comparisonColor = "#FFC300";
const swapColor = "#ff03fb";
const firstHalfColor = "#0cd7d7";
const secondHalfColor = "#d70c72";
export const sortedColor = "#0cff00";
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

export async function mergesort(arrayMain, start, end, auxArray, setArray, delay) {
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    await mergesort(auxArray, start, mid, arrayMain, setArray, delay); // first half
    await mergesort(auxArray, mid + 1, end, arrayMain, setArray, delay); // second half
    await mergeHelp(arrayMain, start, mid, end, auxArray, setArray, delay); // do the actual merging
}

async function mergeHelp(arrayMain, start, mid, end, auxArray, delay) {
    let k = start;
    let i = start;
    let j = mid + 1;

    let firstHalfIndices = [];
    let secondHalfIndices = [];
    for (let x = start; x < mid + 1; x++) {
        firstHalfIndices.push(x);
    }
    for (let x = mid + 1; x <= end; x++) {
        secondHalfIndices.push(x);
    }
    colorAnimate(firstHalfIndices, firstHalfColor);
    colorAnimate(secondHalfIndices, secondHalfColor);
    await sleep(delay);

    while (i <= mid && j <= end) {
        if (auxArray[i] <= auxArray[j]) {
            // overwrite value in main array with value at i in aux array
            colorAnimate([k], comparisonColor);
            changeBar(k, auxArray[i]);
            await sleep(delay);
            colorAnimate([k], sortedColor);

            arrayMain[k++] = auxArray[i++];
        } else {
            // overwrite value in main array with value at j in aux array
            colorAnimate([k], comparisonColor);
            changeBar(k, auxArray[j]);
            await sleep(delay);
            colorAnimate([k], sortedColor);

            arrayMain[k++] = auxArray[j++];
        }
    }
    while (i <= mid) {
        // finish adding any leftover elements
        colorAnimate([k], comparisonColor);
        changeBar(k, auxArray[i]);
        await sleep(delay);
        colorAnimate([k], sortedColor);

        arrayMain[k++] = auxArray[i++];
    }
    while (j <= end) {
        // finish adding any leftover elements
        colorAnimate([k], comparisonColor);
        changeBar(k, auxArray[j]);
        await sleep(delay);
        colorAnimate([k], sortedColor);

        arrayMain[k++] = auxArray[j++];
    }
    let allIndices = [];
    for (let p = start; p <= end; p++) {
        allIndices.push(p);
    }

    await sleep(delay > 20 ? delay * 3 : 20);
    if (end !== arrayMain.length - 1) {
        colorAnimate(allIndices, originalColor);
    }
    await sleep(delay);
    return arrayMain;
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
    75: 5,
    100: 0,
};

export function getAnimationDelay(arrayLength) {
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

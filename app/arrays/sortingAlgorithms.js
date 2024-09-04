import { colorAnimate, swapBars, sleep, changeBar } from "./page";

const comparisonColor = "#FFC300";
const swapColor = "#ff03fb";
const firstHalfColor = "#0cd7d7";
const secondHalfColor = "#d70c72";
export const sortedColor = "#0cff00";
const originalColor = "#ffffff";

/* bubble sort algorithm with delays for animation purposes */
export async function bubbleSort(array, setArray, stopSort) {
    let delay = getAnimationDelay(array.length);
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            /* useRef indicates whether the user has indicated to stop the sorting */
            if (stopSort.current) {
                stopSort.current = false;
                return false;
            }

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
    return true;
}

/* insertion sort algorithm with delays and color changes for animation purposes */
export async function insertionSort(array, setArray, stopSort) {
    let delay = getAnimationDelay(array.length);
    for (let i = 0; i < array.length; i++) {
        let key = array[i];
        colorAnimate([i], comparisonColor);
        await sleep(delay);

        let j = i - 1;
        while (j >= 0) {
            /* useRef indicates whether the user has indicated to stop the sorting */
            if (stopSort.current) {
                stopSort.current = false;
                return false;
            }

            let cur = array[j];
            if (key < cur) {
                // element moves down one spot
                await swapBars(j, j + 1, array, setArray);
                colorAnimate([j], comparisonColor);
                colorAnimate([j + 1], sortedColor);
                await sleep(delay);
                array[j + 1] = cur;
                array[j] = key;
            } else {
                // the new element is already in the right place, we're done
                break;
            }
            j--;
        }
        colorAnimate([i, j + 1], sortedColor); // ith element is sorted
        await sleep(delay);
    }

    return true;
}

/* optimal mergesort algorithm with time complexity: O(n log n) and space complexity: O(1) via use of auxiliary array */
export async function mergesort(arrayMain, start, end, auxArray, delay, stopSort) {
    /* useRef indicates whether the user has indicated to stop the sorting */
    if (stopSort.current) {
        stopSort.current = false;
        return false;
    }

    if (start === end) return true; // all elements have been merged
    const mid = Math.floor((start + end) / 2);
    let success = await mergesort(auxArray, start, mid, arrayMain, delay, stopSort); // first half

    if (!success) {
        // user ended sorting prematurely
        return false;
    }

    success = await mergesort(auxArray, mid + 1, end, arrayMain, delay, stopSort); // second half

    if (!success) {
        // user ended sorting prematurely
        return false;
    }
    await mergeHelp(arrayMain, start, mid, end, auxArray, delay); // do the actual merging
    return true;
}

/* Merge 2 sorted subarrays into one sorted final array. in this version of mergesort, rather than passing two arrays, we pass start, mid, and end indices as well as a main array and an auxiliary array. We are merging auxArray[start:mid] with auxArray[mid:end] such that arrayMain[start:end] will be the final merged subarray. */
async function mergeHelp(arrayMain, start, mid, end, auxArray, delay) {
    let k = start; // for tracking place in merged array
    let i = start; // for tracking place in first half
    let j = mid + 1; // for tracking place in second half

    let firstHalfIndices = [];
    let secondHalfIndices = [];
    for (let x = start; x < mid + 1; x++) {
        // color the 2 halves
        firstHalfIndices.push(x);
    }
    for (let x = mid + 1; x <= end; x++) {
        // color the 2 halves
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
        // finish adding any leftover elements from first half
        colorAnimate([k], comparisonColor);
        changeBar(k, auxArray[i]);
        await sleep(delay);
        colorAnimate([k], sortedColor);

        arrayMain[k++] = auxArray[i++];
    }
    while (j <= end) {
        // finish adding any leftover elements from second half
        colorAnimate([k], comparisonColor);
        changeBar(k, auxArray[j]);
        await sleep(delay);
        colorAnimate([k], sortedColor);

        arrayMain[k++] = auxArray[j++];
    }
    let allIndices = [];
    for (let p = start; p <= end; p++) {
        // animation
        allIndices.push(p);
    }

    await sleep(delay > 20 ? delay * 3 : 20);
    if (end !== arrayMain.length - 1) {
        colorAnimate(allIndices, originalColor);
    }
    await sleep(delay);
    return arrayMain;
}

/* test if two arrays are equal (contain the same elements in the same order) */
export function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

/* animation delays */
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

/* determine animation delay from array length */
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

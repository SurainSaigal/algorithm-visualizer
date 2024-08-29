"use client";
import { useState, useEffect } from "react";
import { bubbleSort, insertionSort, mergesort, arraysEqual } from "./sortingAlgorithms";

/* generate a random integer array given a minimum, maximum, and length */
function generateRandomArray(minVal, maxVal, length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        const randNum = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
        arr.push(randNum);
    }
    return arr;
}

/* delay function */
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* change the color of any number of bars given an array of indices and a color */
export async function colorAnimate(indices, color) {
    for (const id of indices) {
        const bar = document.getElementById(id + "-bar");
        if (bar) {
            bar.style.background = color;
        }
        const num = document.getElementById(id + "-number");
        if (num) {
            num.style.color = color;
            num.style.borderColor = color;
        }
    }
    return;
}

/* animate the swapping of two array bars */
export async function swapBars(idx1, idx2, arr, setArray) {
    // console.log("arr before", arr);
    // console.log("swapping ", arr[idx1], "and ", arr[idx2]);
    let newArr = arr.slice();
    let tmp = newArr[idx1];
    newArr[idx1] = newArr[idx2];
    newArr[idx2] = tmp;
    // console.log("new array", newArr);
    setArray(newArr);
    return;
}

function resetBars(array) {
    for (let i = 0; i < array.length; i++) {
        const bar = document.getElementById(i + "-bar");
        if (bar) {
            bar.style.background = "white";
        }
        const num = document.getElementById(i + "-number");
        if (num) {
            num.style.color = "white";
            num.style.borderColor = "white";
        }
    }
}

const maxBarHeight = 600;
const arrLengthToBarWidth = {
    5: 20,
    65: 15,
    85: 10,
    115: 5,
};

export default function Arrays() {
    const [arrayLength, setArrayLength] = useState(5);
    const [barWidth, setBarWidth] = useState(20);
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [sorted, setSorted] = useState(false);

    useEffect(() => {
        resetBars(array);
        setArray(generateRandomArray(1, 100, arrayLength));

        if (arrayLength in arrLengthToBarWidth) {
            setBarWidth(arrLengthToBarWidth[arrayLength]);
        } else {
            const arrLengths = Object.keys(arrLengthToBarWidth)
                .map(Number)
                .sort((a, b) => a - b);
            for (let i = arrLengths.length - 1; i >= 0; i--) {
                if (arrLengths[i] < arrayLength) {
                    setBarWidth(arrLengthToBarWidth[arrLengths[i]]);
                    break;
                }
            }
        }
    }, [arrayLength]);

    const handleSliderChange = (event) => {
        setArrayLength(event.target.value);
        updateSliderBackground(event.target.value);
    };

    const updateSliderBackground = (value) => {
        const slider = document.getElementById("default-range");
        const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #088F8F ${percentage}%, white ${percentage}%)`;
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between mt-10">
                <div className="text-base">Array Length</div>
                <input
                    id="default-range"
                    type="range"
                    value={arrayLength}
                    disabled={sorting}
                    min="5"
                    max="200"
                    step="5"
                    onChange={handleSliderChange}
                    className="ms-2 me-2 mt-2 w-44 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div>{arrayLength}</div>
                <button
                    className="ms-5 border rounded-md"
                    disabled={sorting}
                    onClick={async () => {
                        if (sorted) {
                            resetBars(array);
                            await sleep(2000);
                        }
                        setSorting(true);
                        await bubbleSort(array, setArray);
                        setSorting(false);
                        setSorted(true);
                    }}
                >
                    Bubble Sort
                </button>
                <button
                    className="ms-5 border rounded-md"
                    disabled={sorting}
                    onClick={async () => {
                        if (sorted) {
                            resetBars(array);
                            await sleep(2000);
                        }
                        setSorting(true);
                        await insertionSort(array, setArray);
                        setSorting(false);
                        setSorted(true);
                    }}
                >
                    Insertion Sort
                </button>
                <button
                    className="ms-5 border rounded-md"
                    disabled={sorting}
                    onClick={async () => {
                        if (sorted) {
                            resetBars(array);
                            await sleep(2000);
                        }
                        setSorting(true);

                        let testSort = array.slice().sort((a, b) => a - b);
                        let arr = mergesort(array);

                        console.log(arraysEqual(arr, testSort));
                        setSorting(false);
                        setSorted(true);
                    }}
                >
                    Mergesort
                </button>
            </div>

            <div className="flex flex-row mt-10 max-w-screen">
                {array.map((num, index) => (
                    <div className="flex flex-col items-center" key={index} id={index + "-full"}>
                        {arrayLength <= 40 && (
                            <div
                                className={`w-8 h-7 border text-center ${
                                    index === 0 ? "rounded-l-lg" : ""
                                } ${index === array.length - 1 ? "rounded-r-lg" : ""}`}
                                id={index + "-number"}
                            >
                                {num}
                            </div>
                        )}
                        <div
                            className={`bg-gray-200 rounded-b-lg me-[2px] ${
                                arrayLength > 40 ? `rounded-t-lg` : ``
                            }`}
                            id={index + "-bar"}
                            style={{
                                width: `${barWidth}px`,
                                height: `${(num / 100) * maxBarHeight}px`,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";

function generateRandomArray(minVal, maxVal, length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        const randNum = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
        arr.push(randNum);
    }
    return arr;
}

const maxBarHeight = 600;
const arrLengthToBarWidth = {
    5: 20,
    65: 15,
    85: 10,
    115: 5,
    200: 3,
    280: 1,
};

export default function Arrays() {
    const [array, setArray] = useState([]);
    const [arrayLength, setArrayLength] = useState(5);
    const [barWidth, setBarWidth] = useState(20);

    useEffect(() => {
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
                    min="5"
                    max="450"
                    step="5"
                    onChange={handleSliderChange}
                    className="ms-2 me-2 mt-2 w-44 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div>{arrayLength}</div>
            </div>

            <div className="flex flex-row mt-10 max-w-screen">
                {array.map((num, index) => (
                    <div className="flex flex-col items-center">
                        {arrayLength <= 40 && (
                            <div
                                className={`w-8 h-7 border text-center ${
                                    index === 0 ? "rounded-l-lg" : ""
                                } ${index === array.length - 1 ? "rounded-r-lg" : ""}`}
                                key={index}
                            >
                                {num}
                            </div>
                        )}
                        <div
                            className="bg-gray-200 rounded-b-lg me-[2px]"
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

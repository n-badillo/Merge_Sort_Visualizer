import React from 'react';
import { getMergeSortAnimation } from '../mergeSortAlgorithm/mergeSortAlgorithm.js';
import './MergeSortVisualizer.css';

// Speed of the animation -- a higher number means it is slower (in milliseconds).
const ANIMATION_SPEED_MS = 250;

// Change the amount of bars shows for any random array.
const NUMBER_OF_ARRAY_BARS = 31;
const NUMBER_OF_MIN_BARS = 8;  // this will be for responsive layouts, smallest window size of 322px

// The color of the bars will change to this color when they have been sorted
const SORTED_COLOR = '#3FBCAE';
const SORTED_FONT = 'black';

// This color is the color of the bars being compared
const COMPARE_COLOR = '#FF5F67';
const COMPARE_FONT = 'white';

export default class MergeSortVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        // create a blank array
        const array = [];
        
        // iterate 100 times in a for loop 
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            // generate a random number between 5 and 1000 and push into empty array
            array.push(randomIntFromInterval(20,500));
        }

        // setState of array created
        this.setState({array});
    }

    mergeSort(){
        console.log(this.state.array);
        const comparingAnimation = getMergeSortAnimation(this.state.array);
        for (let i = 0; i < comparingAnimation.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;  // evaluating every triple

            if (isColorChange) {
                const [first_bar_index, second_bar_index] = comparingAnimation[i];
                const first_bar_style = arrayBars[first_bar_index].style;
                const second_bar_style = arrayBars[second_bar_index].style;

                // change the font color of the evaluated bar
                const first_bar_font = arrayBars[first_bar_index].style;
                const second_bar_font = arrayBars[second_bar_index].style;

                const color = i % 3 === 0 ? COMPARE_COLOR : SORTED_COLOR;
                const font_color = i % 3 === 0 ? COMPARE_FONT : SORTED_FONT;

                setTimeout(() => {
                first_bar_style.backgroundColor = color;
                second_bar_style.backgroundColor = color;

                // change the font color of the evaluated bar
                first_bar_font.color = font_color;
                second_bar_font.color = font_color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                const [first_bar_index, newHeight] = comparingAnimation[i];
                const first_bar_style = arrayBars[first_bar_index].style;
                this.state.array[i] = newHeight;
                first_bar_style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    
    }

    render() {
        const {array} = this.state;

        return(
            <>
                <div className="nav-bar">
                <div className="nav-left">Merge Sort Visualizer</div>
                <div className="nav-right"><a href="https://github.com/n-badillo/Merge_Sort_Visualization" target="_blank">Project Page</a></div>
                </div>
                <div className="array-container">
                {array.map((number, idx) => (
                    // displaying the bars of the array
                    <div 
                    className="array-bar" 
                    key={idx} 
                    style={{height: `${number}px`}}>
                        {/* {number} */}
                    </div>
                ))}
                </div>
                <div className="bottom-half">
                    <div className="button-bar">
                        <button className="custom-button" onClick={() => this.resetArray()}>Generate Random Array</button>
                        <button className="custom-button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    </div>
                    <div className="project-info">
                        This project was created for CPSC 335 Algorithm Engineering.  Currently updating the project so that it is responsive when the window is smaller or bigger.  <br></br>
                        <b>There is a current bug where the number of the bar will not update, however its position does -- still working on a way to fix that.<br></br></b>
                        Deleting the number on the bars for the final version in case I get marked off for it :] <br></br>
                        This project was inspired by Clément Mihailescu's Sorting Visualizer.

                    </div>
                </div>
                <div className="footer-bar">
                Created by Nancy Badillo
                </div>
            </>
        );
    }

}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
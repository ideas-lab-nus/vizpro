import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';
import ReactTestUtils from 'react-dom/test-utils';

//var addedToggle;
beforeEach(() => {
    render(<Canvas />);
    
})

afterEach(cleanup);

test('Toggle appears on the grid when the toggle icon is clicked', () => {
    const toggleIcon = screen.getByText('Toggle');
    fireEvent.click(toggleIcon);
    const mainGrid = screen.getByTestId('allContents');
    const addedToggle = mainGrid.childNodes[2];
    expect(addedToggle).toHaveClass('component'); 
    expect(addedToggle.childNodes[0]).toHaveClass('toggle'); 
    expect(screen.getByText('False')).toBeInTheDocument(); //the initial value is false
    const inputCircle = addedToggle.childNodes[0].childNodes[0];
    expect(inputCircle.childNodes.length).toBe(0); //no input circle
    const outputCircle = addedToggle.childNodes[0].childNodes[1];
    expect(outputCircle.childNodes.length).not.toBe(0); //has output circle
})

test('Toggle value change when double click', () => {
    const toggleIcon = screen.getByText('Toggle');
    fireEvent.click(toggleIcon);
    const mainGrid = screen.getByTestId('allContents');
    const addedToggle = mainGrid.childNodes[2];
    expect(screen.getByText('False')).toBeInTheDocument();
    fireEvent.dblClick(addedToggle.childNodes[0]);
    expect(screen.getByText('True')).toBeInTheDocument();
})

//to be handle later
// test('Toggle can be dragged', () => {
//     const toggleIcon = screen.getByText('Toggle');
//     fireEvent.click(toggleIcon);
//     const mainGrid = screen.getByTestId('allContents');
//     const addedToggle = mainGrid.childNodes[2];
//     const clickBtn = addedToggle.childNodes[0].childNodes[5];
//     //screen.debug(addedToggle);
//     //screen.debug(clickBtn);
//     const mouseDownEvent = {
//         type: 'mousedown',
//         clientX: 0,
//         clientY: 0,
//         changedTouches: [
//           {
//             clientX: 0,
//             clientY: 0,
//           },
//         ],
//     };
//     addedToggle.childNodes[0].childNodes.forEach(node => ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent));
//     ReactTestUtils.Simulate.mouseDown(addedToggle, mouseDownEvent);
//     ReactTestUtils.Simulate.mouseDown(addedToggle.childNodes[0], mouseDownEvent);
//     // ReactTestUtils.Simulate.mouseMove(mainGrid, {pageX: 200, pageY: 300});
//     // ReactTestUtils.Simulate.mouseUp(mainGrid);
//     //screen.debug(addedToggle);
// })
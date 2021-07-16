import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';

//var addedOptionList;
beforeEach(() => {
    render(<Canvas />);
    const toggleIcon = screen.getByText('Option List');
    fireEvent.click(toggleIcon);
    // const mainGrid = screen.getByTestId('allContents');
    // addedOptionList = mainGrid.childNodes[2];
})

afterEach(cleanup);

test('Option list appears on the grid when the option list icon is clicked', () => {
    const mainGrid = screen.getByTestId('allContents');
    const addedOptionList = mainGrid.childNodes[2];
    expect(addedOptionList).toHaveClass('component'); 
    expect(addedOptionList.childNodes[0]).toHaveClass('optionList'); 
    expect(screen.getByText('Select item')).toBeInTheDocument();
    expect(screen.queryAllByTestId('optionText').length).toBe(0); //the option values should not appear when the option list is first clicked
    expect(screen.queryAllByTestId('optionRect').length).toBe(0);
    const inputCircle = addedOptionList.childNodes[0].childNodes[0];
    expect(inputCircle.childNodes.length).not.toBe(0); //has input circle
    const outputCircle = addedOptionList.childNodes[0].childNodes[1];
    expect(outputCircle.childNodes.length).not.toBe(0); //has output circle
})

test('Option list values appear when the component is clicked', () => {
    const mainGrid = screen.getByTestId('allContents');
    const addedOptionList = mainGrid.childNodes[2];
    expect(screen.queryAllByTestId('optionText').length).toBe(0);
    expect(screen.queryAllByTestId('optionRect').length).toBe(0);
    fireEvent.click(addedOptionList.childNodes[0]);
    expect(screen.queryAllByTestId('optionText').length).toBe(3); //the default option list has 3 values
    expect(screen.queryAllByTestId('optionRect').length).toBe(3);
})

test('Property bar appears when the option list is double clicked', () => {
    const mainGrid = screen.getAllByTestId('allContents')[0];
    const addedOptionList = mainGrid.childNodes[2];
    expect(screen.getByTestId('propertiesBarContents').childNodes.length).toBe(0);
    screen.debug(addedOptionList.childNodes[0]);
    fireEvent.dblClick(addedOptionList.childNodes[0]);
    // expect(screen.queryByText('Option list properties')).toBeInTheDocument();
    // expect(screen.queryByText('options (as dictionary)')).toBeInTheDocument();
    // expect(screen.queryByText('options (as dictionary)').className).toBe('propertiesbar label');
    // screen.debug(screen.getByTestId('propertiesBarContents'));
    // expect(screen.queryByText('{"Option_0":0,"Option_1":1,"Option_2":2}')).toBeInTheDocument();
    // expect(screen.queryByText('{"Option_0":0,"Option_1":1,"Option_2":2}').nodeName).toBe('TEXTAREA');
    // expect(screen.queryByText('Preview:')).toBeInTheDocument();
    // expect(screen.queryByText('Preview:').className).toBe('propertiesbar label');
    // expect(screen.queryByText('Log')).toBeInTheDocument();
    // expect(screen.queryByText('Log').className).toBe('propertiesbar label');
    // expect(screen.queryByText('Success', {exact: false})).toBeInTheDocument();
    // expect(screen.queryByText('Option_0-->0', {exact: false})).toBeInTheDocument();
    // expect(screen.queryByText('Option_1-->1', {exact: false})).toBeInTheDocument();
    // expect(screen.queryByText('Option_2-->2', {exact: false})).toBeInTheDocument();
    // expect(screen.queryByText('Apply')).toBeInTheDocument();
    // expect(screen.queryByText('Apply').nodeName).toBe('BUTTON');
})

// test('Log updates when options changed successfully', () => {
//     fireEvent.dblClick(addedOptionList.childNodes[0]);
//     const optionListTextArea = screen.getByText('{"Option_0":0,"Option_1":1,"Option_2":2}');
//     fireEvent.change(optionListTextArea, {
//         target: {
//             value: '{"Option_0":8,"Option_1":5,"Option_2":10, "Option_3": "Hello"}'
//         }
//     });
//     expect(screen.queryByText('Option_0-->8', {exact: false})).toBeInTheDocument();
//     expect(screen.queryByText('Option_1-->5', {exact: false})).toBeInTheDocument();
//     expect(screen.queryByText('Option_2-->10', {exact: false})).toBeInTheDocument();
//     expect(screen.queryByText('Option_3-->Hello', {exact: false})).toBeInTheDocument();
// })

// test('Log reports error when options changed with incorrect format', () => {
//     fireEvent.dblClick(addedOptionList.childNodes[0]);
//     const optionListTextArea = screen.getByText('{"Option_0":0,"Option_1":1,"Option_2":2}');
//     fireEvent.change(optionListTextArea, {
//         target: {
//             value: '{"Option_0":8,"Option_1":5,"Option_2"}'
//         }
//     });
//     const errorMessage = screen.queryByText('Error', {exact: false});
//     expect(errorMessage).toBeInTheDocument();
//     expect(errorMessage.id).toBe('error');
// })

// test('Option list successfully updated when Apply button is clicked', () => {
//     fireEvent.dblClick(addedOptionList.childNodes[0]);
//     const optionListTextArea = screen.getByText('{"Option_0":0,"Option_1":1,"Option_2":2}');
//     fireEvent.change(optionListTextArea, {
//         target: {
//             value: '{"Option_0":8,"Option_1":5,"Option_2":10, "Option_3": "Hello"}'
//         }
//     });
//     fireEvent.click(screen.getByText('Apply'));
//     const textList = screen.queryAllByTestId('optionText');
//     const rectList = screen.queryAllByTestId('optionRect');
//     expect(textList.length).toBe(4);
//     expect(rectList.length).toBe(4);
//     expect(textList[0]).toHaveClass('Option_0', '8');
//     expect(textList[1]).toHaveClass('Option_1', '5');
//     expect(textList[2]).toHaveClass('Option_2', '10');
//     expect(textList[3]).toHaveClass('Option_3', 'Hello');
// })



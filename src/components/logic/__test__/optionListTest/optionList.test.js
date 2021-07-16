import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../../Canvas.js';

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



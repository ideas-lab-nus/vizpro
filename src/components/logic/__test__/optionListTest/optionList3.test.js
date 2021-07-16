import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../../Canvas.js';

var addedOptionList;
beforeEach(() => {
    render(<Canvas />);
    const toggleIcon = screen.getByText('Option List');
    fireEvent.click(toggleIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedOptionList = mainGrid.childNodes[2];
})

afterEach(cleanup);

test('Log reports error when options changed with incorrect format', () => {
    fireEvent.dblClick(addedOptionList.childNodes[0]);
    const optionListTextArea = screen.getByText('{"Option_0":0,"Option_1":1,"Option_2":2}');
    fireEvent.change(optionListTextArea, {
        target: {
            value: '{"Option_0":8,"Option_1":5,"Option_2"}'
        }
    });
    const errorMessage = screen.queryByText('Error', {exact: false});
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.id).toBe('error');
})

test('Option list successfully updated when Apply button is clicked', () => {
    fireEvent.dblClick(addedOptionList.childNodes[0]);
    const optionListTextArea = screen.getByText('{"Option_0":0,"Option_1":1,"Option_2":2}');
    fireEvent.change(optionListTextArea, {
        target: {
            value: '{"Option_0":8,"Option_1":5,"Option_2":10, "Option_3": "Hello"}'
        }
    });
    fireEvent.click(screen.getByText('Apply'));
    const textList = screen.queryAllByTestId('optionText');
    const rectList = screen.queryAllByTestId('optionRect');
    expect(textList.length).toBe(4);
    expect(rectList.length).toBe(4);
    expect(textList[0]).toHaveClass('Option_0', '8');
    expect(textList[1]).toHaveClass('Option_1', '5');
    expect(textList[2]).toHaveClass('Option_2', '10');
    expect(textList[3]).toHaveClass('Option_3', 'Hello');
});
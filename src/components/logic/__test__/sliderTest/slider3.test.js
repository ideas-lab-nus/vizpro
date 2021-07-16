import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../../Canvas.js';

var addedSlider;
beforeEach(() => {
    render(<Canvas />);
    const sliderIcon = screen.getByText('Slider');
    fireEvent.click(sliderIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedSlider = mainGrid.childNodes[2];
});

afterEach(cleanup);
afterAll(cleanup);

test('Error reports when min value is greater than max value', () => {
    fireEvent.dblClick(addedSlider.childNodes[0]);
    const maxInputField = screen.queryByTestId('max-input');
    fireEvent.change(maxInputField, {
        target: {
            value: '10'
        }
    });
    const minInputField = screen.queryByTestId('min-input');
    fireEvent.change(minInputField, {
        target: {
            value: '1000'
        }
    });
    const saveBtn = screen.queryByTestId('save-changes');
    fireEvent.click(saveBtn);
    const errorLog = screen.queryByTestId('error');
    expect(errorLog.textContent).toBe('The min value must be smaller than the max value');
    expect(errorLog.id).toBe('error');
});

test('Error reports when current value is not between min value and max value', () => {
    fireEvent.dblClick(addedSlider.childNodes[0]);
    const currValField = screen.queryByTestId('curr-val-input');
    fireEvent.change(currValField, {
        target: {
            value: '600'
        }
    });
    const saveBtn = screen.queryByTestId('save-changes');
    fireEvent.click(saveBtn);
    const errorLog = screen.queryByTestId('error');
    expect(errorLog.textContent).toBe('The current value must be between the min value and the max value');
    expect(errorLog.id).toBe('error');
});
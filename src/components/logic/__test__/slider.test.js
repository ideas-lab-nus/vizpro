import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';

var addedSlider;
beforeEach(() => {
    render(<Canvas />);
    const sliderIcon = screen.getByText('Slider');
    fireEvent.click(sliderIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedSlider = mainGrid.childNodes[2];
});

afterEach(cleanup);

test('Slider appears on the grid when the icon is clicked', () => {
    expect(addedSlider).toHaveClass('slider'); 
    expect(screen.queryByText('Numeric')).toBeInTheDocument();
    expect(screen.queryByText('50')).toBeInTheDocument();
    const outputCircle = addedSlider.childNodes[0].childNodes[0]; 
    expect(outputCircle.childNodes.length).not.toBe(0);
});

test('Property bar appears when the slider is double clicked', () => {
    expect(screen.getByTestId('propertiesBarContents').childNodes.length).toBe(0);
    fireEvent.dblClick(addedSlider.childNodes[0]);
    expect(screen.getByTestId('propertiesBarContents').childNodes.length).not.toBe(0);
    expect(screen.queryByText('Min value')).toBeInTheDocument();
    expect(screen.queryByText('Max value')).toBeInTheDocument();
    expect(screen.queryByText('Current value')).toBeInTheDocument();
    expect(screen.queryByTestId('save-changes')).toBeInTheDocument();
    expect(screen.queryByTestId('save-changes').nodeName).toBe('BUTTON');
    expect(screen.queryByTestId('cancel-changes')).toBeInTheDocument();
    expect(screen.queryByTestId('cancel-changes').nodeName).toBe('BUTTON');
});

test('Slider successfully updates when when the input fields meet the requirements', () => {
    fireEvent.dblClick(addedSlider.childNodes[0]);
    const maxInputField = screen.queryByTestId('max-input');
    fireEvent.change(maxInputField, {
        target: {
            value: '1000'
        }
    });
    const currValField = screen.queryByTestId('curr-val-input');
    fireEvent.change(currValField, {
        target: {
            value: '60'
        }
    });
    const saveBtn = screen.queryByTestId('save-changes');
    fireEvent.click(saveBtn);
    const anchor = screen.getByTestId('slider-anchor');
    expect(anchor.getAttribute('transform')).toBe('translate(10.68,3)');
    const sliderValue = screen.queryByText('60', {exact: false});
    expect(sliderValue).toBeInTheDocument();
    expect(sliderValue).toHaveClass('sliderValueText');
    expect(screen.getByTestId('propertiesBarContents').childNodes.length).toBe(0); //the property bar disappears
});

test('Error reports when a field is empty', () => {
    fireEvent.dblClick(addedSlider.childNodes[0]);
    const maxInputField = screen.queryByTestId('max-input');
    fireEvent.change(maxInputField, {
        target: {
            value: ''
        }
    });
    const saveBtn = screen.queryByTestId('save-changes');
    fireEvent.click(saveBtn);
    const errorLog = screen.queryByTestId('error');
    expect(errorLog.textContent).toBe('Please enter all fields.');
    expect(errorLog.id).toBe('error');
});

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
    expect(errorLog.textContent).toBe('The min value must be smaller than the max value.');
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
    expect(errorLog.textContent).toBe('The current value must be between the min value and the max value.');
    expect(errorLog.id).toBe('error');
});

test('Error reports when step value is negative', () => {
    fireEvent.dblClick(addedSlider.childNodes[0]);
    const currValField = screen.queryByTestId('step-input');
    fireEvent.change(currValField, {
        target: {
            value: '-5'
        }
    });
    const saveBtn = screen.queryByTestId('save-changes');
    fireEvent.click(saveBtn);
    const errorLog = screen.queryByTestId('error');
    expect(errorLog.textContent).toBe('The step value must be a positive value.');
    expect(errorLog.id).toBe('error');
});

test('No changes are made when Cancel button clicked', () => {
    fireEvent.dblClick(addedSlider.childNodes[0]);
    const maxInputField = screen.queryByTestId('max-input');
    fireEvent.change(maxInputField, {
        target: {
            value: '1000'
        }
    });
    const cancelBtn = screen.getByTestId('cancel-changes');
    fireEvent.click(cancelBtn);
    const anchor = screen.getByTestId('slider-anchor');
    expect(anchor.getAttribute('transform')).toBe('translate(89, 3)');
    expect(screen.getByTestId('propertiesBarContents').childNodes.length).toBe(0);
});
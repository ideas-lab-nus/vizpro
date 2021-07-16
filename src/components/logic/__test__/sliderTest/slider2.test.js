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
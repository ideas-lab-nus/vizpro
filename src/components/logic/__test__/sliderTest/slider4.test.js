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
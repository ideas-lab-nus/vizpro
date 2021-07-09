import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';

var addedToggle;
beforeEach(() => {
    render(<Canvas />);
    const toggleIcon = screen.getByText('Toggle');
    fireEvent.click(toggleIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedToggle = mainGrid.childNodes[2];
})

afterEach(cleanup);

test('Toggle appears on the grid when the toggle icon is clicked', () => {
    expect(addedToggle).toHaveClass('component'); 
    expect(addedToggle.childNodes[0]).toHaveClass('toggle'); 
    expect(screen.getByText('False')).toBeInTheDocument(); //the initial value is false
    const inputCircle = addedToggle.childNodes[0].childNodes[0];
    expect(inputCircle.childNodes.length).toBe(0); //no input circle
})

test('Toggle value change when double click', () => {
    expect(screen.getByText('False')).toBeInTheDocument();
    fireEvent.dblClick(addedToggle.childNodes[0]);
    expect(screen.getByText('True')).toBeInTheDocument();
})
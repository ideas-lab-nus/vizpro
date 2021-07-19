import React from "react"; 
import TopBar from '../TopBar.js';
import Canvas from '../../Canvas.js';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

test('Top Bar successfully render', () => {
    render(<TopBar />);
    const element = screen.getAllByTestId('fileTheDef');
    var expectedArray = ['File', 'Edit', 'Help', 'Save', 'Clear', 'Download'];
    expect(element.length).toBe(expectedArray.length);
    for (let index = 0; index < element.length; index++) {
        expect(element[index].textContent).toBe(expectedArray[index]);
        expect(element[index].className).toBe('menubarButtons');
    }
});

test('Menu bar disappear when minimize button clicked and appear when maximize button clicked', () => {
    const component = render(<TopBar />);
    const minimizeElement = component.getByTestId("minimize");
    const maxmizeElement = component.getByTestId("maximize");
    fireEvent.click(minimizeElement);
    expect(minimizeElement.style.display).toBe('none');
    fireEvent.click(maxmizeElement);
    expect(minimizeElement.style.display).toBe('block');
})
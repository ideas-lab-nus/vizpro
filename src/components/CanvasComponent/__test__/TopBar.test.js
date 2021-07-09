import React from "react"; 
import TopBar from '../TopBar.js';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

beforeAll(() => {
    render(<TopBar />)
})
afterEach(cleanup);

test('Top Bar successfully render', () => {
    const element = screen.getAllByTestId('fileTheDef');
    var expectedArray = ['File', 'Edit', 'Help', 'Save', 'Clear', 'Download'];
    expect(element.length).toBe(expectedArray.length);
    for (let index = 0; index < element.length; index++) {
        expect(element[index].textContent).toBe(expectedArray[index]);
        expect(element[index].className).toBe('menubarButtons');
    }
});

test('Save data when save button is clicked', () => {

});

test('Clear data when clear button is pressed', () => {

});

test('Menu bar disappear when minimize button clicked', () => {
    const component = render(<TopBar />);
    const minimizeElement = component.getByTestId("minimize");
    screen.debug(minimizeElement);
    fireEvent.click(minimizeElement);
})
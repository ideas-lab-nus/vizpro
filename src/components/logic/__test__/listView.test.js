import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';

beforeEach(() => {
    render(<Canvas />);
});

afterEach(cleanup);

test('List view appears on the grid when the icon is clicked', () => {
    const listViewIcon = screen.getByText('List View');
    fireEvent.click(listViewIcon);
    const mainGrid = screen.getByTestId('allContents');
    const addedListView = mainGrid.childNodes[2];
    expect(addedListView).toHaveClass('component'); 
    expect(addedListView.childNodes[0]).toHaveClass('listView'); 
    expect(screen.queryByText('List Items')).toBeInTheDocument();
    const inputCircle = addedListView.childNodes[0].childNodes[0];
    expect(inputCircle.childNodes.length).not.toBe(0); //has input circle
    const outputCircle = addedListView.childNodes[0].childNodes[1];
    expect(outputCircle.childNodes.length).not.toBe(0); //has output circle
})
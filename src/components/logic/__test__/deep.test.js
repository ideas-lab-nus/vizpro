import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import Canvas from '../../Canvas.js';

var addedDeep;
beforeEach(() => {
    render(<Canvas />);
    const deepIcon = screen.getByText('Deep');
    fireEvent.click(deepIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedDeep = mainGrid.childNodes[2];
});

afterEach(cleanup);

test('Slider appears on the grid when the icon is clicked', () => {
    expect(addedDeep).toHaveClass('component');
    expect(addedDeep.childNodes[0]).toHaveClass('deep');
    const title = screen.queryByTestId('node_title')
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Deep');
    expect(title.nodeName).toBe('foreignObject');
    const playBtn = screen.queryByTestId('play_btn');
    expect(playBtn).toBeInTheDocument();
    expect(playBtn.nodeName).toBe('svg');
    const statusBar = screen.queryByText('Idle...');
    expect(statusBar).toBeInTheDocument();
});

test('Property bar appear when the component is double clicked', () => {
    const propertyBarContents = screen.getByTestId('propertiesBarContents');
    expect(propertyBarContents.childNodes.length).toBe(0);
    fireEvent.dblClick(addedDeep.childNodes[0]);
    expect(propertyBarContents.childNodes.length).not.toBe(0);
    expect(screen.queryByText('Deep Function Properties')).toBeInTheDocument();
    expect(screen.queryByText('Function Name')).toBeInTheDocument();
    expect(screen.queryByText('Input List')).toBeInTheDocument();
    const inputTextArea = screen.queryByTestId('input-list-deep');
    expect(inputTextArea).toBeInTheDocument();
    expect(screen.queryByText('Deep function URL')).toBeInTheDocument();
    expect(screen.queryByText('Log')).toBeInTheDocument();
    expect(screen.queryByText('Apply')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).toBeInTheDocument();
})

test('Deep component updates when input list is changed', () => {
    fireEvent.dblClick(addedDeep.childNodes[0]);
    const title = screen.queryByTestId('title-deep');
    userEvent.type(title, 'Random Deep Component')
    const inputTextArea = screen.queryByTestId('input-list-deep');
    userEvent.type(inputTextArea, "input_1{enter}input_2{enter}input_3");
    fireEvent.click(screen.queryByText('Apply'));
    expect(screen.queryByText('input_1')).toBeInTheDocument();
    expect(screen.queryByText('input_1')).toHaveClass('inputTxt');
    expect(screen.queryByText('input_2')).toBeInTheDocument();
    expect(screen.queryByText('input_2')).toHaveClass('inputTxt');
    expect(screen.queryByText('input_3')).toBeInTheDocument();
    expect(screen.queryByText('input_3')).toHaveClass('inputTxt');
    expect(screen.queryByText('out')).toBeInTheDocument();
    expect(screen.queryByText('out')).toHaveClass('outputTxt');
})
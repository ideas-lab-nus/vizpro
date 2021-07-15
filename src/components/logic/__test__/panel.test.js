import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';

var addedPanel;
beforeEach(() => {
    render(<Canvas />);
    const panelIcon = screen.getByText('Panel');
    fireEvent.click(panelIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedPanel = mainGrid.childNodes[2];
});

afterEach(cleanup);

test('Panel appears on the grid when the icon is clicked', () => {
    expect(addedPanel).toHaveClass('component'); 
    expect(addedPanel.childNodes[0]).toHaveClass('string'); 
    expect(screen.queryByTestId('node-title')).toBeInTheDocument();
    expect(screen.queryByTestId('node-title').textContent).toBe('Panel');
    expect(screen.queryByText('no value')).toBeInTheDocument();
    expect(screen.queryByText('Type : text')).toBeInTheDocument();
    expect(screen.queryByText('Drag')).toBeInTheDocument();
    const inputCircle = addedPanel.childNodes[0].childNodes[1];
    expect(inputCircle.childNodes.length).not.toBe(0); //has input circle
    const outputCircle = addedPanel.childNodes[0].childNodes[2];
    expect(outputCircle.childNodes.length).not.toBe(0); //has output circle
});

test('Property bar appears when the panel is double clicked', () => {
    const propertyBarContents = screen.getByTestId('propertiesBarContents');
    expect(propertyBarContents.childNodes.length).toBe(0);
    fireEvent.dblClick(addedPanel.childNodes[0]);
    expect(propertyBarContents.childNodes.length).not.toBe(0);
    expect(screen.queryByText('String Panel Properties')).toBeInTheDocument();
    expect(screen.queryByText('Name')).toBeInTheDocument();
    expect(screen.queryByText('Value')).toBeInTheDocument();
    expect(screen.queryByText('Panel Type')).toBeInTheDocument();
    const radioBtnList = ['text', 'html', 'json', 'list', 'plot'];
    radioBtnList.forEach(element => {
        const nodeElement = screen.queryByTestId(element);
        expect(nodeElement).toBeInTheDocument();
        expect(nodeElement.id).toBe('string_radio_' + element);
        expect(nodeElement.getAttribute('type')).toBe('radio');
        expect(nodeElement.nodeName).toBe('INPUT');
    });
    expect(screen.queryByText('Log')).toBeInTheDocument();
    expect(screen.queryByText('Apply')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).toBeInTheDocument();
})
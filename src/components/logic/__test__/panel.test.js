import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';

var addedPanel;
beforeEach(() => {
    cleanup;
    render(<Canvas />);
    const panelIcon = screen.getByText('Panel');
    fireEvent.click(panelIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedPanel = mainGrid.childNodes[2];
});

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

test('Panel content successfully updates when change is made', () => {
    fireEvent.dblClick(addedPanel.childNodes[0]);
    const inputTextArea = screen.queryByTestId('textarea-string-properties');
    fireEvent.change(inputTextArea, {
        target: {
            value: "Hello World",
        }
    });
    const applyBtn = screen.queryByText('Apply');
    fireEvent.click(applyBtn);
    const panelContent = screen.queryByTestId('textbody');
    expect(panelContent.textContent).toBe('Hello World');
    expect(panelContent.nodeName).toBe('foreignObject');
    expect(screen.queryByTestId('propertiesBarContents').childNodes.length).toBe(0);
});

test('Panel content updates with html content when panel type is html', () => {
    fireEvent.dblClick(addedPanel.childNodes[0]);
    const inputTextArea = screen.queryByTestId('textarea-string-properties');
    fireEvent.change(inputTextArea, {
        target: {
            value: "<h1>Hello there</h1>",
        }
    });
    const htmlRadioBtn = screen.queryByTestId('html');
    fireEvent.click(htmlRadioBtn);
    const applyBtn = screen.queryByText('Apply');
    fireEvent.click(applyBtn);
    expect(screen.queryByText('Type : html')).toBeInTheDocument();
    const panelContent = screen.queryByTestId('textbody');
    expect(panelContent.childNodes[0].textContent).toBe('Hello there');
    expect(screen.queryByTestId('propertiesBarContents').childNodes.length).toBe(0);
});

test('Panel content updates with json content when panel type is json and the input text is a list', () => {
    fireEvent.dblClick(addedPanel.childNodes[0]);
    const inputTextArea = screen.queryByTestId('textarea-string-properties');
    fireEvent.change(inputTextArea, {
        target: {
            value: '[1,2,3, "Hello"]',
        }
    });
    const htmlRadioBtn = screen.queryByTestId('json');
    fireEvent.click(htmlRadioBtn);
    const applyBtn = screen.queryByText('Apply');
    fireEvent.click(applyBtn);
    expect(screen.queryByText('Type : json')).toBeInTheDocument();
    expect(screen.queryByText('4 items')).toBeInTheDocument();
    expect(screen.queryByTestId('propertiesBarContents').childNodes.length).toBe(0);
});

test('Panel content reports error when panel type is json and the input text is not a list', () => {
    fireEvent.dblClick(addedPanel.childNodes[0]);
    const inputTextArea = screen.queryByTestId('textarea-string-properties');
    fireEvent.change(inputTextArea, {
        target: {
            value: '1',
        }
    });
    const htmlRadioBtn = screen.queryByTestId('json');
    fireEvent.click(htmlRadioBtn);
    const applyBtn = screen.queryByText('Apply');
    fireEvent.click(applyBtn);
    expect(screen.queryByText('Type : json')).toBeInTheDocument();
    expect(screen.queryByText('Error: Invalid JSON input')).toBeInTheDocument();
    expect(screen.queryByText('Error: Invalid JSON input').style._values.color).toBe("red"); //error color
});

test('Panel content updates with plot panel content when panel type is plot and the input is valid', () => {
    fireEvent.dblClick(addedPanel.childNodes[0]);
    const inputTextArea = screen.queryByTestId('textarea-string-properties');
    fireEvent.change(inputTextArea, {
        target: {
            value: '{"type":"pie","data":[{"values":[19,26,55],"labels":["Residential","Non-Residential","Utility"],"type":"pie"}]}',
        }
    });
    const htmlRadioBtn = screen.queryByTestId('plot');
    fireEvent.click(htmlRadioBtn);
    const applyBtn = screen.queryByText('Apply');
    fireEvent.click(applyBtn);
    expect(screen.queryByText('Type : plot')).toBeInTheDocument();
    expect(screen.queryByTestId('propertiesBarContents').childNodes.length).toBe(0);
});

test('Property bar reports error when panel type is plot and the input is invalid', () => {
    fireEvent.dblClick(addedPanel.childNodes[0]);
    const inputTextArea = screen.queryByTestId('textarea-string-properties');
    fireEvent.change(inputTextArea, {
        target: {
            value: '{"type":"pie","data":[{"values":[19,26,55],"labels":["Residential","Non-Residential","Utility"],"type":"pie"}',
        }
    });
    const htmlRadioBtn = screen.queryByTestId('plot');
    fireEvent.click(htmlRadioBtn);
    const applyBtn = screen.queryByText('Apply');
    fireEvent.click(applyBtn);
    expect(screen.queryByTestId('propertiesBarContents').childNodes.length).not.toBe(0);
    expect(screen.queryByTestId('error').textContent).toBe('Incorrect format for plot panel. Check Help for more details');
});
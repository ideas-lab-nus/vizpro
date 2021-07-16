import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../../Canvas.js';

var addedPanel;
beforeEach(() => {
    cleanup;
    render(<Canvas />);
    const panelIcon = screen.getByText('Panel');
    fireEvent.click(panelIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedPanel = mainGrid.childNodes[2];
});

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
});

test('Panel content updates with html content when panel type is html', () => {
    fireEvent.dblClick(addedPanel.childNodes[0]);
    const htmlRadioBtn = screen.queryByTestId('html');
    fireEvent.click(htmlRadioBtn);
    const applyBtn = screen.queryByText('Apply');
    fireEvent.click(applyBtn);
    expect(screen.queryByText('Type : html')).toBeInTheDocument();
})
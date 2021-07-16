import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../../Canvas.js';

var addedOptionList;
beforeEach(() => {
    render(<Canvas />);
    const toggleIcon = screen.getByText('Option List');
    fireEvent.click(toggleIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedOptionList = mainGrid.childNodes[2];
})

afterEach(cleanup);

test('Property bar appears when the option list is double clicked', () => {
    expect(screen.getByTestId('propertiesBarContents').childNodes.length).toBe(0);
    fireEvent.dblClick(addedOptionList.childNodes[0]);
    expect(screen.queryByText('Option list properties')).toBeInTheDocument();
    expect(screen.queryByText('options (as dictionary)')).toBeInTheDocument();
    expect(screen.queryByText('options (as dictionary)').className).toBe('propertiesbar label');
    screen.debug(screen.getByTestId('propertiesBarContents'));
    expect(screen.queryByText('{"Option_0":0,"Option_1":1,"Option_2":2}')).toBeInTheDocument();
    expect(screen.queryByText('{"Option_0":0,"Option_1":1,"Option_2":2}').nodeName).toBe('TEXTAREA');
    expect(screen.queryByText('Preview:')).toBeInTheDocument();
    expect(screen.queryByText('Preview:').className).toBe('propertiesbar label');
    expect(screen.queryByText('Log')).toBeInTheDocument();
    expect(screen.queryByText('Log').className).toBe('propertiesbar label');
    expect(screen.queryByText('Success', {exact: false})).toBeInTheDocument();
    expect(screen.queryByText('Option_0-->0', {exact: false})).toBeInTheDocument();
    expect(screen.queryByText('Option_1-->1', {exact: false})).toBeInTheDocument();
    expect(screen.queryByText('Option_2-->2', {exact: false})).toBeInTheDocument();
    expect(screen.queryByText('Apply')).toBeInTheDocument();
    expect(screen.queryByText('Apply').nodeName).toBe('BUTTON');
})

test('Log updates when options changed successfully', () => {
    fireEvent.dblClick(addedOptionList.childNodes[0]);
    const optionListTextArea = screen.getByText('{"Option_0":0,"Option_1":1,"Option_2":2}');
    fireEvent.change(optionListTextArea, {
        target: {
            value: '{"Option_0":8,"Option_1":5,"Option_2":10, "Option_3": "Hello"}'
        }
    });
    expect(screen.queryByText('Option_0-->8', {exact: false})).toBeInTheDocument();
    expect(screen.queryByText('Option_1-->5', {exact: false})).toBeInTheDocument();
    expect(screen.queryByText('Option_2-->10', {exact: false})).toBeInTheDocument();
    expect(screen.queryByText('Option_3-->Hello', {exact: false})).toBeInTheDocument();
})
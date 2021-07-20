import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';

beforeEach(() => {
    render(<Canvas />);
    const basicNode = screen.getByText('Basic');
    fireEvent.click(basicNode);
});

afterEach(cleanup);

function equalArray(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    } 
    for (let index = 0; index < array1.length; index++) {
        if (array1[index] !== array2[index]) {
            return false;
        }
    }
    return true;
}

test('Average component appears on the grid when the icon is clicked', () => {
    fireEvent.click(screen.queryByText('Average'));
    const mainGrid = screen.getByTestId('allContents');
    const addedAverageComp = mainGrid.childNodes[2];
    expect(addedAverageComp).toBeInTheDocument();
    expect(addedAverageComp).toHaveClass('component');
    expect(addedAverageComp.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-Average').textContent).toBe('Average');
    const expectedInput = ['InputList'];
    const expectedOutput = ['average', 'log_'];
    const inputList = screen.queryAllByTestId('inputTxt-Average').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-Average').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
});

test('Sum component appears on the grid when the icon is clicked', () => {
    fireEvent.click(screen.queryByText('Add'));
    const mainGrid = screen.getByTestId('allContents');
    const addedSumComp = mainGrid.childNodes[2];
    expect(addedSumComp).toBeInTheDocument();
    expect(addedSumComp).toHaveClass('component');
    expect(addedSumComp.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-Add').textContent).toBe('Add');
    const expectedInput = ['InputList'];
    const expectedOutput = ['sum_', 'log_'];
    const inputList = screen.queryAllByTestId('inputTxt-Add').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-Add').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
})

test('Min component appears on the grid when the icon is clicked', () => {
    fireEvent.click(screen.queryByText('Min'));
    const mainGrid = screen.getByTestId('allContents');
    const addedMinComp = mainGrid.childNodes[2];
    expect(addedMinComp).toBeInTheDocument();
    expect(addedMinComp).toHaveClass('component');
    expect(addedMinComp.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-Min').textContent).toBe('Min');
    const expectedInput = ['inputList'];
    const expectedOutput = ['output_', 'log_'];
    const inputList = screen.queryAllByTestId('inputTxt-Min').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-Min').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
})

test('Max component appears on the grid when the icon is clicked', () => {
    fireEvent.click(screen.queryByText('Max'));
    const mainGrid = screen.getByTestId('allContents');
    const addedMaxComp = mainGrid.childNodes[2];
    expect(addedMaxComp).toBeInTheDocument();
    expect(addedMaxComp).toHaveClass('component');
    expect(addedMaxComp.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-Max').textContent).toBe('Max');
    const expectedInput = ['inputList'];
    const expectedOutput = ['output_', 'log_'];
    const inputList = screen.queryAllByTestId('inputTxt-Max').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-Max').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
});

test('Difference 2 component appears on the grid when the icon is clicked', () => {
    fireEvent.click(screen.queryByText('Difference 2'));
    const mainGrid = screen.getByTestId('allContents');
    const addedDiffComp = mainGrid.childNodes[2];
    expect(addedDiffComp).toBeInTheDocument();
    expect(addedDiffComp).toHaveClass('component');
    expect(addedDiffComp.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-Difference 2').textContent).toBe('Difference 2');
    const expectedInput = ['in_01', 'in_02'];
    const expectedOutput = ['output_', 'log_'];
    const inputList = screen.queryAllByTestId('inputTxt-Difference 2').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-Difference 2').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
});

test('Json Navigator component appears on the grid when the icon is clicked', () => {
    fireEvent.click(screen.queryAllByText('Json Navigator')[1]);
    const mainGrid = screen.getByTestId('allContents');
    const addedJsonNavComp = mainGrid.childNodes[2];
    expect(addedJsonNavComp).toBeInTheDocument();
    expect(addedJsonNavComp).toHaveClass('component');
    expect(addedJsonNavComp.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-Json Navigator').textContent).toBe('Json Navigator');
    const expectedInput = ['input_json', 'path'];
    const expectedOutput = ['output', 'log_'];
    const inputList = screen.queryAllByTestId('inputTxt-Json Navigator').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-Json Navigator').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
});

test('Image Display component appears on the grid when the icon is clicked', () => {
    fireEvent.click(screen.queryAllByText('Image Display')[1]);
    const mainGrid = screen.getByTestId('allContents');
    const addedImDisplayComp = mainGrid.childNodes[2];
    expect(addedImDisplayComp).toBeInTheDocument();
    expect(addedImDisplayComp).toHaveClass('component');
    expect(addedImDisplayComp.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-Image Display').textContent).toBe('Image Display');
    const expectedInput = ['_url'];
    const expectedOutput = ['image_'];
    const inputList = screen.queryAllByTestId('inputTxt-Image Display').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-Image Display').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
});

test('YouTube Display component appears on the grid when the icon is clicked', () => {
    fireEvent.click(screen.queryAllByText('YouTube Display')[1]);
    const mainGrid = screen.getByTestId('allContents');
    const addedYoutubeDisplayComp = mainGrid.childNodes[2];
    expect(addedYoutubeDisplayComp).toBeInTheDocument();
    expect(addedYoutubeDisplayComp).toHaveClass('component');
    expect(addedYoutubeDisplayComp.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-YouTube Display').textContent).toBe('YouTube Display');
    const expectedInput = ['_url'];
    const expectedOutput = ['youTube_'];
    const inputList = screen.queryAllByTestId('inputTxt-YouTube Display').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-YouTube Display').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
});

test('Plot Panel component appears on the grid when the icon is clicked', () => {
    fireEvent.click(screen.queryAllByText('Plot Panel')[1]);
    const mainGrid = screen.getByTestId('allContents');
    const addedPlotComp = mainGrid.childNodes[2];
    expect(addedPlotComp).toBeInTheDocument();
    expect(addedPlotComp).toHaveClass('component');
    expect(addedPlotComp.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-Plot Panel').textContent).toBe('Plot Panel');
    const expectedInput = ['inputs'];
    const expectedOutput = ['plot', 'log_'];
    const inputList = screen.queryAllByTestId('inputTxt-Plot Panel').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-Plot Panel').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
});

test('String To List component appears on the grid when the icon is clicked', () => {
    const stringOpsNode = screen.queryByText('String Operations');
    fireEvent.click(stringOpsNode);
    fireEvent.click(screen.queryByText('String To List'));
    const mainGrid = screen.getByTestId('allContents');
    const addedString2List = mainGrid.childNodes[2];
    expect(addedString2List).toBeInTheDocument();
    expect(addedString2List).toHaveClass('component');
    expect(addedString2List.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-String To List').textContent).toBe('String To List');
    const expectedInput = ['inputString'];
    const expectedOutput = ['help_', 'list_', 'log_'];
    const inputList = screen.queryAllByTestId('inputTxt-String To List').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-String To List').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
});

test('Replace component appears on the grid when the icon is clicked', () => {
    const stringOpsNode = screen.queryByText('String Operations');
    fireEvent.click(stringOpsNode);
    fireEvent.click(screen.queryByText('Replace'));
    const mainGrid = screen.getByTestId('allContents');
    const addedString2List = mainGrid.childNodes[2];
    expect(addedString2List).toBeInTheDocument();
    expect(addedString2List).toHaveClass('component');
    expect(addedString2List.childNodes[0]).toHaveClass('component');
    expect(screen.queryByTestId('node-title-Replace').textContent).toBe('Replace');
    const expectedInput = ['main_text', 'old_string', 'new_string'];
    const expectedOutput = ['help_', 'new_text', 'log'];
    const inputList = screen.queryAllByTestId('inputTxt-Replace').map(e => e.textContent);
    expect(equalArray(inputList, expectedInput)).toBeTruthy();
    const outputList = screen.queryAllByTestId('outputTxt-Replace').map(e => e.textContent);
    expect(equalArray(outputList, expectedOutput)).toBeTruthy();
    expect(screen.queryByText('Idle...')).toBeInTheDocument();
});

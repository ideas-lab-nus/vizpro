import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';
import {calculateShallow} from '../shallow.js';
import {selectComp} from '../functions.js'

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
        if (array1[index] === null)
            continue;
        let s1 = array1[index].toString();
        let s2 = array2[index].toString()
        if (s1 !== s2) {
            return false;
        }
    }
    return true;
}

function addInputToComponent(compId, inputList) {
    var thisComp = selectComp(compId);
    for (let i = 0; i < thisComp.inputs.length; i++) {
        const input = thisComp.inputs[i];
        input.value = inputList[i];
    }
}

test('Average component with no inputs', () => {
    fireEvent.click(screen.queryByText('Average'));
    const mainGrid = screen.getByTestId('allContents');
    const addedAverageComp = mainGrid.childNodes[2];
    const id = addedAverageComp.id;
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, ['NaN', 'Success!'])).toBeTruthy();
})

test('Average component with valid inputs', () => {
    fireEvent.click(screen.queryByText('Average'));
    const mainGrid = screen.getByTestId('allContents');
    const addedAverageComp = mainGrid.childNodes[2];
    const id = addedAverageComp.id;
    addInputToComponent(id, ["[11, 12, 16, 1]"])
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, [10, 'Success!'])).toBeTruthy();
})

test('Average component with invalid inputs', () => {
    fireEvent.click(screen.queryByText('Average'));
    const mainGrid = screen.getByTestId('allContents');
    const addedAverageComp = mainGrid.childNodes[2];
    const id = addedAverageComp.id;
    addInputToComponent(id, ["['Hello', 12, 16, 1]"]);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(!output.value[0]).toBeTruthy();
    const errorString = output.value[1].toString();
    expect(errorString.includes("Error:")).toBeTruthy();
})

test('Sum component with no inputs', () => {
    fireEvent.click(screen.queryByText('Add'));
    const mainGrid = screen.getByTestId('allContents');
    const addedSumComp = mainGrid.childNodes[2];
    const id = addedSumComp.id;
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, ['null', 'Success!'])).toBeTruthy();
})

test('Sum component with valid inputs', () => {
    fireEvent.click(screen.queryByText('Add'));
    const mainGrid = screen.getByTestId('allContents');
    const addedSumComp = mainGrid.childNodes[2];
    const id = addedSumComp.id;
    addInputToComponent(id, ['[3, 5, 10, 4]']);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, [22, 'Success!'])).toBeTruthy();
})

test('Sum component with invalid inputs', () => {
    fireEvent.click(screen.queryByText('Add'));
    const mainGrid = screen.getByTestId('allContents');
    const addedSumComp = mainGrid.childNodes[2];
    const id = addedSumComp.id;
    addInputToComponent(id, ["['Hello', 12, 16, 1]"]);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(output.value[0] === null).toBeTruthy();
    const errorString = output.value[1].toString();
    expect(errorString).toBe('Unable to convert input to a list of numbers');
});

test('Max component with no inputs', () => {
    fireEvent.click(screen.queryByText('Max'));
    const mainGrid = screen.getByTestId('allContents');
    const addedMaxComp = mainGrid.childNodes[2];
    const id = addedMaxComp.id;
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, [2, 'Success!'])).toBeTruthy();
})

test('Max component with valid inputs', () => {
    fireEvent.click(screen.queryByText('Max'));
    const mainGrid = screen.getByTestId('allContents');
    const addedMaxComp = mainGrid.childNodes[2];
    const id = addedMaxComp.id;
    addInputToComponent(id, ['[3, 5, 10, 4]']);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, [10, 'Success!'])).toBeTruthy();
})

test('Max component with invalid inputs', () => {
    fireEvent.click(screen.queryByText('Max'));
    const mainGrid = screen.getByTestId('allContents');
    const addedMaxComp = mainGrid.childNodes[2];
    const id = addedMaxComp.id;
    addInputToComponent(id, ["['Hello', 12, 16, 1]"]);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(!output.value[0]).toBeTruthy();
    const errorString = output.value[1].toString();
    expect(errorString.includes("Error:")).toBeTruthy();
});

test('Min component with no inputs', () => {
    fireEvent.click(screen.queryByText('Min'));
    const mainGrid = screen.getByTestId('allContents');
    const addedMinComp = mainGrid.childNodes[2];
    const id = addedMinComp.id;
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, [0, 'Success!'])).toBeTruthy();
});

test('Min component with valid inputs', () => {
    fireEvent.click(screen.queryByText('Min'));
    const mainGrid = screen.getByTestId('allContents');
    const addedMinComp = mainGrid.childNodes[2];
    const id = addedMinComp.id;
    addInputToComponent(id, ["[3, 5, -6, 10, 4]"]);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, [-6, 'Success!'])).toBeTruthy();
});

test('Min component with invalid inputs', () => {
    fireEvent.click(screen.queryByText('Min'));
    const mainGrid = screen.getByTestId('allContents');
    const addedMinComp = mainGrid.childNodes[2];
    const id = addedMinComp.id;
    addInputToComponent(id, ["['Hello', 12, 16, 1]"]);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(!output.value[0]).toBeTruthy();
    const errorString = output.value[1].toString();
    expect(errorString.includes("Error:")).toBeTruthy();
});

test('Difference 2 component with no inputs', () => {
    fireEvent.click(screen.queryByText('Difference 2'));
    const mainGrid = screen.getByTestId('allContents');
    const addedDiff2Comp = mainGrid.childNodes[2];
    const id = addedDiff2Comp.id;
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, [5, 'Success!'])).toBeTruthy();
});

test('Difference 2 component with valid inputs', () => {
    fireEvent.click(screen.queryByText('Difference 2'));
    const mainGrid = screen.getByTestId('allContents');
    const addedDiff2Comp = mainGrid.childNodes[2];
    const id = addedDiff2Comp.id;
    addInputToComponent(id, [50, '17']);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, [33, 'Success!'])).toBeTruthy();
});

test('Difference 2 component with invalid inputs', () => {
    fireEvent.click(screen.queryByText('Difference 2'));
    const mainGrid = screen.getByTestId('allContents');
    const addedDiff2Comp = mainGrid.childNodes[2];
    const id = addedDiff2Comp.id;
    addInputToComponent(id, ["[1]", 20]);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['text', 'text'])).toBeTruthy();
    expect(equalArray(output.value, [ NaN, 'NaN or 20 is not numeric' ])).toBeTruthy();
});

test('Image Display component with no inputs', () => {
    fireEvent.click(screen.queryAllByText('Image Display')[1]);
    const mainGrid = screen.getByTestId('allContents');
    const addedImDisplayComp = mainGrid.childNodes[2];
    const id = addedImDisplayComp.id;
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['html'])).toBeTruthy();
    expect(equalArray(output.value, ['<img src="https://user-images.githubusercontent.com/6969514/60951247-4bac1200-a32b-11e9-8b66-02bc19953461.png" style="width:100%; height:100%">'])).toBeTruthy();
});

test('Image Display component with valid inputs', () => {
    fireEvent.click(screen.queryAllByText('Image Display')[1]);
    const mainGrid = screen.getByTestId('allContents');
    const addedImDisplayComp = mainGrid.childNodes[2];
    const id = addedImDisplayComp.id;
    addInputToComponent(id, ['https://www.nus.edu.sg/images/default-source/identity-images/NUS_logo_full-horizontal.jpg']);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['html'])).toBeTruthy();
    expect(equalArray(output.value, ['<img src="https://www.nus.edu.sg/images/default-source/identity-images/NUS_logo_full-horizontal.jpg" style="width:100%; height:100%">'])).toBeTruthy();
});

test('YouTube Display component with no inputs', () => {
    fireEvent.click(screen.queryAllByText('YouTube Display')[1]);
    const mainGrid = screen.getByTestId('allContents');
    const addedImDisplayComp = mainGrid.childNodes[2];
    const id = addedImDisplayComp.id;
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['html'])).toBeTruthy();
    expect(equalArray(output.value, ['<img src="https://user-images.githubusercontent.com/6969514/60952698-50be9080-a32e-11e9-9aba-b5380f5cda01.png" style="width:100%; height:100%">'])).toBeTruthy();
});

test('YouTube Display component with valid inputs', () => {
    fireEvent.click(screen.queryAllByText('YouTube Display')[1]);
    const mainGrid = screen.getByTestId('allContents');
    const addedImDisplayComp = mainGrid.childNodes[2];
    const id = addedImDisplayComp.id;
    addInputToComponent(id, ['https://www.youtube.com/watch?v=dQw4w9WgXcQ']);
    const output = calculateShallow(id);
    expect(equalArray(output.type, ['html'])).toBeTruthy();
    expect(equalArray(output.value, ['<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'])).toBeTruthy();
});

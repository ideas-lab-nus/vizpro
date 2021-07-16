import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';

beforeEach(() => {
    render(<Canvas />)
})

afterEach(cleanup);

test('Top toolbar successfully render initially', () => {
    const components = screen.getAllByText('Components', {exact: false});
    components.forEach(e => expect(e).toBeInTheDocument());
    const mainInputsComp = screen.getAllByText('Main Inputs');
    expect(mainInputsComp[0].className).toBe('currentTab componentTab');
})

test('Top toolbar successfully render after right toggle button clicked', () => {
    const rightToggleBtn = ['Basic', 'User Definitions', 'String Operations', 'Main Inputs'];
    rightToggleBtn.forEach(currentBtn => {
        const btn = screen.getAllByText(currentBtn);
        fireEvent.click(btn[0]);
        const mainInputsComp = screen.getAllByText(currentBtn);
        expect(mainInputsComp[0].className).toBe('currentTab componentTab');
    })
})

test('Toolbar container successfully render initially', () => {
    const list = ['Slider', 'Panel', 'Toggle', 'Option List', 'List View', 'File Upload', 'Deep'];
    list.forEach(element => {
        const node = screen.getByText(element);
        expect(node).toBeInTheDocument();
    })
})

test('Toolbar container successfully render when Basic button is clicked', () => {
    const basicNode = screen.getByText('Basic');
    fireEvent.click(basicNode);
    const components = ['Average', 'Add', 'Max', 'Min', 'Difference 2', 'Json Navigator', '3dVisualizer',
                    'Image Display', 'YouTube Display', 'Plot Panel'];
    components.forEach(element => {
        const nodes = screen.getAllByText(element);
        if (nodes.length === 1) {
            expect(nodes[0]).toBeInTheDocument();
            expect(nodes[0].className).toBe('tooltiptext');
        } else {
            expect(nodes[0]).toBeInTheDocument();
            expect(nodes[0].className).toBe('iconText');
            expect(nodes[1]).toBeInTheDocument();
            expect(nodes[1].className).toBe('tooltiptext');
        }
    })
})

test('Toolbar container successfully render when String Ops button is clicked', () => {
    const stringOpsNode = screen.getByText('String Operations');
    fireEvent.click(stringOpsNode);
    const components = ['String To List', 'Replace'];
    components.forEach(element => {
        const nodes = screen.getAllByText(element);
        if (nodes.length === 1) {
            expect(nodes[0]).toBeInTheDocument();
            expect(nodes[0].className).toBe('tooltiptext');
        } else {
            expect(nodes[0]).toBeInTheDocument();
            expect(nodes[0].className).toBe('iconText');
            expect(nodes[1]).toBeInTheDocument();
            expect(nodes[1].className).toBe('tooltiptext');
        }
    })
})
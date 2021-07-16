import React from "react"; 
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Canvas from '../../Canvas.js';

beforeEach(() => {
    render(<Canvas />);
});

afterEach(cleanup);

test('File upload appears on the grid when the icon is clicked', () => {
    const fileUploadIcon = screen.getByText('File Upload');
    fireEvent.click(fileUploadIcon);
    const mainGrid = screen.getByTestId('allContents');
    const addedFileUpload = mainGrid.childNodes[2];
    expect(addedFileUpload).toHaveClass('component'); 
    expect(addedFileUpload.childNodes[0]).toHaveClass('fileUpload'); 
    expect(screen.queryByText('File Size : None')).toBeInTheDocument();
    const inputCircle = addedFileUpload.childNodes[0].childNodes[0];
    expect(inputCircle.childNodes.length).toBe(0); //has no input circle
    const outputCircle = addedFileUpload.childNodes[0].childNodes[1];
    expect(outputCircle.childNodes.length).not.toBe(0); //has output circle
    const uploadBtn = screen.queryByTestId('fileUploadForm');
    expect(uploadBtn).toBeInTheDocument();
})
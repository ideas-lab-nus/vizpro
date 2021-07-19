import React from "react"; 
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import Canvas from '../../Canvas.js';

var addedFileUpload;
beforeEach(() => {
    render(<Canvas />);
    const fileUploadIcon = screen.getByText('File Upload');
    fireEvent.click(fileUploadIcon);
    const mainGrid = screen.getByTestId('allContents');
    addedFileUpload = mainGrid.childNodes[2];
});

afterEach(cleanup);

test('File upload appears on the grid when the icon is clicked', () => {
    expect(addedFileUpload).toHaveClass('component'); 
    expect(addedFileUpload.childNodes[0]).toHaveClass('fileUpload'); 
    expect(screen.queryByText('File Size : None')).toBeInTheDocument();
    const inputCircle = addedFileUpload.childNodes[0].childNodes[0];
    expect(inputCircle.childNodes.length).toBe(0); //has no input circle
    const outputCircle = addedFileUpload.childNodes[0].childNodes[1];
    expect(outputCircle.childNodes.length).not.toBe(0); //has output circle
    const uploadBtn = screen.queryByTestId('fileUploadForm');
    expect(uploadBtn).toBeInTheDocument();
});

test('File information appears when a file is uploaded', async () => {
    let file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.queryByTestId('fileUploadForm');
    await waitFor(() =>
      fireEvent.change(input, {
        target: { files: [file] },
      })
    );
    expect(input.files[0]).toStrictEqual(file)
    expect(input.files).toHaveLength(1);
});
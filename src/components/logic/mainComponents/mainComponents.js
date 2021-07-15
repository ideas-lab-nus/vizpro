import $ from 'jquery';
import '@fontsource/ubuntu-mono';

import { CreateNewComponent } from './component';
import { CreateNewDeep, submitDeepEdit } from './dynamicDeep'
import { CreateNewFileUpload } from './fileUpload'
import { CreateNewListView } from './listView'
import { CreateNewOptionList, handleOptionListEdit, submitOptionListEdit } from './optionlist'
import { CreateNewPanel, submitPanelEdit } from './panel'
import { CreateNewSlider, submitSliderEdit } from './slider'
import { CreateNewToggle } from './toggle'

function cancelEdit() {
    $('div#propertiesBarContents').html('');
}

export { 
    CreateNewComponent,
    CreateNewDeep, 
    submitDeepEdit, 
    CreateNewFileUpload, 
    CreateNewListView, 
    CreateNewOptionList, 
    handleOptionListEdit, 
    submitOptionListEdit, 
    CreateNewPanel, 
    submitPanelEdit, 
    CreateNewSlider, 
    submitSliderEdit, 
    CreateNewToggle, 
    cancelEdit 
}
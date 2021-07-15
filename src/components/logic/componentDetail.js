/**
 * This file contains all information about the component, which are:
 * name, short name, description, type, dftype (deep or shallow), category, subcategory, input list, output list, color, background image
 * This file also contains the mapping between the tab name and its id
 */
const details = [
    {
        name: 'Average',
        shname: 'AVG',
        desc: 'The average between two values',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: 'Lists',
        inputList: [
            { name: 'InputList', shortName: 'in_01', desc: 'first input', default_value: '1.0' }
        ],
        outputList: [
            { name: 'average', shortName: 'avg', desc: 'the average between input1 and input 2' },
            { name: 'log_', shortName: 'log', desc: 'debugging logger' }
        ],
        color: '#F23322',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/958f17e5cfad4cdbbe26dd5affbbbfa2.png'
    },
    {
        name: 'Add',
        shname: '+',
        desc: 'Add two numbers.',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: 'Math',
        inputList: [
            { name: 'InputList', shortName: 'inp_1', desc: 'first number', default_value: '1.0' }
        ],
        outputList: [
            { name: 'sum_', shortName: 'sum', desc: 'sum of the two inputs' },
            { name: 'log_', shortName: 'log', desc: 'output log' }
        ],
        color: '#F23322',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/e2c5a0d28dca45c38b0e96e6723e2bde.png'
    },
    {
        name: 'Max',
        shname: 'max',
        desc: 'Maximum value of a list of inputs.',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: 'Lists',
        inputList: [
            {
                name: 'inputList',
                shortName: '_list',
                desc: 'the input list ',
                default_value: '[0.0, 1.0, 2.0]'
            }
        ],
        outputList: [
            { type: 'list', name: 'output_', shortName: 'output_', desc: 'maximum value ' },
            { name: 'log_', shortName: 'log', desc: 'output lot' }
        ],
        color: '#F23322',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/96524490dcdf4317a9a3e80b9d4762ba.png'
    },
    {
        name: 'Min',
        shname: 'min',
        desc: 'Minimum value of a list of inputs',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: 'Lists',
        inputList: [
            {
                name: 'inputList',
                shortName: '_list',
                desc: 'the input list ',
                default_value: '[0, 1, 2.0]'
            }
        ],
        outputList: [
            { type: 'list', name: 'output_', shortName: 'min_', desc: 'minimum value' },
            { name: 'log_', shortName: 'log', desc: 'output log' }
        ],
        color: '#F23322',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/5d844dbee9f54f9ba9891082ac8a52c5.png'
    },
    {
        name: 'Difference 2',
        shname: 'Difference',
        desc: 'Substraction',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: 'Math',
        inputList: [
            { name: 'in_01', shortName: 'in_01', desc: 'first input', default_value: '10.0' },
            { name: 'in_02', shortName: 'in_02', desc: 'second input', default_value: '5.0' }
        ],
        outputList: [
            { name: 'output_', shortName: 'out_', desc: 'difference' },
            { type: 'float', name: 'log_', shortName: 'log', desc: 'log output' }
        ],
        color: '#9b59b6',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/f4fbd2bace8d4fb6b8982ccfaf310f63.png'
    },
    {
        name: 'Json Navigator',
        shname: 'jsonNav',
        desc: 'Select item from json object by path',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: '',
        inputList: [
            {
                name: 'input_json',
                shortName: 'input_json',
                desc: 'input_json',
                default_value: 'null'
            },
            { name: 'path', shortName: 'path', desc: 'path', default_value: 'null' }
        ],
        outputList: [
            { type: 'str', name: 'output', shortName: 'output', desc: 'output' },
            { type: 'str', name: 'log_', shortName: 'log', desc: 'output log' }
        ],
        color: '#c0392b',
        backgroundImage: ''
    },
    {
        name: '3dVisualizer',
        shname: '3dvis',
        desc: '',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: '',
        inputList: [{ name: 'url', shortName: 'url', default_value: 'null' }],
        outputList: [{ type: 'str', name: 'url', shortName: 'url', desc: 'null' }],
        color: '#E38A74',
        backgroundImage: ''
    },
    {
        name: 'Image Display',
        shname: 'imshow',
        desc: '',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: '',
        inputList: [
            {
                name: '_url',
                shortName: 'url',
                desc: 'url',
                default_value:
                    'https://user-images.githubusercontent.com/6969514/60951247-4bac1200-a32b-11e9-8b66-02bc19953461.png'
            }
        ],
        outputList: [{ type: 'str', name: 'image_' }],
        color: '#F23322',
        backgroundImage: ''
    },
    {
        name: 'YouTube Display',
        shname: 'Youtube',
        desc: '',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: '',
        inputList: [
            { name: '_url', shortName: '_url', desc: 'youtube url', default_value: 'null' }
        ],
        outputList: [{ type: 'str', name: 'youTube_', shortName: 'youTube', desc: '' }],
        color: '#c0392b',
        backgroundImage: ''
    },
    {
        name: 'Plot Panel',
        shname: 'plot panel',
        desc: '',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: '',
        inputList: [{ name: 'inputs', shortName: 'in', default_value: 'null', desc: 'in' }],
        outputList: [
            { name: 'plot', shortName: 'plot', desc: 'plot' },
            { name: 'log_', shortName: 'log_', desc: 'log_' }
        ],
        color: '#f1c40f',
        backgroundImage: ''
    },
    {
        name: 'String To List',
        shname: 'str2list',
        desc: 'Converts a list-like string into a list object.',
        type: 'component',
        dftype: 'shlow',
        category: 'String Operations',
        subcategory: 'Lists',
        inputList: [
            {
                name: 'inputString',
                shortName: '_str',
                desc: 'list-like string',
                default_value: '[0, 1, 2]'
            }
        ],
        outputList: [
            { type: 'html', name: 'help_', shortName: 'h', desc: 'help' },
            { type: 'list', name: 'list_', shortName: 'lst_', desc: 'list object' },
            { type: 'str', name: 'log_', shortName: 'log', desc: 'output debugging log ... ' }
        ],
        color: '#F23322',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/9c0712eb82084d33af0519131126d0e7.png'
    },
    {
        name: 'Replace',
        shname: 'replace',
        desc: '',
        type: 'component',
        dftype: 'shlow',
        category: 'String Operations',
        subcategory: '',
        inputList: [
            { name: 'main_text', shortName: 'main_text', desc: 'main_text', default_value: 'null' },
            {
                name: 'old_string',
                shortName: 'old_string',
                desc: 'old_string',
                default_value: 'null'
            },
            {
                name: 'new_string',
                shortName: 'new_string',
                desc: 'new_string',
                default_value: 'null'
            }
        ],
        outputList: [
            { type: 'str', name: 'help_', shortName: 'h', desc: 'help' },
            { type: 'str', name: 'new_text', shortName: 'new_text', desc: 'the output text' },
            { type: 'str', name: 'log', shortName: 'log', desc: 'log output' }
        ],
        color: '#7FA696',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/c5571f6199314a3daf2186534a545b13.png'
    }
];

const tabIdMapping = {
    Basic: 'div.toolbarbuttonsContainer.Basic',
    'User Definitions': 'div.toolbarbuttonsContainer.User',
    'String Operations': 'div.toolbarbuttonsContainer.StringOps'
};

const toggleButtonInfo = [
    {
        name: 'Basic',
        id: 'Basic',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/7e35adc61ca94a94b72d205029bbaf55.png'
    },
    {
        name: 'User Definitions',
        id: 'User',
        backgroundImage: 'https://image.flaticon.com/icons/png/512/5039/5039159.png'
    },
    {
        name: 'String Operations',
        id: 'StringOps',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/00cebc445ced4d8d89cf842609040d43.png'
    },
    {
        name: 'Main Inputs',
        id: 'Input',
        backgroundImage: 'https://storage.googleapis.com/ghostbucket111/icons/input.png'
    }
];
export { details, tabIdMapping, toggleButtonInfo };

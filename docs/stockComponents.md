layout: page
title: "server"
permalink: /data-viz/stockComponents/

```js
const stockComponentDetails = [
    {
        name: 'BuildingSimulationModel',
        shname: 'BSimM',
        desc: "Integrate cloud simulation into BuildSim's automated workflow",
        type: 'component',
        dftype: 'dp',
        category: 'Basic',
        subcategory: '',
        inputList: [
            {
                name: '_buildingName',
                shortName: '_bname',
                desc: 'building name',
                default_value: ''
            },
            {
                name: '_Building Type',
                shortName: '_btype',
                desc: 'the type of the building: string: default value : "office building"',
                default_value: 'office building'
            }
        ],
        outputList: [
            {
                type: 'str',
                name: 'model_api',
                shortName: 'api',
                desc: 'the cloud api key of the model '
            }
        ],
        color: '#0D6BA6',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/a65cdbfc93a7436c9c8c83308ed9b100.png'
    },
    {
        name: 'HVAC',
        shname: 'hvac',
        desc: 'Heating, ventilation, and air conditioning (HVAC) is the technology of indoor and vehicular environmental comfort.',
        type: 'component',
        dftype: 'dp',
        category: 'Basic',
        subcategory: 'Models',
        inputList: [
            { name: '_System', shortName: '_sys', desc: 'HVAC system', default_value: '' },
            {
                name: '_operatingTime',
                shortName: '_opTime',
                desc: 'time of operation in a form of schedule',
                default_value: ''
            },
            {
                name: '_Template',
                shortName: '_tmplt',
                desc: 'initialize from a template',
                default_value: ''
            }
        ],
        outputList: [
            {
                type: 'str',
                name: 'hvacVariables',
                shortName: 'hvVars',
                desc: 'different variables. '
            },
            { name: 'errorLog_', shortName: 'log_', desc: 'errors logger.' }
        ],
        color: '#0D6BA6',
        backgroundImage:
            'https://storage.googleapis.com/ghostbucket111/icons/784e631b9ba748f28eba825362b3add9.png'
    },
    {
        name: 'BSH Project Model List',
        shname: 'bshPrj',
        desc: 'Get list of models under a project',
        type: 'component',
        dftype: 'dp',
        category: 'Basic',
        subcategory: '',
        inputList: [
            {
                name: 'project_api_key',
                shortName: 'projApiK',
                desc: 'project_api_key',
                default_value: 'null'
            }
        ],
        outputList: [
            {
                type: 'str',
                name: 'to_html',
                shortName: 'models_',
                desc: 'list of models under a project'
            },
            {
                type: 'str',
                name: 'to_json',
                shortName: 'models_',
                desc: 'list of models under a project'
            },
            {
                type: 'str',
                name: 'to_text',
                shortName: 'models_',
                desc: 'list of models under a project'
            },
            { name: 'log_', shortName: 'undefined' }
        ],
        color: '#0D6BA6',
        backgroundImage: ''
    },
    {
        name: 'BSH Model Commits',
        shname: 'bshModelCommits',
        desc: 'Access a model commit',
        type: 'component',
        dftype: 'dp',
        category: 'Basic',
        subcategory: '',
        inputList: [
            {
                name: 'project_api_key',
                shortName: 'project_api_key',
                desc: 'project_api_key',
                default_value: 'null'
            },
            {
                name: 'model_api_key',
                shortName: 'model_api_key',
                desc: 'model_api_key',
                default_value: 'null'
            }
        ],
        outputList: [
            { type: 'str', name: 'model_list_', shortName: 'model_list_', desc: 'model_list_' },
            { name: 'log_', shortName: 'log', desc: 'output log' }
        ],
        color: '#0D6BA6',
        backgroundImage: ''
    },
    {
        name: 'BSH Run',
        shname: 'bsh_run',
        desc: 'Run simulation job',
        type: 'component',
        dftype: 'dp',
        category: 'Basic',
        subcategory: '',
        inputList: [
            { name: 'project_api_key', shortName: 'api_key', desc: '', default_value: 'null' },
            { name: 'file_dir', shortName: '_idf', desc: 'energyPlusfile', default_value: 'null' },
            {
                name: 'epw_file',
                shortName: '_epw',
                desc: 'weather data file',
                default_value: 'null'
            },
            {
                name: 'unit',
                shortName: 'unit',
                desc: 'unit either "ip" or "si" default "ip"',
                default_value: 'ip'
            },
            {
                name: 'track',
                shortName: 'track',
                desc: 'Track the simulaiton? true or flase, default false',
                default_value: 'false'
            },
            {
                name: 'agent',
                shortName: 'agent',
                desc: 'Number of CPU threads',
                default_value: '1'
            },
            { name: 'request_time', shortName: 'reqTime', desc: 'undefined', default_value: '5' }
        ],
        outputList: [
            { type: 'str', name: 'results', shortName: 'results', desc: 'undefined' },
            { type: 'str', name: 'log_', shortName: 'log', desc: 'log' }
        ],
        color: '#0D6BA6',
        backgroundImage: ''
    },
    {
        name: 'BSH 3D Viewer',
        shname: '',
        desc: 'track_token',
        type: 'component',
        dftype: 'dp',
        category: 'Basic',
        subcategory: '',
        inputList: [
            {
                name: 'project_api_key',
                shortName: 'projApiKey',
                desc: 'project_api_key',
                default_value: 'null'
            },
            {
                name: 'model_ap_key',
                desc: 'model_ap_key',
                default_value: 'null',
                shortName: 'modelApiKey'
            }
        ],
        outputList: [
            { type: 'str', name: 'json_object', shortName: 'json_object', desc: 'json_object' },
            {
                type: 'str',
                name: 'project_api_key',
                shortName: 'project_api_key',
                desc: 'project_api_key'
            },
            {
                type: 'str',
                name: 'project_tracking',
                shortName: 'project_tracking',
                desc: 'project_tracking'
            },
            { type: 'str', name: 'log', shortName: 'log', desc: 'output log' }
        ],
        color: '#0D6BA6',
        backgroundImage: ''
    },
    {
        name: 'Draw 3d Model',
        shname: '',
        desc: '',
        type: 'component',
        dftype: 'shlow',
        category: 'Basic',
        subcategory: '',
        inputList: [
            { name: 'tracking', shortName: 'tracking', desc: 'tracking', default_value: 'null' }
        ],
        outputList: [
            { name: '3d_link', shortName: '3d_link', desc: 'open the 3d geometry in new window' },
            { name: 'log', shortName: 'log', desc: 'log' }
        ],
        color: '#0D6BA6',
        backgroundImage: ''
    },
    {
        name: 'BSH Get Model Details',
        shname: 'ModelDetails',
        desc: 'Retrieves model info and simulation results.',
        type: 'component',
        dftype: 'dp',
        category: 'Basic',
        subcategory: '',
        inputList: [
            {
                name: 'project_api_key',
                shortName: 'project_api_key',
                desc: '',
                default_value: 'null'
            },
            { name: 'track_token', shortName: 'track_token', desc: '', default_value: 'null' }
        ],
        outputList: [
            { type: 'str', name: 'help_', shortName: 'help_', desc: 'help_' },
            {
                type: 'str',
                name: 'get_design_day_condition',
                shortName: 'get_design_day_condition',
                desc: 'get_design_day_condition'
            },
            { type: 'str', name: 'zone_list', shortName: 'zone_list', desc: 'zone_list' },
            { type: 'str', name: 'zone_names', shortName: 'zone_names', desc: 'zone_names' },
            { name: 'bldg_orientation', shortName: 'bldg_orientation', desc: 'bldg_orientation' },
            {
                name: 'num_above_ground_floor',
                shortName: 'num_above_ground_floor',
                desc: 'num_above_ground_floor'
            },
            { name: 'num_total_floor', shortName: 'num_total_floor', desc: 'num_total_floor' },
            { name: 'num_zones', shortName: 'num_zones', desc: 'num_zones' },
            {
                name: 'num_condition_zones',
                shortName: 'num_condition_zones',
                desc: 'num_condition_zones'
            },
            {
                name: 'condition_floor_area',
                shortName: 'condition_floor_area',
                desc: 'condition_floor_area'
            },
            { name: 'gross_floor_area', shortName: 'gross_floor_area', desc: 'gross_floor_area' },
            {
                name: 'window_wall_ratio',
                shortName: 'window_wall_ratio',
                desc: 'window_wall_ratio'
            },
            { name: 'zone_load', shortName: 'zone_load', desc: 'zone_load' },
            { name: 'download_model', shortName: 'download_model', desc: 'download_model' },
            { name: 'hourly_data', shortName: 'hourly_data', desc: 'hourly_data' },
            { name: 'log_', desc: 'log_', shortName: 'log_' }
        ],
        color: '#2A2B4A',
        backgroundImage: ''
    },
    {
        name: 'BSH Parametric Study',
        shname: 'parametric_study',
        desc: '',
        type: 'component',
        dftype: 'dp',
        category: 'Basic',
        subcategory: '',
        inputList: [
            {
                name: 'project_api_key',
                shortName: 'project_api_key',
                desc: 'project_api_key',
                default_value: 'null'
            },
            { name: 'file_dir', shortName: 'file_dir', desc: 'file_dir', default_value: 'null' },
            {
                name: 'bldg_orientation',
                shortName: 'bldg_orientation',
                desc: 'bldg_orientation',
                default_value: 'null'
            },
            {
                name: 'cooling_all_cop',
                shortName: 'cooling_all_cop',
                desc: 'cooling_all_cop',
                default_value: 'null'
            },
            {
                name: 'cooling_chiller_cop',
                shortName: 'cooling_chiller_cop',
                desc: 'cooling_chiller_cop',
                default_value: 'null'
            },
            {
                name: 'cooling_coil_cop',
                shortName: 'cooling_coil_cop',
                desc: 'cooling_coil_cop',
                default_value: 'null'
            },
            {
                name: 'daylit_sensor',
                shortName: 'daylit_sensor',
                desc: 'daylit_sensor',
                default_value: 'null'
            },
            {
                name: 'demand_control',
                shortName: 'demand_control',
                desc: 'demand_control',
                default_value: 'null'
            },
            {
                name: 'equipment_epd',
                shortName: 'equipment_epd',
                desc: 'equipment_epd',
                default_value: 'null'
            },
            {
                name: 'equipment_epd_percent',
                shortName: 'equipment_epd_percent',
                desc: 'equipment_epd_percent',
                default_value: 'null'
            },
            {
                name: 'heating_dx_efficiency',
                shortName: 'heating_dx_efficiency',
                desc: 'heating_dx_efficiency',
                default_value: 'null'
            },
            {
                name: 'heating_efficiency',
                shortName: 'heating_efficiency',
                desc: 'heating_efficiency',
                default_value: 'null'
            },
            {
                name: 'heat_recovery',
                shortName: 'heat_recovery',
                desc: 'heat_recovery',
                default_value: 'null'
            },
            {
                name: 'hvac_template',
                shortName: 'hvac_template',
                desc: 'hvac_template',
                default_value: 'null'
            },
            {
                name: 'infiltration',
                shortName: 'infiltration',
                desc: 'infiltration',
                default_value: 'null'
            },
            { name: 'light_lpd', shortName: 'light_lpd', desc: 'light_lpd', default_value: 'null' },
            {
                name: 'light_lpd_percent',
                shortName: 'light_lpd_percent',
                desc: 'light_lpd_percent',
                default_value: 'null'
            },
            {
                name: 'occupancy_sensor',
                shortName: 'occupancy_sensor',
                desc: 'occupancy_sensor',
                default_value: 'null'
            },
            {
                name: 'roof_rvalue',
                shortName: 'roof_rvalue',
                desc: 'roof_rvalue',
                default_value: 'null'
            },
            {
                name: 'roof_solar_absorption',
                shortName: 'roof_solar_absorption',
                desc: 'roof_solar_absorption',
                default_value: 'null'
            },
            { name: 'shade_fin', shortName: 'shade_fin', desc: 'shade_fin', default_value: 'null' },
            {
                name: 'shade_overhang',
                shortName: 'shade_overhang',
                desc: 'shade_overhang',
                default_value: 'null'
            },
            {
                name: 'wall_rvalue',
                shortName: 'wall_rvalue',
                desc: 'wall_rvalue',
                default_value: 'null'
            },
            {
                name: 'water_heater_efficiency',
                shortName: 'water_heater_efficiency',
                desc: 'water_heater_efficiency',
                default_value: 'null'
            },
            {
                name: 'water_use_reduction',
                shortName: 'water_use_reduction',
                desc: 'water_use_reduction',
                default_value: 'null'
            },
            {
                name: 'window_shgc',
                shortName: 'window_shgc',
                desc: 'window_shgc',
                default_value: 'null'
            },
            {
                name: 'window_uvalue',
                shortName: 'window_uvalue',
                desc: 'window_uvalue',
                default_value: 'null'
            },
            {
                name: 'window_wall_ratio',
                shortName: 'window_wall_ratio',
                desc: 'window_wall_ratio',
                default_value: 'null'
            }
        ],
        outputList: [
            { type: 'str', name: 'help_', shortName: 'help_', desc: 'help_' },
            {
                type: 'str',
                name: 'result_project_api_key',
                shortName: 'result_project_api_key',
                desc: 'result_project_api_key'
            },
            {
                type: 'str',
                name: 'result_track_token',
                shortName: 'result_track_token',
                desc: 'result_track_token'
            },
            { type: 'str', name: 'result', shortName: 'result', desc: 'result' },
            { type: 'plot', name: 'plot_', shortName: 'plot_', desc: 'plot results' },
            { type: 'str', name: 'log_', shortName: 'log_', desc: 'log_' }
        ],
        color: '#0D6BA6',
        backgroundImage: ''
    },
    {
        name: 'BSH Spatial Representation',
        shname: 'SpatialRepr',
        desc: '',
        type: 'component',
        dftype: 'dp',
        category: 'Basic',
        subcategory: '',
        inputList: [
            { name: 'file_dir', shortName: 'file_dir', desc: 'file_dir', default_value: 'null' }
        ],
        outputList: [
            { type: 'str', name: 'help_', shortName: 'help_', desc: 'help_' },
            { name: 'spatial_vis', shortName: 'spatial_vis', desc: 'spatial_vis' },
            { name: 'log_', shortName: 'log_', desc: 'log_' }
        ],
        color: '#2980B9',
        backgroundImage: ''
    },
    {
        name: 'get OsiSoft',
        shname: 'get OsiSoft',
        desc: 'get data from a url',
        type: 'component',
        dftype: 'dp',
        category: 'OsiSoft',
        subcategory: 'Reader',
        inputList: [
            { name: 'url', shortName: 'url', desc: 'url', default_value: 'null' },
            { name: 'start_time', shortName: 'st', desc: 'time range', default_value: '-12h' },
            { name: 'end_time', shortName: 'et', desc: 'end time', default_value: '*' }
        ],
        outputList: [
            { type: 'str', name: 'output_', shortName: 'output_', desc: 'data' },
            { name: 'log_', shortName: 'log_', desc: 'log' }
        ],
        color: '#0B2240',
        backgroundImage: ''
    },
    {
        name: 'Get Data Tree',
        shname: 'getDTr',
        desc: '',
        type: 'component',
        dftype: 'dp',
        category: 'OsiSoft',
        subcategory: '',
        inputList: [
            { name: 'url', shortName: 'url', desc: 'Parent Url', default_value: 'null' },
            {
                name: 'tree_depth',
                shortName: 'treeD',
                desc: 'The depth of the search tree (int)',
                default_value: '2'
            }
        ],
        outputList: [
            {
                type: 'str',
                name: 'json_output',
                shortName: 'output_',
                desc: 'Json output object representing the tree. '
            },
            { type: 'float', name: 'log_', shortName: 'log', desc: 'State log. ' }
        ],
        color: '#27313c',
        backgroundImage: ''
    },
    {
        name: 'OSI Get Data List',
        shname: 'getDList',
        desc: 'Main function to get the list of nodes of different levels. Arguments: url {string} -- url to the piwebapi asset server',
        type: 'component',
        dftype: 'dp',
        category: 'OsiSoft',
        subcategory: '',
        inputList: [
            {
                name: 'url',
                shortName: 'url',
                desc: 'osisoft url input address',
                default_value: 'null'
            }
        ],
        outputList: [
            { type: 'str', name: 'json_output', shortName: 'output_', desc: 'json object output' },
            { name: 'log_', shortName: 'log', desc: 'output log' }
        ],
        color: '#27313c',
        backgroundImage: ''
    },
    {
        name: 'OSI Get Attribute',
        shname: 'osi_getAttribute',
        desc: '',
        type: 'component',
        dftype: 'dp',
        category: 'OsiSoft',
        subcategory: '',
        inputList: [
            {
                name: 'web_id',
                shortName: 'webId',
                desc: 'the element web_id',
                default_value: 'null'
            }
        ],
        outputList: [
            { type: 'str', name: 'attribute', shortName: 'attr', desc: 'the retreived attribute' },
            { name: 'log_', shortName: 'log', desc: 'output log' }
        ],
        color: '#27313c',
        backgroundImage: ''
    },
    {
        name: 'OSI Start Time',
        shname: 'starttime',
        desc: '{"Last_1_hours":"-1h","Last_6_hours":"-6h","Last_12_hours":"-12h","Last_24_hours":"-24h","Last_7_days":"-7d","Last_15_days":"-15d","Last_30_days":"-30d","This_Year":"01/01"}',
        type: 'optionList',
        dftype: 'shlow',
        category: 'OsiSoft',
        subcategory: '',
        inputList: [{ name: 'inupt', default_value: 'null', shortName: 'in', desc: 'none' }],
        outputList: [{ name: 'output', shortName: 'out', desc: 'null' }],
        color: '#2c3e50',
        backgroundImage: ''
    },
    {
        name: 'OSI End Time',
        shname: 'osi_endTime',
        desc: '{"Now":"*","Last_1_hours":"*-1h","Last_6_hours":"*-6h","Last_12_hours":"*-12h","Last_24_hours":"*-24h","Last_7_days":"*-7d","Last_15_days":"*-15d", "Last_30_days":"*-30d"}',
        type: 'optionList',
        dftype: 'shlow',
        category: 'OsiSoft',
        subcategory: '',
        inputList: [{ name: 'inupt', default_value: 'null', shortName: 'in', desc: 'none' }],
        outputList: [{ name: 'output', shortName: 'out', desc: 'null' }],
        color: '#2c3e50',
        backgroundImage: ''
    },
    {
        name: 'OSI Extract TimeSeries Data',
        shname: 'timeSeriesData',
        desc: 'Extract timeseries data from a record',
        type: 'component',
        dftype: 'shlow',
        category: 'OsiSoft',
        subcategory: '',
        inputList: [{ name: 'input_data', shortName: 'in', default_value: 'null' }],
        outputList: [
            { name: 'help_', shortName: 'help', type: 'html' },
            { name: 'plot_', shortName: 'plot', type: 'str' },
            { name: 'to_html', shortName: 'to_html', desc: 'to_html' },
            { name: 'to_dict', shortName: 'to_dict', desc: 'dictionary' },
            { name: 'time_stamps', shortName: 'time_stamp', desc: 'time_stamp' },
            { name: 'data', shortName: 'data', desc: 'data' },
            { name: 'log_', shortName: 'log', desc: 'output log' }
        ],
        color: '#e67e22',
        backgroundImage: ''
    },
    {
        name: 'PANDAS DataFrame',
        shname: 'pd_dataFrame',
        desc: '',
        type: 'component',
        dftype: 'dp',
        category: 'Pandas',
        subcategory: '',
        inputList: [
            { name: 'read_csv', shortName: 'read_csv', default_value: 'null' },
            {
                name: 'from_dictionary',
                shortName: 'from_dictionary',
                desc: 'from_dictionary',
                default_value: 'null'
            },
            {
                name: 'from_items',
                shortName: 'from_items',
                desc: 'from_items',
                default_value: 'null'
            }
        ],
        outputList: [
            { type: 'str', name: 'help_', shortName: 'help_', desc: 'help_' },
            { type: 'str', name: 'describe', shortName: 'desc', desc: 'to_html' },
            { type: 'str', name: 'to_html', shortName: 'to_html', desc: 'to_html' },
            { type: 'str', name: 'to_text', shortName: 'to_text', desc: 'to_text' },
            { name: 'to_latex', shortName: 'to_latex', desc: 'to_latex' },
            { name: 'to_dict', shortName: 'to_dict', desc: 'to_dict' },
            { name: 'log_', shortName: 'log_', desc: 'log_' }
        ],
        color: '#2A2B4A',
        backgroundImage: ''
    },
]
```
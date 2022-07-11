const CONFIG = {
    SEPARATOR: '-',
    VARIABLES: [
        {
            type: 'typography',
            items: [
                {
                    property: 'font-size',
                    values: [
                        { value: '12px' },
                        { value: '14px' },
                        { value: '16px' },
                    ],
                },
                {
                    property: 'font-style',
                    values: [{ value: 'italic' }],
                },
                {
                    property: 'line-height',
                    values: [{ value: '1.75' }],
                },
                {
                    property: 'text-decoration',
                    values: [{ value: 'underline' }],
                },
                {
                    property: 'color',
                    values: [
                        { value: 'orange' },
                        { value: '#002f36' },
                        { value: '#008296' },
                        { value: '#c7511f' },
                        { value: '#f1f1f1' },
                    ],
                },
                {
                    property: 'background-color',
                    values: [
                        { value: '#f6f6f6' },
                        { value: '#1196ab' },
                        { value: '#c7511f' },
                        { value: '#f1f1f1' },
                    ],
                },
            ],
        },
        {
            type: 'layout',
            items: [
                {
                    property: 'display',
                    values: [
                        { className: 'flex', value: 'flex' },
                        { value: 'block' },
                    ],
                },
                { property: 'flex-direction', values: [{ value: 'column' }] },
                {
                    property: 'justify-content',
                    values: [
                        { value: 'center' },
                        { value: 'space-between', alias: 'sb' },
                    ],
                },
                {
                    property: 'align-items',
                    values: [{ value: 'center' }],
                },
                {
                    property: 'flex',
                    values: [{ className: 'flex-1', value: '1' }],
                },
            ],
        },
        {
            type: 'space',
            alias: 'sp',
            items: [
                {
                    property: 'padding-top',
                    alias: 'p-t',
                    values: [
                        { value: '10px' },
                        { value: '15px' },
                        { value: '20px' },
                    ],
                },
                {
                    property: 'padding-left',
                    alias: 'p-l',
                    values: [
                        { value: '10px' },
                        { value: '15px' },
                        { value: '20px' },
                    ],
                },
                {
                    property: 'margin-top',
                    values: [
                        { value: '10px' },
                        { value: '15px' },
                        { value: '20px' },
                    ],
                },
                {
                    property: 'margin-left',
                    values: [
                        { value: '10px' },
                        { value: '15px' },
                        { value: '20px' },
                    ],
                },
            ],
        },
    ],
};

export default CONFIG;

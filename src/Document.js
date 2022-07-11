import React, { useState } from 'react';
import { Divider, Radio, Anchor, Affix, Button, message } from 'antd';
import { cloneDeep } from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import 'antd/dist/antd.css';

import CONFIG from './config.mjs';

import './atomic.css';

const { SEPARATOR, VARIABLES } = CONFIG;

const preferencesMap = VARIABLES.reduce((acc, { type, alias, items }) => {
    acc[type] = { alias };

    items.forEach(({ property, alias, values }) => {
        acc[`${type}${SEPARATOR}${property}`] = { alias };

        values.forEach(({ className, alias, value }) => {
            acc[`${type}${SEPARATOR}${property}${SEPARATOR}${value}`] = {
                className,
                alias,
            };
        });
    });

    return acc;
}, {});

function App() {
    const [preferences, setPreferences] = useState(() =>
        VARIABLES.reduce((acc, { type, items }) => {
            items.forEach(({ property, values }) => {
                acc[type] = acc[type] ?? {};
                acc[type][property] = values[0]?.value;
            });

            return acc;
        }, {})
    );

    const onChange = (type, property, { target: { value: v } }) => {
        console.log('debug-onChange', type, property, v);

        const shadowCopyPreferences = cloneDeep(preferences);
        shadowCopyPreferences[type][property] = v;

        setPreferences(shadowCopyPreferences);
    };

    return (
        <div className="App" style={{ padding: 20 }}>
            <Affix>
                <h1 style={{ background: '#fff' }}>atomic css</h1>
            </Affix>

            <main style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    {VARIABLES.map(({ type, items }) => {
                        return (
                            <div key={type}>
                                <h3 id={type}>{type}</h3>
                                {items.map(({ property, values }) => {
                                    const value = preferences[type][property];
                                    const className =
                                        preferencesMap[
                                            `${type}${SEPARATOR}${property}${SEPARATOR}${value}`
                                        ].className;
                                    const aliasType =
                                        preferencesMap[type].alias;
                                    const aliasProperty =
                                        preferencesMap[
                                            `${type}${SEPARATOR}${property}`
                                        ].alias;
                                    const aliasValue =
                                        preferencesMap[
                                            `${type}${SEPARATOR}${property}${SEPARATOR}${value}`
                                        ].alias;
                                    const selector = className
                                        ? className
                                        : `${
                                              aliasType ? aliasType : type
                                          }${SEPARATOR}${
                                              aliasProperty
                                                  ? aliasProperty
                                                  : property
                                          }${SEPARATOR}${
                                              aliasValue ? aliasValue : value
                                          }`;

                                    return (
                                        <div
                                            key={property}
                                            style={{
                                                border: '1px solid rgba(0,0,0,.06)',
                                                borderRadius: 2,
                                                padding: 10,
                                                marginBottom: 10,
                                            }}>
                                            <h4
                                                id={`${type}${SEPARATOR}${property}`}>
                                                {property}
                                            </h4>
                                            <div>
                                                <Radio.Group
                                                    onChange={(v) =>
                                                        onChange(
                                                            type,
                                                            property,
                                                            v
                                                        )
                                                    }
                                                    value={
                                                        preferences?.[type]?.[
                                                            property
                                                        ]
                                                    }>
                                                    {values.map(({ value }) => {
                                                        return (
                                                            <Radio
                                                                value={value}
                                                                key={value}>
                                                                {property.includes(
                                                                    'color'
                                                                ) ? (
                                                                    <div
                                                                        style={{
                                                                            background:
                                                                                value,
                                                                            width: 15,
                                                                            height: 15,
                                                                            position:
                                                                                'relative',
                                                                            top: '0.2em',
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    value
                                                                )}
                                                            </Radio>
                                                        );
                                                    })}
                                                </Radio.Group>
                                            </div>

                                            <div
                                                style={{
                                                    marginTop: 10,
                                                    paddingTop: 10,
                                                    borderTop:
                                                        '1px dashed #ccc',
                                                }}>
                                                <CopyToClipboard
                                                    text={selector}
                                                    onCopy={() =>
                                                        message.info(`Copied!`)
                                                    }>
                                                    <Button size="small">
                                                        Copy Code
                                                    </Button>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    );
                                })}
                                <Divider />
                            </div>
                        );
                    })}
                </div>

                <Affix>
                    <div style={{ flex: 1, marginLeft: 40 }}>
                        <h2>Preview</h2>
                        <details>
                            <summary>
                                The following is the example attatched by
                                specific classnames on the left.
                            </summary>
                            <div>Here is the example.</div>
                        </details>

                        <div
                            style={{
                                marginTop: 20,
                                border: '1px solid #ccc',
                                borderRadius: 10,
                                height: 100,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'transparent',
                            }}>
                            <div
                                className={Object.entries(preferences).reduce(
                                    (accType, [type, properties]) => {
                                        const tmpType = Object.entries(
                                            properties
                                        ).reduce(
                                            (accProperty, [property, v]) => {
                                                const aliasType =
                                                    preferencesMap[type].alias;
                                                const aliasProperty =
                                                    preferencesMap[
                                                        `${type}${SEPARATOR}${property}`
                                                    ].alias;
                                                const aliasValue =
                                                    preferencesMap[
                                                        `${type}${SEPARATOR}${property}${SEPARATOR}${v}`
                                                    ].alias;
                                                const className =
                                                    preferencesMap[
                                                        `${type}${SEPARATOR}${property}${SEPARATOR}${v}`
                                                    ].className;

                                                const selector = `${
                                                    aliasType ? aliasType : type
                                                }${SEPARATOR}${
                                                    aliasProperty
                                                        ? aliasProperty
                                                        : property
                                                }${SEPARATOR}${
                                                    aliasValue ? aliasValue : v
                                                }`;

                                                const tmpProperty = `${
                                                    className
                                                        ? className
                                                        : selector
                                                }`;

                                                if (!accProperty) {
                                                    return tmpProperty;
                                                }

                                                return `${accProperty} ${tmpProperty}`;
                                            },
                                            ''
                                        );

                                        if (!accType) {
                                            return tmpType;
                                        }

                                        return `${accType} ${tmpType}`;
                                    },
                                    ''
                                )}>
                                Here is the example.
                            </div>
                        </div>
                    </div>
                </Affix>

                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Anchor>
                            {VARIABLES.map(({ type, items }) => (
                                <Anchor.Link
                                    key={type}
                                    href={`#${type}`}
                                    title={`${type}`}>
                                    {items.map(({ property }) => (
                                        <Anchor.Link
                                            key={property}
                                            href={`#${type}${SEPARATOR}${property}`}
                                            title={`${property}`}
                                        />
                                    ))}
                                </Anchor.Link>
                            ))}
                        </Anchor>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;

import CONFIG from './src/config.mjs';
import fs from 'fs';

const { SEPARATOR, VARIABLES } = CONFIG;

export const output = VARIABLES.reduce(
    (acc, { type, alias: aliasType, items }) => {
        acc += items.reduce(
            (accProperty, { property, alias: aliasProperty, values }) => {
                accProperty += values.map(
                    ({ className, value, alias: aliasValue }) => {
                        // TODO need to be optimized
                        const escapedValue = value.replace(/#/, '\\#');
                        const selector = `${
                            aliasType ? aliasType : type
                        }${SEPARATOR}${
                            aliasProperty ? aliasProperty : property
                        }${SEPARATOR}${aliasValue ? aliasValue : escapedValue}`;

                        return `.${className ? className : selector} \{
    ${property}: ${value};
}`;
                    }
                ).join(`

`);

                return (
                    accProperty +
                    `

`
                );
            },
            ''
        );

        return acc;
    },
    ''
);

fs.writeFile('./src/atomic.css', output, (err) => {
    if (err) {
        console.error(`oops: generate atomic css wrongly`, err);
    }
});

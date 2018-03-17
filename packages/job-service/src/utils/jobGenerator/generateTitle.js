const { random } = require('lodash');

const TITLE_LIST = [
    'UI',
    'Software',
    'Front End',
    'Back End',
    'JavaScript',
    'PHP',
    'Java',
    'React',
    'Support',
    'Full Stack'
];
const PREFIX_LIST = [
    'Junior',
    'Regular',
    'Senior',
    'Principal',
    ''
]
const POSTFIX_LIST = [
    'Engineer',
    'Developer',
    'Architect',
    'Manager'
]

function generateJobTitle() {
    const title = [
        PREFIX_LIST[random(PREFIX_LIST.length - 1)],
        TITLE_LIST[random(TITLE_LIST.length - 1)],
        POSTFIX_LIST[random(POSTFIX_LIST.length - 1)]
    ];
    return title    // ... => [ '', 'UI', 'Manager' ]
        .join(' ')  // [ '', 'UI', 'Manager' ] => ' UI Manager'
        .trim();    // ' UI Manager' => 'UI Manager'
}

module.exports = generateJobTitle;
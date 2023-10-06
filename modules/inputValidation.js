const inputRules = {
    'first-name': {
        required: true,
        max: 30
    },
    'last-name': {
        required: true,
        max: 30
    }, 
    'custom-pronoun': {
        required: false,
        max: 15
    },
    'email': {
        required: true,
        max: 50,
        format: 'insert regex'
    },
    'phone': {
        required: true,
        min: 4,
        max: 20,
        format: 'insert regex'
    },
    'placement': {
        max: 50
    },
    'width': {
        min: 0.5,
        max: 50,
        format: 'insert regex'
    },
    'height': {
        min: 0.5,
        max: 50,
        format: 'insert regex'
    },
    'pronoun': {
        required: true,
    },
    'coverup': {
        required: true,
    },
    'color': {
        required: true,
    },
    'file': {
        required: true,
        maxUploads: 5,
        maxSizePerFile: '3MB', // translate into num type
        format: 'insert regex'
    },
    'idea': {
        required: true,
        min: 20,
        max: 1000
    }
}

let errorMessage = '';

function inputValidation(input) {
    const type = input.getAttribute('type');
    const id = input.getAttribute('id');
    console.log(`type is ${type}, id is ${id}`);

    const hasProp = (prop, name = input.getAttribute('name')) => inputRules[name].hasOwnProperty(prop);
    const getProp = (prop, name = input.getAttribute('name')) => inputRules[name][prop];
    const setProp = (prop, value, name = input.getAttribute('name')) => inputRules[name][prop] = value;


    if (type === 'text' || type ===  'email' || type === 'tel' || id === 'idea') {
        const length = input.value.length;

        if (!hasProp('required')) { // dont think this is working but havent really checke too indepth
            return 'unset';
        } else if (hasProp('required') && !length) {
            errorMessage = `Please enter your`; // make a nice string based on name
        } else if (hasProp('max') && length > getProp('max')) {
            errorMessage = `Please enter less than ${getProp('max')} characters.`;
        } else if (hasProp('min') && length < getProp('min')) {
            errorMessage = `Please enter at least ${getProp('min')} characters.`;
        } else if (hasProp('format')) {
            return true; // testing purposes
            // calculate regex
        } else {
            return true;
        }
    } else if (type ===  'number') {
        const value = input.value;

        if (hasProp('max') && value > getProp('max')) {
            errorMessage = `Please enter less than ${getProp('max')} inches.`;
        } else if (hasProp('min') && value < getProp('min')) {
            errorMessage = `Please enter at  least ${getProp('min')} inches.`;
        } else if (hasProp('format')) { 
            return true; // testing purposes
            // calculate regex
        } else {
            return true;
        }
    } else if (type === 'radio' || type === 'checkbox') {
        const name = input.getAttribute('name');
        const isChecked = input.checked;

        const allOptions = Array.from(document.querySelectorAll(`input[name="${name}"]`));
        const checkedValues = allOptions.filter(item => item.checked === true);

        if (type === 'radio' && checkedValues < 1) {
            errorMessage = 'Please choose an option.';
        } else if (type === 'checkbox' && checkedValues < 1) {
            errorMessage = 'Please choose at least 1 option.';
        } else {            
            if (id === 'custom' && !isChecked) {
                console.log('custom checkbox is unchecked');
                setProp('required', false, 'custom-pronoun');
                document.querySelector('#custom-pronoun').removeAttribute('required');
            } else if (id === 'custom' && isChecked) {
                setProp('required', true, 'custom-pronoun');
                document.querySelector('#custom-pronoun').setAttribute('required', true);
            }
            return true;
        }
    } else if (type === 'file') {
        return true; // tbd
    }
}


function toggleUI(input) {
    const isValid = inputValidation(input);

    if (isValid === 'unset') {
        input.classList.remove('error');
        input.classList.remove('success');
    } else if (isValid === true) {
        input.classList.add('success');
        input.classList.remove('error');
    } else {
        input.classList.remove('success');
        input.classList.add('error');
        // const errorMessage = inputRules[name]['errorMessage'];
        }
}

export { inputRules, inputValidation, toggleUI };
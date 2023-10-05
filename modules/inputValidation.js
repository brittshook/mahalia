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

/*

const hasProp = (prop) => {
  return inputRules[name].hasOwnProperty(prop);
};

const getProp = (prop, name = input.getAttribute('name')) => {
  return inputRules[name][prop];
};

// Now you can use the functions to check and set properties
if (hasProp('isValid')) {
  // If 'isValid' property exists for the input, you can set it to false
  getProp('isValid') = false; // This should be assigned to the correct value.
}*/

function inputValidation(input) {
    const type = input.getAttribute('type');

    const hasProp = (prop, name = input.getAttribute('name')) => inputRules[name].hasOwnProperty(prop);
    const getProp = (prop, name = input.getAttribute('name')) => inputRules[name][prop];
    const setProp = (prop, value, name = input.getAttribute('name')) => { inputRules[name][prop] = value; }
    const errorMessage = (value) => { setProp('errorMessage', value); }

    setProp('isValid', false);

    if (type === 'text' || type ===  'email' || type === 'tel' || name === 'idea') {
        const length = input.value.length;

        if (hasProp('required') && !length) {
            errorMessage(`Please enter your`); // make a nice string based on name
        } else if (hasProp('max') && length > getProp('max')) {
            errorMessage(`Please enter less than ${getProp('max')} characters.`);
        } else if (hasProp('min') && length < getProp('min')) {
            errorMessage(`Please enter at least ${getProp('min')} characters.`);
        } else if (hasProp('format')) {
            setProp('isValid', true); // testing purposes
            // calculate regex
        } else {
            setProp('isValid', true);
        }
    } else if (type ===  'number') {
        const value = input.value;

        if (hasProp('max') && value > getProp('max')) {
            errorMessage(`Please enter less than ${getProp('max')} inches.`);
        } else if (hasProp('min') && value < getProp('min')) {
            errorMessage(`Please enter at  least ${getProp('min')} inches.`);
        } else if (hasProp('format')) { 
            setProp('isValid', true); // testing purposes
            // calculate regex
        } else {
            setProp('isValid', true);
        }
    } else if (type === 'radio' || type === 'checkbox') {
        const id = input.getAttribute('id');
        const name = input.getAttribute('name');
        const isChecked = input.getAttribute('checked'); 

        const allOptions = Array.from(document.querySelectorAll(`input[name="${name}"]`));
        const checkedValues = allOptions.filter(item => item.checked === true);

        if (type === 'radio' && checkedValues < 1) { // logic is not correct
            errorMessage('Please choose an option.');
        } else if (type === 'checkbox' && checkedValues < 1) {
            errorMessage('Please choose at least 1 option.');
        } else {
            setProp('isValid', true);

            if (id === 'custom-pronoun' && isChecked) {
                getProp('required', 'custom-pronoun') = true;
            }
        }
    } else if (type === 'file') {
        setProp('isValid', true);
        // tbd
    }
}

function toggleValidationUI(input) {
    const name = input.getAttribute('name');
    const isValid = inputRules[name]['isValid'];

    if (isValid) {
        input.classList.add('success');
        input.classList.remove('error');
    } else {
        input.classList.remove('success');
        input.classList.add('error');
        // const errorMessage = inputRules[name]['errorMessage'];
    }
}

export { inputRules, inputValidation, toggleValidationUI };
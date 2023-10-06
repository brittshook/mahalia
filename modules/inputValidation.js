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
        required: true,
        max: 50
    },
    'width': {
        required: true,
        min: 0.5,
        max: 50,
        format: 'insert regex'
    },
    'height': {
        required: true,
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
    console.log(`type is ${type}, id is ${id}, name is ${input.getAttribute('name')}, checked is ${input.checked}`);
    console.log(inputRules[input.getAttribute('name')]);

    const hasProp = (prop, name = input.getAttribute('name')) => inputRules[name].hasOwnProperty(prop);
    const getProp = (prop, name = input.getAttribute('name')) => inputRules[name][prop];
    const setProp = (prop, value, name = input.getAttribute('name')) => inputRules[name][prop] = value;


    if (type === 'text' || type ===  'email' || type === 'tel' || id === 'idea') {
        const length = input.value.length;

        if (getProp('required') && !length) {
            errorMessage = `Please enter your`; // make a nice string based on name
        } else if (hasProp('max') && length > getProp('max')) {
            errorMessage = `Please enter less than ${getProp('max')} characters.`;
        } else if (hasProp('min') && length < getProp('min')) {
            errorMessage = `Please enter at least ${getProp('min')} characters.`;
        } else if (hasProp('format')) {
            return true; // testing purposes
            // calculate regex
        } else {
            if (!getProp('required')) { 
                setProp('unset', true);
            }
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

        if (id === 'custom') {
            const customTextField = document.querySelector('#custom-pronoun');

            if (!isChecked) {
                setProp('required', false, 'custom-pronoun');
                setProp('unset', true, 'custom-pronoun');
                customTextField.removeAttribute('required');
                toggleInputUI(customTextField);
            } else if (isChecked) {
                setProp('required', true, 'custom-pronoun');
                setProp('unset', false, 'custom-pronoun');
                customTextField.setAttribute('required', 'true')
            }
        }

        if (type === 'radio' && checkedValues < 1) {
            errorMessage = 'Please choose an option.';
        } else if (type === 'checkbox' && checkedValues < 1) {
            errorMessage = 'Please choose at least 1 option.';
        } else {
            return true;
        }
    } else if (type === 'file') {
        return true; // tbd
    }
}


function toggleInputUI(input) {
    const isValid = inputValidation(input);
    const unset = inputRules[input.getAttribute('name')]['unset'];

    if (unset) {
        input.classList.remove('error');
        input.classList.remove('success');
    } else if (isValid) {
        input.classList.add('success');
        input.classList.remove('error');
    } else {
        input.classList.remove('success');
        input.classList.add('error');
        // const errorMessage = inputRules[name]['errorMessage'];
        }
}

export { inputRules, inputValidation, toggleInputUI };
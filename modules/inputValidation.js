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
        format: 'email'
    },
    'phone': {
        required: true,
        min: 4,
        max: 20,
        format: 'phone'
    },
    'placement': {
        required: true,
        max: 50
    },
    'width': {
        required: true,
        min: 0.5,
        max: 50,
    },
    'height': {
        required: true,
        min: 0.5,
        max: 50,
    },
    'pronouns': {
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
    const value = input.value;

    const hasProp = (prop, name = input.getAttribute('name')) => inputRules[name].hasOwnProperty(prop);
    const getProp = (prop, name = input.getAttribute('name')) => inputRules[name][prop];
    const setProp = (prop, value, name = input.getAttribute('name')) => inputRules[name][prop] = value;

    if (type === 'text' || type ===  'email' || type === 'tel' || id === 'idea') {
        const length = value.length;

        if (getProp('required') && !length) {
            const label = input.parentNode;
            errorMessage = `Please enter your ${label.innerText.toLowerCase()}`;
        } else if (hasProp('max') && length > getProp('max')) {
            errorMessage = `Please enter less than ${getProp('max')} characters.`;
        } else if (hasProp('min') && length < getProp('min')) {
            errorMessage = `Please enter at least ${getProp('min')} characters.`;
        } else if (hasProp('format')) {
            let regex;
            if (getProp('format') === 'email') {
                regex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
                errorMessage = 'Please enter a valid email address.';
            } else if (getProp('format') === 'phone') {
                regex = /^(?:[+\d()\s-]*\d[+\d()\s-]*)*(?:(?:\s?(?:ext|x)\.?\s?)?\d+)?$/; // TODO: test international numbers
                errorMessage = 'Please enter a valid phone number.';
            } 
            
            return regex.test(value);
        } else {
            if (!getProp('required')) { 
                setProp('unset', true);
            }
            return true;
        }
    } else if (type ===  'number') {
        if (getProp('required') && !length) {
            const label = input.parentNode;
            errorMessage = `Please select the number of ${label.innerText.toLowerCase()}`;
        } else if (hasProp('max') && value > getProp('max')) {
            value = getProp('max');
        } else if (hasProp('min') && value < getProp('min')) {
            value = getProp('min');
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
                // if custom prounoun checkbox is NOT checked, do NOT require the custom pronoun text field
                setProp('required', false, 'custom-pronoun');
                customTextField.removeAttribute('required');

                // reset if filled
                setProp('unset', true, 'custom-pronoun');
                customTextField.setAttribute('placeholder', 'Write My Own')

                // disable text field 
                customTextField.setAttribute('disabled', 'true');

                console.log(customTextField.getAttribute('value'));
                toggleInputUI(customTextField);
            } else if (isChecked) {
                // require custom pronoun text field if custom pronoun checkbox is checked
                setProp('required', true, 'custom-pronoun');
                customTextField.setAttribute('required', 'true')

                setProp('unset', false, 'custom-pronoun');

                // enable text field
                customTextField.removeAttribute('disabled');
            }
        }

        if (type === 'radio' && checkedValues < 1) {
            errorMessage = 'Please choose an option.';
        } else if (type === 'checkbox' && checkedValues < 1) {
            errorMessage = `Please select your ${name.toLowerCase()}`;
        } else {
            return true;
        }
    } else if (type === 'file') {
        if (!value) {
            errorMessage = 'Please upload your reference photos.';
        } else {
        return true;
        }
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
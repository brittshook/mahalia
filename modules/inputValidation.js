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
        max: 5,
        sizeMax: 10485760 // in bytes
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
    let value = input.value;

    const hasProp = (prop, name = input.getAttribute('name')) => inputRules[name].hasOwnProperty(prop);
    const getProp = (prop, name = input.getAttribute('name')) => inputRules[name][prop];
    const setProp = (prop, value, name = input.getAttribute('name')) => inputRules[name][prop] = value;

    if (type === 'text' || type ===  'email' || type === 'tel' || id === 'idea') {
        input.value = value.trim();
        const length = value.length;
        if (getProp('required') && !length) {
            const label = input.parentNode;
            errorMessage = `Please enter your ${label.innerText.toLowerCase()}`;
        } else if (hasProp('max') && length > getProp('max')) {
            value = value.slice(0, getProp('max'));
        } else if (hasProp('min') && length < getProp('min')) {
            errorMessage = `Please enter at least ${getProp('min')} characters.`;
        } else if (hasProp('format')) {
            let regex;
            if (getProp('format') === 'email') {
                regex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
                errorMessage = 'Please enter a valid email address in the format yourname@example.com';
            } else if (getProp('format') === 'phone') {
                regex = /^(?:[+\d()\s-]*\d[+\d()\s-]*)*(?:(?:\s?(?:ext|x)\.?\s?)?\d+)?$/; // TODO: test international numbers
                errorMessage = 'Please enter a valid phone number in the format: (123) 456-7890';
            } 
            
            return regex.test(value);
        } else {
            if (!getProp('required')) { 
                setProp('unset', true);
            }
            return true;
        }
    } else if (type ===  'number') {
        const label = input.parentNode;

        if (getProp('required') && !value) {
            errorMessage = `Please select the number of ${label.innerText.toLowerCase()}`;
        } else if (hasProp('max') && value > getProp('max')) {
            errorMessage = `Please enter no more than ${getProp('max')} ${label.innerText.toLowerCase()}`;
        } else if (hasProp('min') && value < getProp('min')) {
            errorMessage = `Please enter at least ${getProp('min')} ${label.innerText.toLowerCase()}`;
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
        const files = input.files;
        const length = files.length;

        if (!length) {
            errorMessage = 'Please upload your reference photos';
            console.log(errorMessage);
        } else if (length > getProp('max')) {
            errorMessage = `Please upload no more than ${getProp('max')} photos`;
            console.log(errorMessage);
        } else {
            let validType = true;
            let validSize = true;

            for (const file of files) {
                if (!file.type.includes('pdf') && !file.type.startsWith("image/")) {
                    validType = false;
                    break;
                }

                if (file.size >= getProp('sizeMax')) {
                    validSize = false;
                    break;
                }
            }
            
            if (!validType) {
                errorMessage = 'Please upload image or PDF files.'
                console.log(errorMessage);
            } else if (!validSize) {
                errorMessage = 'Files must be less than 10 MB each.'
                console.log(errorMessage);
            } else {
                return true;
            }
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
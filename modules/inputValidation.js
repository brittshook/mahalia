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
        formatRegex: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
        formatErrorMessage: 'Enter your email address in the format: name@example.com'
    },
    'phone': {
        required: true,
        min: 4,
        max: 20,
        formatRegex: /^(?:[+\d()\s-]*\d[+\d()\s-]*)*(?:(?:\s?(?:ext|x)\.?\s?)?\d+)?$/,
        formatErrorMessage: 'Enter your phone number in the format: (123) 456-7890'
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
        sizeMaxInBytes: 10485760,
        formatRegex: /^(image\/.*|.*pdf)/,
        formatErrorMessage: 'Please upload image or PDF files.',
        sizeErrorMessage: 'Files must be less than 10 MB each.'
    },
    'idea': {
        required: true,
        min: 20,
        max: 1000
    }
}

// 
function trimInput(input) {
    input.value = input.value.trim();
}

function cleanNumInput(input) {
    input.value = parseFloat(input.value).toFixed(1);
}

function validateText(input, value = input.value) {
    trimInput(input);

    const length = value.length;
    const label =
        input.name === 'custom-pronoun'
            ? 'own pronouns'
            : input.name === 'idea'
            ? 'tattoo idea'
            : input.closest('label').innerText;
    const regex = inputRules[input.name].formatRegex;

    if (inputRules[input.name].required) {
        if (length === 0) {
            return `Enter your ${label.toLowerCase()}`;
        }

        if (inputRules[input.name].min && length < inputRules[input.name].min) {
            return `Enter at least ${inputRules[input.name].min} characters`;
        }
        
        if (inputRules[input.name].max && length > inputRules[input.name].max) {
            return `Enter no more than ${inputRules[input.name].max} characters`;
        }
        
        if (inputRules[input.name].formatRegex && !regex.test(value)) {
            return inputRules[input.name].formatErrorMessage;
        } 
    }

    return null;
}

function validateNumber(input, value = input.value) {
    trimInput(input);
    cleanNumInput(input);

    const label = input.closest('label').innerText;

    if (inputRules[input.name].required) {
        if(!value) {
            return `Select the number of ${label.toLowerCase()}`;
        }

        if (inputRules[input.name].min && value < inputRules[input.name].min) {
            return `Must be at least ${inputRules[input.name].min} inches`;
        }

        if (inputRules[input.name].max && value > inputRules[input.name].max) {
            return `Cannot be more than ${inputRules[input.name].max} inches`;
        }
    }

    return null;
}

function validateRadioCheckbox(input, type = input.type, id = input.id, name = input.name) {
    const isChecked = input.checked;
    const allOptions = Array.from(document.querySelectorAll(`input[name="${name}"]`));
    const checkedValues = allOptions.filter((item) => item.checked === true);

    if (id === 'custom') {
        const customTextField = document.querySelector('#custom-pronoun');

        if (!isChecked) {
            // Do not require custom pronoun text field
            inputRules['custom-pronoun'].required = false;
            customTextField.removeAttribute('required');

            // Reset & disable if filled
            inputRules['custom-pronoun'].unset = true;
            customTextField.value = '';
            customTextField.setAttribute('placeholder', 'Write My Own')
            customTextField.setAttribute('disabled', 'true');

            toggleInputUI(customTextField);
        } else if (isChecked) {
             // Require custom pronoun text field
             inputRules['custom-pronoun'].required = true;
             customTextField.setAttribute('required', 'true');

             inputRules['custom-pronoun'].unset = false;
             customTextField.removeAttribute('disabled');
        }
    }
    
    if (type === 'radio' && checkedValues < 1) {
        return 'Please choose an option.';
    }
    
    if (type === 'checkbox' && checkedValues < 1) {
        return `Please select your ${name.toLowerCase()}`;
    }

    return null;
}

function validateFile(input, files = input.files) {
    const length = files.length;
    const regex = inputRules[input.name].formatRegex;

    if (length === 0) {
        return 'Please upload your reference photos';
    }

    if (length > inputRules[input.name].max) {
        return `Please upload no more than ${inputRules[input.name].max} photos`;
    }

    for (const file of files) {
        if (!regex.test(file.type)) {
            return inputRules[input.name].formatErrorMessage;
        }

        if (file.size >= inputRules[input.name].sizeMaxInBytes) {
            return inputRules[input.name].sizeErrorMessage;
        }
    }

    return null;
}

function updateErrorMessage(input, errorMessage) {
    const type = input.type;

    let container = input.closest('.field');
    let errorMessageElement = container.querySelectorAll('p.error, span.error')[0];

    if (errorMessage) {
        if (!errorMessageElement) {
            let newErrorMessageElement;

            if (type === file) {
                container = container.querySelector('div.error');
                newErrorMessageElement = document.createElement('span');
            } else {
                newErrorMessageElement = document.createElement('p');
            }
    
            newErrorMessageElement.classList.add('error');
            newErrorMessageElement.textContent = errorMessage;
            container.appendChild(newErrorMessageElement);
        } else {
            errorMessageElement.textContent = errorMessage;
        }
    } else if (errorMessageElement) {
        errorMessageElement.textContent = ''; // Clear the error message
        errorMessageElement.remove();
    }
}

function inputValidation(input, type = input.type, id = input.id) {
    let errorMessage = null;

    if (type === 'text' || type ===  'email' || type === 'tel' || id === 'idea') {
        errorMessage = validateText(input);
    } else if (type === 'number') {
        errorMessage = validateNumber(input);
    } else if (type === 'radio' || type === 'checkbox') {
        errorMessage = validateRadioCheckbox(input);
    } else if (type === 'file') {
        errorMessage = validateFile(input);
    }

    if (errorMessage) {
        return { isValid: false, errorMessage};
    } else {
        return { isValid: true };
    }
}

function toggleInputUI(input) {
    const { isValid, errorMessage } = inputValidation(input);
    const unset = inputRules[input.name].unset;
    updateErrorMessage(input, errorMessage);

    if (unset) {
        input.classList.remove('success');
        input.classList.remove('error');
    } else if (isValid) {
        input.classList.add('success');
        input.classList.remove('error');
    } else {
        input.classList.remove('success');
        input.classList.add('error');
    }
}

function resetFormUI(input) {
    updateErrorMessage(input, '');
    input.classList.remove('success');
    input.classList.remove('error');
}

export { inputRules, inputValidation, toggleInputUI, resetFormUI };
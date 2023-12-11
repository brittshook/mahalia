import { updateFileLabel } from "./fileDragAndDrop.js";

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
        min: 1,
        max: 50,
    },
    'height': {
        required: true,
        min: 1,
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
        formatRegex: /^(image\/.*)/,
        formatErrorMessage: 'Please upload image files only.',
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
    input.value = parseFloat(input.value).toFixed(0);
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
        } else if (inputRules[input.name].min && length < inputRules[input.name].min) {
            return `Enter at least ${inputRules[input.name].min} characters`;
        } else if (inputRules[input.name].max && length > inputRules[input.name].max) {
            return `Enter no more than ${inputRules[input.name].max} characters`;
        } else if (inputRules[input.name].formatRegex && !regex.test(value)) {
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
        } else if (inputRules[input.name].min && value < inputRules[input.name].min) {
            return `Must be at least ${inputRules[input.name].min} inches`;
        } else if (inputRules[input.name].max && value > inputRules[input.name].max) {
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
            inputRules['custom-pronoun'].required = false;
            inputRules['custom-pronoun'].unset = true;
            customTextField.required = false;
            customTextField.disabled = true;
            customTextField.value = '';
            customTextField.placeholder = 'Write My Own';
            toggleInputUI(customTextField);
        } else if (isChecked) {
             inputRules['custom-pronoun'].required = true;
             inputRules['custom-pronoun'].unset = false;
             customTextField.required = true;
             customTextField.disabled = false;
        }
    }
    
    if (type === 'radio' && checkedValues < 1) {
        return 'Please choose an option.';
    } else if (type === 'checkbox' && checkedValues < 1) {
        return `Please select your ${name.toLowerCase()}`;
    }

    return null;
}

function validateFile(input, files = input.files) {
    const length = files.length;
    const regex = inputRules[input.name].formatRegex;

    if (length === 0) {
        return 'Please upload your reference photos';
    } else if (length > inputRules[input.name].max) {
        return `Please upload no more than ${inputRules[input.name].max} photos`;
    }

    for (const file of files) {
        if (!regex.test(file.type)) {
            return inputRules[input.name].formatErrorMessage;
        } else if (file.size >= inputRules[input.name].sizeMaxInBytes) {
            return inputRules[input.name].sizeErrorMessage;
        }
    }

    return null;
}

function updateErrorMessage(input, errorMessage) {
    const container = input.closest('.field');
    let errorMessageElement = container.querySelector('p.error');

    if (errorMessage) {
        if (!errorMessageElement) {
            errorMessageElement = document.createElement('p');
            errorMessageElement.classList.add('error');
            container.appendChild(errorMessageElement);
        }    
        errorMessageElement.textContent = errorMessage;
    } else if (!errorMessage && errorMessageElement) {
        errorMessageElement.textContent = '';
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

        if (input.type === 'file') {
            input.value = '';
        }
    }

    updateFileLabel();
}

function resetFormUI(input) {
    updateErrorMessage(input, '');
    input.classList.remove('success');
    input.classList.remove('error');
}

export { inputRules, inputValidation, toggleInputUI, resetFormUI, validateFile };
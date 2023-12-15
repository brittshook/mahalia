import { updateFileLabel } from "./fileDragAndDrop.js";

const customValidations = {
    'email': {
        regex: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
        formatErrorMessage: 'Enter your email address in the format: name@example.com'
    },
    'phone': {
        regex: /^(?:[+\d()\s-]*\d[+\d()\s-]*)*(?:(?:\s?(?:ext|x)\.?\s?)?\d+)?$/,
        formatErrorMessage: 'Enter your phone number in the format: (123) 456-7890'
    },
    'custom-pronoun': {
        unset: true
    },
    'file': {
        max: 5,
        sizeMaxInBytes: 10485760,
        formatRegex: /^(image\/.*)/,
        sizeErrorMessage: 'Files must be less than 10 MB each.',
        formatErrorMessage: 'Please upload image files only.'
    }
}

function inputValidation(input, type = input.type) {
    const validationFuncs = {
        text: validateText,
        email: validateText,
        tel: validateText,
        textarea: validateText,
        number: validateNumber,
        radio: validateRadioCheckbox,
        checkbox: validateRadioCheckbox,
        file: validateFile
    }

    cleanInput(input);
    return validationFuncs[type ? type : 'textarea'](input);
}

function toggleInputUI(input) {
    const isValid = inputValidation(input);
    const unset = (customValidations[input.name]?.unset !== undefined)
        ? customValidations[input.name].unset
        : false;
    displayErrorMessage(input);

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

function cleanInput(input, type = input.type) {
    if (type === 'file') {
        return;
    }

    input.value = input.value.trim();

    if (input.type === 'number' && input.value) {
        input.value = parseFloat(input.value).toFixed(0);
    }
}

function validateText(input, value = input.value) {    
    const validityState = input.validity;
    const label =
        input.name === 'custom-pronoun'
            ? 'own pronouns'
            : input.name === 'idea'
            ? 'tattoo idea'
            : input.closest('label').innerText;
    const regex = (customValidations[input.name]?.regex !== undefined)
        ? customValidations[input.name].regex
        : null;

    if (input.required) {
        if (validityState.valueMissing) {
            input.setCustomValidity(`Enter your ${label.toLowerCase()}`);
        } else if (validityState.tooShort || value.length < input.minLength) {
            input.setCustomValidity(`Enter at least ${input.minLength} characters`);
        } else if (validityState.tooLong || value.length > input.maxLength) {
            input.setCustomValidity(`Enter no more than ${input.maxLength} characters`);
        } else if (validityState.typeMismatch || (regex && !regex.test(value))) {
            input.setCustomValidity(customValidations[input.name].formatErrorMessage);
        } else {
            input.setCustomValidity('');
        }
    }

    return input.checkValidity();
}

function validateNumber(input) {
    const validityState = input.validity;
    const label = input.closest('label').innerText;

    if (input.required) {
        if(validityState.valueMissing) {
            input.setCustomValidity(`Enter number of ${label.toLowerCase()}`);
        } else if (validityState.rangeUnderflow) {
            input.setCustomValidity(`Must be at least ${input.min} inches`);
        } else if (validityState.rangeOverflow) {
            input.setCustomValidity(`Cannot be more than ${input.max} inches`);
        } else {
            input.setCustomValidity('');
        }
    }

    return input.checkValidity();
}

function validateRadioCheckbox(input, type = input.type, id = input.id, name = input.name) {
    const isChecked = input.checked;
    const optionElements = document.querySelectorAll(`input[name="${name}"]`);
    const allOptions = Array.from(optionElements);
    const checkedValues = allOptions.filter((item) => item.checked === true);

    if (id === 'custom') {
        const customTextField = document.getElementById('custom-pronoun');

        if (!isChecked) {
            customValidations['custom-pronoun'].unset = true;         
            customTextField.required = false;
            customTextField.disabled = true;
            customTextField.value = '';
            customTextField.placeholder = 'Write My Own';
            toggleInputUI(customTextField);
        } else {
            customValidations['custom-pronoun'].unset = false;
            customTextField.required = true;
            customTextField.disabled = false;
        }
    }
    
    if (type === 'radio' && checkedValues < 1) {
        input.setCustomValidity('Please choose an option.');
    } else if (type === 'checkbox' && checkedValues < 1) {
        input.setCustomValidity(`Please select your ${name.toLowerCase()}`);
    } else {
        input.setCustomValidity('');
    }

    return input.checkValidity();
}

function validateFile(input, files = input.files) {
    const regex = customValidations[input.name].formatRegex;
    const validityState = input.validity;

    if (validityState.valueMissing) {
        input.setCustomValidity('Please upload your reference photos');
    } else if (files.length > customValidations[input.name].max) {
        input.value = '';
        input.setCustomValidity(`Please upload no more than ${customValidations[input.name].max} photos`);
    }

    for (const file of files) {
        if (!regex.test(file.type)) {
            input.value = '';
            input.setCustomValidity(customValidations[input.name].formatErrorMessage);
        } else if (file.size >= customValidations[input.name].sizeMaxInBytes) {
            input.value = '';
            input.setCustomValidity(customValidations[input.name].sizeErrorMessage);
        } else {
            input.setCustomValidity('');
        }
    }

    updateFileLabel();
    return input.checkValidity();
}

function displayErrorMessage(input) {
    const container = input.closest('.field');
    let errorMessageElement = container.querySelector('p.error');

    if (input.validationMessage) {
        if (!errorMessageElement) {
            errorMessageElement = document.createElement('p');
            errorMessageElement.classList.add('error');
            container.appendChild(errorMessageElement);
        }    
        errorMessageElement.textContent = input.validationMessage;
    } else if (!input.validationMessage && errorMessageElement) {
        errorMessageElement.remove();
    }
}

export { inputValidation, toggleInputUI, validateFile, displayErrorMessage };
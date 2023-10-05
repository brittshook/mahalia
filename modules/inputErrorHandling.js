// page 1 = validate length of first/last name, validate email charracters, validate telephone length and digits and + or - only)
// page 2 = validate length of placement area, validate entry to approx size
// page 3 = validate # of files, file kind, and file size
// page 4 = validate length of textarea
// page 2 & 3 = validate checkbox/radio is completed


// if field 
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
        max: 50
    },
    'height': {
        min: 0.5,
        max: 50
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
function inputValidation(input) {
    // check what kind of input it is
    let isValid = false;
    let errorMessage = '';
    const type = input.getAttribute('type');
    const name = input.getAttribute('name');

    if (type === 'text' || type ===  'email' || type === 'tel' || name === 'idea') {
        const value = input.value; 
        const length = value.length;

        if (inputRules.name.hasOwnProperty('required') && (!length)) {
            errorMessage = `Please enter your`; // make a nice string based on name
        } else if (inputRules.name.hasOwnProperty('max') && (length > inputRules.name.max)) {
            errorMessage = `Please enter less than ${inputRules.name.max} characters.`;
        } else if (inputRules.name.hasOwnProperty('min') && (length < inputRules.name.min)) {
            errorMessage = `Please enter at least ${inputRules.name.max} characters.`;
        } else if (inputRules.name.hasOwnProperty('format')) {
            // calculate regex
        } else {
            isValid = true;
        }
    } else if (type ===  'number') {
        const value = input.value;

        if (inputRules.name.hasOwnProperty('max') && (value > inputRules.name.max)) {
            errorMessage = `Please enter less than ${inputRules.name.max} inches.`;
        } else if (inputRules.name.hasOwnProperty('min') && (value < inputRules.name.min)) {
            errorMessage = `Please enter at  least ${inputRules.name.mn} inches.`;
        } else {
            isValid = true;
        }
    } else if (type === 'radio') {
        // ELSE IF checkbox or radio THEN check if the checkbox or any with the same name are checked
    } else if (type === 'checkbox') {
        // ELSE IF checkbox or radio THEN check if the checkbox or any with the same name are checked
        // AND IF checkbox for custom pronouuns text bbox is checked then add required prop to custom prnouns textbox
    } else if (type === 'file') {
        // tbd
    }
}


if (pageNumber > 0) {
    const pages = document.querySelectorAll('.start-page, .form-page, .success-page');

    const allInputs = Array.from(pages[pageNumber].querySelectorAll('input[required], textarea[required], .options'));
    const fieldInputs = Array.from(pages[pageNumber].querySelectorAll('input[required], textarea[required]'));
    const optionInputs = Array.from(pages[pageNumber].querySelectorAll('input[type="checkbox"], input[type="radio"]'));

    const nextPageButton = pages[pageNumber].querySelector('.next-page');
    
    const fieldInputsCompleted = fieldInputs.filter(input => input.value.trim() !== '' || input.checked);
    const optionInputsCompleted = optionInputs.filter(input => input.checked);

    if (fieldInputsCompleted.length + optionInputsCompleted.length >= allInputs.length) {
        nextPageButton.removeAttribute('disabled');
    } else {
        nextPageButton.setAttribute('disabled', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputElements = document.querySelectorAll('input[required], input[type="checkbox"], input[type="radio"], textarea[required]');
    inputElements.forEach(input => {
        input.addEventListener('input', () => {


        });
    })
    
});
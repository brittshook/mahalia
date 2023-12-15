const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
const radioInputs = document.querySelectorAll('input[type="radio"]');

checkboxInputs.forEach(input => {
    input.addEventListener('click', () => {
        changeOptionInput(input, 'toggle');
    });

    const checkboxContainers = document.querySelectorAll('.checkbox-container');
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                if (input.classList.contains('error')) {
                    checkboxContainers.forEach(container => container.classList.add('error'));
                } else {
                    checkboxContainers.forEach(container => container.classList.remove('error'));
                }
            }
        })
    })
    const config = { attributes: true };
    observer.observe(input, config);
});

radioInputs.forEach(newInput => {
    newInput.addEventListener('click', () => {
        radioInputs.forEach(currentInput => {
            if (currentInput !== newInput && currentInput.name === newInput.name) {
                changeOptionInput(currentInput, 'remove');
            }
        })
        changeOptionInput(newInput, 'add');
    });

    const radioContainer = newInput.previousElementSibling;
    const allOptions = newInput.closest('.options');
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                if (newInput.classList.contains('error')) {
                    radioContainer.classList.add('error');
                } else {
                    const radioContainers = allOptions.querySelectorAll('.radio-container');
                    radioContainers.forEach(container => container.classList.remove('error'));
                }
            }
        })
    })
    const config = { attributes: true };
    observer.observe(newInput, config);
});

function changeOptionInput(input, action) {
    const optionUI = input.previousElementSibling.querySelector('.circle, .checkmark');

    if (action === 'toggle') {
        optionUI.classList.toggle('checked');
    } else if (action === 'add') {
        optionUI.classList.add('checked');
    } else if (action === 'remove') {
        optionUI.classList.remove('checked');
    }
}

export { changeOptionInput };
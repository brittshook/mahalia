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

document.addEventListener('DOMContentLoaded', () => {
    const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
    const radioInputs = document.querySelectorAll('input[type="radio"]');

    checkboxInputs.forEach(input => {
        input.addEventListener('click', () => {
            changeOptionInput(input, 'toggle');
        });
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
    });
});

export { changeOptionInput };
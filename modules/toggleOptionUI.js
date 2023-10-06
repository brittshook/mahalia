function changeOptionInput(input, action) {
    const getID = input.getAttribute('id');
    const fill = document.querySelector(`label[for="${getID}"] .checked, label[for="${getID}"] .filled`);

    if (action === 'toggle') {
        fill.classList.toggle('revealed');
    } else if (action === 'add') {
        fill.classList.add('revealed');
    } else if (action === 'remove') {
        fill.classList.remove('revealed');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const checkboxInputs = document.querySelectorAll('input[type="checkbox"]')
    const radioInputs = document.querySelectorAll('input[type="radio"]');

    checkboxInputs.forEach(input => {
        input.addEventListener('click', () => {
            changeOptionInput(input, 'toggle');
        });
    });

    radioInputs.forEach(newInput => {
        newInput.addEventListener('click', () => {
            radioInputs.forEach(currentInput => {
                if (currentInput !== newInput) {
                    if (currentInput.getAttribute('name') === newInput.getAttribute('name')) {
                        changeOptionInput(currentInput, 'remove');
                    }
                }
            })
            changeOptionInput(newInput, 'add');
        });
    });
});

export { changeOptionInput };
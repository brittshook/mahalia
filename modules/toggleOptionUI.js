function changeOptionInput(input, action) {
    const fill = input.querySelector('.checked, .filled');

    if (action === 'toggle') {
        fill.classList.toggle('revealed');
    } else if (action === 'add') {
        fill.classList.add('revealed');
    } else if (action === 'remove') {
        fill.classList.remove('revealed');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const checkboxInputs = document.querySelectorAll('.checkbox')
    const radioInputs = document.querySelectorAll('.radio');

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
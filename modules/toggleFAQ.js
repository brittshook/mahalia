function toggleFAQ(question, answer) {
    question.classList.toggle('revealed');
    const icon = question.querySelector('i');
    icon.classList.toggle('revealed');

    answer.classList.toggle('revealed');
}

document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            questions.forEach(current => {
                if (current !== question) {
                    const answer = current.querySelector('.answer');
                    if (answer.classList.contains('revealed')) {
                        toggleFAQ(current, answer);
                    }
                }
            });

            const answer = question.querySelector('.answer');
            toggleFAQ(question, answer);
        });
    });
});

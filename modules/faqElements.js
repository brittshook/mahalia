const template = document.getElementById('faq-template');
const faqTemplate = template.content.cloneNode(true);
const faqContainer = document.getElementById('faq-questions');

const faqText = [
  { question: 'What is your availability?', answer: '<p class="p2">I am currently booking 4-8 weeks out.</p>' },
  { question: 'What is your deposit policy?', answer: '<p class="p2">A one-time deposit of $250 is required after the consultation in order to reserve your tattoo appointment. This deposit goes towards the final cost of your tattoo.</p>' },
  { question: 'Where is your studio?', answer: '<p class="p2">My home studio is located in the Williamsburg neighborhood of Brooklyn, New York City.' },
  { question: 'How do I book an appointment?', answer: '<p class="p2">You may <a class="open-modal">book a tattoo consultation here</a>. If I feel I can bring your idea to life, we will discuss the concept further and set an appointment date during your consultation.</p>' },
  { question: 'How do I take care of my tattoo?', answer: `<p class="p2">After your tattoo is finished, I will apply a Saniderm bandage. You should keep this bandage on for 3 days, and avoid getting it wet as much as possible.</p><p class="p2">It's best to remove the Saniderm with warm water, such as in the shower. After removing the bandage, wash your tattoo gently with unscented soap. Continue to wash it daily for 7 days.</p><p class="p2">In addition to washing your tattoo, you should moisturize it 2x daily with unscented lotion for at least 7 days. Do NOT use any petroleum-based products, like Vaseline.</p><p class="p2">You should also avoid exposing your tattoo to direct sunlight, swimming, or soaking in hot tubs/baths for 2 weeks after your tattoo.</p>` },
  { question: 'My tattoo is flaking, what do I do?', answer: '<p class="p2">It is normal for your tattoo to peel and scab for up to 2 weeks after your session. It is important NOT to pick or peel this skin.</p>' }
];

faqText.forEach(({ question, answer }) => {
  const faqElement = faqTemplate.cloneNode(true);
  faqElement.querySelector('.p1').textContent = question;
  faqElement.querySelector('.answer').innerHTML = answer;
  faqContainer.appendChild(faqElement);
});

function toggleFAQ(question, answer) {
    question.classList.toggle('revealed');
    const icon = question.querySelector('i');
    icon.classList.toggle('revealed');
    answer.classList.toggle('revealed');
}

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
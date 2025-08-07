document.addEventListener('DOMContentLoaded', () => {
  // Generate Table of Contents
  const toc = document.getElementById('toc');
  const questions = document.querySelectorAll('.question');

  if (toc && questions.length > 0) {
    questions.forEach((question, index) => {
      const title = question.querySelector('h2').textContent;
      const id = `q${index + 1}`;
      question.id = id;

      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = title;
      link.href = `#${id}`;

      listItem.appendChild(link);
      toc.appendChild(listItem);
    });
  }

  // Handle feedback toggles
  const feedbackButtons = document.querySelectorAll('.toggle-feedback');
  feedbackButtons.forEach(button => {
    button.addEventListener('click', () => {
      const feedbackDiv = button.nextElementSibling;
      if (feedbackDiv && feedbackDiv.classList.contains('feedback')) {
        if (feedbackDiv.style.display === 'none') {
          feedbackDiv.style.display = 'block';
          button.textContent = 'Hide Feedback';
        } else {
          feedbackDiv.style.display = 'none';
          button.textContent = 'Show Feedback';
        }
      }
    });
  });

  // Initialize Highlight.js
  hljs.highlightAll();
});

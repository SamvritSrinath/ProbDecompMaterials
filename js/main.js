document.addEventListener('DOMContentLoaded', () => {
  // Check for authentication
  if (sessionStorage.getItem('authenticated') !== 'true') {
    if (!window.location.pathname.endsWith('auth.html')) {
      window.location.href = 'auth.html';
      return;
    }
  }

  // Generate Table of Contents with Suites
  const toc = document.getElementById('toc');
  const mainContent = document.querySelector('.content');

  if (toc && mainContent) {
    const headings = mainContent.querySelectorAll(
      'h2.suite-title, .question h2',
    );
    let currentSuiteUl = null;

    headings.forEach((heading, index) => {
      const title = heading.textContent;
      const id = `heading-${index + 1}`;
      heading.parentElement.id = id;

      if (heading.classList.contains('suite-title')) {
        const suiteLi = document.createElement('li');
        suiteLi.innerHTML = `<strong>${title}</strong>`;
        currentSuiteUl = document.createElement('ul');
        suiteLi.appendChild(currentSuiteUl);
        toc.appendChild(suiteLi);
      } else {
        const questionLi = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = title;
        link.href = `#${id}`;
        questionLi.appendChild(link);

        if (currentSuiteUl) {
          currentSuiteUl.appendChild(questionLi);
        } else {
          toc.appendChild(questionLi);
        }
      }
    });
  }

  // Handle feedback toggles
  const feedbackButtons = document.querySelectorAll('.toggle-feedback');
  feedbackButtons.forEach(button => {
    button.addEventListener('click', () => {
      const feedbackDiv = button.nextElementSibling;
      if (feedbackDiv && feedbackDiv.classList.contains('feedback')) {
        const isHidden =
          feedbackDiv.style.display === 'none' ||
          feedbackDiv.style.display === '';
        feedbackDiv.style.display = isHidden ? 'block' : 'none';
        button.textContent = isHidden ? 'Hide Feedback' : 'Show Feedback';
      }
    });
  });

  // Initialize Highlight.js
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }
});

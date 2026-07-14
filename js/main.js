const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

animatedElements.forEach((element) => observer.observe(element));

const revealVisibleElements = () => {
  animatedElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

    if (isVisible) {
      element.classList.add('visible');
      observer.unobserve(element);
    }
  });
};

requestAnimationFrame(revealVisibleElements);
window.addEventListener('hashchange', () => requestAnimationFrame(revealVisibleElements));

const gnb = document.querySelector('.gnb');

window.addEventListener('scroll', () => {
  gnb.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(44,44,44,0.08)'
    : 'none';
});

document.querySelectorAll('[data-notify-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = form.querySelector('input[type="email"]');
    const message = form.querySelector('.notify-success');
    const email = input.value.trim();

    if (!email) return;

    input.value = '';
    message.textContent = `신청되었습니다. ${email}로 출시 소식을 가장 먼저 알려드릴게요.`;
    message.style.display = 'block';
  });
});

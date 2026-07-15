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

// 얼리액세스 신청 저장소: 구글 폼 (폼의 질문을 수정하면 아래 두 값도 갱신해야 함)
const NOTIFY_FORM_ENDPOINT =
  'https://docs.google.com/forms/d/e/1FAIpQLSc3tg4r6WO4zMFjh8kbHCBdcWjkQ1q90zTY3s-oDt5x1QfFCg/formResponse';
const NOTIFY_EMAIL_ENTRY = 'entry.225956236';

document.querySelectorAll('[data-notify-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = form.querySelector('input[type="email"]');
    const message = form.querySelector('.notify-success');
    const email = input.value.trim();

    if (!email) return;

    // no-cors라 응답을 읽을 수 없음 — 성공 문구는 낙관적으로 표시
    fetch(NOTIFY_FORM_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ [NOTIFY_EMAIL_ENTRY]: email }),
    });

    input.value = '';
    message.textContent = `신청되었습니다. ${email}로 출시 소식을 가장 먼저 알려드릴게요.`;
    message.style.display = 'block';
  });
});

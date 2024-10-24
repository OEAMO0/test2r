// شريط التنقل المتجاوب
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// نموذج الاتصال باستخدام Formspree
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formMessage = document.getElementById('form-message');
    
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formMessage.style.color = 'green';
            formMessage.textContent = 'تم إرسال الرسالة بنجاح!';
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    formMessage.style.color = 'red';
                    formMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    formMessage.style.color = 'red';
                    formMessage.textContent = 'حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى لاحقًا.';
                }
            });
        }
    }).catch(error => {
        console.error('فشل الإرسال...', error);
        formMessage.style.color = 'red';
        formMessage.textContent = 'حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى لاحقًا.';
    });
});

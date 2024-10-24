// شريط التنقل المتجاوب
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// نموذج الاتصال
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(name === '' || email === '' || message === '') {
        alert('يرجى ملء جميع الحقول.');
        return;
    }

    // يمكنك هنا إضافة كود لإرسال البيانات إلى خادم أو API
    alert(`شكراً لك يا ${name}! تم استلام رسالتك بنجاح. سيتم التواصل معك عبر البريد الإلكتروني: ${email}`);
    this.reset();
});

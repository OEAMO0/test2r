// شريط التنقل المتجاوب
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// وظيفة لتحليل الكود المرسل وتنفيذه
function processMessage(message) {
    // تعريف نمط للكود داخل الرسالة (مثلاً بين علامتي backticks مع تحديد لغة JavaScript)
    const codePattern = /```(?:javascript)?\s*([\s\S]*?)```/;
    const match = message.match(codePattern);

    if (match && match[1]) {
        const code = match[1];
        try {
            // تنفيذ الكود باستخدام Function بدلاً من eval لزيادة الأمان
            const func = new Function(code);
            const result = func();
            return result !== undefined ? result.toString() : "تم تنفيذ الكود بنجاح!";
        } catch (error) {
            return `حدث خطأ أثناء تنفيذ الكود: ${error.message}`;
        }
    }

    // إذا لم يكن هناك كود، إرجاع الرسالة كما هي
    return message;
}

// نموذج الاتصال باستخدام Formspree مع معالجة الكود
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formMessage = document.getElementById('form-message');
    
    // الحصول على قيمة الرسالة
    const messageField = document.getElementById('message');
    let message = messageField.value.trim();

    // معالجة الرسالة لتنفيذ الكود إذا كان موجودًا
    const processedMessage = processMessage(message);

    // تحديث الرسالة بعد المعالجة
    messageField.value = processedMessage;

    // إرسال النموذج باستخدام Fetch
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

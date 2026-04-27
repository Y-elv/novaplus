document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !service || !message) {
            alert('Please fill all required fields.');
            return;
        }

        const subject = encodeURIComponent('New Contact Request - Novaplus Website');
        const body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n' +
            'Phone: ' + phone + '\n' +
            'Service: ' + service + '\n\n' +
            'Message:\n' + message
        );

        window.location.href = 'mailto:info@novaplusvet.com?subject=' + subject + '&body=' + body;
    });
});

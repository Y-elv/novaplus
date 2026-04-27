document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !service || !message) {
            if (window.showToast) {
                window.showToast('Please fill all required fields.', 'error');
            }
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Message submission failed');
            }

            if (window.showToast) {
                window.showToast('Your message was sent successfully.');
            }

            form.reset();

            // Redirect back to the same page context after a successful send.
            const currentPath = window.location.pathname.toLowerCase();
            const redirectTarget = currentPath.includes('veterinary-services')
                ? '/veterinary-services.html'
                : '/contact.html';

            window.setTimeout(function () {
                window.location.href = redirectTarget;
            }, 900);
        } catch (error) {
            if (window.showToast) {
                window.showToast('Could not send your message. Please try again.', 'error');
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
});

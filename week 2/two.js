
// --- Dark / Light Mode Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
        const isDark = theme === 'dark';
        themeToggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    }
    localStorage.setItem('theme', theme);
};

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    });
}

// --- Contact Form Submission Handling ---
const contactForm = document.getElementById('contact-form');
const feedbackMsg = document.getElementById('form-feedback');
const bookingForm = document.getElementById('booking-form');
const bookingFeedback = document.getElementById('booking-feedback');
const openBookingModalButton = document.getElementById('open-booking-modal');
const bookingModal = document.getElementById('booking-modal');
const closeBookingModalButton = document.querySelector('.close-modal');
const openCallModalButton = document.getElementById('open-call-modal');
const callModal = document.getElementById('call-modal');
const closeCallModalButton = document.querySelector('.close-call-modal');

const closeCallModal = () => {
    callModal.classList.remove('open');
    callModal.setAttribute('aria-hidden', 'true');
};

if (openCallModalButton && callModal) {
    openCallModalButton.addEventListener('click', () => {
        callModal.classList.add('open');
        callModal.setAttribute('aria-hidden', 'false');
    });
}

if (closeCallModalButton && callModal) {
    closeCallModalButton.addEventListener('click', closeCallModal);
}

if (callModal) {
    callModal.addEventListener('click', (event) => {
        if (event.target === callModal) {
            closeCallModal();
        }
    });
}

if (openBookingModalButton && bookingModal) {
    openBookingModalButton.addEventListener('click', () => {
        bookingModal.classList.add('open');
        bookingModal.setAttribute('aria-hidden', 'false');
    });
}

if (closeBookingModalButton && bookingModal) {
    closeBookingModalButton.addEventListener('click', () => {
        bookingModal.classList.remove('open');
        bookingModal.setAttribute('aria-hidden', 'true');
    });
}

if (bookingModal) {
    bookingModal.addEventListener('click', (event) => {
        if (event.target === bookingModal) {
            bookingModal.classList.remove('open');
            bookingModal.setAttribute('aria-hidden', 'true');
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        // Prevent the default browser page reload on submit
        event.preventDefault(); 

        const nameValue = document.getElementById('name').value.trim();
        const emailValue = document.getElementById('email').value.trim();

        // Basic Javascript Validation Rule
        if (nameValue === "" || emailValue === "") {
            feedbackMsg.style.color = "red";
            feedbackMsg.textContent = "Please fill out all fields required.";
        } else {
            feedbackMsg.style.color = "green";
            feedbackMsg.textContent = `Thank you, ${nameValue}! Your message has been simulated as sent successfully.`;
            
            // Clear the form elements
            contactForm.reset();
        }
    });
}

if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const bookingName = document.getElementById('booking-name').value.trim();
        const bookingEmail = document.getElementById('booking-email').value.trim();
        const bookingDate = document.getElementById('booking-date').value;
        const bookingTime = document.getElementById('booking-time').value;
        const bookingPurpose = document.getElementById('booking-purpose').value.trim();
        const contactEmail = document.querySelector('.email-link')?.getAttribute('href')?.replace(/^mailto:/i, '');

        if (!bookingName || !bookingEmail || !bookingDate || !bookingTime || !bookingPurpose) {
            bookingFeedback.style.color = 'red';
            bookingFeedback.textContent = 'Please complete all booking fields before submitting.';
            return;
        }

        if (!contactEmail) {
            bookingFeedback.style.color = 'red';
            bookingFeedback.textContent = 'The booking email address is unavailable. Please contact me directly.';
            return;
        }

        const subject = `Appointment request from ${bookingName}`;
        const body = [
            `Name: ${bookingName}`,
            `Email: ${bookingEmail}`,
            `Preferred date: ${bookingDate}`,
            `Preferred time: ${bookingTime}`,
            `Purpose: ${bookingPurpose}`
        ].join('\n');

        bookingFeedback.style.color = 'green';
        bookingFeedback.textContent = 'Your email app is opening with the appointment details. Send the email to complete your request.';
        window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

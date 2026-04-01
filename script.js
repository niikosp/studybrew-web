document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('email-popup');
    const closeBtn = document.getElementById('close-popup');
    const contactBtn = document.getElementById('contact-trigger');
    const form = popup.querySelector('form');

    // --- POPUP LOGIC ---
    const openPopup = () => {
        popup.classList.add('active');
    };

    const closePopup = () => {
        popup.classList.remove('active');
        localStorage.setItem('popupClosed', 'true');
    };

    // Trigger click for "Επικοινωνία"
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openPopup();
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closePopup);

    window.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });

    // Auto-popup logic (shows after 2 seconds if first time)
    if (!localStorage.getItem('popupClosed')) {
        setTimeout(openPopup, 2000);
    }

    // --- FORM SUBMISSION ---
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        const status = form.querySelector('.btn-popup');
        const data = new FormData(event.target);
        status.innerHTML = "Στέλνεται...";
        status.disabled = true;

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "Επιτυχία! 🎉";
                setTimeout(() => {
                    closePopup();
                    status.innerHTML = "Εγγραφή";
                    status.disabled = false;
                }, 1500);
            } else {
                alert("Ωχ! Κάτι πήγε στραβά.");
                status.innerHTML = "Εγγραφή";
                status.disabled = false;
            }
        }).catch(() => {
            alert("Σφάλμα σύνδεσης.");
            status.innerHTML = "Εγγραφή";
            status.disabled = false;
        });
    });

    // --- NAVBAR SCROLL ---
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = '#fff';
            nav.style.padding = '10px 10%';
        } else {
            nav.style.padding = '20px 10%';
        }
    });
});
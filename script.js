document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('email-popup');
    const closeBtn = document.getElementById('close-popup');
    const contactBtn = document.getElementById('contact-trigger');
    const form = popup.querySelector('form');


    const openPopup = () => {
        if (popup) {
            popup.classList.add('active');
        }
    };

    // Συνάρτηση για κλείσιμο
    const closePopup = () => {
        if (popup) {
            popup.classList.remove('active');
        }
    };

   
    setTimeout(openPopup, 2000);

  

    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

  
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    
    if (form) {
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
                        form.reset(); // Καθαρισμός της φόρμας
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
    }

   
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = '#fff';
                nav.style.padding = '10px 10%';
                nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                nav.style.padding = '20px 10%';
                nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }
        }
    });
});
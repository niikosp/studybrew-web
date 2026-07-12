/* Cookie consent banner + gated Google Analytics loader.
   GA is only loaded after the visitor explicitly accepts analytics cookies. */
(function () {
    var GA_MEASUREMENT_ID = 'G-FJTVTQZW7K';
    var STORAGE_KEY = 'sb_cookie_consent';

    function loadGoogleAnalytics() {
        if (window.__sbGaLoaded) return;
        window.__sbGaLoaded = true;

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);
    }

    function getConsent() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setConsent(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) { /* localStorage unavailable, banner will just re-show next visit */ }
    }

    function buildBanner() {
        var banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Συναίνεση cookies');
        banner.innerHTML =
            '<div class="cookie-consent-inner">' +
            '  <p>Χρησιμοποιούμε cookies για να μετράμε την επισκεψιμότητα του site μέσω Google Analytics. ' +
            '  Μπορείς να τα αποδεχτείς ή να τα απορρίψεις. Δες περισσότερα στην ' +
            '  <a href="privacy.html#cookies">Πολιτική Cookies</a>.</p>' +
            '  <div class="cookie-consent-actions">' +
            '    <button type="button" id="cookie-consent-reject" class="cookie-btn cookie-btn-secondary">Απόρριψη</button>' +
            '    <button type="button" id="cookie-consent-accept" class="cookie-btn cookie-btn-primary">Αποδοχή</button>' +
            '  </div>' +
            '</div>';
        document.body.appendChild(banner);

        document.getElementById('cookie-consent-accept').addEventListener('click', function () {
            setConsent('granted');
            loadGoogleAnalytics();
            hideBanner();
        });
        document.getElementById('cookie-consent-reject').addEventListener('click', function () {
            setConsent('denied');
            hideBanner();
        });

        return banner;
    }

    function hideBanner() {
        var banner = document.getElementById('cookie-consent-banner');
        if (banner) banner.remove();
    }

    function showBanner() {
        if (document.getElementById('cookie-consent-banner')) return;
        buildBanner();
    }

    window.sbOpenCookieSettings = function () {
        showBanner();
    };

    document.addEventListener('DOMContentLoaded', function () {
        var consent = getConsent();
        if (consent === 'granted') {
            loadGoogleAnalytics();
        } else if (consent === 'denied') {
            // respected, nothing loaded
        } else {
            showBanner();
        }
    });
})();

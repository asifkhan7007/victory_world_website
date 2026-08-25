(function () {
  'use strict';

  var storageKey = 'vw_analytics_consent_v1';
  var bannerId = 'vw-analytics-consent';
  var choicesButtonId = 'vw-analytics-choices';

  function readConsent() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(storageKey, value);
    } catch (error) {
      return;
    }
  }

  function updateGoogleConsent(value) {
    if (typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('consent', 'update', {
      analytics_storage: value === 'granted' ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  function sendEvent(name, parameters) {
    if (readConsent() !== 'granted' || typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', name, parameters || {});
  }

  function removeBanner() {
    var existing = document.getElementById(bannerId);
    if (existing) {
      existing.remove();
    }
  }

  function createButton(label, background, color) {
    var button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.style.border = '1px solid rgba(245,207,114,.55)';
    button.style.borderRadius = '999px';
    button.style.padding = '10px 18px';
    button.style.fontWeight = '800';
    button.style.cursor = 'pointer';
    button.style.background = background;
    button.style.color = color;
    return button;
  }

  function ensureChoicesButton() {
    if (document.getElementById(choicesButtonId)) {
      return;
    }

    var button = document.createElement('button');
    button.id = choicesButtonId;
    button.type = 'button';
    button.textContent = 'Analytics choices';
    button.setAttribute('aria-label', 'Open analytics privacy choices');
    button.style.position = 'fixed';
    button.style.left = '12px';
    button.style.bottom = '12px';
    button.style.zIndex = '2147483646';
    button.style.padding = '7px 11px';
    button.style.border = '1px solid rgba(245,207,114,.45)';
    button.style.borderRadius = '999px';
    button.style.background = 'rgba(5,7,13,.92)';
    button.style.color = '#f5cf72';
    button.style.font = '600 12px Arial, sans-serif';
    button.style.cursor = 'pointer';
    button.addEventListener('click', showBanner);
    document.body.appendChild(button);
  }

  function applyChoice(value) {
    writeConsent(value);
    updateGoogleConsent(value);
    removeBanner();
    ensureChoicesButton();

    if (value === 'granted') {
      sendEvent('analytics_consent_granted', {
        consent_source: 'website_banner'
      });
    }
  }

  function showBanner() {
    removeBanner();

    var banner = document.createElement('section');
    banner.id = bannerId;
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Analytics privacy choices');
    banner.style.position = 'fixed';
    banner.style.left = '16px';
    banner.style.right = '16px';
    banner.style.bottom = '16px';
    banner.style.zIndex = '2147483647';
    banner.style.maxWidth = '760px';
    banner.style.margin = '0 auto';
    banner.style.padding = '18px';
    banner.style.border = '1px solid rgba(245,207,114,.55)';
    banner.style.borderRadius = '18px';
    banner.style.background = 'linear-gradient(135deg,#07172f,#05070d)';
    banner.style.boxShadow = '0 20px 60px rgba(0,0,0,.55)';
    banner.style.color = '#fff';
    banner.style.fontFamily = 'Arial, sans-serif';

    var title = document.createElement('strong');
    title.textContent = 'Your analytics privacy choice';
    title.style.display = 'block';
    title.style.color = '#f5cf72';
    title.style.fontSize = '17px';
    title.style.marginBottom = '8px';

    var text = document.createElement('p');
    text.style.margin = '0 0 14px';
    text.style.lineHeight = '1.55';
    text.style.color = '#d7dce7';
    text.appendChild(document.createTextNode('Allow anonymous analytics to help Victory World understand visits, Play Now clicks and APK downloads. You can continue without analytics. Read our '));

    var privacyLink = document.createElement('a');
    privacyLink.href = '/privacy.html#cookies';
    privacyLink.textContent = 'Privacy Policy';
    privacyLink.style.color = '#f5cf72';
    text.appendChild(privacyLink);
    text.appendChild(document.createTextNode('.'));

    var actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.flexWrap = 'wrap';
    actions.style.gap = '10px';
    actions.style.justifyContent = 'flex-end';

    var decline = createButton('Continue without analytics', '#111827', '#ffffff');
    decline.addEventListener('click', function () {
      applyChoice('denied');
    });

    var accept = createButton('Allow analytics', '#f5cf72', '#05070d');
    accept.addEventListener('click', function () {
      applyChoice('granted');
    });

    actions.appendChild(decline);
    actions.appendChild(accept);
    banner.appendChild(title);
    banner.appendChild(text);
    banner.appendChild(actions);
    document.body.appendChild(banner);
    accept.focus();
  }

  function normaliseText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 100);
  }

  function trackLinkClick(anchor) {
    var href = anchor.getAttribute('href') || '';
    var absoluteUrl = anchor.href || href;
    var linkText = normaliseText(anchor.textContent);

    if (/\/play\/?(?:\?|#|$)/i.test(absoluteUrl)) {
      sendEvent('play_now_click', {
        link_url: absoluteUrl,
        link_text: linkText
      });
      return;
    }

    if (/victory-world\.apk(?:\?|#|$)/i.test(absoluteUrl) || /\.apk(?:\?|#|$)/i.test(absoluteUrl)) {
      sendEvent('apk_download', {
        file_name: 'victory-world.apk',
        link_url: absoluteUrl,
        link_text: linkText
      });
      return;
    }

    if (/rules\.html|teen-patti\.html|how-to-play-teen-patti\.html|rummy\.html|how-to-play-indian-rummy\.html|poker\.html|texas-holdem-vs-omaha-vs-5-card-plo\.html|blackjack\.html|ludo\.html|texas-holdem-poker\.html|omaha-poker\.html|five-card-plo\.html|sports-predictions\.html/i.test(absoluteUrl)) {
      sendEvent('game_guide_click', {
        link_url: absoluteUrl,
        link_text: linkText
      });
    }
  }

  function initialise() {
    var stored = readConsent();
    if (stored === 'granted' || stored === 'denied') {
      updateGoogleConsent(stored);
      ensureChoicesButton();
    } else {
      showBanner();
    }

    document.addEventListener('click', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      var anchor = target.closest('a[href]');
      if (anchor) {
        trackLinkClick(anchor);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise);
  } else {
    initialise();
  }
})();
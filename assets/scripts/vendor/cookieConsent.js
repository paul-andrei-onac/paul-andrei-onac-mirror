import CookieConsent from 'vanilla-cookieconsent/dist/cookieconsent.umd';

// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

// Set default consent to 'denied' as a placeholder
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  personalization_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
});

// Configure cookie consent banner
CookieConsent.run({
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom right',
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'bar',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    analytics: {},
    preferences: {},
    marketing: {},
  },
  language: {
    default: 'ro',
    translations: {
      en: {
        consentModal: {
          title: 'We care that your personal data remains confidential',
          description: 'We use cookies to personalize content and ads, provide social networking features, and analyze traffic. We also provide our social media, advertising and analytics partners with information about how you use our website. They may combine it with other information you provide or collect through your use of their services.',
          acceptAllBtn: 'Accept',
          showPreferencesBtn: 'Manage preferences',
          footer: '<a href="/terms-of-service">Terms of Service</a>\n<a href="/privacy-policy">Privacy Policy</a>\n<a href="/cookie-policy">Cookie Policy</a>',
        },
        preferencesModal: {
          title: 'Consent Preferences Center',
          acceptAllBtn: 'Accept',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie Usage',
              description: 'We use cookies to personalize content and ads, provide social networking features, and analyze traffic. We also provide our social media, advertising and analytics partners with information about how you use our website. They may combine it with other information you provide or collect through your use of their services.',
            },
            {
              title: 'Necessary <span class="pm__badge">Always active</span>',
              description: 'Necessary cookies help make a website usable by enabling basic functions such as page navigation and access to secure areas on the website. The site cannot function without these cookies.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Statistics',
              description: 'Statistical cookies help site owners understand how visitors interact with the sites by collecting and reporting information anonymously.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Preferences',
              description: 'Preference cookies allow a site to remember information that changes based on how the site behaves or looks, such as your preferred language or the region you are in.',
              linkedCategory: 'preferences',
            },
            {
              title: 'Marketing',
              description: 'Marketing cookies are used to track users from one site to another. The intent is to display relevant and engaging ads to individual users, so they are more valuable to advertisers and third-party advertisers.',
              linkedCategory: 'marketing',
            },
            {
              title: 'More information',
              description: 'For any questions about our privacy policy, please go to: \n<a class="cc__link" href="/cookie-policy">https://kineto-acasa.ro/cookie-policy</a>.',
            },
          ],
        },
      },
      ro: {
        consentModal: {
          title: 'Ne pasă ca datele tale personale să rămână confidențiale',
          description: 'Folosim cookie-uri pentru a personaliza conținutul și reclamele, pentru a oferi funcții de rețele sociale și pentru a analiza traficul. De asemenea, oferim partenerilor noștri de social media, publicitate și analiză informații despre modul în care folosești site-ul nostru. Aceștia le pot combina cu alte informații pe care le oferi sau pe care le colectează prin utilizarea serviciilor lor.',
          acceptAllBtn: 'Acceptă',
          showPreferencesBtn: 'Gestionează preferințele',
          footer: '',
        },
        preferencesModal: {
          title: 'Centrul de preferințe pentru consimțământ',
          acceptAllBtn: 'Acceptă',
          savePreferencesBtn: 'Salvează preferințele',
          closeIconLabel: 'Închide fereastra',
          serviceCounterLabel: 'Serviciu|Servicii',
          sections: [
            {
              title: 'Utilizarea cookie-urilor',
              description: 'Folosim cookie-uri pentru a personaliza conținutul și reclamele, pentru a oferi funcții de rețele sociale și pentru a analiza traficul. De asemenea, oferim partenerilor noștri de social media, publicitate și analiză informații despre modul în care folosești site-ul nostru. Aceștia le pot combina cu alte informații pe care le oferi sau pe care le colectează prin utilizarea serviciilor lor.',
            },
            {
              title: 'Necesar <span class="pm__badge">Întotdeauna activ</span>',
              description: 'Cookie-urile necesare ajută la utilizarea unui site web, permițând funcții de bază, cum ar fi navigarea pe pagină și accesul la zonele securizate ale site-ului. Site-ul nu poate funcționa fără aceste cookie-uri.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Statistici',
              description: 'Cookie-urile statistice ajută proprietarii site-urilor să înțeleagă modul în care vizitatorii interacționează cu site-urile, colectând și raportând informații în mod anonim.',
              linkedCategory: 'analytics',
            },
            {
              title: 'Preferințe',
              description: 'Cookie-urile de preferințe permit unui site să rețină informații care modifică modul în care site-ul se comportă sau arată, cum ar fi limba preferată sau regiunea în care te afli.',
              linkedCategory: 'preferences',
            },
            {
              title: 'Marketing',
              description: 'Cookie-urile de marketing sunt utilizate pentru a urmări utilizatorii de la un site la altul.',
              linkedCategory: 'marketing',
            },
          ],
        },
      },
    },
    // autoDetect: "browser"
  },

  // Update gtag consent based on user preferences
  onConsent: () => {
    updateGtagConsent();
  },
  onChange: ({ changedCategories }) => {
    updateGtagConsent();
  },
});

function updateGtagConsent() {
  gtag('consent', 'update', {
    ad_storage: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    ad_user_data: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    ad_personalization: CookieConsent.acceptedCategory('marketing') ? 'granted' : 'denied',
    analytics_storage: CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
    personalization_storage: CookieConsent.acceptedCategory('preferences') ? 'granted' : 'denied',
    functionality_storage: CookieConsent.acceptedCategory('necessary') ? 'granted' : 'denied',
    security_storage: CookieConsent.acceptedCategory('necessary') ? 'granted' : 'denied',
  });
}

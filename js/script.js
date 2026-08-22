const menuButton = document.getElementById("menuButton");
const navigationMenu = document.getElementById("navigationMenu");
const currentYear = document.getElementById("currentYear");

const translations = {
  hi: {
    Home: "होम", Games: "गेम्स", Features: "विशेषताएँ", Download: "डाउनलोड", About: "हमारे बारे में", Contact: "संपर्क",
    Privacy: "गोपनीयता", Terms: "शर्तें", "Responsible Gaming": "जिम्मेदार गेमिंग",
    "Premium multiplayer entertainment": "प्रीमियम मल्टीप्लेयर मनोरंजन",
    "WELCOME TO VICTORY WORLD": "विक्ट्री वर्ल्ड में आपका स्वागत है",
    "One App.": "एक ऐप।", "Endless Excitement.": "असीम रोमांच।",
    "Play instantly in your browser": "ब्राउज़र में तुरंत खेलें", "PLAY NOW": "अभी खेलें", "Explore Games": "गेम्स देखें",
    "Private Rooms": "निजी कमरे", "Play with friends": "दोस्तों के साथ खेलें", "Fast Gameplay": "तेज़ गेमप्ले", "Smooth experiences": "सहज अनुभव",
    "Responsible Play": "जिम्मेदार खेल", "Adults aged 18+": "केवल 18+ वयस्क",
    "ANDROID DOWNLOAD": "एंड्रॉइड डाउनलोड", "Your next victory": "आपकी अगली जीत", "starts here.": "यहाँ से शुरू होती है।",
    "Direct Android download": "सीधा एंड्रॉइड डाउनलोड", "DOWNLOAD APK": "APK डाउनलोड करें", "Contact Us": "हमसे संपर्क करें", "Learn more": "और जानें"
  },
  es: {
    Home: "Inicio", Games: "Juegos", Features: "Funciones", Download: "Descargar", About: "Acerca de", Contact: "Contacto",
    Privacy: "Privacidad", Terms: "Términos", "Responsible Gaming": "Juego responsable",
    "Premium multiplayer entertainment": "Entretenimiento multijugador premium", "WELCOME TO VICTORY WORLD": "BIENVENIDO A VICTORY WORLD",
    "One App.": "Una app.", "Endless Excitement.": "Emoción sin límites.", "Play instantly in your browser": "Juega al instante en tu navegador", "PLAY NOW": "JUGAR AHORA", "Explore Games": "Explorar juegos",
    "Private Rooms": "Salas privadas", "Play with friends": "Juega con amigos", "Fast Gameplay": "Juego rápido", "Smooth experiences": "Experiencia fluida", "Responsible Play": "Juego responsable", "Adults aged 18+": "Solo mayores de 18 años",
    "ANDROID DOWNLOAD": "DESCARGA PARA ANDROID", "Your next victory": "Tu próxima victoria", "starts here.": "empieza aquí.", "Direct Android download": "Descarga directa para Android", "DOWNLOAD APK": "DESCARGAR APK", "Contact Us": "Contáctanos", "Learn more": "Más información"
  },
  "pt-BR": {
    Home: "Início", Games: "Jogos", Features: "Recursos", Download: "Baixar", About: "Sobre", Contact: "Contato",
    Privacy: "Privacidade", Terms: "Termos", "Responsible Gaming": "Jogo responsável",
    "Premium multiplayer entertainment": "Entretenimento multijogador premium", "WELCOME TO VICTORY WORLD": "BEM-VINDO AO VICTORY WORLD",
    "One App.": "Um app.", "Endless Excitement.": "Diversão sem fim.", "Play instantly in your browser": "Jogue agora no navegador", "PLAY NOW": "JOGAR AGORA", "Explore Games": "Explorar jogos",
    "Private Rooms": "Salas privadas", "Play with friends": "Jogue com amigos", "Fast Gameplay": "Jogabilidade rápida", "Smooth experiences": "Experiência fluida", "Responsible Play": "Jogo responsável", "Adults aged 18+": "Somente maiores de 18 anos",
    "ANDROID DOWNLOAD": "DOWNLOAD PARA ANDROID", "Your next victory": "Sua próxima vitória", "starts here.": "começa aqui.", "Direct Android download": "Download direto para Android", "DOWNLOAD APK": "BAIXAR APK", "Contact Us": "Fale conosco", "Learn more": "Saiba mais"
  },
  bn: {
    Home: "হোম", Games: "গেমস", Features: "বৈশিষ্ট্য", Download: "ডাউনলোড", About: "আমাদের সম্পর্কে", Contact: "যোগাযোগ",
    Privacy: "গোপনীয়তা", Terms: "শর্তাবলি", "Responsible Gaming": "দায়িত্বশীল গেমিং",
    "Premium multiplayer entertainment": "প্রিমিয়াম মাল্টিপ্লেয়ার বিনোদন", "WELCOME TO VICTORY WORLD": "ভিক্টরি ওয়ার্ল্ডে স্বাগতম",
    "One App.": "একটি অ্যাপ।", "Endless Excitement.": "অফুরন্ত উত্তেজনা।", "Play instantly in your browser": "ব্রাউজারে সঙ্গে সঙ্গে খেলুন", "PLAY NOW": "এখনই খেলুন", "Explore Games": "গেম দেখুন",
    "Private Rooms": "প্রাইভেট রুম", "Play with friends": "বন্ধুদের সঙ্গে খেলুন", "Fast Gameplay": "দ্রুত গেমপ্লে", "Smooth experiences": "মসৃণ অভিজ্ঞতা", "Responsible Play": "দায়িত্বশীল খেলা", "Adults aged 18+": "শুধু ১৮+ প্রাপ্তবয়স্ক",
    "ANDROID DOWNLOAD": "অ্যান্ড্রয়েড ডাউনলোড", "Your next victory": "আপনার পরবর্তী জয়", "starts here.": "এখান থেকেই শুরু।", "Direct Android download": "সরাসরি অ্যান্ড্রয়েড ডাউনলোড", "DOWNLOAD APK": "APK ডাউনলোড করুন", "Contact Us": "যোগাযোগ করুন", "Learn more": "আরও জানুন"
  },
  fil: {
    Home: "Home", Games: "Mga Laro", Features: "Mga Tampok", Download: "I-download", About: "Tungkol", Contact: "Makipag-ugnayan",
    Privacy: "Privacy", Terms: "Mga Tuntunin", "Responsible Gaming": "Responsableng Paglalaro",
    "Premium multiplayer entertainment": "Premium na multiplayer entertainment", "WELCOME TO VICTORY WORLD": "MALIGAYANG PAGDATING SA VICTORY WORLD",
    "One App.": "Isang App.", "Endless Excitement.": "Walang Katapusang Saya.", "Play instantly in your browser": "Maglaro agad sa iyong browser", "PLAY NOW": "MAGLARO NGAYON", "Explore Games": "Tingnan ang mga laro",
    "Private Rooms": "Mga Pribadong Room", "Play with friends": "Maglaro kasama ang mga kaibigan", "Fast Gameplay": "Mabilis na Gameplay", "Smooth experiences": "Maayos na karanasan", "Responsible Play": "Responsableng Paglalaro", "Adults aged 18+": "Para lamang sa 18+",
    "ANDROID DOWNLOAD": "ANDROID DOWNLOAD", "Your next victory": "Ang susunod mong tagumpay", "starts here.": "ay nagsisimula rito.", "Direct Android download": "Direktang Android download", "DOWNLOAD APK": "I-DOWNLOAD ANG APK", "Contact Us": "Makipag-ugnayan", "Learn more": "Alamin pa"
  }
};

const originalText = new WeakMap();

function translatePage(language) {
  const dictionary = translations[language] || {};
  document.documentElement.lang = language;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.parentElement || ["SCRIPT", "STYLE", "OPTION"].includes(node.parentElement.tagName)) continue;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const trimmed = source.trim();
    if (!trimmed) continue;
    const translated = dictionary[trimmed] || trimmed;
    node.nodeValue = source.replace(trimmed, translated);
  }
}

function addLanguageSelector() {
  const navbar = document.querySelector(".navbar");
  if (!navbar || document.getElementById("languageSelector")) return;
  const wrapper = document.createElement("label");
  wrapper.className = "language-control";
  wrapper.innerHTML = '<span class="sr-only">Language</span><select id="languageSelector" aria-label="Language"><option value="en">English</option><option value="hi">हिन्दी</option><option value="es">Español</option><option value="pt-BR">Português (Brasil)</option><option value="bn">বাংলা</option><option value="fil">Filipino</option></select>';
  navbar.insertBefore(wrapper, document.getElementById("menuButton"));
  const selector = wrapper.querySelector("select");
  const selected = localStorage.getItem("victory-world-language") || "en";
  selector.value = selected;
  translatePage(selected);
  selector.addEventListener("change", () => {
    localStorage.setItem("victory-world-language", selector.value);
    translatePage(selector.value);
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuButton && navigationMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigationMenu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigationMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigationMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

addLanguageSelector();

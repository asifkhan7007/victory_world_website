(() => {
  const supportedGames = [
    "teen-patti",
    "rummy",
    "poker",
    "blackjack",
    "ludo",
  ];

  const labels = {
    en: {
      language: "Language",
      rules: "Rules",
      howToPlay: "How to Play",
      playModes: "Play Modes",
      objective: "Objective",
      setup: "Game Setup",
      turns: "Turns",
      actions: "Available Actions",
      winning: "Winning Conditions",
      scoring: "Scoring & Rankings",
      specialRules: "Special Rules",
      gettingStarted: "Getting Started",
      stepByStep: "Step by Step",
      beginnerTips: "Beginner Tips",
      practice: "Practice Mode",
      privateRoom: "Private Room",
      publicOnline: "Public Online",
    },

    hi: {
      language: "भाषा",
      rules: "नियम",
      howToPlay: "कैसे खेलें",
      playModes: "खेलने के तरीके",
      objective: "उद्देश्य",
      setup: "गेम सेटअप",
      turns: "बारी",
      actions: "उपलब्ध क्रियाएँ",
      winning: "जीतने की शर्तें",
      scoring: "स्कोरिंग और रैंकिंग",
      specialRules: "विशेष नियम",
      gettingStarted: "शुरुआत",
      stepByStep: "स्टेप बाय स्टेप",
      beginnerTips: "शुरुआती सुझाव",
      practice: "प्रैक्टिस मोड",
      privateRoom: "प्राइवेट रूम",
      publicOnline: "पब्लिक ऑनलाइन",
    },

    es: {
      language: "Idioma",
      rules: "Reglas",
      howToPlay: "Cómo Jugar",
      playModes: "Modos de Juego",
      objective: "Objetivo",
      setup: "Configuración",
      turns: "Turnos",
      actions: "Acciones Disponibles",
      winning: "Condiciones para Ganar",
      scoring: "Puntuación y Clasificación",
      specialRules: "Reglas Especiales",
      gettingStarted: "Primeros Pasos",
      stepByStep: "Paso a Paso",
      beginnerTips: "Consejos para Principiantes",
      practice: "Modo Práctica",
      privateRoom: "Sala Privada",
      publicOnline: "Público Online",
    },

    pt: {
      language: "Idioma",
      rules: "Regras",
      howToPlay: "Como Jogar",
      playModes: "Modos de Jogo",
      objective: "Objetivo",
      setup: "Configuração",
      turns: "Turnos",
      actions: "Ações Disponíveis",
      winning: "Condições de Vitória",
      scoring: "Pontuação e Rankings",
      specialRules: "Regras Especiais",
      gettingStarted: "Começando",
      stepByStep: "Passo a Passo",
      beginnerTips: "Dicas para Iniciantes",
      practice: "Modo Prática",
      privateRoom: "Sala Privada",
      publicOnline: "Público Online",
    },

    bn: {
      language: "ভাষা",
      rules: "নিয়ম",
      howToPlay: "কীভাবে খেলবেন",
      playModes: "খেলার মোড",
      objective: "উদ্দেশ্য",
      setup: "গেম সেটআপ",
      turns: "পালা",
      actions: "উপলভ্য অ্যাকশন",
      winning: "জয়ের শর্ত",
      scoring: "স্কোরিং ও র‌্যাঙ্কিং",
      specialRules: "বিশেষ নিয়ম",
      gettingStarted: "শুরু করুন",
      stepByStep: "ধাপে ধাপে",
      beginnerTips: "নতুনদের জন্য টিপস",
      practice: "প্র্যাকটিস মোড",
      privateRoom: "প্রাইভেট রুম",
      publicOnline: "পাবলিক অনলাইন",
    },

    fil: {
      language: "Wika",
      rules: "Mga Patakaran",
      howToPlay: "Paano Maglaro",
      playModes: "Mga Mode ng Laro",
      objective: "Layunin",
      setup: "Game Setup",
      turns: "Mga Turn",
      actions: "Available na Actions",
      winning: "Kondisyon ng Panalo",
      scoring: "Scoring at Rankings",
      specialRules: "Espesyal na Patakaran",
      gettingStarted: "Pagsisimula",
      stepByStep: "Hakbang-hakbang",
      beginnerTips: "Tips para sa Baguhan",
      practice: "Practice Mode",
      privateRoom: "Private Room",
      publicOnline: "Public Online",
    },
  };

  const params = new URLSearchParams(window.location.search);

  let currentGame = params.get("game") || "teen-patti";
  let currentLanguage =
    localStorage.getItem("victoryWorldGuideLanguage") || "en";

  if (!supportedGames.includes(currentGame)) {
    currentGame = "teen-patti";
  }

  if (!labels[currentLanguage]) {
    currentLanguage = "en";
  }

  const languageSelect = document.getElementById("languageSelect");
  const languageLabel = document.querySelector(
    'label[for="languageSelect"]',
  );

  const gameTitle = document.getElementById("gameTitle");
  const gameIntro = document.getElementById("gameIntro");
  const rulesGrid = document.getElementById("rulesGrid");
  const howToPlayGrid = document.getElementById("howToPlayGrid");
  const gameModesGrid = document.getElementById("gameModesGrid");
  const guideError = document.getElementById("guideError");

  let guideData = null;

  function translatedValue(field) {
    if (!field) {
      return "";
    }

    return field[currentLanguage] || field.en || "";
  }

  function card(title, text) {
    const article = document.createElement("article");
    article.className = "guide-card";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const body = document.createElement("p");
    body.textContent = text;

    article.append(heading, body);

    return article;
  }

  function addSectionCards(target, section, keys, sectionLabels) {
    target.replaceChildren();

    for (const key of keys) {
      const text = translatedValue(section[key]);

      if (!text) {
        continue;
      }

      target.appendChild(
        card(sectionLabels[key] || key, text),
      );
    }
  }

  function render() {
    if (!guideData) {
      return;
    }

    const game = guideData.games[currentGame];

    if (!game) {
      guideError.hidden = false;
      guideError.textContent =
        "The requested game guide could not be found.";
      return;
    }

    guideError.hidden = true;

    const selectedLabels =
      labels[currentLanguage] || labels.en;

    document.documentElement.lang = currentLanguage;

    document.title =
      `${translatedValue(game.title)} | Victory World`;

    languageLabel.textContent = selectedLabels.language;

    gameTitle.textContent = translatedValue(game.title);
    gameIntro.textContent = translatedValue(game.intro);

    document.getElementById("rulesHeading").textContent =
      selectedLabels.rules;

    document.getElementById("howToPlayHeading").textContent =
      selectedLabels.howToPlay;

    document.getElementById("playModesHeading").textContent =
      selectedLabels.playModes;

    addSectionCards(
      rulesGrid,
      game.rules,
      [
        "objective",
        "setup",
        "turns",
        "actions",
        "winning",
        "scoring",
        "specialRules",
      ],
      selectedLabels,
    );

    addSectionCards(
      howToPlayGrid,
      game.howToPlay,
      [
        "gettingStarted",
        "stepByStep",
        "beginnerTips",
      ],
      selectedLabels,
    );

    addSectionCards(
      gameModesGrid,
      game.gameModes,
      [
        "practice",
        "privateRoom",
        "publicOnline",
      ],
      selectedLabels,
    );

    document
      .querySelectorAll("[data-game]")
      .forEach((link) => {
        link.classList.toggle(
          "active",
          link.dataset.game === currentGame,
        );
      });
  }

  languageSelect.value = currentLanguage;

  languageSelect.addEventListener("change", () => {
    currentLanguage = languageSelect.value;

    localStorage.setItem(
      "victoryWorldGuideLanguage",
      currentLanguage,
    );

    render();
  });

  fetch("content/game_guides.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Unable to load guides: ${response.status}`,
        );
      }

      return response.json();
    })
    .then((data) => {
      guideData = data;
      render();
    })
    .catch((error) => {
      console.error(error);

      guideError.hidden = false;
      guideError.textContent =
        "Victory World could not load this game guide.";
    });
})();

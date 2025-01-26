// const inputField = document.getElementById ('inputField');
// const keyboard = document.getElementById ('keyboard');

// const keys = {
//    en: [
//       ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
//       ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
//       ["z", "x", "c", "v", "b", "n", "m"],
//       ["Space", "Backspace", "Enter", "Shift"]
//    ],

//    ru: [
//       ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
//       ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
//       ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
//       ['Пробел', 'Backspace', 'Enter', 'Shift']
//     ]

// };

// let currentLang = "en";

// function createKeyboard(lang){
//    keyboard.innerHTML='';

//    keys[lang].forEach((row) => {
//       row.forEach((key) =>{
//          const keyElement = document.createElement('div');
//          keyElement.className = `key ${key.lenght > 1 ? 'special' : ''}`;
//          keyElement.textContent = key
//          keyElement.addEventListener ('click', () => handleKeyClick(key))
//          keyboard.appendChild(keyElement);
//       });
//    });

// }



// function handleKeyClick (key) {

//    switch (key){
//       case 'Space':
//           inputField.value += ' '
//       case ' Пробел':
//          inputField.value += ' '
//         break; 
//         case 'Backspace':
//          inputField.value = inputField.value.slice(0, -1);
//          break;
//          case 'Shift':
//             currentLang = currentLang == 'en' ? 'ru' : 'en';
//             createKeyboard(currentLang);
//             break;
//             default:
//                inputField.value += key;
//    }
// }

// createKeyboard(currentLang);

const inputField = document.getElementById("inputField");
const keyboard = document.getElementById("keyboard");

const keys = {
  en: [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
    ["Space", "Backspace", "Enter", "Shift"]
  ],
  ru: [
    ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з"],
    ["ф", "ы", "в", "а", "п", "р", "о", "л", "д"],
    ["я", "ч", "с", "м", "и", "т", "ь"],
    ["Пробел", "Backspace", "Enter", "Shift"]
  ]
};

let currentLang = "en";

function createKeyboard(lang) {
  keyboard.innerHTML = "";

  keys[lang].forEach((row) => {
    row.forEach((key) => {
      const keyElement = document.createElement("div");
      keyElement.className = `key ${key.length > 1 ? "special" : ""}`;
      keyElement.textContent = key;
      keyElement.dataset.key = key.toLowerCase(); // Для сопоставления с физической клавиатурой
      keyElement.addEventListener("click", () => handleKeyClick(key));
      keyboard.appendChild(keyElement);
    });
  });
}

function handleKeyClick(key) {
  switch (key) {
    case "Space":
    case "Пробел":
      inputField.value += " ";
      break;
    case "Backspace":
      inputField.value = inputField.value.slice(0, -1);
      break;
    case "Enter":
      inputField.value += "\n";
      break;
    case "Shift":
      currentLang = currentLang === "en" ? "ru" : "en";
      createKeyboard(currentLang);
      break;
    default:
      inputField.value += key;
  }
}

function highlightKey(pressedKey) {
  // Находим элемент виртуальной клавиши
  const keyElement = Array.from(keyboard.children).find(
    (key) =>
      key.dataset.key === pressedKey.toLowerCase() || // Для обычных клавиш
      (pressedKey === " " && key.textContent === "Space") || // Пробел
      (pressedKey === "Backspace" && key.textContent === "Backspace") || // Backspace
      (pressedKey === "Enter" && key.textContent === "Enter") || // Enter
      (pressedKey === "Shift" && key.textContent === "Shift") // Shift
  );

  if (keyElement) {
    keyElement.classList.add("active");
    setTimeout(() => keyElement.classList.remove("active"), 200); // Убираем подсветку
  }
}

// Обработка событий физической клавиатуры
document.addEventListener("keydown", (event) => {
  highlightKey(event.key); // Подсветка на виртуальной клавиатуре
  handlePhysicalKeyPress(event.key); // Обработка ввода
});

function handlePhysicalKeyPress(key) {
  switch (key) {
    case " ":
      inputField.value += " ";
      break;
    case "Backspace":
      inputField.value = inputField.value.slice(0, -1);
      break;
    case "Enter":
      inputField.value += "\n";
      break;
    case "Shift":
      currentLang = currentLang === "en" ? "ru" : "en";
      createKeyboard(currentLang);
      break;
    default:
      // Проверяем, доступен ли символ в текущей раскладке
      if (keys[currentLang].flat().includes(key.toLowerCase())) {
        inputField.value += key;
      }
  }
}

// Инициализация клавиатуры
createKeyboard(currentLang);

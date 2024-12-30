// Створити таблицю розміром (6х6). Клітини таблиці заповнюються послідовно номерами від 1 до 36 по рядкам.
// При наведенні на комірку, що відповідає номеру варіанта (85) - 36*2 = 13, виконується зміна кольору на випадковий,
//  при Click на ній – зміна кольору на вибраний з палітри, а при dblClick зміна кольору осередків таблиці крім обраної;

const table = document.getElementById('myTable');

// Функція для генерації випадкового кольору
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Функція для зміни кольору ячейки
function changeCellColor(cell, color) {
  cell.style.backgroundColor = color;
}

// Функція для обробки подій ячейки
function cellHandler(event) {
  const cell = event.target;
  const cellNumber = parseInt(cell.textContent);

  switch (event.type) {
    case 'mouseover':
      changeCellColor(cell, getRandomColor());
      break;
    case 'click':
        if (cellNumber === 13) {
            colorPicker.style.display = 'block'; 
            colorPicker.addEventListener('input', () => {
              changeCellColor(cell, colorPicker.value);
            });
          } else {
            colorPicker.style.display = 'none';
          }
      break;
    case 'dblclick':
      const allCells = document.querySelectorAll('td');
      allCells.forEach(cell => {
        changeCellColor(cell, getRandomColor());
      });
      break;
  }
}

function createTable() {
  let counter = 1;
  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 6; j++) {
      const cell = row.insertCell();
      cell.textContent = counter++;
      cell.addEventListener('mouseover', cellHandler);
      cell.addEventListener('click', cellHandler);
      cell.addEventListener('dblclick', cellHandler);
    }
  }
}

createTable();
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
  const cellIndex = 6;
  const cellNumber = parseInt(cell.textContent);

	if (cellNumber === cellIndex) { 
	  switch (event.type) {
		case 'mouseover':
		  changeCellColor(cell, getRandomColor());
		  break;
		case 'click':
				const selectedColor = document.getElementById('colorPicker').value;
				changeCellColor(cell, selectedColor);
		  break;
		case 'dblclick':
		  const neighborIndices = getNeighborsByIndex(cellNumber-1);
		  changeCellColor(cell, getRandomColor());
		  if (neighborIndices.left !== null) {
			const leftNeighbor = document.querySelectorAll('td')[neighborIndices.left];
			changeCellColor(leftNeighbor, getRandomColor());
		  }
		  if (neighborIndices.bottomLeft !== null) {
			const bottomLeft = document.querySelectorAll('td')[neighborIndices.bottomLeft];
			changeCellColor(bottomLeft, getRandomColor());
		  }
		  if (neighborIndices.bottomRight !== null) {
			const bottomRight = document.querySelectorAll('td')[neighborIndices.bottomRight];
			changeCellColor(bottomRight, getRandomColor());
		  }
		  break;
	  }
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
function getNeighborsByIndex(cellIndex) {
  const rowIndex = Math.floor(cellIndex / 6);
  const colIndex = cellIndex % 6;

  return {
    top: rowIndex > 0 ? rowIndex * 6 + colIndex - 6 : null,
    left: colIndex > 0 ? rowIndex * 6 + colIndex - 1 : null,
    bottomLeft: rowIndex < 5 ? (rowIndex + 1) * 6 + colIndex - 1 : null,
    bottomRight: rowIndex < 5 ? (rowIndex + 1) * 6 + colIndex : null
  };
}
createTable();

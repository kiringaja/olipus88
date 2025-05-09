const grid = document.getElementById('slot-grid');
const saldoEl = document.getElementById('saldo');
const winText = document.getElementById('win-text');
let saldo = 100000;
let spinCount = 0;

const simbols = ['crown', 'hourglass', 'ring', 'red', 'purple', 'yellow', 'green', 'blue'];
const simbolMap = {
  crown: 'crown.png',
  hourglass: 'hourglass.png',
  ring: 'ring.png',
  red: 'red.png',
  purple: 'purple.png',
  yellow: 'yellow.png',
  green: 'green.png',
  blue: 'blue.png'
};

function randomSymbol() {
  return simbols[Math.floor(Math.random() * simbols.length)];
}

function updateSaldo() {
  saldoEl.textContent = saldo.toLocaleString();
}

function generateGrid() {
  grid.innerHTML = '';
  const list = [];
  for (let i = 0; i < 30; i++) {
    const sym = randomSymbol();
    list.push(sym);
    const img = document.createElement('img');
    img.src = 'assets/' + simbolMap[sym];
    img.dataset.index = i;
    grid.appendChild(img);
  }
  return list;
}

function checkMatch(list) {
  const count = {};
  list.forEach(s => count[s] = (count[s] || 0) + 1);
  const matched = Object.entries(count).filter(([k, v]) => v >= 8);
  return matched;
}

function animateAndDrop(list, matched) {
  const items = [...grid.children];
  matched.forEach(([sym]) => {
    list.forEach((val, idx) => {
      if (val === sym) {
        items[idx].classList.add('pop');
      }
    });
  });

  setTimeout(() => {
    matched.forEach(([sym]) => {
      list.forEach((val, idx) => {
        if (val === sym) {
          list[idx] = randomSymbol();
          items[idx].src = 'assets/' + simbolMap[list[idx]];
          items[idx].classList.remove('pop');
        }
      });
    });
  }, 500);
}

function spin() {
  saldo -= 400;
  updateSaldo();
  winText.textContent = '';
  spinCount++;
  const list = generateGrid();
  const matched = checkMatch(list);
  if (matched.length > 0) {
    animateAndDrop(list, matched);
  }

  if (spinCount % 3 === 0) {
    const win = Math.floor(Math.random() * (60000 - 2000 + 1)) + 2000;
    saldo += win;
    updateSaldo();
    winText.textContent = 'MENANG BESAR! Rp ' + win.toLocaleString();
  }
}

document.getElementById('spin-btn').addEventListener('click', spin);
document.getElementById('buy-free-spin-btn').addEventListener('click', () => {
  if (saldo >= 20000) {
    saldo -= 20000;
    updateSaldo();
    spin();
    spin();
    spin();
  }
});

updateSaldo();
generateGrid();

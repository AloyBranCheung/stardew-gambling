// Mock DOM elements
document.body.innerHTML = `
  <div id="tokens">100</div>
  <div id="loseMessage" style="display: none;">You Lose</div>
  <button id="betBtn">Bet Half</button>
  <button id="martingaleBtn">Martingale</button>
  <button id="autoBetBtn">Auto Bet (Martingale)</button>
  <button id="resetBtn" style="display:none">Reset Game</button>
  <input type="number" id="customAmount" />
  <div id="history"></div>
`

// Mock Math.random for predictable tests
let mockRandomValue = 0.5
global.mockRandom = (value) => {
  mockRandomValue = value
}

Math.random = () => mockRandomValue
let tokens = 100;
let history = [];
let martingaleBetAmount = Math.floor(100 / 15);
let martingaleLosses = 0;
let lastLoss = 0;
let autoBetting = false;
let autoBetStartTokens = 0;

function bet() {
  const betAmount = Math.floor(tokens / 2);
  if (betAmount === 0) return;
  
  const win = Math.random() < 0.5;
  const oldTokens = tokens;
  tokens = win ? tokens + betAmount : tokens - betAmount;
  
  history.unshift({ bet: betAmount, win, oldTokens, newTokens: tokens });
  updateHistory();
  
  if (win) {
    martingaleLosses = 0;
    document.getElementById('martingaleBtn').disabled = false;
  }
  
  if (tokens <= 1) {
    document.getElementById('tokens').style.display = 'none';
    document.getElementById('loseMessage').style.display = 'block';
    document.getElementById('betBtn').style.display = 'none';
    document.getElementById('martingaleBtn').style.display = 'none';
    document.querySelector('button[onclick="reset()"]').style.display = 'none';
    document.getElementById('customAmount').style.display = 'none';
    document.querySelector('button[onclick="customBet()"]').style.display = 'none';
    document.getElementById('autoBetBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'inline';
    autoBetting = false;
  } else {
    document.getElementById('tokens').textContent = tokens;
  }
}

function martingaleBet() {
  if (martingaleLosses === 0) {
    martingaleBetAmount = Math.floor(tokens / 15);
  }
  
  if (tokens < martingaleBetAmount) return;
  
  const win = Math.random() < 0.5;
  const oldTokens = tokens;
  tokens = win ? tokens + martingaleBetAmount : tokens - martingaleBetAmount;
  
  history.unshift({ bet: martingaleBetAmount, win, oldTokens, newTokens: tokens });
  updateHistory();
  
  if (win) {
    martingaleBetAmount = Math.floor(tokens / 15);
    martingaleLosses = 0;
    lastLoss = 0;
    document.getElementById('martingaleBtn').disabled = false;
  } else {
    lastLoss = martingaleBetAmount;
    martingaleLosses++;
    if (martingaleLosses >= 3) {
      document.getElementById('martingaleBtn').disabled = true;
    } else {
      martingaleBetAmount = lastLoss * 2;
    }
  }
  
  if (tokens <= 1) {
    document.getElementById('tokens').style.display = 'none';
    document.getElementById('loseMessage').style.display = 'block';
    document.getElementById('betBtn').style.display = 'none';
    document.getElementById('martingaleBtn').style.display = 'none';
    document.querySelector('button[onclick="reset()"]').style.display = 'none';
    document.getElementById('customAmount').style.display = 'none';
    document.querySelector('button[onclick="customBet()"]').style.display = 'none';
    document.getElementById('autoBetBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'inline';
    autoBetting = false;
  } else {
    document.getElementById('tokens').textContent = tokens;
  }
}

function customBet() {
  const betAmount = parseInt(document.getElementById('customAmount').value);
  if (!betAmount || betAmount <= 0 || tokens < betAmount) return;
  
  const win = Math.random() < 0.5;
  const oldTokens = tokens;
  tokens = win ? tokens + betAmount : tokens - betAmount;
  
  history.unshift({ bet: betAmount, win, oldTokens, newTokens: tokens });
  updateHistory();
  
  if (win) {
    martingaleLosses = 0;
    document.getElementById('martingaleBtn').disabled = false;
  }
  
  if (tokens <= 1) {
    document.getElementById('tokens').style.display = 'none';
    document.getElementById('loseMessage').style.display = 'block';
    document.getElementById('betBtn').style.display = 'none';
    document.getElementById('martingaleBtn').style.display = 'none';
    document.querySelector('button[onclick="reset()"]').style.display = 'none';
    document.getElementById('customAmount').style.display = 'none';
    document.querySelector('button[onclick="customBet()"]').style.display = 'none';
    document.getElementById('autoBetBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'inline';
    autoBetting = false;
  } else {
    document.getElementById('tokens').textContent = tokens;
  }
  
  document.getElementById('customAmount').value = '';
}

function autoBet() {
  if (autoBetting) {
    autoBetting = false;
    document.getElementById('autoBetBtn').textContent = 'Auto Bet';
    return;
  }
  
  autoBetting = true;
  autoBetStartTokens = tokens;
  document.getElementById('autoBetBtn').textContent = 'Stop Auto';
  
  function runAutoBet() {
    if (!autoBetting || tokens <= 1) {
      if (tokens <= 1) {
        autoBetting = false;
        document.getElementById('autoBetBtn').textContent = 'Auto Bet';
      }
      return;
    }
    
    if (tokens >= autoBetStartTokens + 1000) {
      autoBetting = false;
      document.getElementById('autoBetBtn').textContent = 'Auto Bet';
      return;
    }
    
    if (tokens >= 100) {
      martingaleBet();
    } else {
      bet();
    }
    
    if (autoBetting && tokens > 1) {
      setTimeout(runAutoBet, 300);
    }
  }
  
  runAutoBet();
}

function reset() {
  tokens = 100;
  history = [];
  martingaleBetAmount = Math.floor(100 / 15);
  martingaleLosses = 0;
  lastLoss = 0;
  autoBetting = false;
  updateHistory();
  document.getElementById('tokens').textContent = tokens;
  document.getElementById('tokens').style.display = 'block';
  document.getElementById('loseMessage').style.display = 'none';
  document.getElementById('betBtn').style.display = 'inline';
  document.getElementById('martingaleBtn').style.display = 'inline';
  document.getElementById('martingaleBtn').disabled = false;
  document.querySelector('button[onclick="reset()"]').style.display = 'inline';
  document.getElementById('customAmount').style.display = 'inline';
  document.querySelector('button[onclick="customBet()"]').style.display = 'inline';
  document.getElementById('autoBetBtn').style.display = 'inline';
  document.getElementById('autoBetBtn').textContent = 'Auto Bet';
  document.getElementById('resetBtn').style.display = 'none';
}

function updateHistory() {
  const historyDiv = document.getElementById('history');
  historyDiv.innerHTML = history.map(h => 
    `<div class="bet-item ${h.win ? 'win' : 'lose'}">
      Bet ${h.bet}: ${h.win ? 'WIN' : 'LOSE'}<br>
      ${h.oldTokens} → ${h.newTokens}
    </div>`
  ).join('');
}
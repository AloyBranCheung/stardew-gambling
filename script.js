let tokens = 100;
let history = [];
let martingaleBetAmount = Math.floor(100 / 15);
let martingaleLosses = 0;
let lastLoss = 0;
let autoBetting = false;
let autoBetStartTokens = 0;
let autoMartingaleBetAmount = Math.floor(100 / 15);
let autoMartingaleLosses = 0;
let autoLastLoss = 0;

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
    showGameOver();
  } else {
    document.getElementById('tokens').textContent = tokens;
    checkMartingaleButtons();
  }
}

function allInBet() {
  if (tokens <= 0) return;
  
  const betAmount = tokens;
  const win = Math.random() < 0.5;
  const oldTokens = tokens;
  tokens = win ? tokens + betAmount : 0;
  
  history.unshift({ bet: betAmount, win, oldTokens, newTokens: tokens });
  updateHistory();
  
  if (win) {
    martingaleLosses = 0;
    document.getElementById('martingaleBtn').disabled = false;
  }
  
  if (tokens <= 1) {
    showGameOver();
  } else {
    document.getElementById('tokens').textContent = tokens;
    checkMartingaleButtons();
  }
}

function showGameOver() {
  document.getElementById('tokens').style.display = 'none';
  document.getElementById('loseMessage').style.display = 'block';
  document.getElementById('betBtn').style.display = 'none';
  document.getElementById('allInBtn').style.display = 'none';
  document.getElementById('martingaleBtn').style.display = 'none';
  document.querySelector('button[onclick="reset()"]').style.display = 'none';
  document.getElementById('customAmount').style.display = 'none';
  document.querySelector('button[onclick="customBet()"]').style.display = 'none';
  document.getElementById('autoBetBtn').style.display = 'none';
  document.getElementById('stats').style.display = 'none';
  document.getElementById('resetBtn').style.display = 'inline';
  autoBetting = false;
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
    showGameOver();
  } else {
    document.getElementById('tokens').textContent = tokens;
    checkMartingaleButtons();
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
    showGameOver();
  } else {
    document.getElementById('tokens').textContent = tokens;
    checkMartingaleButtons();
  }
  
  document.getElementById('customAmount').value = '';
}

function autoBet() {
  if (autoBetting) {
    autoBetting = false;
    document.getElementById('autoBetBtn').textContent = 'Auto Bet (Martingale)';
    return;
  }
  
  autoBetting = true;
  autoBetStartTokens = tokens;
  autoMartingaleBetAmount = Math.floor(tokens / 15);
  autoMartingaleLosses = 0;
  autoLastLoss = 0;
  document.getElementById('autoBetBtn').textContent = 'Stop Auto (Martingale)';
  
  function runAutoBet() {
    if (!autoBetting || tokens <= 1) {
      if (tokens <= 1) {
        autoBetting = false;
        document.getElementById('autoBetBtn').textContent = 'Auto Bet (Martingale)';
      }
      return;
    }
    
    if (tokens >= autoBetStartTokens + 1000) {
      autoBetting = false;
      document.getElementById('autoBetBtn').textContent = 'Auto Bet (Martingale)';
      return;
    }
    
    // Auto-martingale logic (never disables)
    if (autoMartingaleLosses === 0) {
      autoMartingaleBetAmount = Math.floor(tokens / 15);
    }
    
    if (autoMartingaleBetAmount === 0 || tokens < autoMartingaleBetAmount) {
      autoBetting = false;
      document.getElementById('autoBetBtn').textContent = 'Auto Bet (Martingale)';
      checkMartingaleButtons();
      return;
    }
    
    const win = Math.random() < 0.5;
    const oldTokens = tokens;
    tokens = win ? tokens + autoMartingaleBetAmount : tokens - autoMartingaleBetAmount;
    
    history.unshift({ bet: autoMartingaleBetAmount, win, oldTokens, newTokens: tokens });
    updateHistory();
    
    if (win) {
      autoMartingaleBetAmount = Math.floor(tokens / 15);
      autoMartingaleLosses = 0;
      autoLastLoss = 0;
    } else {
      autoLastLoss = autoMartingaleBetAmount;
      autoMartingaleLosses++;
      autoMartingaleBetAmount = autoLastLoss * 2;
    }
    
    document.getElementById('tokens').textContent = tokens;
    
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
  document.getElementById('allInBtn').style.display = 'inline';
  document.getElementById('martingaleBtn').style.display = 'inline';
  document.getElementById('martingaleBtn').disabled = false;
  document.querySelector('button[onclick="reset()"]').style.display = 'inline';
  document.getElementById('customAmount').style.display = 'inline';
  document.querySelector('button[onclick="customBet()"]').style.display = 'inline';
  document.getElementById('autoBetBtn').style.display = 'inline';
  document.getElementById('autoBetBtn').textContent = 'Auto Bet (Martingale)';
  document.getElementById('stats').style.display = 'block';
  document.getElementById('resetBtn').style.display = 'none';
  updateStats();
  checkMartingaleButtons();
}

function checkMartingaleButtons() {
  const minBet = Math.floor(tokens / 15);
  if (minBet === 0) {
    document.getElementById('martingaleBtn').disabled = true;
    document.getElementById('autoBetBtn').disabled = true;
    if (autoBetting) {
      autoBetting = false;
      document.getElementById('autoBetBtn').textContent = 'Auto Bet (Martingale)';
    }
  } else {
    if (martingaleLosses < 3) {
      document.getElementById('martingaleBtn').disabled = false;
    }
    document.getElementById('autoBetBtn').disabled = false;
  }
}

function updateStats() {
  if (history.length === 0) {
    document.getElementById('winLossRatio').textContent = '0/0';
    document.getElementById('winPercentage').textContent = '0%';
    return;
  }
  
  const wins = history.filter(h => h.win).length;
  const losses = history.length - wins;
  const winPercentage = Math.round((wins / history.length) * 100);
  
  document.getElementById('winLossRatio').textContent = `${wins}/${losses}`;
  document.getElementById('winPercentage').textContent = `${winPercentage}%`;
}

function updateHistory() {
  const historyDiv = document.getElementById('history');
  historyDiv.innerHTML = history.map(h => {
    const change = h.win ? `+${h.bet}` : `-${h.bet}`;
    return `<div class="bet-item ${h.win ? 'win' : 'lose'}">
      Bet ${h.bet}: ${h.win ? 'WIN' : 'LOSE'} (${change})<br>
      ${h.oldTokens} → ${h.newTokens}
    </div>`;
  }).join('');
  updateStats();
}
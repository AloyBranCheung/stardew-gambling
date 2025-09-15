// Export functions for testing
export let tokens = 100;
export let history = [];
export let martingaleBetAmount = Math.floor(100 / 15);
export let martingaleLosses = 0;
export let lastLoss = 0;
export let autoBetting = false;

export function bet() {
  const betAmount = Math.floor(tokens / 2);
  if (betAmount === 0) return;
  
  const win = Math.random() < 0.5;
  const oldTokens = tokens;
  tokens = win ? tokens + betAmount : tokens - betAmount;
  
  history.unshift({ bet: betAmount, win, oldTokens, newTokens: tokens });
  
  if (win) {
    martingaleLosses = 0;
  }
  
  return { tokens, win, betAmount };
}

export function martingaleBet() {
  if (martingaleLosses === 0) {
    martingaleBetAmount = Math.floor(tokens / 15);
  }
  
  if (tokens < martingaleBetAmount) return null;
  
  const win = Math.random() < 0.5;
  const oldTokens = tokens;
  tokens = win ? tokens + martingaleBetAmount : tokens - martingaleBetAmount;
  
  history.unshift({ bet: martingaleBetAmount, win, oldTokens, newTokens: tokens });
  
  if (win) {
    martingaleBetAmount = Math.floor(tokens / 15);
    martingaleLosses = 0;
    lastLoss = 0;
  } else {
    lastLoss = martingaleBetAmount;
    martingaleLosses++;
    if (martingaleLosses < 3) {
      martingaleBetAmount = lastLoss * 2;
    }
  }
  
  return { tokens, win, betAmount: history[0].bet, disabled: martingaleLosses >= 3 };
}

export function checkMartingaleButtons() {
  const minBet = Math.floor(tokens / 15);
  return {
    martingaleDisabled: minBet === 0 || martingaleLosses >= 3,
    autoBetDisabled: minBet === 0
  };
}

export function reset() {
  tokens = 100;
  history = [];
  martingaleBetAmount = Math.floor(100 / 15);
  martingaleLosses = 0;
  lastLoss = 0;
  autoBetting = false;
  return { tokens, history, martingaleLosses };
}
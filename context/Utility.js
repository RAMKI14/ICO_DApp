export const handleTrnsactionError = (
  error,
  context = "transaction",
  logToConsole = true
) => {
  if (logToConsole) {
    console.error(`Error in ${context}:`, error);
  }

  let errorMessage = "Transaction Failed!";
  let errorCode = "UNKNOWN_ERROR";

  const code =
    error?.code ||
    (error?.error && error.error.code) ||
    (error.data && error.data.code);

  const isRejected =
    (error?.message &&
      error.message.includes("User denied transaction signature")) ||
    error.message.includes("Rejected Transaction") ||
    error.message.includes("User rejected the request") ||
    error.message.includes("ACTIONS_REJECTED");

  if (isRejected || code === "ACTION_REJECTED" || code === 4001) {
    errorMessage = "Transaction Rejected by user";
    errorCode = "ACTION_REJECTED";
  } else if (code === "INSUFFICIENT_FUNDS" || code === -32000) {
    errorMessage = "Insufficient funds for transaction";
    errorCode = "INSUFFICIENT_FUNDS";
  } else if (error.reason) {
    errorMessage = error.reason;
    errorCode = "CONTRACT_ERROR";
  } else if (error.message) {
    const message = error.message;

    if (message.includes("gas required exeeds allowance")) {
      errorMessage = "Gas required exceeds your ETH balance";
      errorCode = "GAS_EXCEEDS_ALLOWANCE";
    } else if (message.includes("nonce too low")) {
      errorMEssage = "Transaction with same nonce already processed";
      errorCode = "NONCE_ERROR";
    } else if (message.includes("replacement transaction underpriced")) {
      errorMessage = "Gas price too low to replace pending transaction";
      errorCode = "GAS_PRICE_ERROR";
    } else {
      errorMessage = message;
      errorCode = "UNKNOWN_ERROR";
    }
  }

  return { message: errorMessage, code: errorCode };
};

export const erc20Abi = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address spender, address recipient, uint256 amount) returns (bool)",
];

export const generateId = () =>
  `transaction-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;

const PROXY_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'ApprovalFailed',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'string', name: 'reason', type: 'string' },
    ],
    name: 'CallFailed',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'NotAContract',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'TransferFailed',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }],
    name: '_decodeString',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_targetContract', type: 'address' },
      { internalType: 'address', name: '_collateralToken', type: 'address' },
      { internalType: 'uint256', name: '_depositAmount', type: 'uint256' },
      { internalType: 'uint256', name: '_minAmountOut', type: 'uint256' },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
    name: 'isContract',
    outputs: [{ internalType: 'bool', name: 'isInverter', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_targetContract', type: 'address' },
      { internalType: 'address', name: '_tokenToSell', type: 'address' },
      { internalType: 'uint256', name: '_depositAmount', type: 'uint256' },
      { internalType: 'uint256', name: '_minAmountOut', type: 'uint256' },
    ],
    name: 'sell',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export default PROXY_CONTRACT_ABI;

export const fundingManagerAbi = [
  {
    inputs: [],
    name: 'projectCollateralFeeCollected',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    type: 'function',
    name: 'withdrawProjectCollateralFee',
    inputs: [
      {
        name: '_receiver',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
];

export const roleModuleAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
      { internalType: 'enum Enum.Operation', name: 'operation', type: 'uint8' },
    ],
    name: 'execTransactionFromModule',
    outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const claimAllAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'client',
        type: 'address',
      },
    ],
    name: 'claimAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const claimTokensABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'client',
        type: 'address',
      },
    ],
    name: 'claimAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'client',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'paymentReceiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'streamId',
        type: 'uint256',
      },
    ],
    name: 'releasableForSpecificStream',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'client',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'paymentReceiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'streamId',
        type: 'uint256',
      },
    ],
    name: 'releasedForSpecificStream',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'client',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'paymentReceiver',
        type: 'address',
      },
    ],
    name: 'isActivePaymentReceiver',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'client',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'paymentReceiver',
        type: 'address',
      },
    ],
    name: 'viewAllPaymentOrders',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'streamId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct PaymentOrder[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

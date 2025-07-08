// Orchestrator ABI - minimal version for getting authorizer address
const ORCHESTRATOR_ABI = [
  {
    inputs: [],
    name: 'authorizer',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export default ORCHESTRATOR_ABI;

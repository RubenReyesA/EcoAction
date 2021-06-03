exports.pass = process.env.SMARTCONTRACT_PASS;

exports.contractAddr = "0x3De3d9802380390F39774162717818dF5a2afAaF";
exports.ABITest = [{
    "inputs": [{
        "internalType": "address",
        "name": "addrSRC",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "addrDST",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "q",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "allTokens",
        "type": "bool"
      }
    ],
    "name": "adminTokenTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "destroy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address payable",
      "name": "addr",
      "type": "address"
    }],
    "name": "setAdministrator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }],
    "name": "setTokenValue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "tokenGeneration",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "address payable",
        "name": "addrDST",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "tokenSpend",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "address",
        "name": "addrSRC",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "addrDST",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "q",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "comission",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "tokenTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "address",
        "name": "addrSRC",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "addrDST",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "q",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "comission",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "tokenTransferAward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "name": "balances",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "address",
      "name": "client",
      "type": "address"
    }],
    "name": "getSizeItems",
    "outputs": [{
      "internalType": "uint256",
      "name": "size",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "itemAccounts",
    "outputs": [{
        "internalType": "string",
        "name": "wasteFacilities",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isPositive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
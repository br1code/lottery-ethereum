import web3 from './web3';

const address = '0x34e9b4096B24EbF0dD8BEF704374520C3Ee29C89';

const abi = [
    {
        "constant": false,
        "inputs": [],
        "name": "selectWinner",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0x33a99e04"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "manager",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x481c6a75"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPlayers",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8b5b9ccc"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "enter",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0xe97dcb62"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "lastWinner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xfe188184"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    }
];

export default new web3.eth.Contract(abi, address);
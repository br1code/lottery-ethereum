import Web3 from 'web3';

// use the Metamask provider to create a new instance of web3
const web3 = new Web3(window.web3.currentProvider);

export default web3;
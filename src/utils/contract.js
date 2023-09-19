// export default
import { ethers } from 'ethers';
import abi from './abi.js';
let provider;
import Web3 from 'web3';

export async function getContract(symbol, checkApprove) {
  const provider = new ethers.providers.JsonRpcProvider("https://bscrpc.com");
  const contract = new ethers.Contract(symbol, abi, provider);
  return contract

}

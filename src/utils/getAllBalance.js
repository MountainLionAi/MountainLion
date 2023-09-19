import axios from 'axios';
import ETH_erc20 from './eth-erc20';
import  network  from './network';
export async function getAllBalance(list, key, walletAddress) {
  if (walletAddress === '') return;
  const netWork = network.find((e) => {
    return e.chainId == key;
  });

  const api = netWork.rpcUrl;
  const params = await getParams(list, walletAddress); 
  if (params.length < 100) {
    const result = new Promise(function (resolve, reject) {
      axios.post(api, params).then((response) => {
        resolve(response);
      });
    });
    return result;
  } else {
    const params1 = params.slice(0, 100);
    const params2 = params.slice(100);
    const resut1 = await axios.post(api, params1);
    const resut2 = await axios.post(api, params2);
    return [...resut1, ...resut2];
  }
}
async function getParams(list, walletAddress) {
  const module = await import('web3');
  const Web3 = module.default;
  const web3 = new Web3();
  let params = new Array(list.length);
  list.forEach(async (coin, index) => {
    let methodNameEvm = 'eth_getBalance';
    let methodNameEvmDaibi = 'eth_call';

    if (
      coin.fromTokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ||
      coin.fromTokenAddress === '0x0000000000000000000000000000000000000000'
    ) {
      params[index] = {
        id: 1,
        jsonrpc: '2.0',
        method: methodNameEvm,
        params: [walletAddress, 'latest'],
      };
    }

    if (
      coin.fromTokenAddress !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
      coin.fromTokenAddress !== '0x0000000000000000000000000000000000000000'
    ) {
      const ethErc20Contract = new web3.eth.Contract(
        ETH_erc20,
        coin.fromTokenAddress,
      );
      const data = await ethErc20Contract.methods
        .balanceOf(walletAddress)
        .encodeABI();
      params[index] = {
        id:
          coin.fromChainId == '56' || coin.fromChainId == '137'
            ? '1' + index
            : 1,
        jsonrpc: '2.0',
        method: methodNameEvmDaibi,
        params: [
          {
            data: data,
            from: walletAddress,
            to: coin.fromTokenAddress,
          },
          'latest',
        ],
      };
    }
  });
  return params;
}
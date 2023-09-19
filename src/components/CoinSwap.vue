<template>
   <div class="chat-list">
        <div class="answer">
            <img src="/@/assets/imgs/logo.svg" alt="">
            <div class="text-content">
                <div class="inner">
                    <span class="innerText">{{presetData.content}}</span>
                    <div class="swap" v-if="presetData.presetContent.transferData">
                        <el-button v-if="!presetData.expired" class="swap-btn" @click="submit" :loading="submitLoading">
                            {{ showBtnText }}
                        </el-button>
                        <el-button v-else class="swap-btn disabled">
                            {{ $t('chatTimeout') }}
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore} from 'vuex'
import { useI18n } from 'vue-i18n'
import network from '/@/utils/network.js'
import { getContract } from '/@/utils/contract';
import { ethers } from 'ethers';
import { getAllBalance } from '/@/utils/getAllBalance';
import BigNumber from 'bignumber.js'
let provider, signer;
if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  signer = provider.getSigner();
}

export default {
 name: '',
 props:{
   presetData:{
       type: Object,
       default: null
   },
 },
 setup(props) {
   const { t } = useI18n();
   const presetData = ref(null)
   watch(() => props.presetData, (newValue, oldValue) => {
       presetData.value = newValue
   })
   presetData.value = props.presetData
   const address = ref('') // 钱包地址
   const chainId = ref('')//当前网络
   let fromChainId,fromAddress,calldata
   if(presetData.value.presetContent.transferData){
      fromChainId = presetData.value.presetContent.transferData.fromChainId
      fromAddress =  presetData.value.presetContent.from
      calldata = presetData.value.presetContent
   }
   const submitLoading = ref(false)
   const showBtnText = computed( () => {
    if(address.value == ''){
        return t('connectWallet')
    }else{
        return t('swap')
    }
   })
   const connectWallet = () => {
        //监听链变化
        window.ethereum.on('chainChanged', (id) => {
            chainId.value = parseInt(id, 16)
        })
        //监听账户变化
        window.ethereum.on('accountsChanged', (accounts) => {
            address.value = accounts[0]
        })
        window.ethereum
        .request({ method: 'eth_requestAccounts', params: [] })
        .then((res) => {
          ethereum.request({ method: 'eth_chainId' }).then((res) => {
            chainId.value = parseInt(res) + ''
          })
          address.value = res[0]
        })
        .catch((error) => {
         
        })
   }
   const changeNetwork = () => {
    const e = network.filter( item => item.chainId == fromChainId)[0]
    window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
            chainId: `0x${fromChainId.toString(16)}`,
            chainName:
                e.netWork == 'ORC' ? 'Ontology EVM' : e.netWork,
            nativeCurrency: {
                name: e.symbol,
                symbol: e.symbol,
                decimals: e.decimals,
            },
            rpcUrls: [e.rpcUrl],
            blockExplorerUrls: [e.blockExplorerUrls],
            },
        ],
        })
        .then(() => {
            chainId.value = fromChainId
        })
        .catch((error) => {
            console.log(error)
        })
   }
    //余额判断
    const BalanceCount = async(calldata) => {
      let list = [calldata.transferData];
      const dataBanlance = await getAllBalance(
        list,
        fromChainId,
        address.value,
      );
      const balance = new BigNumber(dataBanlance.data[0].result)
        .shiftedBy(-calldata.transferData.fromTokenDecimals)
        .toFixed(6, BigNumber.ROUND_DOWN);
      if (
        Number(balance) <
        Number(calldata.transferData.fromTokenAmount) /
          10**calldata.transferData.fromTokenDecimals
      ) {
        ElMessage({
            message: t('Insufficientbalance'),
            type: 'warning',
        })
        submitLoading.value = false
      } else {
        isApproved(calldata);
      }
    }
    //metaMask发币
    const metaMaskExchange = async(calldata) => {
      let transactionParameters = {
        to: calldata.to, // Required except during contract publications.
        from: address.value, // must match user's active address.
        data: calldata.data,
        value: calldata.value,
        gasLimit: 1000000, // 6 gwei
      };
      signer
        .sendTransaction(transactionParameters)
        .then((data) => {
            ElMessage({
                message: t('swapSuccess'),
                type: 'success',
            })
          submitLoading.value = false
        })
        .catch((error) => {
            submitLoading.value = false
            ElMessage({
                message: t('cancleSign'),
                type: 'error',
            })
        });
    }

    // 判断是否需要approve授权
    const isApproved = async (calldata) => {
      //主币不需要授权
      if (
        calldata.transferData.fromTokenAddress ===
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
      ) {
        metaMaskExchange(calldata);
      } else {
        let contract = await getContract(
          calldata.transferData.fromTokenAddress,
          true,
        );
        const contractAddress = calldata.to;
        const allowAmt = await contract.allowance(
          address.value,
          contractAddress,
        );
        const num = new BigNumber(ethers.utils.formatUnits(allowAmt, 18));
        const fromNumber =
        Number(calldata.transferData.fromTokenAmount) /
        10**calldata.transferData.fromTokenDecimals;
        const fromTokenNum = new BigNumber(fromNumber);
        if (num.gte(fromTokenNum)) {
            metaMaskExchange(calldata);
        } else {
            approve(calldata);
        }
      }
    }
    // approve操作 授权
    const approve = async(calldata) => {
      let contractAddress = calldata.to;
      const contract = await getContract(
        calldata.transferData.fromTokenAddress,
      );

      contract.estimateGas
        .approve(contractAddress, ethers.constants.MaxUint256, {
          from: address.value,
        })
        .then((res) => {
          const a = contract
            .connect(signer)
            .approve(contractAddress, ethers.constants.MaxUint256, {
              from: address.value,
            })
            .then((data) => {
              metaMaskExchange(calldata);
            })
            .catch((error) => {
              ElMessage({
                    message: t('cancleSign'),
                    type: 'error',
                })
              submitLoading.value = false
            });
        });
    }

   const submit = () => {
    if(address.value == ''){
        connectWallet()
    }else if(fromAddress.toLowerCase() != address.value.toLowerCase()){
        ElMessage({
            message: t('daddress'),
            type: 'warning',
        })
    }else{
        if(fromChainId != chainId.value){
            changeNetwork()
        }else{
            submitLoading.value = true
            BalanceCount(calldata)
        }
    }
   }
   return {
       presetData,
       submit,
       showBtnText,
       address,
       chainId,
       submitLoading
   } 
 },
 components: {
   
 },
 methods: {
   
 },
 mounted() {
   
 },
 unmounted() {
   
 },
}
</script>

<style scoped lang='scss'>
   .chat-list{
           text-align: left;
           display: flex;
           margin-top: .3rem;
          &.right-content{
           justify-content: flex-end;
          }
           .question,.answer{
               display: flex;
               width: 100%;
               padding-right: 1rem;
               img,.img{
                   width: .8rem;
                   height: .8rem;
               }
              .text-content{
                   flex: 1;
                   min-height: 1rem;
                   box-sizing: border-box;
                   display: flex;
                   align-items: center;
                   .inner{
                       word-break: break-all;
                       padding: .25rem .4rem;
                       font-size: 0.256rem;
                       line-height: .37rem;
                       font-family: Poppins-Regular, Poppins;
                       font-weight: 400;
                       .innerText{
                            white-space:pre-line
                        }
                   }
               }
               .record-content{
                   width: 100%;
                   margin-left: .1rem;
               }
           }
           .question{
               padding-right: 0;
               padding-left: 1rem;

               .text-content{
                   justify-content: flex-end;
                   .inner{
                       word-break: break-all;
                       margin-right: .1rem;
                       background: #00FF66;
                       border-radius: .25rem .1rem  .25rem  .25rem;
                       color: #000000;
                   }
               }
              
           }
           .answer{
               .text-content{
                  .inner{
                   word-break: break-all;
                   margin-left: .1rem;
                   background: #1C1E1F;
                   color: #ffffff;
                   border-radius:  .1rem  .25rem  .25rem .25rem;
                   .swap{
                        margin-top: .2rem;
                        .swap-btn{
                            cursor: pointer;
                            display: inline-block;
                            padding: .1rem .3rem;
                            background: #00FF66;
                            box-shadow: 0px 4px 20px -6px rgba(0, 0, 0, 0.15);
                            border-radius: 0.2rem;
                            color: #000000;
                            border: none;
                            &.disabled{
                              background: #575152;
                              color: #ffffff;
                            }
                        }
                   }
                  }
               }
           }
   }
</style>
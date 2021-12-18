import React, { Component } from 'react';
import Web3 from 'web3';

import {Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav} from 'react-bootstrap';

import SyfinAvatars from '../../abis/SyfinAvatars.json';
import Syfin from '../../abis/Syfin.json';
import SyfinVerified from '../../abis/SyfinVerified.json';
import Jazzicon, { jsNumberForAddress }  from 'react-jazzicon';

import {
  Link
} from "react-router-dom";


class NavbarMain extends Component {

  constructor(props) {
    super(props)

    this.state = {
      account: '',
      ipfs: '',
      mim: '',
      name: '',
      balance: 0,
      ftmbalance: 0,
      wrabalance: 0,
      verified: false
    }
  }

  async componentWillMount() {
    await this.loadMetaMask()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      window.loaded_web3 = true
      // await window.ethereum.enable()
      // await window.ethereum.sendAsync('eth_requestAccounts');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Get a Web3 instance for the wallet
      const web3 = new Web3(window.ethereum);
      // window.web3 = new Web3(window.ethereum);
    
      console.log("Web3 instance is", web3);
    
      // Get connected chain id from Ethereum node
      const chainId = await web3.eth.getChainId();

      window.ethereum.on('accountsChanged', function (accounts) {
        const account = accounts;
        console.log("Account changed", account[0]);
        window.location.reload();      
      });
    
      if (chainId == 250) {
    
      } else {
        console.log('Not on Fantom Chain');
        // If we are not on the Fantom chain,
         // Check if MetaMask is installed
        // MetaMask injects the global API into window.ethereum
        if (window.ethereum) {
          try {
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xFA' }], // chainId must be in hexadecimal numbers
            });
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0xFA',
                      rpcUrl: 'https://rpc.ftm.tools/',
                    },
                  ],
                });
              } catch (addError) {
                console.error(addError);
              }
            }
            console.error(error);
          }
        } else {
          // if no window.ethereum then MetaMask is not installed
          alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        } 
      }
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.loaded_web3 = true
      // Get a Web3 instance for the wallet
      const web3 = new Web3(window.ethereum);
      // window.web3 = new Web3(window.ethereum);
    
      console.log("Web3 instance is", web3);
    
      // Get connected chain id from Ethereum node
      const chainId = await web3.eth.getChainId();
    
      if (chainId == 250) {
    
      } else {
        console.log('Not on Fantom Chain');
        // If we are not on the Fantom chain,
          // Check if MetaMask is installed
        // MetaMask injects the global API into window.ethereum
        if (window.ethereum) {
          try {
            // check if the chain to connect to is installed
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xFA' }], // chainId must be in hexadecimal numbers
            });
          } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0xFA',
                      rpcUrl: 'https://rpc.ftm.tools/',
                    },
                  ],
                });
              } catch (addError) {
                console.error(addError);
              }
            }
            console.error(error);
          }
        } else {
          // if no window.ethereum then MetaMask is not installed
          alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        } 
      }
    }
    else {
      window.alert('Non-Fantom browser detected. You should consider trying MetaMask!')
    }
  }

  async loadMetaMask() {
    await this.loadWeb3()

    if (window.loaded_web3) {
      const accounts = await window.web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
    }

    const web3ftm = new Web3("https://rpc.ftm.tools/");

    const abia = Syfin.abi
    const addr = "0x1BCF4DC879979C68fA255f731FE8Dcf71970c9bC"
    const contract = new web3ftm.eth.Contract(abia, addr)

    const abiw = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeFromFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"accounts","type":"address[]"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeMultipleAccountsFromFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"newValue","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"oldValue","type":"uint256"}],"name":"GasForProcessingUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newLiquidityWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldLiquidityWallet","type":"address"}],"name":"LiquidityWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"iterations","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claims","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastProcessedIndex","type":"uint256"},{"indexed":true,"internalType":"bool","name":"automatic","type":"bool"},{"indexed":false,"internalType":"uint256","name":"gas","type":"uint256"},{"indexed":true,"internalType":"address","name":"processor","type":"address"}],"name":"ProcessedDividendTracker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SendDividends","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateDividendTracker","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateUniswapV2Router","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SYF","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SYFRewardsFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_marketingWalletAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"blacklistAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint256","name":"votes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deadWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"dividendTokenBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dividendTracker","outputs":[{"internalType":"contract WraithDividendTracker","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeMultipleAccountsFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gasForProcessing","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountDividendsInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAccountDividendsInfoAtIndex","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClaimWait","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastProcessedIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getNumberOfDividendTokenHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"gas","type":"uint256"}],"name":"processDividendTracker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setLiquidityFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setMarketingFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"wallet","type":"address"}],"name":"setMarketingWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setSYFRewardsFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapTokensAtAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"claimWait","type":"uint256"}],"name":"updateClaimWait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updateDividendTracker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"updateGasForProcessing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxWallet","type":"uint256"}],"name":"updateMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updateUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"withdrawableDividendOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

    const addrw = "0x4cf098d3775bd78a4508a13e126798da5911b6cd"

    const contractwra = new web3ftm.eth.Contract(abiw, addrw)

    const abi = SyfinAvatars.abi
    const address = "0x2a4e02D729924eCe6A3292F9Ba8e1B0B32d7850F"
    const contractav = new web3ftm.eth.Contract(abi, address)
    // console.log(contract)
    this.setState({ contractav })

    if (this.state.account) {
    const getIPFS = await contractav.methods.getIPFSHash(this.state.account).call()
    // console.log(getIPFS)
    const getMIME = await contractav.methods.getMIMEType(this.state.account).call()
    // console.log(getMIME)
    const getName = await contractav.methods.getName(this.state.account).call()
    // console.log(getName)
    this.setState({ ipfs: getIPFS })
    this.setState({ mim: getMIME })
    this.setState({ name: getName })
    
    const balfmt = await contract.methods.balanceOf(this.state.account).call()
    const bal = web3ftm.utils.fromWei(balfmt, 'ether')
    const balance = Number(bal).toFixed(2)

    const balwra = await contractwra.methods.balanceOf(this.state.account).call()
    const wrabal = web3ftm.utils.fromWei(balwra, 'ether')
    const wrabalance = Number(wrabal).toFixed(2)

    const ftmbalance = web3ftm.utils.fromWei(await web3ftm.eth.getBalance(this.state.account), 'ether');

    this.setState({ ftmbalance })

    this.setState({ wrabalance })

    this.setState({ balance })

    const abiv = SyfinVerified.abi
    const addrv = "0x6986aF780e5E14f82D21F2D47F64c8C7b7cc07F9"
    const contractv = new web3ftm.eth.Contract(abiv, addrv)

    const getVerified = await contractv.methods.getVerified(this.state.account).call()

    this.setState({ verified: getVerified })
    }

  }

  render() {

    return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

                <Navbar.Brand href="/">
              <img alt="icon" className="iconimage d-inline-block align-top" src="/syfinlogo.png" style={{marginLeft:"10px", maxHeight:"50px", maxWidth: "350px" }} />{' '}
              </Navbar.Brand>
              {(window.loaded_web3 && this.state.account.length > 0) ?
                        (
                <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{marginRight:"15px"}}>{
                        (this.state.ipfs !== "" && (this.state.mim === "image/jpeg" || this.state.mim === "image/png" || this.state.mim === "image/gif")) ?
                        ( <div style={{position: "relative", width: "38px", margin: "0 auto"}}><img src={"https://ipfs.sy.finance/ipfs/"+this.state.ipfs} alt="" border="0" height="38px" width="38px" style={{borderRadius: "50%"}} />
                        
                        {(this.state.verified === true) ? (
                        <div style={{position: "absolute", bottom: "-2px", right: "-1px"}}><svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                        ) : null
                        }
                        </div>
                         ) :
                        ( <div style={{position: "relative", width: "38px", margin: "0 auto"}}><Jazzicon diameter={38} seed={jsNumberForAddress(this.state.account)} />
                        
                        {(this.state.verified === true) ? (
                        <div style={{position: "absolute", bottom: "-2px", right: "-1px"}}><svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                        ) : null
                        }
                        
                        </div> )
                      }</Navbar.Toggle>
                        ) : (
                          <button type="button" onClick={(e) => { this.loadMetaMask() }} className="btn btn-outline-light mx-4 rounded" style={{marginTop: "-2px", position: "absolute", right: "-16px"}}><svg width="18" height="16" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.73795 17.9957C9.33603 17.9957 8.92953 18.0094 8.5276 17.9866C8.36318 17.9774 8.17591 17.9318 8.04346 17.8358C7.34009 17.3426 6.65041 16.831 5.96074 16.3195C5.76891 16.1779 5.57708 16.1459 5.34415 16.2099C4.22971 16.5296 3.10613 16.8402 1.98713 17.1507C1.53039 17.2786 1.32943 17.169 1.19241 16.7077C0.854422 15.5567 0.521004 14.4057 0.196721 13.2502C0.160182 13.1269 0.173884 12.9762 0.21499 12.8528C0.56211 11.743 0.913798 10.6377 1.27462 9.53236C1.37053 9.23092 1.43448 8.97058 1.28832 8.64172C1.1239 8.2672 1.08279 7.8333 0.99601 7.42681C0.66716 5.95155 0.338309 4.46715 0.0185936 2.98276C-0.00881066 2.85487 -0.00424329 2.70871 0.0322957 2.58539C0.256097 1.86832 0.489033 1.15581 0.726536 0.438731C0.858989 0.0322352 1.10563 -0.081949 1.50299 0.0642068C3.3208 0.744745 5.14318 1.42985 6.96099 2.11039C7.08431 2.15606 7.2259 2.18347 7.35836 2.18347C8.91126 2.18803 10.4642 2.18803 12.0171 2.18347C12.1861 2.18347 12.3642 2.14693 12.524 2.08755C14.3327 1.41158 16.1368 0.731043 17.9409 0.055072C18.3063 -0.081949 18.5712 0.0413699 18.69 0.411327C18.9275 1.14211 19.165 1.86832 19.3934 2.60366C19.4299 2.72242 19.4345 2.85944 19.4071 2.97819C19.0097 4.84167 18.6078 6.70516 18.2059 8.56865C18.1967 8.61889 18.1876 8.67826 18.1602 8.71937C18.014 8.91577 18.0506 9.1213 18.1191 9.32683C18.4936 10.4824 18.8681 11.6379 19.2289 12.798C19.2792 12.9625 19.2883 13.1634 19.2426 13.3233C18.9184 14.488 18.5804 15.6435 18.2424 16.8036C18.1465 17.1416 17.8998 17.2741 17.5573 17.1781C16.4291 16.8676 15.301 16.5615 14.1774 16.2373C13.8851 16.155 13.6659 16.2007 13.4193 16.388C12.7478 16.8995 12.0582 17.3882 11.3685 17.8724C11.2589 17.95 11.1036 17.9911 10.9666 17.9957C10.5601 18.0048 10.149 17.9957 9.73795 17.9957ZM18.7996 3.11978C18.7859 3.06954 18.7676 3.01016 18.7494 2.95535C18.5119 2.29765 18.2744 1.64452 18.0323 0.986815C17.9227 0.685369 17.8222 0.653397 17.5664 0.831525C15.502 2.25198 13.4375 3.677 11.3685 5.09745C11.1127 5.27101 11.1082 5.37606 11.3502 5.56332C12.0673 6.12511 12.7844 6.69146 13.506 7.24868C13.6157 7.33546 13.7481 7.40397 13.8851 7.44051C14.9539 7.73739 16.0227 8.02513 17.0914 8.31287C17.4066 8.39965 17.4385 8.37682 17.5208 8.0708C17.845 6.82391 18.1648 5.57245 18.4845 4.32099C18.5895 3.91907 18.6946 3.52627 18.7996 3.11978ZM0.630621 3.09237C0.639756 3.13805 0.64889 3.16545 0.653458 3.19742C1.07822 4.85081 1.50756 6.5042 1.93232 8.16215C1.97799 8.34941 2.07848 8.37682 2.25204 8.33114C3.36647 8.02513 4.48091 7.72825 5.59535 7.42681C5.69583 7.3994 5.79175 7.34916 5.87396 7.28522C6.60474 6.7143 7.33552 6.14337 8.0663 5.56789C8.30837 5.37606 8.30837 5.28014 8.05716 5.10658C5.98358 3.67243 3.90999 2.24741 1.83641 0.82239C1.60804 0.662532 1.49385 0.703638 1.39794 0.968546C1.16044 1.60798 0.9275 2.25198 0.694564 2.89598C0.66716 2.95992 0.64889 3.033 0.630621 3.09237ZM9.71055 16.1733C10.1353 16.1733 10.5646 16.1687 10.9894 16.1733C11.1767 16.1779 11.2589 16.1094 11.2315 15.9175C11.1949 15.6481 11.1675 15.374 11.1356 15.1046C11.1036 14.8488 10.8798 14.625 10.624 14.625C10.0074 14.6204 9.39083 14.6204 8.77424 14.625C8.50933 14.625 8.2764 14.8625 8.25356 15.1228C8.23529 15.3649 8.21245 15.607 8.18048 15.849C8.14851 16.1002 8.20332 16.1733 8.45452 16.1733C8.87015 16.1733 9.29035 16.1733 9.71055 16.1733ZM7.83793 11.9668C8.04346 11.9668 8.15308 11.8069 8.07543 11.6334C7.94755 11.341 7.80139 11.0579 7.66437 10.7701C7.60043 10.6377 7.48624 10.5966 7.35836 10.6559C7.0295 10.7975 6.70522 10.9391 6.38551 11.1035C6.31243 11.1401 6.23935 11.268 6.24392 11.3502C6.24392 11.4187 6.34897 11.51 6.42204 11.542C6.62758 11.6196 6.84224 11.6745 7.05234 11.7384C7.32638 11.816 7.59586 11.8983 7.83793 11.9668ZM11.5421 11.9668C11.5558 11.9668 11.574 11.9668 11.5877 11.9622C12.0719 11.816 12.5606 11.679 13.0447 11.5237C13.1041 11.5055 13.1818 11.405 13.1818 11.3456C13.1818 11.2725 13.1178 11.1675 13.0539 11.1355C12.7204 10.9711 12.387 10.8112 12.0399 10.6788C11.9668 10.6514 11.7978 10.7062 11.7613 10.7701C11.6014 11.0533 11.4644 11.3502 11.3365 11.6471C11.2635 11.816 11.3731 11.9668 11.5421 11.9668Z" fill="#E6893C"></path></svg> Connect</button>
                        )}
                <Navbar.Collapse id="responsive-navbar-nav">
                {
                  (window.loaded_web3 && this.state.account.length > 0) ?
                  (
                    <>
                    <Nav className="me-auto">
                    <Nav.Link href="/explore">
                      <input
                        type='submit'
                        className='btn btn-block btn-outline-light rounded '
                        value="Explore 🪟"
                      />
                    </Nav.Link>
                      <Nav.Link href="/search">
                      <input
                        type='submit'
                        className='btn btn-block btn-outline-light rounded '
                        value="Search 🔎"
                      />
                    </Nav.Link>
                        <Nav.Link href="/forsale">
                      <input
                        type='submit'
                        className='btn btn-block btn-outline-light rounded '
                        value="For Sale 💸"
                      />
                    </Nav.Link>
                    <NavDropdown title={
                      <span className="categorynav dropdown-menu-center" style={{paddingBottom: "10px"}}>&nbsp;&nbsp;Categories <i className="fas fa-chevron-down" style={{fontSize: "12px"}}></i>&nbsp;&nbsp;</span>
                      } id="collasible-nav-dropdown dropdown-menu-center" flip="true" style={{margin: "0px", marginTop: "3px"}}>
                      <NavDropdown.Item href="/categories/purchased">💸 Recently Purchased</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/gifted">🎁 Recently Gifted</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/minted">🔨 Recently Minted</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/categories/art">🎨 Art</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/photography">📷 Photography</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/metaverse">👾 Metaverse</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/collectibles">🏆 Collectibles</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/fantom">👻 Fantom</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/fantasy">👹 Fantasy</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/cards">🃏 Trading Cards</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/anime">💢 Anime</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/memes">🙈 Memes</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/nsfw">🚫 NSFW</NavDropdown.Item>
                      <NavDropdown.Item href="/categories/other">👀 Other</NavDropdown.Item>
                    </NavDropdown>

                    {/* <Nav.Link href="/stake">
                      <input
                        type='submit'
                        className='btn btn-block btn-outline-light rounded '
                        value="Pool 🌊"
                      />
                    </Nav.Link> */}

                    <Nav.Link href="https://fields.wraithswap.finance" target="_blank">
                      <input
                        type='submit'
                        className='btn btn-block btn-outline-light rounded '
                        value="Fields 🌾"
                      />
                    </Nav.Link>
                    </Nav>
                  
                        <Nav>

                        <Nav.Link href="/my-collection" style={{marginTop: "3px"}}>
                      <input
                        type='submit'
                        className='btn btn-block btn-outline-light rounded'
                        value="My Collection 🏆"
                      /></Nav.Link>
                      <Nav.Link href="/mint" id="mintbtn">
                      <input
                        type='submit'
                        className='btn mintbtn'
                        value="Mint NFT"
                      /></Nav.Link>
                    <NavDropdown title={
                        (this.state.ipfs !== "" && (this.state.mim === "image/jpeg" || this.state.mim === "image/png" || this.state.mim === "image/gif")) ?
                        ( <div style={{position: "relative", width: "38px", margin: "0 auto"}}><img src={"https://ipfs.sy.finance/ipfs/"+this.state.ipfs} alt="" border="0" height="38px" width="38px" style={{borderRadius: "50%"}} />
                        
                        {(this.state.verified === true) ? (
                        <div style={{position: "absolute", bottom: "-2px", right: "-1px"}}><svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                        ) : null
                        }
                        </div>
                         ) :
                        ( <div style={{position: "relative", width: "38px", margin: "0 auto"}}><Jazzicon diameter={38} seed={jsNumberForAddress(this.state.account)} />
                        
                        {(this.state.verified === true) ? (
                        <div style={{position: "absolute", bottom: "-2px", right: "-1px"}}><svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                        ) : null
                        }
                        
                        </div> )                        
                        
                      } id="collasible-nav-dropdown dropdown-menu-right" className="dropdown-menu-right" alignRight flip="true">
                      <NavDropdown.Item href="#">{this.state.account.substring(0, 15)+"..."}</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="https://wraithswap.finance/swap?inputCurrency=FTM&outputCurrency=0x1bcf4dc879979c68fa255f731fe8dcf71970c9bc" target="_blank" align="center" className="bal">{this.state.balance} <span style={{fontSize: "14px", fontWeight: "bold"}}>SYF</span></NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="https://wraithswap.finance/swap?inputCurrency=FTM&outputCurrency=0x4cf098d3775bd78a4508a13e126798da5911b6cd" target="_blank" align="center" className="bal">{this.state.wrabalance} <span style={{fontSize: "14px", fontWeight: "bold"}}>WRA</span></NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/" target="_blank" align="center" className="bal">{Number(this.state.ftmbalance).toString().slice(0, (Number(this.state.ftmbalance).toString().indexOf("."))+4)} <span style={{fontSize: "14px", fontWeight: "bold"}}>FTM</span></NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/editprofile/">Edit Profile</NavDropdown.Item>
                      <NavDropdown.Item href={"/collection/"+this.state.account}>View Public Collection</NavDropdown.Item>
                      {(this.state.verified !== true) ? (
                      <NavDropdown.Item href="https://forms.gle/EDaFhJxmnEbtYvh97" target="_blank">Get Verified <svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg" style={{marginBottom: "3px"}}><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></NavDropdown.Item>
                      ) : null}
                      <NavDropdown.Divider />
                      <NavDropdown.Item href={"https://info.wraithswap.finance"} target="_blank">Analytics 🡕</NavDropdown.Item>
                      <NavDropdown.Item href={"https://vote.wraithswap.finance/#/wraithswap.eth"} target="_blank">Voting 🡕</NavDropdown.Item>
                      <NavDropdown.Item href={"https://syfinance.gitbook.io/sy-finance/"} target="_blank">Documentation 🡕</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                        </>
                  ) : ( 
                        null
                   )
                }
                </Navbar.Collapse>
            </Navbar>
        // <nav className="navbar navbar-light bg-light fixed-top navbar-adj">
        //   <div className="d-flex mx-4">
        //     <Link to={{
        //       pathname: `/`,
        //     }}>
        //       <img alt="icon" className="iconimage m-0" src="logo.png" />
        //     </Link> 
        //     &nbsp;&nbsp;&nbsp;<h2>SYF NFTs</h2>
        //     {/* <p className="navbar-brand m-0">SYF NFT Marketplace</p> */}
        //   </div>

        //   {
        //     (window.loaded_web3) ?
        //       (
        //         <div className="d-flex mx-4 justify-content-between">
        //           <div className="m-1">
        //             <Link to={{
        //               pathname: `/explore`,
        //             }}>
        //               <input
        //                 type='submit'
        //                 className='btn btn-block btn-outline-light rounded '
        //                 value="Market"
        //               />
        //             </Link>
        //           </div>
        //           <div className="m-1">
        //             <Link to={{
        //               pathname: `/mint`,
        //             }}>
        //               <input
        //                 type='submit'
        //                 className='btn btn-block btn-outline-light rounded '
        //                 value="Mint a NFT"
        //               />
        //             </Link>
        //           </div>
        //           {/* <div className="m-1">
        //             <Link to={{
        //               pathname: `https://app.sy.finance`,
        //             }}>
        //               <input
        //                 type='submit'
        //                 className='btn btn-block btn-outline-light rounded-0 '
        //                 value="SYF DAPP"
        //               />
        //             </Link>
        //           </div> */}
        //           <div className="m-1">
        //             <Link to={{
        //               pathname: `/my-collection`,
        //             }}>
        //               <input
        //                 type='submit'
        //                 className='btn btn-block btn-outline-light rounded'
        //                 value="My Collection"
        //               />
        //             </Link>
        //           </div>
        //           <div className="d-flex m-0">
        //             <div className="">
        //               {
        //                 <p className=" m-2">{this.state.account.substring(0, 15)}...</p>
        //               }
        //             </div>
        //             {/* <div className="">
        //               <img alt="profile" className="profile" src="../profile.png" />
        //             </div> */}
        //           </div>

        //         </div>
        //       )
        //       :
        //       (
        //         <button type="button" onClick={(e) => { this.loadMetaMask() }} className="btn btn-outline-light mx-4 rounded"><svg width="18" height="16" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.73795 17.9957C9.33603 17.9957 8.92953 18.0094 8.5276 17.9866C8.36318 17.9774 8.17591 17.9318 8.04346 17.8358C7.34009 17.3426 6.65041 16.831 5.96074 16.3195C5.76891 16.1779 5.57708 16.1459 5.34415 16.2099C4.22971 16.5296 3.10613 16.8402 1.98713 17.1507C1.53039 17.2786 1.32943 17.169 1.19241 16.7077C0.854422 15.5567 0.521004 14.4057 0.196721 13.2502C0.160182 13.1269 0.173884 12.9762 0.21499 12.8528C0.56211 11.743 0.913798 10.6377 1.27462 9.53236C1.37053 9.23092 1.43448 8.97058 1.28832 8.64172C1.1239 8.2672 1.08279 7.8333 0.99601 7.42681C0.66716 5.95155 0.338309 4.46715 0.0185936 2.98276C-0.00881066 2.85487 -0.00424329 2.70871 0.0322957 2.58539C0.256097 1.86832 0.489033 1.15581 0.726536 0.438731C0.858989 0.0322352 1.10563 -0.081949 1.50299 0.0642068C3.3208 0.744745 5.14318 1.42985 6.96099 2.11039C7.08431 2.15606 7.2259 2.18347 7.35836 2.18347C8.91126 2.18803 10.4642 2.18803 12.0171 2.18347C12.1861 2.18347 12.3642 2.14693 12.524 2.08755C14.3327 1.41158 16.1368 0.731043 17.9409 0.055072C18.3063 -0.081949 18.5712 0.0413699 18.69 0.411327C18.9275 1.14211 19.165 1.86832 19.3934 2.60366C19.4299 2.72242 19.4345 2.85944 19.4071 2.97819C19.0097 4.84167 18.6078 6.70516 18.2059 8.56865C18.1967 8.61889 18.1876 8.67826 18.1602 8.71937C18.014 8.91577 18.0506 9.1213 18.1191 9.32683C18.4936 10.4824 18.8681 11.6379 19.2289 12.798C19.2792 12.9625 19.2883 13.1634 19.2426 13.3233C18.9184 14.488 18.5804 15.6435 18.2424 16.8036C18.1465 17.1416 17.8998 17.2741 17.5573 17.1781C16.4291 16.8676 15.301 16.5615 14.1774 16.2373C13.8851 16.155 13.6659 16.2007 13.4193 16.388C12.7478 16.8995 12.0582 17.3882 11.3685 17.8724C11.2589 17.95 11.1036 17.9911 10.9666 17.9957C10.5601 18.0048 10.149 17.9957 9.73795 17.9957ZM18.7996 3.11978C18.7859 3.06954 18.7676 3.01016 18.7494 2.95535C18.5119 2.29765 18.2744 1.64452 18.0323 0.986815C17.9227 0.685369 17.8222 0.653397 17.5664 0.831525C15.502 2.25198 13.4375 3.677 11.3685 5.09745C11.1127 5.27101 11.1082 5.37606 11.3502 5.56332C12.0673 6.12511 12.7844 6.69146 13.506 7.24868C13.6157 7.33546 13.7481 7.40397 13.8851 7.44051C14.9539 7.73739 16.0227 8.02513 17.0914 8.31287C17.4066 8.39965 17.4385 8.37682 17.5208 8.0708C17.845 6.82391 18.1648 5.57245 18.4845 4.32099C18.5895 3.91907 18.6946 3.52627 18.7996 3.11978ZM0.630621 3.09237C0.639756 3.13805 0.64889 3.16545 0.653458 3.19742C1.07822 4.85081 1.50756 6.5042 1.93232 8.16215C1.97799 8.34941 2.07848 8.37682 2.25204 8.33114C3.36647 8.02513 4.48091 7.72825 5.59535 7.42681C5.69583 7.3994 5.79175 7.34916 5.87396 7.28522C6.60474 6.7143 7.33552 6.14337 8.0663 5.56789C8.30837 5.37606 8.30837 5.28014 8.05716 5.10658C5.98358 3.67243 3.90999 2.24741 1.83641 0.82239C1.60804 0.662532 1.49385 0.703638 1.39794 0.968546C1.16044 1.60798 0.9275 2.25198 0.694564 2.89598C0.66716 2.95992 0.64889 3.033 0.630621 3.09237ZM9.71055 16.1733C10.1353 16.1733 10.5646 16.1687 10.9894 16.1733C11.1767 16.1779 11.2589 16.1094 11.2315 15.9175C11.1949 15.6481 11.1675 15.374 11.1356 15.1046C11.1036 14.8488 10.8798 14.625 10.624 14.625C10.0074 14.6204 9.39083 14.6204 8.77424 14.625C8.50933 14.625 8.2764 14.8625 8.25356 15.1228C8.23529 15.3649 8.21245 15.607 8.18048 15.849C8.14851 16.1002 8.20332 16.1733 8.45452 16.1733C8.87015 16.1733 9.29035 16.1733 9.71055 16.1733ZM7.83793 11.9668C8.04346 11.9668 8.15308 11.8069 8.07543 11.6334C7.94755 11.341 7.80139 11.0579 7.66437 10.7701C7.60043 10.6377 7.48624 10.5966 7.35836 10.6559C7.0295 10.7975 6.70522 10.9391 6.38551 11.1035C6.31243 11.1401 6.23935 11.268 6.24392 11.3502C6.24392 11.4187 6.34897 11.51 6.42204 11.542C6.62758 11.6196 6.84224 11.6745 7.05234 11.7384C7.32638 11.816 7.59586 11.8983 7.83793 11.9668ZM11.5421 11.9668C11.5558 11.9668 11.574 11.9668 11.5877 11.9622C12.0719 11.816 12.5606 11.679 13.0447 11.5237C13.1041 11.5055 13.1818 11.405 13.1818 11.3456C13.1818 11.2725 13.1178 11.1675 13.0539 11.1355C12.7204 10.9711 12.387 10.8112 12.0399 10.6788C11.9668 10.6514 11.7978 10.7062 11.7613 10.7701C11.6014 11.0533 11.4644 11.3502 11.3365 11.6471C11.2635 11.816 11.3731 11.9668 11.5421 11.9668Z" fill="#E6893C"></path></svg> Connect Wallet</button>
        //       )
        //   }
        //   {/* <button type="button" onClick={this.metam()} className="btn btn-primary m-3">Login</button> */}
        // </nav>
    )
  }
}

export default NavbarMain;
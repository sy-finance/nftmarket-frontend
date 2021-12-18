import React, { Component } from 'react';
import { useHistory, Link } from 'react-router-dom';

import Syfin from '../../abis/Syfin.json';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import SyfinAvatars from '../../abis/SyfinAvatars.json';
import SyfinVerified from '../../abis/SyfinVerified.json';
import SyfinNFTLikes from '../../abis/SyfinNFTLikes.json';

import LazyLoad, { forceCheck } from 'react-lazyload';

import ReactCanvasConfetti from 'react-canvas-confetti';

import ReactPlaceholder from "react-placeholder";
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import "react-placeholder/lib/reactPlaceholder.css";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import Modal from 'react-modal';

import Jazzicon, { jsNumberForAddress }  from 'react-jazzicon';

import LoadingOverlay from 'react-loading-overlay';

import Web3 from 'web3';

Modal.setAppElement('#root');

const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    zIndex: '999999',
    top: 0,
    left: 0
};

const customStyle2 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      backgroundColor: '#111',
      borderColor: '#004A8B',
      borderRadius: '15px',
      padding: '40px',
      color: '#FFF',
      bottom: 'auto',
      minWidth: '350px',
      maxWidth: '650px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

class Stake extends Component {

    handleOpenSYFModal () {
        this.setState({ showSYFModal: true });
    }

    handleCloseSYFModal () {
        this.setState({ showSYFModal: false });
    }

    render() {

    return (

        <div>
            <LoadingOverlay
                    active={this.state.txpend}
                    spinner
                    transition={false}
                    text={'Waiting on...'+this.state.txs+' transaction(s)'}
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            background: 'rgba(0, 0, 0, 0.95)',
                            position: 'fixed'
                        }),
                        wrapper: {
                            width: '100%',
                            height: '100%',
                            borderRadius: '25px'
                        }
                    }}
                    >
            <Modal 
            animationDuration={1000}
            isOpen={this.state.showSYFModal}
            contentLabel="Syfin LP Deposit"
            id="modalsyfin"
            align="center"
            style={customStyle2}
            overlayClassName="myoverlay"
            onRequestClose={this.handleCloseSYFModal}
            ><button onClick={this.handleCloseSYFModal} className="btn btn-primary" align="right" style={{top:"15px", right:"15px", position: "absolute"}}>X</button>
            <h2 align="center"><img src="/lplogo.png" border="0" height="66px" width="132px" /></h2><br />
            <div align="center">
                <h3>Deposit your <strong>SYF-FTM</strong> LP Tokens</h3>
                        <br />
                        <form onSubmit={(event) => {
                                                    event.preventDefault()
                                                    this.handleDeposit();
                                    }}>
                    <input type="text" className="form-control" placeholder={(this.state.balanceLP).toFixed(4)} onChange={event => this.setState({ amounttodep: event.target.value })} style={{maxWidth: "200px"}}/>
                    <button type="submit" className="btn btn-primary rounded m-3 homeButton liquid">DEPOSIT</button>
                    </form>
                    <div align="center">OR</div>
                    <form onSubmit={(event) => {
                                                    event.preventDefault()
                                                    this.handleDepositMax();
                                    }}>
                    <button type="submit" className="btn btn-primary rounded m-3 liquid">DEPOSIT MAX</button>
                    </form>
            </div>
            </Modal>
        <div className="head-title col-auto mx-4">
            <h4 className="mb-0 font-weight-normal">Syfin Liquidity Pool Stake</h4>
        </div>
        <div className="row home-adj">
            {/* <div className="col-sm-4">
            <div className="card shadow-sm">
                <div className="">
                    <img alt="home" className="homeimage rounded-top" src="syther.png" />
                </div>
                <div className="text-title">The SYF Mascot "Syther"</div>
            </div>
            </div> */}

            <div className="col-md-12" align="center">
                <div className="row">

                    <div className="col-md-12">
                        <h2><span className="rainbowtxt1">SYFIN</span>&nbsp;&nbsp;<span className="rainbowtxt2">LIQUIDITY</span><br /><span className="rainbowtxt3">STAKING POOL</span></h2>
                        &nbsp;<br />&nbsp;<br />
                    </div>



                    <div className="col-md-6" style={{marginTop: "auto"}}>
                        {/* <div className="col-auto max-250">
                            <model-viewer src="logo4.glb" alt="Syfin SYF" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls style={{width: "100%", height: "250px", backgroundColor: "#111"}}></model-viewer>     
                        </div> */}
                        <div className="text-secondary my-auto align-middle align-self-center my-auto justify-content-center " style={{ fontSize: '18px',lineHeight:1.5,wordSpacing:2, background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(17,17,17,1) 100%)", padding: "30px", borderRadius: "15px", paddingTop: "40px", minHeight: "360px", width: "80%", color: "#aaa", verticalAlign: "middle", display: "table-cell"}}>
                        <div className="row">
                            <div className="col-12"><strong>Total Syfin Liquid</strong><br /><ReactPlaceholder type='rect' ready={this.state.totalliquidity} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '50px', marginBottom: "15px", borderRadius: '15px' }}><h1 className="text-light">$<strong>{this.state.totalliquidity.toLocaleString("en",  { style: 'decimal', maximumFractionDigits : 0, minimumFractionDigits : 0 })}</strong></h1></ReactPlaceholder></div>  
                            {/* <div className="col-6">
                            <strong>Syfin Market Cap</strong><br />
                            <ReactPlaceholder type='rect' ready={this.state.totalliquidity} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '50px', marginBottom: "15px", borderRadius: '15px' }}><h1 className="text-light">$<strong>{this.state.mcap.toLocaleString()}</strong> <small>USD</small></h1></ReactPlaceholder>    
                            </div>                   */}
                            </div>
                            This is where you can <strong>stake your SYF/FTM LP Tokens</strong><br />Earn SYF rewards from supporting our liquidity pool on <strong>Spookyswap</strong>.<br /><br /><p>
                            <h4>≈83.3m SYF per day split amongst all stakers<br /><span id="countdown" style={{color: "#eee"}}></span> remaining</h4></p>  

                            <ReactPlaceholder type='rect' ready={this.state.rewardRate} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '50px', marginBottom: "15px", borderRadius: '15px' }}> 
                            <h4 style={{fontSize: "18px"}}>1 FTM = ${this.state.ftmusd.toString().slice(0, (Number(this.state.ftmusd).toString().indexOf("."))+3)} USD</h4>
                            <h3 className="text-light" style={{fontSize: "22px"}}>Est. ≈{ Math.trunc(Number(5184000) * (this.state.rewardRate / 1e18) * 60 / 5000000000 * 100 / 12)}% APY</h3>
                            </ReactPlaceholder>    
                        </div>
                        <br /><br />
                    </div>
                <div className="col-md-6">
                    <div className="row">
                <div className="col-md-6 text-light">
                    <br />
                <img src="/logo.png" height="75px" width="75px" border="0" />
                <br /><br />
                <h3>SYF Balance</h3>
                <div style={{backgroundColor: "#000", borderRadius: "15px", padding: "10px"}}><ReactPlaceholder type='rect' ready={this.state.balance} showLoadingAnimation={true} color='#333' style={{ width: '200px', height: '60px', borderRadius: '15px' }}> {this.state.balance.toString().slice(0, (Number(this.state.balance).toString().indexOf("."))+3)} SYF<br />≈${Number(this.state.usdbal).toString().slice(0, (Number(this.state.usdbal).toString().indexOf("."))+3)} USD</ReactPlaceholder></div>
                </div><div className="col-md-6 text-light">
                <br />
                <img src="/lplogo.png" height="75px" width="150px" border="0" />
                <br /><br />
                <h3>SYF/FTM LP Balance</h3>
                <div style={{backgroundColor: "#000", borderRadius: "15px", padding: "10px"}}><ReactPlaceholder type='rect' ready={this.state.balanceLP} showLoadingAnimation={true} color='#333' style={{ width: '200px', height: '60px', borderRadius: '15px' }}>{(this.state.balanceLP).toString().slice(0, (Number(this.state.balanceLP).toString().indexOf("."))+5)} LP
                <br />{this.state.percentageLP}% of liquidity total</ReactPlaceholder></div>
                </div>
                </div>

                <div className="row">
                <div className="col-md-6 text-light">   
                <br />
                <img src="/pool.png" height="75px" width="150px" border="0" />
                <br /><br />                 
                <h3>Balance in Stake</h3><div style={{backgroundColor: "#000", borderRadius: "15px", padding: "10px"}}><ReactPlaceholder type='rect' ready={this.state.balPool} showLoadingAnimation={true} color='#333' style={{ width: '200px', height: '60px', borderRadius: '15px' }}>{Number(this.state.balPool).toFixed(2)} LP
                <br />{this.state.percentagePool}% of pool total</ReactPlaceholder></div>
                </div>
                <div className="col-md-6 text-light">
                <br />
                <img src="/logo.png" height="75px" width="75px" border="0" />
                <br /><br />
                <h3>Rewards</h3><div style={{backgroundColor: "#000", borderRadius: "15px", padding: "10px"}}><ReactPlaceholder type='rect' ready={this.state.rewardbal} showLoadingAnimation={true} color='#333' style={{ width: '200px', height: '60px', borderRadius: '15px' }}>{this.state.earned.toString().slice(0, (Number(this.state.earned).toString().indexOf("."))+3)} SYF<br />≈${Number(this.state.rewardbal).toString().slice(0, (Number(this.state.rewardbal).toString().indexOf("."))+3)} USD</ReactPlaceholder></div>
                </div>
                </div>
                    </div>



                    </div>

                <br /><br />
                <div className="row">
                <div className="col-md-4">
                <div id="claim" style={{display: "none"}}>
                <form onSubmit={(event) => {
                                                    event.preventDefault()
                                                    this.handleClaim();
                                    }}>
                    <button type="submit" className="btn btn-primary rounded m-3 homeButton liquid">CLAIM</button>
                </form>
                </div>
                </div>
                <div className="col-md-4">
                <div id="approval" style={{display: "block"}}>
                    <form onSubmit={(event) => {
                                                    event.preventDefault()
                                                    this.handleApprove('test');
                                    }}>
                    <button type="submit" className="btn btn-primary rounded m-3 homeButton liquid">APPROVE</button>
                    </form>
                </div>
                <div id="deposit" style={{display: "none"}}>
                    <button className="btn btn-primary rounded m-3 homeButton liquid" onClick={this.handleOpenSYFModal}>DEPOSIT</button>
                </div>
                </div>
                <div className="col-md-4">
                <div id="withdraw" style={{display: "none"}}>
                <form onSubmit={(event) => {
                                                    event.preventDefault()
                                                    this.handleWithdraw();
                                    }}>
                    <button type="submit" className="btn btn-primary rounded m-3 homeButton liquid">WITHDRAW</button>
                </form>
                </div>
                </div>
            </div><br />
            <div className="row">
                <div className="col-md-3" align="center" style={{padding:"30px"}}>
                <h3 className="text-light"><p><i className="fas fa-water fa-2x" style={{color: "#999"}}></i></p>Get liquid</h3>
                <p className="text-secondary">Once you’ve added both SYF and FTM to our liquidity pool on Spookyswap.finance you can then deposit them here to earn additional SYF!</p>
                </div><div className="col-md-3" align="center" style={{padding:"30px"}}>
                <h3 className="text-light"><p><i className="fas fa-angle-double-down fa-2x" style={{color: "#999"}}></i></p>Deposit LP</h3>
                <p className="text-secondary">Click Approve, then enter in an amount of SYF/FTM LP Tokens to deposit and click "DEPOSIT". LP Tokens can be obtained from putting in SYF/FTM liquidity on Spookyswap</p>
                </div><div className="col-md-3" align="center" style={{padding:"30px"}}>
                <h3 className="text-light"><p><i className="fas fa-coins fa-2x" style={{color: "#999"}}></i></p>Earn</h3>
                <p className="text-secondary">Earn SYF from the fixed rate liquidity token staking pool contract. As long as the pool period is open you will earn rewards. Claim SYF rewards and just hold to earn BOO!</p>
                </div>
                <div className="col-md-3" align="center" style={{padding:"30px"}}>
                <h3 className="text-light"><p><i className="fas fa-shopping-bag fa-2x" style={{color: "#999"}}></i></p>Buy a NFT</h3>
                <p className="text-secondary">With the extra SYF you are now earning from providing liquidity and staking it, you can buy more NFTs! Or you can just hold your SYF which earns you BOO!</p>
                </div>
            </div>
            <a type="button" href="https://spookyswap.finance/add/0x1bcf4dc879979c68fa255f731fe8dcf71970c9bc/FTM" target="_blank" className="btn btn-primary rounded m-3 homeButton liquid2">GET Spooky LP<br />TOKENS</a>
            <br/><br />            
            <div className="row justify-content-around">
               <p align="center" className="text-light">Prices of SYF and FTM in USD are powered by our Syfin Fantom LINK Price Oracle Contract.</p>
            </div>
        </div>
        </div>
        </LoadingOverlay>
        <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles}/>
        </div>
    )

    }
        constructor(props) {
            super(props)
            this.state = {
                account: '',
                contract: null,
                contractlp: null,
                sale_contract: null,
                showSYFModal: false,
                mcap: 0,
                totalSupply: 0,
                balance: 0,
                rewardRate: 0,
                rewards: 0,
                earned: 0,
                ftmusd: 0,
                balanceInPool: 0,
                rewardbal: 0,
                balPool: 0,
                percentagePool: 0,
                approved: false,
                balanceLP: 0,
                usdBal: 0,
                amounttodep: 0,
                txpend: false,
                totalliquidity: 0,
                txs: 0,
                percentageLP: 0,
            }
            this.handleOpenSYFModal = this.handleOpenSYFModal.bind(this);
            this.handleCloseSYFModal = this.handleCloseSYFModal.bind(this);
        }

    async componentWillMount() {
        await this.loadBlockchainData();
    }

    handleApprove = async () =>  {

        const web3ftm = new Web3("https://rpc.ftm.tools/");
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        this.setState({ txpend: true });
        this.setState({ txs: 1 });

        const abillp = [
            { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
                    { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'Approval',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' },
                    { indexed: true, internalType: 'address', name: 'to', type: 'address' },
                ],
                name: 'Burn',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' },
                ],
                name: 'Mint',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'amount0In', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount1In', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount0Out', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount1Out', type: 'uint256' },
                    { indexed: true, internalType: 'address', name: 'to', type: 'address' },
                ],
                name: 'Swap',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: false, internalType: 'uint112', name: 'reserve0', type: 'uint112' },
                    { indexed: false, internalType: 'uint112', name: 'reserve1', type: 'uint112' },
                ],
                name: 'Sync',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'from', type: 'address' },
                    { indexed: true, internalType: 'address', name: 'to', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'Transfer',
                type: 'event',
            },
            {
                constant: true,
                inputs: [],
                name: 'DOMAIN_SEPARATOR',
                outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'MINIMUM_LIQUIDITY',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'PERMIT_TYPEHASH',
                outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    { internalType: 'address', name: '', type: 'address' },
                    { internalType: 'address', name: '', type: 'address' },
                ],
                name: 'allowance',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: 'spender', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'approve',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [{ internalType: 'address', name: '', type: 'address' }],
                name: 'balanceOf',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
                name: 'burn',
                outputs: [
                    { internalType: 'uint256', name: 'amount0', type: 'uint256' },
                    { internalType: 'uint256', name: 'amount1', type: 'uint256' },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'decimals',
                outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'factory',
                outputs: [{ internalType: 'address', name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'getReserves',
                outputs: [
                    { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
                    { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
                    { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: '_token0', type: 'address' },
                    { internalType: 'address', name: '_token1', type: 'address' },
                ],
                name: 'initialize',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'kLast',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
                name: 'mint',
                outputs: [{ internalType: 'uint256', name: 'liquidity', type: 'uint256' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'name',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [{ internalType: 'address', name: '', type: 'address' }],
                name: 'nonces',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                    { internalType: 'address', name: 'spender', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                    { internalType: 'uint256', name: 'deadline', type: 'uint256' },
                    { internalType: 'uint8', name: 'v', type: 'uint8' },
                    { internalType: 'bytes32', name: 'r', type: 'bytes32' },
                    { internalType: 'bytes32', name: 's', type: 'bytes32' },
                ],
                name: 'permit',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'price0CumulativeLast',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'price1CumulativeLast',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
                name: 'skim',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'uint256', name: 'amount0Out', type: 'uint256' },
                    { internalType: 'uint256', name: 'amount1Out', type: 'uint256' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    { internalType: 'bytes', name: 'data', type: 'bytes' },
                ],
                name: 'swap',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'symbol',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [],
                name: 'sync',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'token0',
                outputs: [{ internalType: 'address', name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'token1',
                outputs: [{ internalType: 'address', name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'totalSupply',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: 'to', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'transfer',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: 'from', type: 'address' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'transferFrom',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ];
        const contractlp = new web3.eth.Contract(abillp, "0xaf64771bBD013492ac69220eB67836f36b23D5AA");
        contractlp.methods.approve("0x94489dD0D3a57A142b0a4Fac7984cE587F7ebB66", "999999999999900000000000000").send({ from: account })
        .once('receipt', (receipt) => {
            console.log(receipt);
            console.log("Approved");

            this.setState({ txpend: false });
            this.setState({ txs: 0 });

            localStorage.setItem('stakeapprove', 'true');
            this.setState({ approved: true });

            document.getElementById("approval").style.display = "none";
            document.getElementById("deposit").style.display = "block";
            document.getElementById("withdraw").style.display = "block";
            document.getElementById("claim").style.display = "block";
        })
        .catch(error => {
            console.log(error);
            this.setState({ txpend: false });
            this.setState({ txs: 0 });
        });
    }

    handleDeposit = async () =>  {

        const web3ftm = new Web3("https://rpc.ftm.tools/");
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        this.setState({ txpend: true });
        this.setState({ txs: 1 });

        const abipool = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"syf","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"syfinlp","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
        const contractpool = new web3.eth.Contract(abipool, "0x94489dD0D3a57A142b0a4Fac7984cE587F7ebB66");
        contractpool.methods.stake(web3ftm.utils.toWei(this.state.amounttodep, "ether")).send({ from: account })
        .once('receipt', (receipt) => {
            console.log(receipt);
            console.log("Deposited LP Tokens!");

            this.setState({ txpend: false });
            this.setState({ txs: 0 });

            // localStorage.setItem('stakeapprove', 'true');

            // document.getElementById("approval").style.display = "none";
            this.handleCloseSYFModal();
            document.getElementById("deposit").innerHTML = "<h4 style='color: #00ff5a;margin-top:30px;'>Deposited SYF LP Tokens!</h4>";
            this.handlerFire();
        })
        .catch(error => {
            console.log(error);
            this.setState({ txpend: false });
            this.setState({ txs: 0 });
        });
    }

    handleDepositMax = async () =>  {

        const web3ftm = new Web3("https://rpc.ftm.tools/");
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        this.setState({ txpend: true });
        this.setState({ txs: 1 });

        const abipool = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"syf","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"syfinlp","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
        const contractpool = new web3.eth.Contract(abipool, "0x94489dD0D3a57A142b0a4Fac7984cE587F7ebB66");

        function toPlainString(num) {
            return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
              function(a,b,c,d,e) {
                return e < 0
                  ? b + '0.' + Array(1-e-c.length).join(0) + c + d
                  : b + c + d + Array(e-d.length+1).join(0);
              });
        }

        const balance = toPlainString(this.state.balanceLP*1e18 - this.state.balanceLP*1e18*0.00001);

        console.log(balance)

        if (this.state.balanceLP > 0) {
            const balLP = (balance).toString();
            // console.log(balLP)
            contractpool.methods.stake(balLP).send({ from: account })
            .once('receipt', (receipt) => {
                console.log(receipt);
                console.log("Deposited LP Tokens!");

                this.setState({ txpend: false });
                this.setState({ txs: 0 });

                // localStorage.setItem('stakeapprove', 'true');

                // document.getElementById("approval").style.display = "none";
                this.handleCloseSYFModal();
                document.getElementById("deposit").innerHTML = "<h4 style='color: #00ff5a;margin-top:30px;'>Deposited SYF LP Tokens!</h4>";
                this.handlerFire();
            })
            .catch(error => {
                console.log(error);
                this.setState({ txpend: false });
                this.setState({ txs: 0 });
            });
        }
    }

    makeShot = (particleRatio, opts) => {
        this.animationInstance && this.animationInstance({
          ...opts,
          origin: { y: 0.7 },
          particleCount: Math.floor(200 * particleRatio),
        });
      }
    
      fire = () => {
        this.makeShot(0.25, {
          spread: 26,
          startVelocity: 55,
        });
    
        this.makeShot(0.2, {
          spread: 60,
        });
    
        this.makeShot(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });
    
        this.makeShot(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });
    
        this.makeShot(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      }
    
      handlerFire = () => {
        this.fire();
      };
    
      getInstance = (instance) => {
        this.animationInstance = instance;
      };

    handleWithdraw = async () =>  {

        const web3ftm = new Web3("https://rpc.ftm.tools/");
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        this.setState({ txpend: true });
        this.setState({ txs: 1 });

        const abipool = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"syf","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"syfinlp","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
        const contractpool = new web3.eth.Contract(abipool, "0x94489dD0D3a57A142b0a4Fac7984cE587F7ebB66");
        contractpool.methods.exit().send({ from: account })
        .once('receipt', (receipt) => {
            console.log(receipt);
            console.log("Withdrawed LP Tokens!");

            this.setState({ txpend: false });
            this.setState({ txs: 0 });

            // localStorage.setItem('stakeapprove', 'true');

            // document.getElementById("approval").style.display = "none";
            document.getElementById("withdraw").innerHTML = "<h4 style='color: #00ff5a;margin-top:30px;'>Withdrew all SYF LP Tokens and rewards!</h4>";
        })
        .catch(error => {
            console.log(error);
            this.setState({ txpend: false });
            this.setState({ txs: 0 });
        });
    }

    handleClaim = async () =>  {

        const web3ftm = new Web3("https://rpc.ftm.tools/");
        const web3 = window.web3;

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        this.setState({ txpend: true });
        this.setState({ txs: 1 });

        const abipool = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"syf","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"syfinlp","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
        const contractpool = new web3.eth.Contract(abipool, "0x94489dD0D3a57A142b0a4Fac7984cE587F7ebB66");
        contractpool.methods.getReward().send({ from: account })
        .once('receipt', (receipt) => {
            console.log(receipt);
            console.log("Claimed LP Tokens!");

            this.setState({ txpend: false });
            this.setState({ txs: 0 });

            // localStorage.setItem('stakeapprove', 'true');

            // document.getElementById("approval").style.display = "none";
            document.getElementById("claim").innerHTML = "<h4 style='color: #00ff5a;margin-top:30px;'>Claimed all SYF rewards!</h4>";
        })
        .catch(error => {
            console.log(error);
            this.setState({ txpend: false });
            this.setState({ txs: 0 });
        });
    }

    async loadBlockchainData() {

        // window.loaded_web3 = false;

        function randomNumber(min, max) { 
            return Math.random() * (max - min) + min;
        }

        var end = new Date('10/27/2021 2:00 AM');

        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer;

        function showRemaining() {
            var now = new Date();
            var distance = end - now;
            if (distance < 0) {

                clearInterval(timer);
                document.getElementById('countdown').innerHTML = 'EXPIRED!';

                return;
            }
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);

            document.getElementById('countdown').innerHTML = days + ' d ';
            document.getElementById('countdown').innerHTML += hours + ' h ';
            document.getElementById('countdown').innerHTML += minutes + ' m ';
            document.getElementById('countdown').innerHTML += seconds + ' s';
        }

        timer = setInterval(showRemaining, 1000);

        const web3 = window.web3;
        const web3t = new Web3("https://rpc.ftm.tools/");
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        const networkId = 250;
        
        const blackListed = [238, 239];
        this.setState({ blackListed });

        const sale_networkData = SyfinNFTSale.networks[networkId]
        const sale_abi = SyfinNFTSale.abi
        const sale_address = sale_networkData.address
        const sale_contract = new web3t.eth.Contract(sale_abi, sale_address)
        this.setState({ sale_contract })

        const networkData = SyfinNFT.networks[networkId]
        const abi = SyfinNFT.abi
        const address = networkData.address
        const contract = new web3t.eth.Contract(abi, address)

        const abimain = Syfin.abi
        const addressmain = "0x1BCF4DC879979C68fA255f731FE8Dcf71970c9bC";
        const contractmain = new web3.eth.Contract(abimain, addressmain)
        
        const abiv = SyfinVerified.abi
        const addv = "0x6986aF780e5E14f82D21F2D47F64c8C7b7cc07F9"
        const contractv = new web3t.eth.Contract(abiv, addv)

        const abia = SyfinAvatars.abi
        const addr = "0x2a4e02D729924eCe6A3292F9Ba8e1B0B32d7850F"
        const contractav = new web3t.eth.Contract(abia, addr)

        const abip = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestFTMPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getLatestTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
        const addp = "0x8fBE84d284D1614eaDc50EE69120Ec4f7f98cEd8";
        const contractp = new web3t.eth.Contract(abip, addp);
        this.setState({ contractp })

        const ftmprice = await contractp.methods.getLatestFTMPrice().call() / 1e8;
        const syfperftm = await contractp.methods.getLatestTokenPrice("0xaf64771bbd013492ac69220eb67836f36b23d5aa", 1).call();
        const syfusd = ftmprice / (syfperftm / 1e18);
        const mcap = Number(100000000000 * syfusd);

        this.setState({ mcap }); 

        this.setState({ ftmusd: ftmprice });

        const abilike = SyfinNFTLikes.abi;
        const contractlike = new web3t.eth.Contract(abilike, "0xe145C6Cb2FA344cb9A1335685F844bDfF3470321");

        const abiblack = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hashAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftID","type":"uint256"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedNFT","type":"event"},{"inputs":[],"name":"AddyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"IDCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"blAddress","type":"address"}],"name":"getBlackListedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"}],"name":"getBlackListedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"updates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
        const contractblack = new web3t.eth.Contract(abiblack, "0xfBA3E2C37A8F199c22eF9bD331f09023D2110c98");

        const abipool = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"syf","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"syfinlp","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
        const contractpool = new web3.eth.Contract(abipool, "0x94489dD0D3a57A142b0a4Fac7984cE587F7ebB66");

        const abillp = [
            { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
                    { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'Approval',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' },
                    { indexed: true, internalType: 'address', name: 'to', type: 'address' },
                ],
                name: 'Burn',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' },
                ],
                name: 'Mint',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'amount0In', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount1In', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount0Out', type: 'uint256' },
                    { indexed: false, internalType: 'uint256', name: 'amount1Out', type: 'uint256' },
                    { indexed: true, internalType: 'address', name: 'to', type: 'address' },
                ],
                name: 'Swap',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: false, internalType: 'uint112', name: 'reserve0', type: 'uint112' },
                    { indexed: false, internalType: 'uint112', name: 'reserve1', type: 'uint112' },
                ],
                name: 'Sync',
                type: 'event',
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: 'address', name: 'from', type: 'address' },
                    { indexed: true, internalType: 'address', name: 'to', type: 'address' },
                    { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'Transfer',
                type: 'event',
            },
            {
                constant: true,
                inputs: [],
                name: 'DOMAIN_SEPARATOR',
                outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'MINIMUM_LIQUIDITY',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'PERMIT_TYPEHASH',
                outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [
                    { internalType: 'address', name: '', type: 'address' },
                    { internalType: 'address', name: '', type: 'address' },
                ],
                name: 'allowance',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: 'spender', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'approve',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [{ internalType: 'address', name: '', type: 'address' }],
                name: 'balanceOf',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
                name: 'burn',
                outputs: [
                    { internalType: 'uint256', name: 'amount0', type: 'uint256' },
                    { internalType: 'uint256', name: 'amount1', type: 'uint256' },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'decimals',
                outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'factory',
                outputs: [{ internalType: 'address', name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'getReserves',
                outputs: [
                    { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
                    { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
                    { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: '_token0', type: 'address' },
                    { internalType: 'address', name: '_token1', type: 'address' },
                ],
                name: 'initialize',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'kLast',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
                name: 'mint',
                outputs: [{ internalType: 'uint256', name: 'liquidity', type: 'uint256' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'name',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [{ internalType: 'address', name: '', type: 'address' }],
                name: 'nonces',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: 'owner', type: 'address' },
                    { internalType: 'address', name: 'spender', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                    { internalType: 'uint256', name: 'deadline', type: 'uint256' },
                    { internalType: 'uint8', name: 'v', type: 'uint8' },
                    { internalType: 'bytes32', name: 'r', type: 'bytes32' },
                    { internalType: 'bytes32', name: 's', type: 'bytes32' },
                ],
                name: 'permit',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'price0CumulativeLast',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'price1CumulativeLast',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
                name: 'skim',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'uint256', name: 'amount0Out', type: 'uint256' },
                    { internalType: 'uint256', name: 'amount1Out', type: 'uint256' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    { internalType: 'bytes', name: 'data', type: 'bytes' },
                ],
                name: 'swap',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'symbol',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [],
                name: 'sync',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'token0',
                outputs: [{ internalType: 'address', name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'token1',
                outputs: [{ internalType: 'address', name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: true,
                inputs: [],
                name: 'totalSupply',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: 'to', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'transfer',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            {
                constant: false,
                inputs: [
                    { internalType: 'address', name: 'from', type: 'address' },
                    { internalType: 'address', name: 'to', type: 'address' },
                    { internalType: 'uint256', name: 'value', type: 'uint256' },
                ],
                name: 'transferFrom',
                outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ];
        const contractlp = new web3.eth.Contract(abillp, "0xaf64771bBD013492ac69220eB67836f36b23D5AA");

        const abiftm = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":true,"inputs":[],"name":"ERR_INVALID_ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERR_NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
        const contractftm = new web3.eth.Contract(abiftm, "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83");

        this.setState({ contractlp });

        this.setState({ contractftm });

        this.setState({ contractpool });

        this.setState({ contractblack })

        this.setState({ contractlike })

        // console.log(contract)
        this.setState({ contractav })       
        // console.log(contract)
        this.setState({ contractv })

        this.setState({ contract })


        const totalSupply = await contract.methods.totalSupply().call()
        // console.log(totalSupply)
        this.setState({ totalSupply })   


        var SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

        function abbreviateNumber(number){
        
            // what tier? (determines SI symbol)
            var tier = Math.log10(Math.abs(number)) / 3 | 0;
        
            // if zero, we don't need a suffix
            if(tier == 0) return number;
        
            // get suffix and determine scale
            var suffix = SI_SYMBOL[tier];
            var scale = Math.pow(10, tier * 3);
        
            // scale the number
            var scaled = number / scale;
        
            // format number and add suffix
            return scaled.toFixed(1) + suffix;
        }

        const rewardRate = await contractpool.methods.rewardRate().call();
        const reward = await contractpool.methods.rewards(this.state.account).call();
        const rewards = reward / 1e18;
        const earn = await contractpool.methods.earned(this.state.account).call();
        const earned = earn / 1e18;
        const rewardbal = earned * syfusd;
        const balanceInPool = await contractpool.methods.balanceOf(this.state.account).call();
        const balPool = balanceInPool / 1e18;
        const totalinPool = await contractpool.methods.totalSupply().call();
        const bal = await contractmain.methods.balanceOf(this.state.account).call();
        const balance = bal / 1e18;  
        const usdbal = balance * syfusd;      
        const balLP = await contractlp.methods.balanceOf(this.state.account).call();
        const balanceLP = Number(web3.utils.fromWei(balLP));
        const totalLP = await contractlp.methods.totalSupply().call();
        const percentageLP = Number((balLP / totalLP) * 100).toFixed(2);
        const percentagePool = Number((balanceInPool / totalinPool) * 100).toFixed(2);

        const balFTMlp = await contractftm.methods.balanceOf("0xaf64771bBD013492ac69220eB67836f36b23D5AA").call();

        const totalliquidity = (balFTMlp / 1e18) * ftmprice * 2;

        const approval = await contractlp.methods.allowance(this.state.account, "0x94489dD0D3a57A142b0a4Fac7984cE587F7ebB66").call();

        if (approval > 900000000000000) {
            this.setState({ approved: true })
        }

        this.setState({ rewardRate });
        this.setState({ rewards });
        this.setState({ earned });
        this.setState({ balanceInPool });
        this.setState({ balPool });
        this.setState({ balance });
        this.setState({ balanceLP });
        this.setState({ totalLP });
        this.setState({ percentageLP });
        this.setState({ percentagePool });
        this.setState({ usdbal });
        this.setState({ totalliquidity });
        this.setState({ rewardbal });

        setInterval(async () => {
        const rewardRate = await contractpool.methods.rewardRate().call();
        const reward = await contractpool.methods.rewards(this.state.account).call();
        const rewards = reward / 1e18;
        const earn = await contractpool.methods.earned(this.state.account).call();
        const earned = earn / 1e18;
        const rewardbal = earned * syfusd;
        const balanceInPool = await contractpool.methods.balanceOf(this.state.account).call();
        const balPool = balanceInPool / 1e18;
        const totalinPool = await contractpool.methods.totalSupply().call();
        const bal = await contractmain.methods.balanceOf(this.state.account).call();
        const balance = bal / 1e18;  
        const usdbal = balance * syfusd;      
        const balLP = await contractlp.methods.balanceOf(this.state.account).call();
        const balanceLP = balLP / 1e18;
        const totalLP = await contractlp.methods.totalSupply().call();
        const percentageLP = Number((balLP / totalLP) * 100).toFixed(2);
        const percentagePool = Number((balanceInPool / totalinPool) * 100).toFixed(2);

        const balFTMlp = await contractftm.methods.balanceOf("0xaf64771bBD013492ac69220eB67836f36b23D5AA").call();

        const totalliquidity = (balFTMlp / 1e18) * ftmprice * 2;

        this.setState({ rewardRate });
        this.setState({ rewards });
        this.setState({ earned });
        this.setState({ balanceInPool });
        this.setState({ balPool });
        this.setState({ balance });
        this.setState({ balanceLP });
        this.setState({ totalLP });
        this.setState({ percentageLP });
        this.setState({ percentagePool });
        this.setState({ usdbal });
        this.setState({ totalliquidity });
        this.setState({ rewardbal });
        }, 5000);


        if (this.state.approved === true) {
            document.getElementById("approval").style.display = "none";
            document.getElementById("deposit").style.display = "block";
            document.getElementById("withdraw").style.display = "block";
            document.getElementById("claim").style.display = "block";
        }


}
}

export default Stake;

import React, { Component } from 'react';
import { useHistory, Link } from 'react-router-dom';

import Syfin from '../../abis/Syfin.json';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import SyfinAvatars from '../../abis/SyfinAvatars.json';
import SyfinVerified from '../../abis/SyfinVerified.json';
import SyfinNFTLikes from '../../abis/SyfinNFTLikes.json';

import LazyLoad, { forceCheck } from 'react-lazyload';

import Modal from 'react-modal';

import ReactCanvasConfetti from 'react-canvas-confetti';

import ReactPlaceholder from "react-placeholder";
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import "react-placeholder/lib/reactPlaceholder.css";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import Jazzicon, { jsNumberForAddress }  from 'react-jazzicon';

import ScrollToTop from "react-scroll-to-top";

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

const customStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      backgroundColor: '#000',
      borderColor: '#004A8B',
      borderRadius: '15px',
      padding: '40px',
      color: '#FFF',
      bottom: 'auto',
      maxWidth: '550px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
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

class Landing extends Component {

    

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleOpenSYFModal () {
        this.setState({ showSYFModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
        localStorage.setItem('agreed', 'true');
    }

    handleCloseSYFModal () {
        this.setState({ showSYFModal: false });
    }

    render() {
    if (document.body && document.getElementById("mainfoot")) {
        document.body.style.backgroundImage = "url(bg.jpg)";
        document.getElementById("mainfoot").style.display = "none";
    }

    return (

        <div>
        <ScrollToTop smooth />
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
           isOpen={this.state.showModal}
           contentLabel="Disclaimer"
           id="modalwarn"
           align="center"
           style={customStyle}
           overlayClassName="myoverlay"
           onRequestClose={this.handleCloseModal}
        >
          <div align="center"><p>Welcome to the <strong>Syfin NFT Marketplace</strong>! This market is open and decentralized on the Fantom blockchain. Anyone can mint NFTs and list them for sale. This results in possible fakes and scammers. We utilize different smart contracts to "Verify" or "Blacklist" users manually and this can take time. Please use due diligence when making purchases of NFTs! When you buy a NFT here you are directly sending that user SYF, there is no method of refunds. If it is too good to be true, it probably is! As we continue to grow, so will our verified artists. You may report a fake NFT or artist via the "Report NFT" button on each NFT detail page.</p>
          <button className="btn btn-primary" onClick={this.handleCloseModal} align="center">I Understand</button>
          </div>
        </Modal>
        <Modal 
        animationDuration={1000}
           isOpen={this.state.showSYFModal}
           contentLabel="Syfin"
           id="modalsyfin"
           align="center"
           style={customStyle2}
           overlayClassName="myoverlay"
           onRequestClose={this.handleCloseSYFModal}
        ><button onClick={this.handleCloseSYFModal} className="btn btn-primary" align="right" style={{top:"15px", right:"15px", position: "absolute"}}>X</button>
          <h2 align="center"><img src="/ftmlogo.png" border="0" height="66px" width="66px" /> <i className="fa fa-arrow-right"></i> <img src="/logo.png" border="0" height="66px" width="66px" /></h2><br />
          <div align="center"><p>
            <h3>Swap your <strong>FTM</strong> to <strong>SYF</strong></h3>
                    <br />Balance <strong><span id="ftmbal">{Number(this.state.ftmbalance).toString().slice(0, (Number(this.state.ftmbalance).toString().indexOf("."))+5)}</span></strong> FTM
                    
                     <br /><br />
            <form onSubmit={(event) => {event.preventDefault()
                                        this.buySyfin();
            }}>
            <input type="number" autoComplete="off" step="any" onChange={event => this.changeAmount(event.target.value)} className="form-control" border="0" id="syfamount" placeholder="Amount of FTM" style={{padding: "20px"}} /><br />            
            Will get you <strong>≈ <span id="amounttobuy">0</span></strong> SYF<br /><br />
          <button className="btn btn-primary swapbtn" style={{fontSize:"23px"}} type="submit" align="center" disabled={(window.web3 !== undefined) ? false : true}>
              {(window.web3 !== undefined) ? 
              'SWAP' : 
              'CONNECT WALLET'
              }
              </button>
          </form>
          <br />
          Balance <strong><span id="syfbal">{this.abbreviateNumber(Number(this.state.syfbalance))}</span></strong> SYF<br />
          <span style={{color: "#999"}}>Max Balance <strong>1.5 Billion</strong> SYF</span>
          </p>
        
          </div>
        </Modal>
        <div className="col-auto mx-4 align-middle" style={{marginTop: "3vh"}}>
            {/* <h4 className="mb-0 font-weight-normal">Syfin.art on Fantom</h4> */}
        </div>
        <div className="row">
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
                <div className="col-md-12 my-auto align-middle" style={{background: "#000000", display: "table-cell", maxWidth: "800px", margin: "0 auto", padding: "30px", borderRadius: "25px"}}>
                    <h2><span className="rainbowtxt1">WELCOME</span>&nbsp;&nbsp;&nbsp;<span className="rainbowtxt2">TO THE</span><br /><span className="rainbowtxt3">SYFIN NFT MARKET</span></h2>
                    {/* <div className="col-auto max-250">
                        <model-viewer src="logo4.glb" alt="Syfin SYF" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls style={{width: "100%", height: "250px", backgroundColor: "#111"}}></model-viewer>     
                    </div> */}
                    {/* <div className="text-secondary" style={{ fontSize: '18px',lineHeight:1.5,wordSpacing:2, backgroundColor: "#000", padding: "30px", borderRadius: "15px", minHeight: "360px", verticalAlign: "middle", display: "table-cell"}}>
                        Syfin.art is where you can mint, gift, buy, and sell NFTs (Non-Fungible Tokens) on the Fantom blockchain. As word spreads about the rise of Non-Fungible Tokens (NFTs), we’re fielding more and more questions from artists and creators looking to sell their work on the Fantom blockchain. Here is how you can turn your art and graphics into NFTs and list them for sale. The SYF NFT Marketplace allows you to sell or buy NFTs with our token SYF on Fantom. Minting an NFT is 100x cheaper than minting on Ethereum. This new SYF NFT dapp is a work in progress still, so expect lots of updates in the future!                        
                    </div> */}
                    <h4 className="text-light" style={{fontWeight: "800"}}>Mint, Buy, Sell, Gift, and Discover very rare digital assets</h4>
                    <div className="row">
                <div className="col-md-6" align="center">
                <a type="button" href="/explore" className="btn btn-primary rounded m-3 homeButton swapbtn">EXPLORE</a>
                </div><div className="col-md-6" align="center">
                <a type="button" onClick={this.handleOpenSYFModal} className="btn btn-primary rounded m-3 homeButton swapbtn">BUY SYF</a>
                </div>
                <p className="text-light" style={{fontSize: "19px", fontWeight: "600"}}>Zero % Fees! FREE to Mint (just tx gas)</p>
            </div>
                    
                </div>
               
                </div><br /> <div style={{backgroundColor: "#000000d9", width: "80%", padding: "15px", borderRadius: "25px"}} className="intro">
             <div className="row" align="center">
                <div className="col-md-4"><strong className="text-light">Total Value Locked</strong><br /><ReactPlaceholder type='rect' ready={this.state.totalliquidity} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '50px', marginBottom: "15px", borderRadius: '15px' }}><h1 className="text-light" style={{textShadow: "1px 4px 5px #000", fontWeight: "black"}}>$<strong>{this.state.totalliquidity.toLocaleString("en",  { style: 'decimal', maximumFractionDigits : 0, minimumFractionDigits : 0 })}</strong></h1></ReactPlaceholder></div>  
                            <div className="col-md-4">
                            <strong className="text-light">Syfin Market Cap</strong><br />
                            <ReactPlaceholder type='rect' ready={this.state.mcap} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '50px', marginBottom: "15px", borderRadius: '15px' }}><h1 className="text-light" style={{textShadow: "1px 4px 5px #000", fontWeight: "black"}}>$<strong>{this.state.mcap.toLocaleString("en",  { style: 'decimal', maximumFractionDigits : 0, minimumFractionDigits : 0 })}</strong> </h1></ReactPlaceholder>    
                            </div>
                            <div className="col-md-4">
                            <strong className="text-light">Total NFTs</strong><br />
                            <ReactPlaceholder type='rect' ready={this.state.totalSupply} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '50px', marginBottom: "15px", borderRadius: '15px' }}><h1 className="text-light" style={{textShadow: "1px 4px 5px #000", fontWeight: "black"}}><strong>{this.state.totalSupply}</strong></h1></ReactPlaceholder>    
                            </div>
                            
                            </div>
                            </div><br />
                <br />
                <br /><span style={{fontSize: "21px", fontWeight: "800", color: "#777"}}>Powered By</span><br />
                <img src="/poweredby.png" alt="Powered By Fantom and Syfin" border="0" style={{maxWidth: "450px", width:"100%"}} />
                <br />
               
            <br />            
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
                sale_contract: null,
                totalSupply: 0,
                images: [],
                owners: [],
                percent: 0,
                ftmamount: 0,
                minted: [],
                mintedcollection: '',
                ftmbalance: 0,
                syfbalance: 0,
                showModal: false,
                showSYFModal: false,
                totalliquidity: 0,
                totalcirc: 0,
                mcap: 0,
                txpend: false,
                txs: 0,
                imageData_name: [],
                imageData_nftData: [],
                imageData_mimeType: [],
                imageData_category: [],
                imageData_price: [],
                imageData_id: [],
                imageData_owner: [],
                imageData_icecount: [],
                imageData_likecount: [],
                mimages: [],
                mimageData_name: [],
                mimageData_nftData: [],
                mimageData_mimeType: [],
                mimageData_category: [],
                mimageData_price: [],
                mimageData_id: [],
                mimageData_owner: [],
                mimageData_icecount: [],
                mimageData_likecount: [],
                tximages: [],
                tximageData_name: [],
                tximageData_nftData: [],
                tximageData_mimeType: [],
                tximageData_category: [],
                tximageData_price: [],
                tximageData_id: [],
                tximageData_buyer: [],
                tximageData_boughtprice: [],
                tximageData_buyeripfs: [],
                tximageData_buyermim: [],
                tximageData_buyername: [],
                tximageData_verified: [],
                tximageData_usdprice: [],
                tximageData_ftmprice: [],
                tximageData_icecount: [],
                tximageData_likecount: [],
                gtximages: [],
                gtximageData_name: [],
                gtximageData_nftData: [],
                gtximageData_mimeType: [],
                gtximageData_category: [],
                gtximageData_price: [],
                gtximageData_id: [],
                gtximageData_receiver: [],
                gtximageData_boughtprice: [],
                gtximageData_buyeripfs: [],
                gtximageData_buyermim: [],
                gtximageData_buyername: [],
                gtximageData_verified: [],
                feature_verified: [],
                iData_name: [],
                iData_nftData: [],
                iData_mimeType: [],
                iData_category: [],
                iData_price: [],
                iData_id: [],
                ready2: false,
                ready3: false,
                readymint: false,
                selling_to: '',
                selling_price: null,
                token_sale_contract: null,
                token_price: 0,
                syfamount: 0,
                approved: [],
                blackListed: [],
                owned: '',
                ipfs: '',
                mim: '',
                name: '',
                transactions: [],
                gtransactions: []

            }
            this.handleOpenModal = this.handleOpenModal.bind(this);
            this.handleCloseModal = this.handleCloseModal.bind(this);
            this.handleOpenSYFModal = this.handleOpenSYFModal.bind(this);
            this.handleCloseSYFModal = this.handleCloseSYFModal.bind(this);
        }

    async componentWillMount() {


        await this.loadBlockchainData();
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

    abbreviateNumber = (number) => {
    
        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0;
    
        // if zero, we don't need a suffix
        if(tier === 0) return number;

        var SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];
    
        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);
    
        // scale the number
        var scaled = number / scale;
    
        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }

    buySyfin = () => {
        const web3 = window.web3;
        this.setState({ txpend: true })
        this.setState({ txs: 2 })

        const ftmabi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":true,"inputs":[],"name":"ERR_INVALID_ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERR_NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

        const syfinitabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"syfAmount","type":"uint256"}],"name":"getEstimatedFTMforSYF","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ftmAmount","type":"uint256"}],"name":"getEstimatedSYFforFTM","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"syfAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"syfin","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

        const contractsyfin = new web3.eth.Contract(syfinitabi, "0xd527210FC806D5e20F76afCC9D3F4632442FB1cF");

        const contractftm = new web3.eth.Contract(ftmabi, "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83");

        const slippage = this.state.syfamount;

        console.log(slippage);

        contractsyfin.methods.getEstimatedFTMforSYF(slippage.toString()).call()
        .then((receipt) => {
            const estftm = receipt[0];
            console.log(estftm);

            contractftm.methods.approve(
                "0xd527210FC806D5e20F76afCC9D3F4632442FB1cF",
                estftm
            ).send({ from: this.state.account })
                .once('receipt', (receipt) => {
                    this.setState({ txpend: true })
                    this.setState({ txs: 1 })

                    // make new deadline one hour from now in epoch unix time
                    const deadline = Math.floor(Date.now() / 1000) + 6000;
                    console.log(deadline);

                contractsyfin.methods.syfin(slippage.toString(), deadline).send({ from: this.state.account, value: estftm })
                .once('receipt', async (receipt) => {

                    this.setState({ txpend: false });
                    this.setState({ txs: 0 });

                    this.handlerFire();

                    //console.log(receipt);

                    console.log('Syfined FTM to SYF successfully!');
    
                }).catch(error => {
                    // Transaction rejected or failed
        
                    alert("Transaction failed on syfining from FTM!");
                    this.setState({ txpend: false });
                })    
            
            }).catch(error => {
                // Transaction rejected or failed
                console.log(error);
                alert("Transaction failed on FTM approval!");
                this.setState({ txpend: false });
            })   


        }).catch(error => {
            console.log(error);
            alert("Failed to get Syfin estimate!");
            this.setState({ txpend: false });
        })        

    }

    changeAmount = (amount) => {

        if (amount > 0) {
        const web3 = new Web3("https://rpc.ftm.tools/");

        const syfinitabi2 = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"syfAmount","type":"uint256"}],"name":"getEstimatedFTMforSYF","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ftmAmount","type":"uint256"}],"name":"getEstimatedSYFforFTM","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"syfAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"syfin","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

        const contractsyfin2 = new web3.eth.Contract(syfinitabi2, "0xd527210FC806D5e20F76afCC9D3F4632442FB1cF");

        // console.log(slippage);

        this.setState({ ftmamount: amount });
        
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

        contractsyfin2.methods.getEstimatedSYFforFTM(web3.utils.toWei(amount.toString(), "ether")).call()
        .then((receipt) => {
            const estsyf = receipt[1];
            console.log(estsyf);

            this.setState({ syfamount: estsyf });

            document.getElementById("amounttobuy").innerHTML = abbreviateNumber(estsyf / 1e18);

        }).catch(error => {
            console.log(error);
            alert("Failed to get Syfin estimate!");
        })
    } else {
        document.getElementById("amounttobuy").innerHTML = 0;
    }

    }
    
    async like(e, owner, key) {
        e.preventDefault();
        e.stopPropagation();

        document.getElementById("like"+key).classList.add("fa-pulse"); 

        const web3t = window.web3;

        const accounts = await window.web3.eth.getAccounts()
        const acct = accounts[0];
        console.log('set account');

        const abilike = SyfinNFTLikes.abi;
        const contractlike = new web3t.eth.Contract(abilike, "0xe145C6Cb2FA344cb9A1335685F844bDfF3470321");

        contractlike.methods.LikeNFT(owner, key).send({ from: acct })
        .once('receipt', (receipt) => {
            console.log("NFT Liked!")
            document.getElementById("like"+key).classList.remove("fa-pulse"); 
            document.getElementById("like"+key).classList.add("liked");
            document.getElementById("count"+key).innerHTML = Number(document.getElementById("count"+key).innerHTML) + 1;

            // this.setState({ txpend: false })
            // this.setState({ txs: 0 })
        }).catch(error => {
            // Transaction rejected or failed
            document.getElementById("like"+key).classList.remove("fa-pulse"); 
            alert("Like failed!");
            console.log(error);
            // this.setState({ txpend: false });
        })  

    }

    async ice(e, owner, key) {
        e.preventDefault();
        e.stopPropagation();

        document.getElementById("ice"+key).classList.add("fa-pulse"); 

        const web3t = window.web3;
        const web3ftm = new Web3("https://rpc.ftm.tools/");

        const accounts = await window.web3.eth.getAccounts()
        const acct = accounts[0];
        console.log('set account');

        const networkData = SyfinNFT.networks[250]
        const abi = SyfinNFT.abi
        const address = networkData.address
        const contract = new web3ftm.eth.Contract(abi, address)

        // Get minter of NFT
        const minted = await contract.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' })

        for (var i = 0; i < minted.length; i++) {
            this.setState({ minted: [...this.state.minted, minted[i].returnValues] })
        }

        // console.log(this.state.minted)

        for (i = 0; i < this.state.minted.length; i++) {
            // console.log(this.state.transactions[i]._buyer)
            // console.log(this.state.minted[i].tokenId)
            if (this.state.minted[i].tokenId == key) {
                // console.log('hoorah!');
                if (this.state.minted[i].from == "0x0000000000000000000000000000000000000000") {
                    // console.log('hoorah TWICE!')
                    // console.log(this.state.minted[i].to);
                    this.setState({ mintedcollection: this.state.minted[i].to })
                }
            }
            // if (key === this.state.minted[i].tokenId && this.state.minted[i].from === "0x0000000000000000000000000000000000000000") {
            //     console.log(this.state.minted[i].to)
            //     console.log('found key')
            //     this.setState({ mintedcollection: this.state.minted[i].to });
            // } else {
            //     console.log('no go');
            //     // Nothing atm
            // }
        }

        // console.log(this.state.mintedcollection)

        const abilike = SyfinNFTLikes.abi;
        const contractlike = new web3t.eth.Contract(abilike, "0xe145C6Cb2FA344cb9A1335685F844bDfF3470321");

        const abib = Syfin.abi
        const addressb = "0x1BCF4DC879979C68fA255f731FE8Dcf71970c9bC"
        const token_contract = new web3t.eth.Contract(abib, addressb)      

        const iceprice = "500";

        token_contract.methods.approve(
            "0xe145C6Cb2FA344cb9A1335685F844bDfF3470321",
            web3ftm.utils.toWei(iceprice, "ether")
        ).send({ from: acct, })
            .once('receipt', (receipt) => {

            contractlike.methods.IceNFT(this.state.mintedcollection, key).send({ from: acct })
            .once('receipt', (receipt) => {
                console.log("NFT Liked!")
                document.getElementById("ice"+key).classList.remove("fa-pulse"); 
                document.getElementById("ice"+key).classList.add("iced");
                document.getElementById("counti"+key).innerHTML = Number(document.getElementById("counti"+key).innerHTML) + 5;

                // this.setState({ txpend: false })
                // this.setState({ txs: 0 })
                }).catch(error => {
                    // Transaction rejected or failed
                    document.getElementById("ice"+key).classList.remove("fa-pulse"); 
                    alert("Ice failed!");
                    console.log(error);
                    // this.setState({ txpend: false });
                })  

        }).catch(error => {
            // Transaction rejected or failed
            document.getElementById("ice"+key).classList.remove("fa-pulse"); 
            alert("Ice failed!");
            console.log(error);
            // this.setState({ txpend: false });
        })  

    }


    async loadBlockchainData() {

        // window.loaded_web3 = false;

        function randomNumber(min, max) { 
            return Math.random() * (max - min) + min;
        }

        if (localStorage.getItem('agreed') === 'true') {
            this.setState({ showModal: false })
        } else {
            this.setState({ showModal: true })
        }

        const web3 = window.web3;
        // const web3 = new Web3("https://rpcapi.fantom.network/");
        const web3t = new Web3("https://rpc.ftm.tools/");
        // Load account
        // const accounts = await web3.eth.getAccounts()
        // this.setState({ account: accounts[0] })

        if (typeof web3 !== 'undefined') {
            const accounts = await web3.eth.getAccounts()
            this.setState({ account: accounts[0] })
            this.setState({ connected: true })
            const chainId = await web3.eth.getChainId();
            if (chainId === 250) {
                this.setState({ connected: true })
                console.log(this.state.connected);
                console.log(this.state.account);
            } else {
                this.setState({ connected: false })
            }            
        }

        setInterval(async () => {
            if (typeof web3 !== 'undefined' && this.state.showSYFModal === true) {
                console.log('hit')
                const ftmbalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether');
                if (ftmbalance > 0 && typeof ftmbalance !== 'undefined') {
                    this.setState({ ftmbalance });

                    document.getElementById("ftmbal").innerHTML = Number(ftmbalance).toFixed(4);

                    const abia = Syfin.abi
                    const addr = "0x1BCF4DC879979C68fA255f731FE8Dcf71970c9bC"
                    const contract = new web3.eth.Contract(abia, addr);
                    const syfbal = await contract.methods.balanceOf(this.state.account).call();
                    if (syfbal > 0 && syfbal !== null) {
                        const syfbalance2 = web3.utils.fromWei(syfbal, 'ether');
                        const syfbalance = syfbalance2;

                        this.setState({ syfbalance });                       
                        
                        document.getElementById("syfbal").innerHTML = this.abbreviateNumber(Number(syfbalance));
                    }
                }
            }
            const abip = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestFTMPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getLatestTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
            const addp = "0x8fBE84d284D1614eaDc50EE69120Ec4f7f98cEd8";
            const contractp = new web3t.eth.Contract(abip, addp);
            this.setState({ contractp })

            const abiftm = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":true,"inputs":[],"name":"ERR_INVALID_ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERR_NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
            const contractftm = new web3t.eth.Contract(abiftm, "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83");

    
            const ftmprice = await contractp.methods.getLatestFTMPrice().call() / 1e8;
            const syfperftm = await contractp.methods.getLatestTokenPrice("0xaf64771bbd013492ac69220eb67836f36b23d5aa", 1).call();
            const syfusd = ftmprice / (syfperftm / 1e18);
            const mcap = Number(100000000000 * syfusd);

            // const balFTMlp = await contractftm.methods.balanceOf("0xaf64771bBD013492ac69220eB67836f36b23D5AA").call();

            const balFTMlp = await contractftm.methods.balanceOf('0xaf64771bBD013492ac69220eB67836f36b23D5AA').call()
            const balWRAFTMlp = await contractftm.methods.balanceOf('0x2e9aC7f69e3c747420C918954f823a8e98AccAe2').call()
            const balUSDC = await contractftm.methods.balanceOf('0xC43b6a7Ff3929BE35cD4297309585e43b51cE0F4').call()
            const balSYF = await contractftm.methods.balanceOf('0x017672C6254c8C9593bc3B71F1a97E9ba45E8817').call()
            const balBOO = await contractftm.methods.balanceOf('0x36041D7F9639d954899315C11A997d9Cd5Ef4b8b').call()
            const balUSDCWRA = await contractftm.methods.balanceOf('0x6a80BD3eb550adcfF4f2f5f12a1bB213c1Ef57fA').call()
            const balSYFUSDC = await contractftm.methods.balanceOf('0x6B16f1E86a44368D0A88737dAA51DFe180c77Caa').call()

            var combine = 0
            combine = balFTMlp / 1e18
            combine += balWRAFTMlp / 1e18
            combine += balUSDC / 1e18
            combine += balSYF / 1e18
            combine += balBOO / 1e18
            combine += balUSDCWRA / 1e18
            combine += balSYFUSDC / 1e18

            // console.log(combine)
            const totalliquidity = combine * ftmprice * 2

            // const totalliquidity = (balFTMlp / 1e18) * ftmprice * 2;

            const abia = Syfin.abi
            const addr = "0x1BCF4DC879979C68fA255f731FE8Dcf71970c9bC"
            const contract = new web3t.eth.Contract(abia, addr);
            const syfbal = await contract.methods.balanceOf('0x000000000000000000000000000000000000dead').call();
            const dead = web3t.utils.fromWei(syfbal, 'ether');

            const totalcirc = 100000000000 - dead;
    
            this.setState({ mcap }); 
            this.setState({ totalliquidity });
            this.setState({ totalcirc });

            const networkData = SyfinNFT.networks[networkId]
            const abi = SyfinNFT.abi
            const address = networkData.address
            const contractnft = new web3t.eth.Contract(abi, address)

            const totalSupply = await contractnft.methods.totalSupply().call()
            // console.log(totalSupply)
            this.setState({ totalSupply })   


        }, 5000);

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

        const abilike = SyfinNFTLikes.abi;
        const contractlike = new web3t.eth.Contract(abilike, "0xe145C6Cb2FA344cb9A1335685F844bDfF3470321");

        const abiblack = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hashAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftID","type":"uint256"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedNFT","type":"event"},{"inputs":[],"name":"AddyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"IDCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"blAddress","type":"address"}],"name":"getBlackListedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"}],"name":"getBlackListedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"updates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
        const contractblack = new web3t.eth.Contract(abiblack, "0xfBA3E2C37A8F199c22eF9bD331f09023D2110c98");

        const ftmabi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":true,"inputs":[],"name":"ERR_INVALID_ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERR_NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

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

        if (typeof web3 !== 'undefined') {            
            const ftmbalance = web3.utils.fromWei(await web3.eth.getBalance(this.state.account), 'ether');
            this.setState({ ftmbalance });
            console.log(ftmbalance)
        }
        if (typeof web3 !== 'undefined') {   
            const abia = Syfin.abi
            const addr = "0x1BCF4DC879979C68fA255f731FE8Dcf71970c9bC"
            const contract = new web3.eth.Contract(abia, addr);
            const syfbal = await contract.methods.balanceOf(this.state.account).call();
            const syfbalance2 = web3.utils.fromWei(syfbal, 'ether');
            const syfbalance = syfbalance2;

            this.setState({ syfbalance });
        }



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


        // console.log(sale_contract)
        const transactions = await sale_contract.getPastEvents('BoughtNFT', { fromBlock: 0, toBlock: 'latest' })

        const gtransactions = await sale_contract.getPastEvents('GiftedNFT', { fromBlock: 0, toBlock: 'latest' })
        // console.log(transactions)

        // if (this.state.transactions !== transactions) {
        this.setState({ transactions: transactions })

        this.setState({ gtransactions: gtransactions })
        // }
    }

}

export default Landing;

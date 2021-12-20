import React, { Component } from 'react';
import { useHistory, Link } from 'react-router-dom';

import Syfin from '../../abis/Syfin.json';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import SyfinAvatars from '../../abis/SyfinAvatars.json';
import SyfinVerified from '../../abis/SyfinVerified.json';
import SyfinNFTLikes from '../../abis/SyfinNFTLikes.json';

import Img from "react-cool-img";

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

class Home extends Component {

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
        <div className="col-auto mx-4" style={{marginTop: "55px"}}>
            {/* <h4 className="mb-0 font-weight-normal">Syfin.art on Fantom</h4> */}
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
                <div className="col-md-6 my-auto">
                    <h2><span className="rainbowtxt1">THE</span>&nbsp;&nbsp;&nbsp;<span className="rainbowtxt2">VERY BEST</span><br /><span className="rainbowtxt3">NFT MARKETPLACE</span></h2>
                    {/* <div className="col-auto max-250">
                        <model-viewer src="logo4.glb" alt="Syfin SYF" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls style={{width: "100%", height: "250px", backgroundColor: "#111"}}></model-viewer>     
                    </div> */}
                    {/* <div className="text-secondary" style={{ fontSize: '18px',lineHeight:1.5,wordSpacing:2, backgroundColor: "#000", padding: "30px", borderRadius: "15px", minHeight: "360px", verticalAlign: "middle", display: "table-cell"}}>
                        Syfin.art is where you can mint, gift, buy, and sell NFTs (Non-Fungible Tokens) on the Fantom blockchain. As word spreads about the rise of Non-Fungible Tokens (NFTs), we’re fielding more and more questions from artists and creators looking to sell their work on the Fantom blockchain. Here is how you can turn your art and graphics into NFTs and list them for sale. The SYF NFT Marketplace allows you to sell or buy NFTs with our token SYF on Fantom. Minting an NFT is 100x cheaper than minting on Ethereum. This new SYF NFT dapp is a work in progress still, so expect lots of updates in the future!                        
                    </div> */}
                    <div className="row">
<div className="col-md-6">
                <a type="button" href="/mint" className="btn btn-primary rounded m-3 homeButton">MINT NFT</a>
                </div><div className="col-md-6">
                <a type="button" onClick={this.handleOpenSYFModal} className="btn btn-primary rounded m-3 homeButton">BUY SYF</a>
                </div>
            </div>
                    <br /><br />
                </div>
                <div className="col-md-6">
                    
                    <ReactPlaceholder type='rect' ready={this.state.ready2} showLoadingAnimation={true} color='#333' style={{ width: '100%', height: '450px', marginTop: '15px', borderRadius: '15px' }}>  
                    <a href={"/nft/"+this.state.iData_id}>
                    <div style={{backgroundColor: "#222", borderRadius: "25px"}}>
                    <div className="row">
                        <div className="col-5" align="center">
                            <div className="m-2 text-light">
                                
                                { (this.state.iData_name.length > 20) ? this.state.iData_name.slice(0,20) + "..." : this.state.iData_name }
                                
                                <br /><span style={{fontSize: "13px"}}>Owned By <strong>{this.state.owned.substring(0, 8) + '...'}</strong></span></div>
                        </div>
                        <div className="col-2 my-auto" align="center">
                        {
                            (this.state.owned.length > 0) ? (
                            (this.state.ipfs !== "" && (this.state.mim === "image/jpeg" || this.state.mim === "image/png" || this.state.mim === "image/gif")) ?
                            (<div style={{position: "relative", width: "45px"}}><Img src={"https://ipfs.sy.finance/ipfs/"+this.state.ipfs} cache alt="" border="0" height="50px" width="50px" style={{borderRadius: "50%"}} />
                            
                            {(this.state.feature_verified === true) ? (
                                <div style={{position: "absolute", bottom: "-3px", right: "-1px"}}><svg width="16" height="16" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                            ) : null
                            }
                            </div>) :
                            ( <div style={{position: "relative", width: "45px", marginTop: "10px", marginBottom: "0px"}}><Jazzicon diameter={45} seed={jsNumberForAddress(this.state.owned)} />
                            {(this.state.feature_verified === true) ? (
                                <div style={{position: "absolute", bottom: "-3px", right: "-2px"}}><svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                            ) : null
                            }
                            </div> )                        
                            ) : null
                        }              
                        </div>
                        <div className="col-5 my-auto" align="center">
                            Last Price ≈ {this.state.iData_price} SYF<br />
                            ≈${Number(this.state.iData_price_usd).toFixed(2)} USD
                        </div>
                      </div>

                    <div className="col-auto" style={{height: "400px"}}>
                                       
                    {(typeof this.state.iData_nftData !== 'undefined') ? (

                    (this.state.iData_mimeType === "image/jpeg" || this.state.iData_mimeType === "image/png" || this.state.iData_mimeType === "image/gif") ? ( 
                        <Img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.iData_nftData} cache style={{background: "#000"}}/>
                    ) : (this.state.iData_mimeType === "video/mp4") ? (
                        <video alt="NFT" className="token rounded" autoPlay playsInline muted loop controls src={"https://ipfs.sy.finance/ipfs/"+this.state.iData_nftData} type="video/mp4">
                        <source src={"https://ipfs.sy.finance/ipfs/"+this.state.iData_nftData} type="video/mp4"></source>
                        </video>
                    ) : (this.state.iData_mimeType === "model/gltf-binary") ? (
                        <model-viewer src={"https://ipfs.sy.finance/ipfs/"+this.state.iData_nftData} alt={this.state.iData_name} ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls style={{width: "100%", height: "400px"}}>

                        </model-viewer> 
                    ) : ( null )
                    ) : ( null )
                    }
                    </div>   
                    </div>     
                    </a>        
                      </ReactPlaceholder><br />
                </div>
                </div>
                <br />
            <br />            
            <div className="row justify-content-around">
                <h4 className="text-light">Random NFTs</h4>
            <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>                        
                        {this.state.images.map((id, key) => {
                            return (
                                (this.state.ready === true) ?
                                    (  
                                    <div key={key} className="col-md-2 card bg-light m-3 p-2">                                                                     
                                        <Link to={{
                                            pathname: `/nft/${this.state.imageData_id[key]}`,
                                            // state: {name: "vikas"}
                                        }}>                                            
                                            <form onSubmit={(event) => {

                                            }}>

                                                <div className="col-auto max-250">
                                                <div className="text-secondary idbadge" align="center">ID #{this.state.imageData_id[key]}</div>
                                                {(typeof this.state.imageData_nftData[key] !== 'undefined') ? (

                                                (this.state.imageData_mimeType[key] === "image/jpeg" || this.state.imageData_mimeType[key] === "image/png" || this.state.imageData_mimeType[key] === "image/gif") ? ( 
                                                    <Img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} cache style={{background: "#000"}}/>
                                                ) : (this.state.imageData_mimeType[key] === "video/mp4") ? (
                                                    <video alt="NFT" className="token rounded" autoPlay playsInline muted loop controls src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} type="video/mp4">
                                                    <source src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} type="video/mp4"></source>
                                                    </video>
                                                ) : (this.state.imageData_mimeType[key] === "model/gltf-binary") ? (
                                                    <model-viewer src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} alt={this.state.imageData_name[key]} ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls style={{width: "100%", height: "250px"}}></model-viewer> 
                                                ) : ( null )
                                                ) : ( null )
                                                }
                                                    
                                                </div>
                                                <div className="m-2" align="center">{this.state.imageData_name[key]}</div>
                                                {/* <div className="m-2" align="center">{this.state.approved[key] ? ( "Price: " + this.state.imageData_price[key] )
                                                : ( "Not For Sale" )
                                                }
                                                    <img alt="main" className="eth-class" src="../logo.png" />
                                                </div> */}


                                            </form>
                                        </Link>                                        
                                    </div>
                                    ) : null
                            )
                        })
                        }
                        </ReactPlaceholder>
                        <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>
                            <span style={{display: "none"}}>&nbsp;</span>
                        </ReactPlaceholder>
                        <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>
                            <span style={{display: "none"}}>&nbsp;</span>
                        </ReactPlaceholder>
                        </div><br />                                    
            <div className="row justify-content-around">
                <h4 className="text-light">Fresh off the mint!</h4>
            <ReactPlaceholder type='rect' ready={this.state.readymint} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>                        
                        {this.state.mimages.reverse().map((id, key) => {
                            return (
                                (key < 5) ? (
                                (this.state.readymint === true) ?
                                    (  
                                    <div key={key} className="col-md-2 card bg-light m-3 p-2">
                                        <div className="m-2 row" align="center">
                                            <div className="col-6">
                                                <a href="" onClick={(e) => this.like(e, this.state.mimageData_owner[key], this.state.mimageData_id[key])}><span id={"count"+this.state.mimageData_id[key]}>{this.state.mimageData_likecount[key]}</span> <i className="fa fa-heart like" id={"like"+this.state.mimageData_id[key]}></i></a>
                                            </div>
                                            <div className="col-6">
                                                <a href="" onClick={(e) => this.ice(e, this.state.mimageData_owner[key], this.state.mimageData_id[key])}><span id={"counti"+this.state.mimageData_id[key]}>{this.state.mimageData_icecount[key]}</span> <i className="fas fa-gem ice" id={"ice"+this.state.mimageData_id[key]}></i></a>
                                            </div>
                                        </div>                                        
                                        <Link to={{
                                            pathname: `/nft/${this.state.mimageData_id[key]}`,
                                            // state: {name: "vikas"}
                                        }}>                                            
                                            <form onSubmit={(event) => {

                                            }}>

                                                <div className="col-auto max-250">
                                                    
                                                <div className="text-secondary idbadge" align="center">ID #{this.state.mimageData_id[key]}</div>
                                                {(typeof this.state.mimageData_nftData[key] !== 'undefined') ? (

                                                (this.state.mimageData_mimeType[key] === "image/jpeg" || this.state.mimageData_mimeType[key] === "image/png" || this.state.mimageData_mimeType[key] === "image/gif") ? ( 
                                                    <Img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.mimageData_nftData[key]} cache style={{background: "#000"}}/>
                                                ) : (this.state.mimageData_mimeType[key] === "video/mp4") ? (
                                                    <video alt="NFT" className="token rounded" autoPlay playsInline muted loop controls src={"https://ipfs.sy.finance/ipfs/"+this.state.mimageData_nftData[key]} type="video/mp4">
                                                    <source src={"https://ipfs.sy.finance/ipfs/"+this.state.mimageData_nftData[key]} type="video/mp4"></source>
                                                    </video>
                                                ) : (this.state.mimageData_mimeType[key] === "model/gltf-binary") ? (
                                                    <model-viewer src={"https://ipfs.sy.finance/ipfs/"+this.state.mimageData_nftData[key]} alt={this.state.mimageData_name[key]} ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls style={{width: "100%", height: "250px"}}></model-viewer> 
                                                ) : ( null )
                                                ) : ( null )
                                                }
                                                    
                                                </div>
                                                <div className="m-2" align="center">{this.state.mimageData_name[key]}</div>
                                                {/* <div className="m-2" align="center">{this.state.approved[key] ? ( "Price: " + this.state.imageData_price[key] )
                                                : ( "Not For Sale" )
                                                }
                                                    <img alt="main" className="eth-class" src="../logo.png" />
                                                </div> */}


                                            </form>
                                        </Link>                                        
                                    </div>
                                    ) : null
                            ) : null
                            )
                        })
                        }
                        </ReactPlaceholder>
                        <ReactPlaceholder type='rect' ready={this.state.readymint} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>
                            <span style={{display: "none"}}>&nbsp;</span>
                        </ReactPlaceholder>
                        <ReactPlaceholder type='rect' ready={this.state.readymint} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>
                            <span style={{display: "none"}}>&nbsp;</span>
                        </ReactPlaceholder>
                        </div><br />
                        <div className="row">
                <div className="col-md-3" align="center" style={{padding:"30px"}}>
                <h3 className="text-light"><p><i className="fas fa-wallet fa-2x" style={{color: "#999"}}></i></p>Set up your wallet</h3>
                <p className="text-secondary">Once you’ve set up your wallet with Metamask, connect it to Syfin by clicking the "Connect Wallet" button in the top right corner. Only Metamask is supported.</p>
                </div><div className="col-md-3" align="center" style={{padding:"30px"}}>
                <h3 className="text-light"><p><i className="fas fa-piggy-bank fa-2x" style={{color: "#999"}}></i></p>Add your collection</h3>
                <p className="text-secondary">Click "Mint a NFT" and set up your Syfin NFT collection. You can also edit your profile to get a biography, profile avatar, and name stored on chain.</p>
                </div><div className="col-md-3" align="center" style={{padding:"30px"}}>
                <h3 className="text-light"><p><i className="fas fa-hand-pointer fa-2x" style={{color: "#999"}}></i></p>Mint your NFTs</h3>
                <p className="text-secondary">Upload your work (image, video, audio, or 3D model), add a name, category, and description, it is cheaper than ever before with Syfin on the Fantom network.</p>
                </div>
                <div className="col-md-3" align="center" style={{padding:"30px"}}>
                <h3 className="text-light"><p><i className="fas fa-gavel fa-2x" style={{color: "#999"}}></i></p>List them for sale</h3>
                <p className="text-secondary">Choose between auctions (coming soon) and fixed-price listings. By selling an NFT you receive Syfin (SYF) which rewards you Spookyswap (BOO)</p>
                </div>
            </div>
            <a type="button" href="/search" className="btn btn-primary rounded m-3 homeButton">SEARCH ALL MINTED</a><br />
            <br/>
                        <div className="row justify-content-around">
                <h4 className="text-light">Recently Purchased NFTs</h4>
                <ReactPlaceholder type='rect' ready={this.state.ready3} showLoadingAnimation={true} color='#333' style={{ width: '150px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>   
                {this.state.tximages.reverse().map((id, key) => {                    
                    return (                        
                        (key < 5) ? (
                                <div key={key} className="col-md-2 card bg-light m-3 p-2">  
                                        {/* <div className="m-2 row" align="center">
                                            <div className="col-6">
                                                <a href="" onClick={(e) => this.like(e, this.state.tximageData_owner[key], this.state.tximageData_id[key])}><span id={"count"+this.state.tximageData_id[key]}>{this.state.tximageData_likecount[key]}</span> <i className="fa fa-heart like" id={"like"+this.state.tximageData_id[key]}></i></a>
                                            </div>
                                            <div className="col-6">
                                                <a href="" onClick={(e) => this.ice(e, this.state.tximageData_owner[key], this.state.tximageData_id[key])}><span id={"counti"+this.state.tximageData_id[key]}>{this.state.tximageData_icecount[key]}</span> <i className="fas fa-gem ice" id={"ice"+this.state.tximageData_id[key]}></i></a>
                                            </div>
                                        </div>                                          */}
                                        <Link to={{
                                            pathname: `/nft/${this.state.tximageData_id[key]}`,
                                            // state: {name: "vikas"}
                                        }}>                                            
                                            <form onSubmit={(event) => {

                                            }}>

                                                <div className="col-auto max-150">
                                                <div className="text-secondary idbadge" align="center">ID #{this.state.tximageData_id[key]}</div>
                                                {(typeof this.state.tximageData_nftData[key] !== 'undefined') ? (

                                                (this.state.tximageData_mimeType[key] === "image/jpeg" || this.state.tximageData_mimeType[key] === "image/png" || this.state.tximageData_mimeType[key] === "image/gif") ? ( 
                                                    <Img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.tximageData_nftData[key]} cache style={{background: "#000"}}/>
                                                ) : (this.state.tximageData_mimeType[key] === "video/mp4") ? (
                                                    <video alt="NFT" className="token rounded" autoPlay playsInline muted loop controls src={"https://ipfs.sy.finance/ipfs/"+this.state.tximageData_nftData[key]} type="video/mp4">
                                                    <source src={"https://ipfs.sy.finance/ipfs/"+this.state.tximageData_nftData[key]} type="video/mp4"></source>
                                                    </video>
                                                ) : (this.state.tximageData_mimeType[key] === "model/gltf-binary") ? (
                                                    <model-viewer src={"https://ipfs.sy.finance/ipfs/"+this.state.tximageData_nftData[key]} alt={this.state.tximageData_name[key]} ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls style={{width: "100%", height: "250px"}}></model-viewer> 
                                                ) : ( null )
                                                ) : ( null )
                                                }
                                                    
                                                </div>
                                                <div className="m-2" align="center">{(this.state.tximageData_name[key].length > 15) ? (this.state.tximageData_name[key].substring(0, 15) + "...") : this.state.tximageData_name[key]}</div>
                                                <div className="m-2" align="center">{
                                                    (this.state.tximageData_buyeripfs[key] !== "" && (this.state.tximageData_buyermim[key] === "image/jpeg" || this.state.tximageData_buyermim[key] === "image/png" || this.state.tximageData_buyermim[key] === "image/gif")) ?
                                                    (<div style={{position: "relative", width: "45px"}}><img src={"https://ipfs.sy.finance/ipfs/"+this.state.tximageData_buyeripfs[key]} alt="" border="0" height="50px" width="50px" style={{borderRadius: "50%"}} />
                                                    
                                                    {(this.state.tximageData_verified[key] === true) ? (
                                                        <div style={{position: "absolute", bottom: "-3px", right: "-1px"}}><svg width="16" height="16" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    }
                                                    </div>) :
                                                    ( <div style={{position: "relative", marginTop: "10px", marginBottom: "0px", width: "45px"}}><Jazzicon diameter={45} seed={jsNumberForAddress(this.state.tximageData_buyer[key])} />
                                                    
                                                    {(this.state.tximageData_verified[key] === true) ? (
                                                        <div style={{position: "absolute", bottom: "-3px", right: "-2px"}}><svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    }
                                                    </div> ) 
                                                }  </div>

                                                <div className="m-2" align="center"><strong>SOLD</strong> {this.state.tximageData_boughtprice[key]} SYF<br /><span style={{fontSize: "13px"}}>≈ ${this.state.tximageData_usdprice[key]} <small>USD</small> or ≈ {this.state.tximageData_ftmprice[key]} <small>FTM</small></span></div>
                                                {/* <div className="m-2" align="center">{this.state.approved[key] ? ( "Price: " + this.state.imageData_price[key] )
                                                : ( "Not For Sale" )
                                                }
                                                    <img alt="main" className="eth-class" src="../logo.png" />
                                                </div> */}


                                            </form>
                                        </Link>                                        
                                    </div>

                    ) : null
                    )
                })
                }
                        </ReactPlaceholder>
                        <ReactPlaceholder type='rect' ready={this.state.ready3} showLoadingAnimation={true} color='#333' style={{ width: '150px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>
                            <span style={{display: "none"}}>&nbsp;</span>
                        </ReactPlaceholder>
                        <ReactPlaceholder type='rect' ready={this.state.ready3} showLoadingAnimation={true} color='#333' style={{ width: '150px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>
                            <span style={{display: "none"}}>&nbsp;</span>
                        </ReactPlaceholder>
                        <ReactPlaceholder type='rect' ready={this.state.ready3} showLoadingAnimation={true} color='#333' style={{ width: '150px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>
                            <span style={{display: "none"}}>&nbsp;</span>
                        </ReactPlaceholder>
                        <ReactPlaceholder type='rect' ready={this.state.ready3} showLoadingAnimation={true} color='#333' style={{ width: '150px', height: '300px', marginTop: '15px', borderRadius: '15px' }}>
                            <span style={{display: "none"}}>&nbsp;</span>
                        </ReactPlaceholder>
            </div><br/> 
           <br/>                    
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
        this.state.tximages = [];
        this.state.tximageData_name = [];
        this.state.tximageData_nftData = [];
        this.state.tximageData_mimeType = [];
        this.state.tximageData_category = [];
        this.state.tximageData_price = [];
        this.state.tximageData_id = [];
        this.state.tximageData_buyer = [];
        this.state.tximageData_boughtprice = [];
        this.state.tximageData_buyeripfs = [];
        this.state.tximageData_buyermim = [];
        this.state.tximageData_buyername = [];
        this.state.tximageData_verified = [];        
        this.state.mimages = [];
        this.state.mimageData_name = [];
        this.state.mimageData_nftData = [];
        this.state.mimageData_mimeType = [];
        this.state.mimageData_category = [];
        this.state.mimageData_price = [];
        this.state.mimageData_id = [];
        this.state.ready3 = false;
        this.state.ready2 = false; 
        this.state.feature_verified = [];
        this.state.iData_name = [];
        this.state.iData_nftData = [];
        this.state.iData_mimeType = [];
        this.state.iData_category = [];
        this.state.iData_price = [];
        this.state.iData_id = [];
        this.state.owned = '';
        this.state.ipfs = '';
        this.state.mim = '';            
        this.state.transactions = [];

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
        

        // console.log(gtransactions);

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

        var randomnum2 = parseInt(randomNumber(0, totalSupply));
        const blacklisted = await contractblack.methods.getBlackListedNFT(randomnum2).call();
        if (!blacklisted) {
            const metadata = await contract.methods.imageData(randomnum2).call()

            // console.log(metadata)
            this.setState({ iData_name: metadata.name })
            this.setState({ iData_nftData: metadata.nftData })
            this.setState({ iData_category: metadata.category })
            this.setState({ iData_price: abbreviateNumber(metadata.price) })
            this.setState({ iData_des: metadata.description })
            this.setState({ iData_url: metadata.url })
            this.setState({ iData_mimeType: metadata.mimeType })
            this.setState({ iData_id: randomnum2 })
            this.setState({ iData_price_usd: metadata.price * syfusd })
            
        const owned = await contract.methods.ownerOf(randomnum2).call()
        // console.log(owner)
        this.setState({ owned })
        const getVerified = await contractv.methods.getVerified(this.state.owned).call()
        this.setState({ feature_verified: getVerified })

        if (owned !== '') {
            const getIPFS = await contractav.methods.getIPFSHash(owned).call()
            // console.log(getIPFS)
            const getMIME = await contractav.methods.getMIMEType(owned).call()
            // console.log(getMIME)
            const getName = await contractav.methods.getName(owned).call()
            // console.log(getName)
            this.setState({ ipfs: getIPFS })
            this.setState({ mim: getMIME })
            this.setState({ name: getName })

            this.setState({ ready2: true })

        }     

    }

        var j = 0;
        for (var k = this.state.totalSupply; k--;) {
            // i = 159
            // console.log(j)
            if (j < 5) {
                const blacklisted = await contractblack.methods.getBlackListedNFT(k).call();
                if (!blacklisted) {
                    const metadata = await contract.methods.imageData(k).call()
                    const owner = await contract.methods.ownerOf(k).call()
                    const likecount = await contractlike.methods.nftLikes(k).call();
                    const icecount = await contractlike.methods.nftDiamonds(k).call();                    
                    // console.log(metadata)
                    this.setState({
                        mimages: [...this.state.mimages, metadata.name],
                        mimageData_name: [...this.state.mimageData_name, metadata.name],
                        mimageData_nftData: [...this.state.mimageData_nftData, metadata.nftData],
                        mimageData_mimeType: [...this.state.mimageData_mimeType, metadata.mimeType],
                        mimageData_category: [...this.state.mimageData_category, metadata.category],
                        mimageData_price: [...this.state.mimageData_price, metadata.price],
                        mimageData_owner: [...this.state.mimageData_owner, owner],
                        mimageData_likecount: [...this.state.mimageData_likecount, likecount.likes],
                        mimageData_icecount: [...this.state.mimageData_icecount, icecount.diamonds],
                        mimageData_id: [...this.state.mimageData_id, k]
                    })
                    j++;
                    
                    // console.log(this.state.mimages)
                    if (j === 5) {
                        this.setState({ readymint: true })
                        // console.log(this.state.readymint)
                        break;
                    }   
                }             
            } else {
                break;
            }
        }        

        var numtofeature = 5;
        fetch('https://nft.sy.finance/api/nftlist.json', { mode: 'cors'}).then(response => {
            // console.log(response);
            return response.json();
          }).then(data => {
            // Work with JSON data here
            // console.log(data);
            // console.log(data.length)
            for (var b = numtofeature; b--;) {
                var randomnum = parseInt(randomNumber(0, data.length));
                // console.log(metadata)
                this.setState({
                    images: [...this.state.images, data[randomnum]],
                    imageData_name: [...this.state.imageData_name, data[randomnum].name],
                    imageData_nftData: [...this.state.imageData_nftData, data[randomnum].nftData],
                    imageData_mimeType: [...this.state.imageData_mimeType, data[randomnum].mimeType],
                    imageData_category: [...this.state.imageData_category, data[randomnum].category],
                    imageData_price: [...this.state.imageData_price, data[randomnum].price],
                    imageData_owner: [...this.state.imageData_owner, data[randomnum].owner],
                    imageData_id: [...this.state.imageData_id, data[randomnum].id]
                })
                // console.log(b)
                this.setState({ ready: true })            
            }
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
    
        // for each transaction in transactions setstate for buyer, tokenId, and price
        if (transactions.length > 0) {
            for (var i = transactions.length; i--;) {
                var transaction = this.state.transactions[i];
                // console.log(transaction.returnValues._tokenId)
                if(typeof transaction !== 'undefined') {
                    if(transaction.returnValues !== 'undefined') {
                        const metadata = await contract.methods.imageData(transaction.returnValues._tokenId).call()

                        const getIPFS = await contractav.methods.getIPFSHash(transaction.returnValues._buyer).call()
                        const getMIME = await contractav.methods.getMIMEType(transaction.returnValues._buyer).call()
                        const getVerified = await contractv.methods.getVerified(transaction.returnValues._buyer).call()

                        // console.log(metadata)
                        this.setState({
                            tximages: [...this.state.tximages, metadata.name],                        
                            tximageData_name: [...this.state.tximageData_name, metadata.name],
                            tximageData_nftData: [...this.state.tximageData_nftData, metadata.nftData],
                            tximageData_mimeType: [...this.state.tximageData_mimeType, metadata.mimeType],
                            tximageData_category: [...this.state.tximageData_category, metadata.category],
                            tximageData_price: [...this.state.tximageData_price, metadata.price],
                            tximageData_buyer: [...this.state.tximageData_buyer, transaction.returnValues._buyer],
                            tximageData_boughtprice: [...this.state.tximageData_boughtprice, abbreviateNumber(transaction.returnValues._price)],
                            tximageData_buyeripfs: [...this.state.tximageData_buyeripfs, getIPFS],
                            tximageData_buyermim: [...this.state.tximageData_buyermim, getMIME],
                            tximageData_verified: [...this.state.tximageData_verified, getVerified],
                            tximageData_usdprice: [...this.state.tximageData_usdprice, Number(transaction.returnValues._price*syfusd).toFixed(2)],
                            tximageData_ftmprice: [...this.state.tximageData_ftmprice, Number(transaction.returnValues._price / syfperftm * 1e18).toFixed(2)],
                            tximageData_id: [...this.state.tximageData_id, transaction.returnValues._tokenId]


                        })
            
                        this.setState({ ready3: true })
                        }
                    }
            }
        }
        
        if (gtransactions.length > 0) {
            var n = gtransactions.length;
            while(n--) {
                var gtransaction = this.state.gtransactions[n];
                // console.log(transaction.returnValues._tokenId)
                if(typeof gtransaction !== 'undefined') {
                    if(gtransaction.returnValues !== 'undefined') {
                        const metadata = await contract.methods.imageData(gtransaction.returnValues._tokenId).call()
    
                        const getIPFS = await contractav.methods.getIPFSHash(gtransaction.returnValues._receiver).call()
                        const getMIME = await contractav.methods.getMIMEType(gtransaction.returnValues._receiver).call()
                        const getVerified = await contractv.methods.getVerified(gtransaction.returnValues._receiver).call()
    
                        // const blacklisted = await contractblack.methods.getBlackListedNFT(gtransaction.returnValues._tokenId).call();
    
                        // if (!blacklisted) {
                        // console.log(metadata)
                            this.setState({
                                gtximages: [...this.state.gtximages, metadata.name],                        
                                gtximageData_name: [...this.state.gtximageData_name, metadata.name],
                                gtximageData_nftData: [...this.state.gtximageData_nftData, metadata.nftData],
                                gtximageData_mimeType: [...this.state.gtximageData_mimeType, metadata.mimeType],
                                gtximageData_category: [...this.state.gtximageData_category, metadata.category],
                                gtximageData_price: [...this.state.gtximageData_price, metadata.price],
                                gtximageData_receiver: [...this.state.gtximageData_receiver, gtransaction.returnValues._receiver],
                                gtximageData_buyeripfs: [...this.state.gtximageData_buyeripfs, getIPFS],
                                gtximageData_buyermim: [...this.state.gtximageData_buyermim, getMIME],
                                gtximageData_verified: [...this.state.gtximageData_verified, getVerified],
                                gtximageData_id: [...this.state.gtximageData_id, gtransaction.returnValues._tokenId]
    
    
                            })
                
                            this.setState({ readyg: true })
                            // }
                        }
                    }
            }
        }
        

    setInterval(async () => {
        this.state.images = [];
        this.state.owners = [];
        this.state.imageData_name = [];
        this.state.imageData_nftData = [];
        this.state.imageData_mimeType = [];
        this.state.imageData_category = [];
        this.state.imageData_price = [];
        this.state.imageData_id = [];
        this.state.approved = [];                     
        this.state.transactions = [];
        // this.state.ready = false;

        var numtofeature = 3;
        fetch('https://nft.sy.finance/api/nftlist.json', { mode: 'cors'}).then(response => {
            // console.log(response);
            return response.json();
          }).then(data => {
            // Work with JSON data here
            // console.log(data);
            // console.log(data.length)
            for (var b = numtofeature; b--;) {
                var randomnum = parseInt(randomNumber(0, data.length));
                // console.log(metadata)
                this.setState({
                    images: [...this.state.images, data[randomnum]],
                    imageData_name: [...this.state.imageData_name, data[randomnum].name],
                    imageData_nftData: [...this.state.imageData_nftData, data[randomnum].nftData],
                    imageData_mimeType: [...this.state.imageData_mimeType, data[randomnum].mimeType],
                    imageData_category: [...this.state.imageData_category, data[randomnum].category],
                    imageData_price: [...this.state.imageData_price, data[randomnum].price],
                    imageData_owner: [...this.state.imageData_owner, data[randomnum].owner],
                    imageData_id: [...this.state.imageData_id, randomnum]
                })
                // console.log(b)
                this.setState({ ready: true })            
            }
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });
    }, 15000)
        

    }

}

export default Home;

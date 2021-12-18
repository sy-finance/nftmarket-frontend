import React, { Component } from 'react';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import Syfin from '../../abis/Syfin.json';
import SyfinVerified from '../../abis/SyfinVerified.json';
import SyfinNFTLikes from '../../abis/SyfinNFTLikes.json';

import MetaTags from 'react-meta-tags';

import ReactPlaceholder from "react-placeholder";
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import "react-placeholder/lib/reactPlaceholder.css";

import SyfinAvatars from '../../abis/SyfinAvatars.json';
import Jazzicon, { jsNumberForAddress }  from 'react-jazzicon';

import LoadingOverlay from 'react-loading-overlay';

import { TwitterTweetButton } from 'react-social-sharebuttons';

import "@google/model-viewer";
// import '@google/model-viewer/dist/model-viewer';

import Web3 from 'web3';

class Gantom extends Component {

    render() {

        const nft_id_path = window.location.href.split('/')
        // const nft_id_path = window.location.hash.split('/')
        const key = nft_id_path[nft_id_path.length - 1]

        return (
            <div>
                <MetaTags>
                    <title>Gantom Stone #{key} - {this.state.imageData_name}</title>
                    <meta name="description" content="Gantom Stones: Rare, unique, decentralized, generative adversarial network (GAN) generated collectibles minted on the Fantom chain." />
                    <meta property="og:title" content={"GS NFT #"+key+" - "+this.state.imageData_name} />
                    <meta property="og:description" content="Gantom Stones: Rare, unique, decentralized, generative adversarial network (GAN) generated collectibles minted on the Fantom chain." />
                    <meta property="og:image" content={this.state.imageData_image} />
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:site" content="@syfinance"/>
                    <meta name="twitter:title" content={"GS NFT #"+key+" - "+this.state.imageData_name}/>
                    <meta name="twitter:description" content="Gantom Stones: Rare, unique, decentralized, generative adversarial network (GAN) generated collectibles minted on the Fantom chain."/>
                    <meta name="twitter:image" content={this.state.imageData_image}/>
                </MetaTags>
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

                <div className="head-title col-auto mx-4">
                    <h4 className="mb-0 font-weight-normal">Gantom Stone #{key} Details</h4>
                </div>
                <div className="nft-detail-adj">
                    <div className="">
                        <div className="row">                            
                        <div className="col-md-6">  
                        <ReactPlaceholder type='rect' ready={this.state.imageData_image && this.state.ready} showLoadingAnimation={true} color='#333' style={{ width: '100%', height: '100%', borderRadius: '15px' }}>                          
                            <h1 className="text-light" align="center"><strong>{this.state.imageData_name}</strong></h1>
                            <p className="text-light" align="center" style={{backgroundColor: "#000", padding: "20px", borderRadius: "15px"}}>"Gantom Stones: Rare, unique, decentralized, generative adversarial network (GAN) generated collectibles minted on the Fantom chain."</p>
                            <div className="max-400" style={{width: "98%", margin: "0 auto"}} align="center">

                            <img alt="NFT" className="homeimage shadow-lg rounded" src={this.state.imageData_image} style={{background: "#000", maxWidth: "800px"}} />

                            </div>
                           
                            <br />
                            </ReactPlaceholder>
                        </div>
                        <div className="col-md-6">
                        <ReactPlaceholder type='rect' ready={this.state.loaded} showLoadingAnimation={true} color='#333' style={{ width: '60%', height: '150px', margin: "15px auto", borderRadius: '15px' }}>
                        <div className="d-flex justify-content-center align-items-center text-light" id="giftNFT">                            
                                <div className="mx-2">
                                    {
                                        ((this.state.owner === this.state.account)  && this.state.loaded === true) ?
                                            (
                                                <form onSubmit={(event) => {
                                                    event.preventDefault()
                                                    this.giftNFT(key);
                                                }}>
                                                    <br />
                                                    <div className="d-flex">
                                                    <input
                                                    type='text'
                                                    className='form-control mx-1'
                                                    placeholder="Fantom Address 0x..."
                                                    onChange={event => this.setState({ accttosend: event.target.value })}
                                                    />
                                                    <input
                                                        type='submit'
                                                        className='btn btn-block btn-primary rounded-0 mx-1 buybtn'
                                                        value="Gift This NFT!"
                                                        disabled={(!this.state.blacklisted ? false : true)}
                                                    />
                                                    </div>
                                                </form>
                                            )
                                            : null
                                    }
                                </div>
                            </div>
                            <br />
                            {((this.state.owner === this.state.account) && this.state.loaded === true) ?
                                        (
                            <div align="center">OR</div>
                                        ) : null
                                        }
                                                                    <br />
                            <div className="d-flex justify-content-center align-items-center my-1 text-light" id="approvedsale">                            
                                {
                                    ((this.state.owner === this.state.account) && this.state.loaded === true) ?
                                        (
                                            <form onSubmit={(event) => {
                                                event.preventDefault()
                                                this.approveNFT(key);
                                            }}>
                                                <div className="d-flex">
                                                    <div className="w-75 my-2 text-secondary">Price in SYF</div>
                                                    <input
                                                        type='text'
                                                        className='form-control mx-1'
                                                        placeholder='New Price in SYF'
                                                        defaultValue={this.state.imageData_price}
                                                        onChange={event => this.setState({ new_price: event.target.value })}
                                                    />
                                                    <input
                                                        type='submit'
                                                        className='btn btn-block btn-primary rounded-0 mx-1 buybtn'
                                                        value={!this.state.approved ? "Approve & List for Sale" : "Update & Relist"}
                                                        disabled={(!this.state.blacklisted ? false : true)}
                                                    />
                                                </div>
                                            </form>
                                        )
                                        : null
                                }
                            </div>

                            <div className="d-flex justify-content-center align-items-center text-light" id="buyanNFT">                            
                                <div className="mx-2">
                                    {
                                        (this.state.approved && (this.state.owner !== this.state.account) && this.state.loaded === true) ?
                                            (
                                                (!this.state.blacklisted) ? (
                                                <form onSubmit={(event) => {
                                                    event.preventDefault()
                                                    this.buySyf(key);
                                                }}>
                                                    {/* <input
                                                type='submit'
                                                className='btn btn-block btn-primary rounded-0'
                                                value={"Buy - " + this.state.imageData_price[key] + " SYF"}
                                            /> */}
                                                    <button type="submit" className='btn btn-block btn-primary rounded-15 text-light p-3 buybtn' disabled={(typeof this.state.account !== 'undefined' && !this.state.blacklisted && this.state.connected === true ? false : true)}>
                                                        <strong>BUY WITH SYF</strong><br />{this.state.imageData_price}&nbsp;
                                                        <img alt="main" height="24px" src="../logo.png" /> SYF<br />
                                                        ( ≈ ${this.state.imageData_usdprice} <small>USD</small>)
                                                    </button>
                                                </form>
                                                ) : <h2 className="text-danger">BLACKLISTED NFT</h2>
                                            )
                                            : null
                                    }
                                </div>
                                <div className="mx-2">
                                    {
                                        (this.state.approved && (this.state.owner !== this.state.account) && this.state.loaded === true) ?
                                            (
                                                (!this.state.blacklisted) ? (
                                                <form onSubmit={(event) => {
                                                    event.preventDefault()
                                                    this.buySyfin(key);
                                                }}>
                                                    {/* <input
                                                type='submit'
                                                className='btn btn-block btn-primary rounded-0'
                                                value={"Buy - " + this.state.imageData_price[key] + " SYF"}
                                            /> */}
                                                    <button type="submit" className='btn btn-block btn-primary rounded-15 text-light p-3 buybtn' disabled={(typeof this.state.account !== 'undefined' && !this.state.blacklisted && this.state.connected === true ? false : true)}>
                                                    <img alt="main" height="28px" src="../ftmlogo.png" /><br />
                                                        <strong>BUY WITH FTM!</strong><br />
                                                        {(this.state.connected === true) ? (
                                                            <>
                                                        ≈ {this.state.imageData_slippage} <small>FTM</small>
                                                        </>
                                                        ) : (
                                                            <div>Connect Wallet</div>
                                                        )}
                                                    </button>
                                                </form>
                                                ) : null
                                            )
                                            : null
                                    }
                                </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center my-1">                            
                                {
                                    (!this.state.approved && (this.state.owner !== this.state.account) && this.state.loaded === true) ?
                                        (
                                            <div className="text-danger">{"This NFT is not approved for sale by the owner"}</div>
                                        )
                                        : null
                                }
                            </div>  
                            <br /><br />
                            <div className="row">
                                <div className="col-md-6" align="center">
                                    <div style={{color: "white", marginBottom: "5px", fontWeight: "bold"}}>Owner</div>
                                <ReactPlaceholder type='rect' ready={this.state.readyowner} showLoadingAnimation={true} color='#333' style={{ width: '100px', height: '100px', marginTop: "10px", borderRadius: '15px' }}> 
                                {
                                                    (this.state.owner !== null) ? (

                                                    (this.state.ipfs !== "" && (this.state.mim === "image/jpeg" || this.state.mim === "image/png" || this.state.mim === "image/gif")) ?
                                                    ( <a href={"/collection/"+this.state.owner}><div style={{position: "relative", width: "75px"}}><img src={"https://cloudflare-ipfs.com/ipfs/"+this.state.ipfs} alt="" border="0" height="75px" width="75px" style={{borderRadius: "50%", marginBottom: "5px"}} />
                                                    {(this.state.owner_verified === true) ? (
                                                        <div style={{position: "absolute", bottom: "5px", right: "5px"}}><svg width="16" height="16" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    }
                                                    </div></a> ) :
                                                    ( <a href={"/collection/"+this.state.owner}><div style={{position: "relative", width: "75px"}}><Jazzicon diameter={75} seed={jsNumberForAddress(this.state.owner)} />
                                                    {(this.state.owner_verified === true) ? (
                                                        <div style={{position: "absolute", bottom: "5px", right: "5px"}}><svg width="16" height="16" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    } 
                                                    </div></a>)                  
                                                    ) : null                                             
                                                }
                      
                                                    
                                                    <p style={{color: "white"}}>{
                                                        (this.state.owner !== null) ? (

                                                            (this.state.name === '') ? (                                                
                                                                this.state.owner.substring(0, 8) + "..."
                                                            ) : (
                                                                this.state.name
                                                            )

                                                        ) : null
                                                } <a href={"/collection/"+this.state.owner}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                                                <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                                              </svg></a></p>
                                              </ReactPlaceholder>
                                              <br />
                                </div>
                                <div className="col-md-6" align="center">
                                <div style={{color: "white", marginBottom: "5px", fontWeight: "bold"}}>Creator</div>
                                <ReactPlaceholder type='rect' ready={this.state.readyminter} showLoadingAnimation={true} color='#333' style={{ width: '100px', height: '100px', marginTop: "10px", borderRadius: '15px' }}> 
                                {
                                                    

                                                    (this.state.ipfsmint !== "" && (this.state.mimmint === "image/jpeg" || this.state.mimmint === "image/png" || this.state.mimmint === "image/gif")) ?
                                                    ( <a href="https://gantomst.one" target="_blank"><div style={{position: "relative", width: "75px"}}><img src={"https://cloudflare-ipfs.com/ipfs/"+this.state.ipfsmint} alt="" border="0" height="75px" width="75px" style={{borderRadius: "50%", marginBottom: "5px"}} />
                                                    {(this.state.mint_verified === true) ? (
                                                        <div style={{position: "absolute", bottom: "5px", right: "5px"}}><svg width="16" height="16" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    }
                                                    </div></a> ) :
                                                    ( <a href="https://gantomst.one" target="_blank"><div style={{position: "relative", width: "75px"}}><Jazzicon diameter={75} seed={jsNumberForAddress(this.state.minter)} />
                                                    {(this.state.mint_verified === true) ? (
                                                        <div style={{position: "absolute", bottom: "5px", right: "5px"}}><svg width="16" height="16" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    }
                                                    </div> 
                                                    </a>)                  
                                                                                                
                                                }
                                                    
                                                    <p style={{color: "white"}}>{
                                                    
                                                        (this.state.namemint === '') ? (  
                                                            this.state.minter.substring(0, 8) + "..."
                                                        ) : (
                                                            this.state.namemint
                                                        )
                                                    
                                                } <a href="https://gantomst.one" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                                                <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                                              </svg></a></p>
                                              </ReactPlaceholder>
                                              <br />
                                </div>
                            </div>
                            </ReactPlaceholder>
                            {/* <ReactPlaceholder type='rect' ready={this.state.likecount} showLoadingAnimation={true} color='#333' style={{ width: '100%', height: '75px', marginTop: "10px", borderRadius: '15px' }}> 
                            <div className="row" align="center">
                                <div className="col-6" align="center">
                                    <a href="" onClick={(e) => this.like(e, this.state.owner, key)}><i className="fa fa-heart fa-2x like" id={"like"+key}></i></a><br /><span id={"count"+key} style={{fontSize: "19px", color: "white"}}>{this.state.likecount}</span>
                                </div>
                                <div className="col-6" align="center">
                                    <a href="" onClick={(e) => this.ice(e, this.state.minter, key)}><i className="fas fa-gem fa-2x ice" id={"ice"+key}></i></a><br /><span id={"counti"+key} style={{fontSize: "19px", color: "white"}}>{this.state.icecount}</span>
                                </div>
                            </div>   
                            </ReactPlaceholder>                          */}
                            <br />                      
                            <div className="table-adj">
                                <div className="table-responsive">     
                                <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true} color='#333' style={{ width: '100%', height: '400px', borderRadius: '15px' }} align='center'>                           
                                    <table className="table table-sm table-borderless">                                    
                                        <tbody className="">                                            
                                            <tr>
                                                <th className="pl-0 w-40" scope="row"><strong>IPFS Hash</strong></th>
                                                
                                                <td style={{fontSize: "14px"}}><ReactPlaceholder type='rect' ready={this.state.imageData_nftData} showLoadingAnimation={true} color='#333' style={{ width: '150px', height: '24px', marginTop: "10px", borderRadius: '15px' }}> {this.state.imageData_nftData} <a target="_blank" href={"https://gantomst.one/stone/"+key}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                                                <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                                                </svg></a></ReactPlaceholder></td>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 w-60" scope="row"><strong>Category</strong></th>
                                                <td>Gantom Stones</td>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 w-60" scope="row"><strong>Type</strong></th>
                                                <td>"Fantom Gem Stone"</td>
                                            </tr>
                                            {/* <tr>
                                                <th className="pl-0 w-60" scope="row"><strong>Status</strong></th>
                                                <td>{(this.state.blacklisted) ? 'Blacklisted' : 'Listed'}&nbsp;&nbsp;&nbsp;<a href="https://forms.gle/x5UpmLcjpqyeKrAf8" target="_blank" className="button btn btn-primary">Report This NFT!</a></td>
                                            </tr> */}
                                            <tr>
                                                <th className="pl-0 w-60" scope="row"><strong>URL</strong></th>
                                                <td>{this.state.imageData_url}</td>
                                            </tr>
                                            {/* <tr>
                                                <th className="pl-0 w-60" scope="row"><strong>Last Price</strong></th>
                                                <td>{this.state.imageData_price} SYF ( ≈ ${this.state.imageData_usdprice} <small>USD</small> or ≈ {this.state.imageData_ftmprice} <small>FTM</small>)</td>
                                            </tr> */}
                                            <tr>
                                                <th className="pl-0 w-60" scope="row"><strong>For Sale</strong></th>
                                                <td><ReactPlaceholder type='rect' ready={this.state.loaded} showLoadingAnimation={true} color='#333' style={{ width: '150px', height: '24px', marginTop: "10px", borderRadius: '15px' }}> 
                                                {this.state.loaded === true ? (
                                                this.state.approved ? ( "Available for Purchase" ) : ( "Not Listed For Sale" ) 
                                                ) : (
                                                    null
                                                )}
                                                </ReactPlaceholder>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="pl-0 w-60" scope="row"><strong>GS NFT ID</strong></th>
                                                <td>{key} of 10,000&nbsp;&nbsp;&nbsp;<a href={this.state.imageData_image} target="_blank" className="button btn btn-primary">View Full NFT!</a>&nbsp;&nbsp;&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div align="center"><TwitterTweetButton url={"https://syfin.art/nft/"+key} user="syfinance" align="center"/></div>
                                    </ReactPlaceholder>
                                </div>
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="mt-4" align="center">
                    { (this.state.transactionl > 0) ? (
                    <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true} color='#333' style={{ width: '100%', height: '200px', borderRadius: '15px' }} align='center'>

                        <h4 className="text-secondary">Transactions</h4>
                        <table className="table table-sm table-borderless" align="center">
                            <thead align="center">
                                <tr align="center">
                                    <th align="center">Buyer</th>
                                    <th align="center">Price in SYF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transactions.slice(0).reverse().map((transaction, i) => {
                                    return (
                                        (transaction._tokenId === key) ?
                                            (
                                                <tr key={i} align="center">
                                                    <td align="center">{transaction._buyer} <a href={"/collection/"+transaction._buyer}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
  <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
</svg></a></td>
                                                    <td align="center">{transaction._price}</td>
                                                </tr>
                                            ) : null
                                    )
                                })
                                }
                            </tbody>
                        </table>
                        </ReactPlaceholder>
                    ) : ( null ) }
                    </div>

                </div>
                </LoadingOverlay>
            </div>
        )

    }


    constructor(props) {
        super(props)
        this.state = {
            account: '',
            contract: null,
            loaded: false,
            sale_contract: null,
            token_contract: null,
            contractsyfin: null,
            totalSupply: 0,
            token_price: 0,
            images: [],
            owner: null,
            estftm: 0,
            blacklisted: false,
            imageData_name: [],
            imageData_nftData: [],
            imageData_mimeType: null,
            imageData_category: [],
            imageData_price: [],
            imageData_des: [],
            imageData_url: [],
            imageData_image: [],
            imageData_usdprice: [],
            imageData_ftmprice: [],
            imageData_slippage: [],
            selling_to: '',
            selling_price: null,
            approved: false,
            new_price: null,
            txpend: false,
            readyowner: false,
            readyminter: false,
            txs: 0,
            minted: [],
            minter: '',
            connected: false,
            transactionl: 0,
            transactions: [],
            owner_verified: [],
            mint_verified: [],
            mintedr: [],
            mintedcollection: '',
            ipfs: '',
            mim: '',
            name: '',
            ipfsmint: '',
            mimmint: '',
            namemint: '',
            ipfsb: '',
            mimb: '',
            accttosend: '',
            likecount: 0,
            icecount: 0
        }
    }

    async componentWillMount() {
        await this.loadBlockchainData()
    }

    async like(e, owner, key) {
        e.preventDefault();
        e.stopPropagation();

        if (!window.loaded_web3) {
            alert('You must connect with Metamask!');
            return;
        }

        document.getElementById("like"+key).classList.add("fa-pulse"); 

        const web3t = window.web3;

        const accounts = await window.web3.eth.getAccounts()
        const acct = accounts[0];

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

        if (!window.loaded_web3) {
            alert('You must connect with Metamask!');
            return;
        }

        document.getElementById("ice"+key).classList.add("fa-pulse"); 

        const web3t = window.web3;
        const web3ftm = new Web3("https://rpc.ftm.tools/");

        const accounts = await window.web3.eth.getAccounts()
        const acct = accounts[0];


        const networkData = SyfinNFT.networks[250]
        const abi = SyfinNFT.abi
        const address = networkData.address
        const contract = new web3ftm.eth.Contract(abi, address)

        // Get minter of NFT
        const mintedr = await contract.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' })

        for (var i = 0; i < mintedr.length; i++) {
            this.setState({ mintedr: [...this.state.mintedr, mintedr[i].returnValues] })
        }

        // console.log(this.state.minted)

        for (i = 0; i < this.state.mintedr.length; i++) {
            // console.log(this.state.transactions[i]._buyer)
            // console.log(this.state.minted[i].tokenId)
            if (this.state.mintedr[i].tokenId == key) {
                // console.log('hoorah!');
                if (this.state.mintedr[i].from == "0x0000000000000000000000000000000000000000") {
                    // console.log('hoorah TWICE!')
                    // console.log(this.state.minted[i].to);
                    this.setState({ mintedcollection: this.state.mintedr[i].to })
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
                console.log("NFT Iced!")
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
        const web3 = window.web3;

        const web3t = new Web3("https://rpc.ftm.tools/");

        // Load account
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

        // console.log(web3)

        const networkId = 250;
        const networkData = SyfinNFT.networks[networkId]

        const abi = SyfinNFT.abi
        const address = networkData.address

        if (web3 !== undefined) {
            const contract = new web3.eth.Contract(abi, address)
            console.log(contract)
            this.setState({ contract })
        }

        const abiaa = SyfinNFT.abi
        const addressaa = networkData.address
        const maincontract = new web3t.eth.Contract(abiaa, addressaa)
        // console.log(maincontract)
        this.setState({ maincontract })

        const sale_networkData = SyfinNFTSale.networks[networkId]
        const sale_abi = SyfinNFTSale.abi
        const sale_address = sale_networkData.address
        if (web3 !== undefined) {
            const sale_contract = new web3.eth.Contract(sale_abi, sale_address)
            this.setState({ sale_contract })
        }

        const sale_networkData2 = SyfinNFTSale.networks[networkId]
        const sale_abi2 = SyfinNFTSale.abi
        const sale_address2 = sale_networkData2.address
        const sale_contract2 = new web3t.eth.Contract(sale_abi2, sale_address2)
        this.setState({ sale_contract2 })


        const abib = Syfin.abi
        const addressb = "0x1BCF4DC879979C68fA255f731FE8Dcf71970c9bC"
        if (web3 !== undefined) {
            const token_contract = new web3.eth.Contract(abib, addressb)
            this.setState({ token_contract })
        }

        const newabi = SyfinAvatars.abi
        const addressa = "0x2a4e02D729924eCe6A3292F9Ba8e1B0B32d7850F"
        const contractav = new web3t.eth.Contract(newabi, addressa)
        // console.log(contract)
        this.setState({ contractav })

        const abiv = SyfinVerified.abi
        const addv = "0x6986aF780e5E14f82D21F2D47F64c8C7b7cc07F9"
        const contractv = new web3t.eth.Contract(abiv, addv)
        // console.log(contract)
        this.setState({ contractv })

        const abip = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestFTMPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getLatestTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
        const addp = "0x8fBE84d284D1614eaDc50EE69120Ec4f7f98cEd8";
        const contractp = new web3t.eth.Contract(abip, addp);
        this.setState({ contractp })

        const ftmprice = await contractp.methods.getLatestFTMPrice().call() / 1e8;
        const syfperftm = await contractp.methods.getLatestTokenPrice("0xaf64771bbd013492ac69220eb67836f36b23d5aa", 1).call();
        const syfusd = ftmprice / (syfperftm / 1e18);

        const abilike = SyfinNFTLikes.abi;
        const contractlike = new web3t.eth.Contract(abilike, "0xe145C6Cb2FA344cb9A1335685F844bDfF3470321");

        this.setState({ contractlike })

        const abiblack = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hashAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftID","type":"uint256"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedNFT","type":"event"},{"inputs":[],"name":"AddyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"IDCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"blAddress","type":"address"}],"name":"getBlackListedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"}],"name":"getBlackListedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"updates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
        const contractblack = new web3t.eth.Contract(abiblack, "0xfBA3E2C37A8F199c22eF9bD331f09023D2110c98");

        this.setState({ contractblack })

        const syfinitabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"syfAmount","type":"uint256"}],"name":"getEstimatedFTMforSYF","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"syfAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"syfin","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

        if (web3 !== undefined) {
            const contractsyfin = new web3.eth.Contract(syfinitabi, "0x9C9f5E2d0D4bcb7b172d3eE34618B14E8f4c0cca");
            this.setState({ contractsyfin })
        }

        const abigantom = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"uri","type":"string"}],"name":"buyMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payout","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"string","name":"uri","type":"string"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}];

        const contractgantom = new web3t.eth.Contract(abigantom, "0x3d7071E5647251035271Aeb780d832B381Fa730F"); // Gantom Stones



        // console.log(await contract.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' }))

        // const nft_id_path = window.location.hash.split('/')
        const nft_id_path = window.location.href.split('/')
        const key = nft_id_path[nft_id_path.length - 1]

        const totalSupply = await contractgantom.methods.totalSupply().call()
        // console.log(totalSupply)
        this.setState({ totalSupply })

        // Load Owner
        const owner = await contractgantom.methods.ownerOf(key).call()

        this.setState({ owner })
        
        // Load NFTs Data 

        var getJSON = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
              var status = xhr.status;
              if (status === 200) {
                callback(null, xhr.response);
              } else {
                callback(status, xhr.response);
              }
            };
            xhr.send();
        };

        const metadata = await contractgantom.methods.tokenURI(key).call()
        console.log(metadata)

        this.setState({ imageData_url: metadata })

        this.setState({ imageData_nftData: metadata.replace('https://ipfs.sy.finance/ipfs/', '') })


        fetch(metadata, { mode: 'cors'}).then(response => {
            console.log(response);
            return response.json();
          }).then(data => {
            console.log(data);
            this.setState({ imageData_name: data.name })
            this.setState({ imageData_image: data.image })
            this.setState({ ready: true })

            this.setState({ loaded: true })

            window.prerenderReady = true;
          }).catch(err => {
            console.log(err);
          });

        this.setState({
            images: [...this.state.images, metadata.name]
        })

        // console.log(key)
        // if (web3 !== undefined) {      

        //     const slippage = Number(metadata.price * 0.11) + Number(metadata.price); 
        //     const est = await this.state.contractsyfin.methods.getEstimatedFTMforSYF(parseInt(web3.utils.toWei(slippage.toString()).toString() / 1e18)).call();
        //     const estftm = est[0];
        //     // console.log(est[0])
        //     this.setState({ estftm })
        // } else {
        //     console.log("No web3")
        // }
        
        // this.setState({ imageData_name: metadata.name })
        // this.setState({ imageData_nftData: metadata.nftData })
        // this.setState({ imageData_category: metadata.category })
        // this.setState({ imageData_price: metadata.price })
        // if (web3 !== undefined) { 
        //     this.setState({ imageData_slippage: this.state.estftm })
        // }

        // this.setState({ imageData_des: metadata.description })
        // this.setState({ imageData_url: metadata.url })
        // this.setState({ imageData_mimeType: metadata.mimeType })
        // this.setState({ imageData_usdprice: Number(metadata.price*syfusd).toFixed(2) })
        // this.setState({ imageData_ftmprice: Number( metadata.price / syfperftm * 1e18 ).toFixed(2) }) // 0.50 FTM - 0.000002 SYF - 200000000
        // var approved = await maincontract.methods.isApprovedOrOwner("0xc54bA0799611A345bF2E42A16D3E345295B9843c", (key)).call();
        // this.setState({ approved })

        const token_ID = key;

        // console.log(sale_contract)        

        const getIPFS = await contractav.methods.getIPFSHash(this.state.owner).call()
        // console.log(getIPFS)
        const getMIME = await contractav.methods.getMIMEType(this.state.owner).call()
        // console.log(getMIME)
        const getName = await contractav.methods.getName(this.state.owner).call()
        this.setState({ ipfs: getIPFS })
        this.setState({ mim: getMIME })
        this.setState({ name: getName })

        const getIPFSm = 'bafkreicfpc24tgug6nmmmbj4tf6qmopwzj2ezzosxfzdhwt654jrf22qza';
        // console.log(getIPFSm)
        const getMIMEm = 'image/png';
        // console.log(getMIMEm)
        const getNamem = 'Gantom Stones';
        // console.log(getNamem)
        this.setState({ ipfsmint: getIPFSm })
        this.setState({ mimmint: getMIMEm })
        this.setState({ namemint: getNamem })


        const getOwnerVerified = await contractv.methods.getVerified(this.state.owner).call()
        const getMintVerified = true;

        this.setState({ owner_verified: getOwnerVerified })
        this.setState({ mint_verified: getMintVerified })
        this.setState({ readyowner: true })
        this.setState({ readyminter: true })


    }


    buySyf = (key) => {
        const web3 = window.web3
        this.setState({ txpend: true })
        this.setState({ txs: 2 })

        this.state.token_contract.methods.approve(
            "0xc54bA0799611A345bF2E42A16D3E345295B9843c",
            web3.utils.toWei(this.state.imageData_price, "ether")
        ).send({ from: this.state.account, })
            .once('receipt', (receipt) => {

                // console.log("SYF Transfered!")
                this.setState({ txpend: true })
                this.setState({ txs: 1 })

                this.state.sale_contract.methods.BuyNFT(this.state.owner, key, this.state.imageData_price).send({ from: this.state.account })
                    .once('receipt', (receipt) => {
                        console.log("NFT Bought!")
                        document.getElementById("buyanNFT").innerHTML = "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Purchased, Go to your collection!</span>";
                        this.setState({ txpend: false })
                        this.setState({ txs: 0 })
                    }).catch(error => {
                        // Transaction rejected or failed
        
                        alert("Transaction failed on second tx!");
                        this.setState({ txpend: false });
                    })  
            }).catch(error => {
                // Transaction rejected or failed

                alert("Transaction failed!");
                this.setState({ txpend: false });
            })           

    }

    buySyfin = (key) => {
        const web3 = window.web3
        this.setState({ txpend: true })
        this.setState({ txs: 4 })

        const ftmabi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":true,"inputs":[],"name":"ERR_INVALID_ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERR_NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];

        const syfinitabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"syfAmount","type":"uint256"}],"name":"getEstimatedFTMforSYF","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"syfAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"syfin","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"uniswapRouter","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

        const contractsyfin = new web3.eth.Contract(syfinitabi, "0x9C9f5E2d0D4bcb7b172d3eE34618B14E8f4c0cca");

        const contractftm = new web3.eth.Contract(ftmabi, "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83");

        const slippage = Number(this.state.imageData_price * 0.11) + Number(this.state.imageData_price);

        // console.log(slippage);

        contractsyfin.methods.getEstimatedFTMforSYF(web3.utils.toWei(slippage.toString(), "ether")).call()
        .then((receipt) => {
            const estftm = receipt[0];
            console.log(estftm);

            contractftm.methods.approve(
                "0x9C9f5E2d0D4bcb7b172d3eE34618B14E8f4c0cca",
                estftm
            ).send({ from: this.state.account, })
                .once('receipt', (receipt) => {
                    this.setState({ txpend: true })
                    this.setState({ txs: 3 })

                    // make new deadline one hour from now in epoch unix time
                    const deadline = Math.floor(Date.now() / 1000) + 6000;
                    console.log(deadline);

                contractsyfin.methods.syfin(web3.utils.toWei(slippage.toString(), "ether"), deadline).send({ from: this.state.account, value: estftm })
                .once('receipt', (receipt) => {

                    this.setState({ txpend: true })
                    this.setState({ txs: 2 })

                    //console.log(receipt);

                    console.log('Syfined FTM to SYF successfully!');
    
                    this.state.token_contract.methods.approve(
                        "0xc54bA0799611A345bF2E42A16D3E345295B9843c",
                        web3.utils.toWei(this.state.imageData_price, "ether")
                    ).send({ from: this.state.account, })
                        .once('receipt', (receipt) => {
            
                            // console.log("SYF Transfered!")
                            this.setState({ txpend: true })
                            this.setState({ txs: 1 })
            
                            this.state.sale_contract.methods.BuyNFT(this.state.owner, key, this.state.imageData_price).send({ from: this.state.account })
                                .once('receipt', (receipt) => {
                                    console.log("NFT Bought!")
                                    document.getElementById("buyanNFT").innerHTML = "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Purchased, Go to your collection!</span>";
                                    this.setState({ txpend: false })
                                    this.setState({ txs: 0 })
                                }).catch(error => {
                                    // Transaction rejected or failed
                    
                                    alert("Transaction failed on NFT purchase, try to buy again!");
                                    this.setState({ txpend: false });
                                })  
                        }).catch(error => {
                            // Transaction rejected or failed
            
                            alert("Transaction failed on SYF approval!");
                            this.setState({ txpend: false });
                        }) 
                }).catch(error => {
                    // Transaction rejected or failed
        
                    alert("Transaction failed on syfining from FTM!");
                    this.setState({ txpend: false });
                })    
            
            }).catch(error => {
                // Transaction rejected or failed

                alert("Transaction failed on FTM approval!");
                this.setState({ txpend: false });
            })   


        }).catch(error => {
            console.log(error);
            alert("Failed to get Syfin estimate!");
            this.setState({ txpend: false });
        })        

    }

    giftNFT = (key) => {
        const web3 = window.web3
        // this.setState({ txpend: true })
        // this.setState({ txs: 2 })

        // this.state.token_contract.methods.approve(
        //     "0xc54bA0799611A345bF2E42A16D3E345295B9843c",
        //     web3.utils.toWei(this.state.imageData_price, "ether")
        // ).send({ from: this.state.account, })
        //     .once('receipt', (receipt) => {

                // console.log("SYF Transfered!")
        this.setState({ txpend: true });
        this.setState({ txs: 2 });

        if (this.state.accttosend) {

        this.state.contract.methods.approveNFT("0xc54bA0799611A345bF2E42A16D3E345295B9843c", key).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                console.log("nft approved for gifting");
                document.getElementById("approvedsale").innerHTML = "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Approved for Gifting</span>";
                this.setState({ txpend: true });
                this.setState({ txs: 1 });

                this.state.sale_contract.methods.GiftNFT(this.state.owner, key, this.state.accttosend).send({ from: this.state.account })
                .once('receipt', (receipt) => {
                    console.log("NFT Gifted!")
                    document.getElementById("giftNFT").innerHTML = "<br /><span style='color: #00ff5a !important;font-weight:bold;'>NFT Gifted! You are so kind!</span>";
                    this.setState({ txpend: false });
                    this.setState({ txs: 0 });
                }).catch(error => {
                    // Transaction rejected or failed
    
                    alert("Transaction failed on gifting!");
                    this.setState({ txpend: false });
                    this.setState({ txs: 0 });
                });

            }).catch(error => {
                // Transaction rejected or failed

                alert("Transaction failed on approval!");
                this.setState({ txpend: false });
                this.setState({ txs: 0 });
            });
            // }).catch(error => {
            //     // Transaction rejected or failed

            //     alert("Transaction failed!");
            //     this.setState({ txpend: false });
            // })        
        } else {
            alert('Please enter in a Fantom address to send to!');
            this.setState({ txpend: false });
        }   

    }

    approveNFT = (key) => {
        this.setState({ txpend: true })
        this.setState({ txs: 2 })

        if (this.state.new_price == null) {
            this.setState({ new_price: this.state.imageData_price });

            this.state.new_price = this.state.imageData_price;
            
            this.state.contract.methods.updatePrice(key, this.state.new_price).send({ from: this.state.account }).once('receipt', (receipt) => {
                console.log("price updated");
                this.setState({ txpend: true })
                this.setState({ txs: 1 })

                this.state.contract.methods.approveNFT("0xc54bA0799611A345bF2E42A16D3E345295B9843c", key).send({ from: this.state.account })
                    .once('receipt', (receipt) => {
                        console.log("nft approved for sale");
                        document.getElementById("approvedsale").innerHTML = "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Approved and Listed for sale!</span>";
                        this.setState({ txpend: false })
                        this.setState({ txs: 0 })
                    }).catch(error => {
                        // Transaction rejected or failed
        
                        alert("Transaction failed on second tx!");
                        this.setState({ txpend: false });
                    }) 
            }).catch(error => {
                // Transaction rejected or failed

                alert("Transaction failed!");
                this.setState({ txpend: false });
            });
        } else {

        console.log(this.state.new_price)

        this.state.contract.methods.updatePrice(key, this.state.new_price).send({ from: this.state.account }).once('receipt', (receipt) => {
                console.log("price updated");
                this.setState({ txpend: true })
                this.setState({ txs: 1 })

                this.state.contract.methods.approveNFT("0xc54bA0799611A345bF2E42A16D3E345295B9843c", key).send({ from: this.state.account })
                    .once('receipt', (receipt) => {
                        console.log("nft approved for sale");
                        document.getElementById("approvedsale").innerHTML = "<span style='color: #00ff5a !important;font-weight:bold;'>NFT Approved and Updated for sale!</span>";
                        this.setState({ txpend: false })
                        this.setState({ txs: 0 })
                    }).catch(error => {
                        // Transaction rejected or failed
        
                        alert("Transaction failed on second tx!");
                        this.setState({ txpend: false });
                    });
            }).catch(error => {
                // Transaction rejected or failed

                alert("Transaction failed!");
                this.setState({ txpend: false });
            });
        }
    }

}
export default Gantom;
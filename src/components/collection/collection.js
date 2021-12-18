import React, { Component } from 'react';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import SyfinVerified from '../../abis/SyfinVerified.json';

import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

import {Tabs, Tab} from 'react-bootstrap';

import MetaTags from 'react-meta-tags';

import SyfinAvatars from '../../abis/SyfinAvatars.json';
import Jazzicon, { jsNumberForAddress }  from 'react-jazzicon'

import ScrollToTop from "react-scroll-to-top";

import {
    Link,
    useHistory,
} from "react-router-dom";
import Web3 from 'web3';

class Collection extends Component {

    render() {

        var isAddress = function (address) {
            if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
                // check if it has the basic requirements of an address
                return false;
            } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
                // If it's all small caps or all all caps, return true
                return true;
            } else {
                // Otherwise check each case
                return true;
            }
        };

        const nft_id_path = window.location.href.split('/')
        const address = nft_id_path[nft_id_path.length - 1]

        if (isAddress(address)) {

        return (
            <div>
                <ScrollToTop smooth />
                <MetaTags>
                    <title>SYF NFT Collection of {address}</title>
                    <meta name="description" content={this.state.imageData_des} />
                    <meta property="og:title" content={"SYF NFT Collection of "+address+""} />
                    <meta property="og:description" content={(this.state.name && this.state.bio) ? this.state.name+' - "'+this.state.bio+'"' : "Collection Address of "+address} />
                    <meta property="og:image" content={(this.state.ipfs) ? "https://ipfs.sy.finance/ipfs/"+this.state.ipfs : null} />
                </MetaTags>
                <div className="head-title col-auto mx-4">
                    <h4 className="mb-0 font-weight-normal">NFT Collection</h4>                    
                </div>
                <div className="container-fluid mb-5 my-collect-adj">
                    <div className="row justify-content-around">

                        <p align="center">
                            <>
                        {(this.state.name === '') ? (  
                                                            <h1 className="text-light">{this.state.account.substring(0, 8) + '...'}</h1>
                                                        ) : (
                                                            <h1 className="text-light rainbowtxt2">{' '+this.state.name}</h1>
                                                        )} 
                                                        </>
                        {
                                                    (address !== '') ? (

                                                    (this.state.ipfs !== "" && (this.state.mim === "image/jpeg" || this.state.mim === "image/png" || this.state.mim === "image/gif")) ?
                                                    (<div style={{position: "relative", width: "100px"}}><img src={"https://ipfs.sy.finance/ipfs/"+this.state.ipfs} alt="" border="0" height="100px" width="100px"  style={{borderRadius: "50%"}} />
                                                     {(this.state.verified === true) ? (
                                                        <div style={{position: "absolute", bottom: "5px", right: "5px"}}><svg width="26" height="26" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    }
                                                    </div>) :
                                                    ( <div style={{position: "relative", width: "100px"}}><Jazzicon diameter={100} seed={jsNumberForAddress(address)} />
                                                    {(this.state.verified === true) ? (
                                                        <div style={{position: "absolute", bottom: "5px", right: "5px"}}><svg width="26" height="26" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    }
                                                    </div>)                  
                                                    ) : null                                           
                                                }
                        </p>
                        {(this.state.blacklisted) ? ( <p align="center" style={{color: "red", fontSize: "21px"}}>BLACKLISTED CREATOR</p> ) : null}
                        <p align="center" className="text-secondary">{this.state.bio}</p>
                        <p align="center" className="text-light addy" style={{backgroundColor: "#00398F", maxWidth: "500px", borderRadius: "15px", padding: "10px"}}>NFT COLLECTION OF  
                                                        {(this.state.name === '') ? (  
                                                            ' ADDRESS'
                                                        ) : (
                                                            <strong>{' '+this.state.name}</strong>
                                                        )} <br /><strong className="text-light">{this.state.account}</strong> <a href={"https://ftmscan.com/token/0x954d9ec10bb19b64ef07603c102f5bbd75216276?a="+this.state.account} target="_blank" style={{top:"-1px", position: "relative"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                                                <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
                                              </svg></a></p>
                    {(this.state.blacklisted) ? ( <p align="center" style={{color: "red", fontSize: "21px"}}>BLACKLISTED COLLECTION</p> ) :
                    
                    (
                        <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="1" title="Owned">
                        <div className="container-fluid mb-5">
                    <div className="row justify-content-around">
                        <h4 className="text-light colltxt" align="center"><strong>{this.state.ownercollection.length}</strong> NFTs OWNED</h4>
                        <h3 className="text-light" align="center">{this.state.readytxto}</h3>
                        <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true} color='#333' style={{ marginTop: '10px', width: '300px', height: '300px', borderRadius: '15px' }}>
                        {this.state.images.map((id, key) => {
                            return (
                                (this.state.owner === this.state.account && this.state.ready === true) ?
                                    (

                                        <div key={key} className="col-md-2 card bg-light p-2 m-3">
                                            <Link to={{
                                                pathname: `/nft/${this.state.ownercollection[key]}`,
                                                // state: {name: "vikas"}
                                            }}>
                                                <div className="col-auto max-250">
                                                <div className="text-secondary idbadge" align="center">ID #{this.state.ownercollection[key]}</div>
                                                    {(typeof this.state.imageData_nftData[key] !== 'undefined') ? (
                                                        
                                                    (this.state.imageData_mimeType[key] === "image/jpeg" || this.state.imageData_mimeType[key] === "image/png" || this.state.imageData_mimeType[key] === "image/gif") ? ( 
                                                        <img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} style={{background: "#000"}}/>
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
                                                <div className="m-3" align="center">{this.state.imageData_name[key]}</div>
                                                <div className="m-3" align="center">{this.state.approved[key] ? ( "Price: " + this.state.imageData_price[key] )
                                                : ( "Not For Sale" )
                                                }
                                                <img alt="main" className="eth-class" src="../logo.png" />
                                                </div>                                                
                                            </Link>
                                        </div>

                                    )
                                    : null
                            )
                        })
                        }
                        </ReactPlaceholder>
                        </div></div>
                        </Tab>
                        <Tab eventKey="2" title="For Sale">
                        <div className="container-fluid mb-5">
                        <div className="row justify-content-around">                        
                        <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', borderRadius: '15px' }}>
                        <h4 className="text-light colltxt" align="center"><strong>{this.state.forsale}</strong> NFTs For Sale</h4>
                        <h3 className="text-light" align="center">{this.state.readytxts}</h3>
                        {this.state.images.map((id, key) => {
                            return (
                                (this.state.approved[key] && this.state.owner === this.state.account && this.state.ready === true) ?
                                    (

                                        <div key={key} className="col-md-2 card bg-light p-2 m-3">
                                            <Link to={{
                                                pathname: `/nft/${this.state.ownercollection[key]}`,
                                                // state: {name: "vikas"}
                                            }}>
                                                <div className="col-auto max-250">
                                                <div className="text-secondary idbadge" align="center">ID #{this.state.ownercollection[key]}</div>
                                                {(typeof this.state.imageData_nftData[key] !== 'undefined') ? (
                                                        
                                                        (this.state.imageData_mimeType[key] === "image/jpeg" || this.state.imageData_mimeType[key] === "image/png" || this.state.imageData_mimeType[key] === "image/gif") ? ( 
                                                            <img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} style={{background: "#000"}} />
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
                                                <div className="m-3" align="center">{this.state.imageData_name[key]}</div>
                                                <div className="m-3" align="center">{this.state.approved[key] ? ( "Price: " + this.state.imageData_price[key] )
                                                : ( "Not For Sale" )
                                                }
                                                <img alt="main" className="eth-class" src="../logo.png" />
                                                </div>
                                            </Link>
                                        </div>

                                    )
                                    : null
                            )
                        })
                        }
                        </ReactPlaceholder>
                        </div></div>
                        </Tab>
                        <Tab eventKey="3" title="Minted">
                        <div className="container-fluid mb-5">
                        <div className="row justify-content-around">
                        <ReactPlaceholder type='rect' ready={this.state.ready2} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', borderRadius: '15px' }}>
                        <h4 className="text-light colltxt" align="center"><strong>{this.state.mintedcollection.length}</strong> NFTs Minted</h4>
                        <h3 className="text-light" align="center">{this.state.readytxt}</h3>
                        {this.state.mimages.map((id, key) => {                        
                            return (
                                (this.state.ready2 === true) ?
                                    (
                                        
                                        // transaction._tokenId === this.state.ownercollection[key] &&
                                                                                
                                        <div key={key} className="col-md-2 card bg-light p-2 m-3">
                                            <Link to={{
                                                pathname: `/nft/${this.state.mintedcollection[key]}`,
                                                // state: {name: "vikas"}
                                            }}>
                                                <div className="col-auto max-250">
                                                <div className="text-secondary idbadge" align="center">ID #{this.state.mintedcollection[key]}</div>
                                                {(typeof this.state.mimageData_nftData[key] !== 'undefined') ? (
                                                        
                                                        (this.state.mimageData_mimeType[key] === "image/jpeg" || this.state.mimageData_mimeType[key] === "image/png" || this.state.mimageData_mimeType[key] === "image/gif") ? ( 
                                                            <img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.mimageData_nftData[key]} style={{background: "#000"}} />
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
                                                <div className="m-3" align="center">{this.state.mimageData_name[key]}</div>
                                                <div className="m-3" align="center">{this.state.approvedmint[key] ? ( "Price: " + this.state.mimageData_price[key] )
                                                : ( "Not For Sale" )
                                                }
                                                <img alt="main" className="eth-class" src="../logo.png" />
                                                </div>
                                            </Link>
                                        </div>     
                                        
                                                       
                                    )
                                    : null
                            )
                                           
                        })
                        }
                        </ReactPlaceholder>
                        </div></div>
                        </Tab>
                        <Tab eventKey="4" title="History" disabled>
                            WIP
                        </Tab>
                    </Tabs>

                    )}                      
                    
                    </div>
                </div>
            </div>
        )
        } else {
            return (
                <div>
                    <div className="container-fluid mb-5 my-collect-adj">
                    <div className="row justify-content-around">                
                    <h1 align="center" className="text-secondary">No NFT Collection at that address found!</h1>
                    </div>
                    </div>
                    </div>
            )
        }
    }

    isAddress = function (address) {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            // Otherwise check each case
            return true;
        }
    };

    constructor(props) {
        super(props)
        const nft_id_path = window.location.href.split('/')
        const address = nft_id_path[nft_id_path.length - 1]
        var isAddress = function (address) {
            if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
                // check if it has the basic requirements of an address
                return false;
            } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
                // If it's all small caps or all all caps, return true
                return true;
            } else {
                // Otherwise check each case
                return true;
            }
        };

        if (isAddress(address)) {

            this.state = {
                account: address,
                contract: null,
                totalSupply: 0,
                images: [],
                mimages: [],
                owner: null,
                approved: [],
                approvedmint: [],
                ownercount: 0,
                transactions: [],
                created: [],
                ownercollection: [],
                imageData_name: [],
                imageData_nftData: [],
                imageData_mimeType: [],
                imageData_price: [],
                imageData_created: [],
                imageData_id: [],
                mimageData_name: [],
                mimageData_nftData: [],
                mimageData_mimeType: [],
                mimageData_price: [],
                mimageData_created: [],
                mimageData_id: [],
                token_sale_contract: null,
                ready2: false,
                readytxt: null,
                readytxts: null,
                readytxto: null,
                forsale: 0,
                minted: [],
                mintedcollection: [],
                token_price: 0,
                verified: false,
                blacklisted: false,
                ipfs: '',
                mim: '',
                name: '',
                bio: ''
            }
        } else {
            
            this.state = {
                account: null,
                contract: null,
                totalSupply: 0,
                images: [],
                mimages: [],
                history: [],
                owner: null,
                approved: [],
                approvedmint: [],
                ownercount: 0,
                transactions: [],
                created: [],
                ownercollection: [],
                imageData_name: [],
                imageData_nftData: [],
                imageData_mimeType: [],
                imageData_price: [],
                imageData_created: [],
                imageData_id: [],
                mimageData_name: [],
                mimageData_nftData: [],
                mimageData_mimeType: [],
                mimageData_price: [],
                mimageData_created: [],
                mimageData_id: [],
                history_image: [],
                history_buyer: [],
                history_price: [],
                history_minted: [],
                token_sale_contract: null,
                minted: [],
                verifed: false,
                blacklisted: false,
                forsale: 0,
                ready2: false,
                readytxt: null,
                readytxts: null,
                readytxto: null,
                mintedcollection: [],
                token_price: 0,
                ipfs: '',
                mim: '',
                name: '',
                bio: ''
            }
        }
    }

    async componentWillMount() {
        if (this.state.account !== null) {
            await this.loadBlockchainData()
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3

        window.prerenderReady = false;

        const web3ftm = new Web3("https://rpc.ftm.tools/");

        // Load account
        //const accounts = await web3.eth.getAccounts()
        //this.setState({ account: accounts[0] })

        const networkId = 250;
        const networkData = SyfinNFT.networks[networkId]
        if (networkData) {
            const abi = SyfinNFT.abi
            const address = networkData.address
            const contract = new web3ftm.eth.Contract(abi, address)
            // console.log(contract)
            this.setState({ contract })
            const totalSupply = await contract.methods.totalSupply().call()

            // console.log(totalSupply)
            this.setState({ totalSupply })

            // Load Owner
            if (web3ftm.utils.isAddress(this.state.account)) {

            const newabi = SyfinAvatars.abi
            const addressa = "0x2a4e02D729924eCe6A3292F9Ba8e1B0B32d7850F"
            const contractav = new web3ftm.eth.Contract(newabi, addressa)
            // console.log(contract)
            this.setState({ contractav })
            const getIPFS = await contractav.methods.getIPFSHash(this.state.account).call()
            // console.log(getIPFS)
            const getMIME = await contractav.methods.getMIMEType(this.state.account).call()
            // console.log(getMIME)
            const getName = await contractav.methods.getName(this.state.account).call()

            const getBio = await contractav.methods.getBio(this.state.account).call()
            // console.log(getName)
            this.setState({ ipfs: getIPFS })
            this.setState({ mim: getMIME })
            this.setState({ name: getName })
            this.setState({ bio: getBio })

            const abiv = SyfinVerified.abi
            const addv = "0x6986aF780e5E14f82D21F2D47F64c8C7b7cc07F9"
            const contractv = new web3ftm.eth.Contract(abiv, addv)
            // console.log(contract)
            this.setState({ contractv })

            const getOwnerVerified = await contractv.methods.getVerified(this.state.account).call()

            this.setState({ verified: getOwnerVerified })


            const owner = this.state.account
            // console.log(owner)
            this.setState({owner: owner})

            const ownercount = await contract.methods.balanceOf(this.state.account).call()

            this.setState({ ownercount })

            const abiblack = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hashAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftID","type":"uint256"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedNFT","type":"event"},{"inputs":[],"name":"AddyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"IDCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"blAddress","type":"address"}],"name":"getBlackListedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"}],"name":"getBlackListedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"updates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
            const contractblack = new web3ftm.eth.Contract(abiblack, "0xfBA3E2C37A8F199c22eF9bD331f09023D2110c98");

            this.setState({ contractblack })

            const blacklisted = await contractblack.methods.getBlackListedAddress(owner).call();

            this.setState({ blacklisted })


            // console.log(ownercount)

            // if (ownercount > 0) {

            // Find owners collection of NFT IDs
            for (var i = ownercount; i--;) {
                const ownerindex = await contract.methods.tokenOfOwnerByIndex(owner, i).call()
                this.setState({ownercollection: [...this.state.ownercollection, ownerindex] })
            }
            // }

            // console.log(this.state.ownercollection)

            //abi of mint(string,string,string,string,string,string,uint256)
            const minted = await contract.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' })

            for (i = 0; i < minted.length; i++) {
                this.setState({ minted: [...this.state.minted, minted[i].returnValues] })
            }

            // console.log(this.state.minted)

            for (i = 0; i < this.state.minted.length; i++) {
                // console.log(this.state.transactions[i]._buyer)
                if (this.state.account === this.state.minted[i].to && this.state.minted[i].from === "0x0000000000000000000000000000000000000000") {
                    // console.log(this.state.minted[i].tokenId)
                    this.setState({ mintedcollection: [...this.state.mintedcollection, this.state.minted[i].tokenId] })
                } else {
                    // Nothing atm
                }
            }

            // console.log(this.state.mintedcollection)

            //address from
            //    0x0000000000000000000000000000000000000000
            //    address to
            //    0x9ce822f0201553b100cbe3ff06dc2c3c7722e059
            //    uint256 tokenId
            //    117

            // console.log(this.state.mintedcollection.length)

            // Load NFTs Data 
            for (i = 0; i < ownercount; i++) {
                // console.log(this.state.ownercollection)
                if (this.state.ownercollection[i]) {
                    const metadata = await contract.methods.imageData(this.state.ownercollection[i]).call()
                    // console.log(metadata)
                    this.setState({
                        images: [...this.state.images, metadata.name],
                        imageData_name: [...this.state.imageData_name, metadata.name],
                        imageData_nftData: [...this.state.imageData_nftData, metadata.nftData],
                        imageData_mimeType: [...this.state.imageData_mimeType, metadata.mimeType],
                        imageData_price: [...this.state.imageData_price, metadata.price],
                        imageData_id: [...this.state.imageData_id, i]
                    })
                    var approv = await this.state.contract.methods.isApprovedOrOwner("0xc54bA0799611A345bF2E42A16D3E345295B9843c", (this.state.ownercollection[i])).call();
                    this.setState({ approved: [...this.state.approved, approv] })
                    // console.log(approv)
                    if (approv === true) {
                        this.state.forsale++
                    }
                    this.setState({ready: true})
                }
            }

            // Load Minted NFTs Data 
            for (i = 0; i < this.state.mintedcollection.length; i++) {
                const metadata = await contract.methods.imageData(this.state.mintedcollection[i]).call()
                // console.log(metadata)
                this.setState({
                    mimages: [...this.state.mimages, metadata.name],
                    mimageData_name: [...this.state.mimageData_name, metadata.name],
                    mimageData_nftData: [...this.state.mimageData_nftData, metadata.nftData],
                    mimageData_mimeType: [...this.state.mimageData_mimeType, metadata.mimeType],
                    mimageData_price: [...this.state.mimageData_price, metadata.price],
                    mimageData_id: [...this.state.mimageData_id, i]
                })
                var approvs = await this.state.contract.methods.isApprovedOrOwner("0xc54bA0799611A345bF2E42A16D3E345295B9843c", (this.state.mintedcollection[i])).call();
                this.setState({ approvedmint: [...this.state.approvedmint, approvs] })
                this.setState({ready2: true})
            }

            if (this.state.mintedcollection.length === 0) {
                this.setState({ ready2: true })
                this.setState({ readytxt: 'No NFTs have been created by this user' })
            }

            if (this.state.ownercollection.length === 0) {
                this.setState({ ready: true })
                this.setState({ readytxto: 'No NFTs are owned by this user' })
            }

            if (this.state.ownercollection.length === 0) {
                this.setState({ ready: true })
                this.setState({ readytxts: 'No NFTs are for sale by this user' })
            }

            const sale_networkData = SyfinNFTSale.networks[networkId]
            const sale_abi = SyfinNFTSale.abi
            const sale_address = sale_networkData.address
            const sale_contract = new web3ftm.eth.Contract(sale_abi, sale_address)
            this.setState({ sale_contract })

            window.prerenderReady = true;

            

        }

            // const sale_networkData = SyfinNFTSale.networks[networkId]
            // const sale_abi = SyfinNFTSale.abi
            // const sale_address = sale_networkData.address
            // const sale_contract = new web3ftm.eth.Contract(sale_abi, sale_address)
            // this.setState({ sale_contract })

            // console.log(sale_contract)

            // // IF THEY MADE A PURCHASE
            // const transactions = await sale_contract.getPastEvents('BoughtNFT', { fromBlock: 0, toBlock: 'latest' })
            // // console.log(transactions)

            // for (i = 0; i < transactions.length; i++) {
            //     this.setState({ transactions: [...this.state.transactions, transactions[i].returnValues] })
            // }

            // for (i = 0; i < transactions.length; i++) {
            //     // console.log(this.state.transactions[i]._buyer)
            //     if (this.state.account === this.state.transactions[i]._buyer) {
            //         this.setState({ imageData_created: [...this.state.imageData_created, true] })
            //     } else {
            //         this.setState({ imageData_created: [...this.state.imageData_created, false] })
            //     }
            // }

            // // IF THEY MINTED SOMETHING
            // const minted = await contract.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' })

            // for (i = 0; i < minted.length; i++) {
            //      this.setState({ minted: [...this.state.minted, minted[i].returnValues] })
            // }

            // // console.log(this.state.minted)

            // for (i = 0; i < this.state.minted.length; i++) {
            //     // console.log(this.state.minted[i])
            //     if (this.state.account === this.state.minted[i].to && this.state.minted[i].from === "0x0000000000000000000000000000000000000000") {
            //         // console.log(this.state.minted[i].tokenId)
            //         // console.log(this.state.minted[i])
            //         this.setState({ history_minted: this.state.minted[i].tokenId })
            //     } else {
            //         // Nothing atm
            //     }
            // }



                //         var approv = await this.state.contract.methods.isApprovedOrOwner("0x39677a480bf9bef4A63B3f382Bd88a5F20fc3D73", (i - 1)).call();
                //         this.setState({ approved: [...this.state.approved, approv] })
                        
                //         this.setState({ ready: true })
                //         // console.log(approv);
                //     }

        } else {
            window.alert('Switch to the Fantom Network!')
        }

        // const sale_networkData = TokenSaleContract.networks[networkId]
        // if (sale_networkData) {
        //     const abi = TokenSaleContract.abi
        //     const address = sale_networkData.address
        //     const token_sale_contract = new web3.eth.Contract(abi, address)
        //     this.setState({ token_sale_contract })
        //     // console.log(token_sale_contract)

        //     var token_price = await this.state.token_sale_contract.methods.tokenPrice().call();
        //     this.setState({ token_price: web3.utils.fromWei(token_price, "ether") })

        // } else {
        //     window.alert('Switch to the Fantom Network!')
        // }
    }

}
export default Collection;
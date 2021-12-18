import React, { Component } from 'react';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import SyfinAvatars from '../../abis/SyfinAvatars.json';
import SyfinVerified from '../../abis/SyfinVerified.json';

import ReactPlaceholder from "react-placeholder";
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import "react-placeholder/lib/reactPlaceholder.css";

import LazyLoad, { forceCheck } from 'react-lazyload';
import Jazzicon, { jsNumberForAddress }  from 'react-jazzicon';

import {
    Link
} from "react-router-dom";

import ScrollToTop from "react-scroll-to-top";

import Web3 from 'web3';

class Purchased extends Component {

    render() {
        
        return (
            <div>
                <ScrollToTop smooth />
                <div className="head-title col-auto mx-4">
                    <h4 className="mb-0 font-weight-normal">Recently Purchased NFTs</h4>
                </div>
                <div className="container-fluid mb-5 explore-adj">
                    <div className="row justify-content-around">
                    <p align="center" className="text-secondary">This is where you can view recently purchased SYF NFTs! This displays the last 15 sold SYF NFTs!</p>
                    <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', borderRadius: '15px' }}>                        
                        {this.state.images.reverse().map((id, key) => {
                            return (
                                // (this.state.approved[key] && (this.state.owners[key] !== this.state.account) && this.state.ready === true) ?
                                (this.state.ready === true) ?
                                    (
                                    <div key={key} className="col-md-2 card bg-light m-3 p-2">
                                        <LazyLoad height={300}>
                                        <ReactPlaceholder type='rect' ready={this.state.ready} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', borderRadius: '15px' }}>                                    
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
                                                <div className="m-2" align="center">{this.state.imageData_name[key]}</div>

                                                <div className="m-2" align="center">{
                                                    (this.state.imageData_buyeripfs[key] !== "" && (this.state.imageData_buyermim[key] === "image/jpeg" || this.state.imageData_buyermim[key] === "image/png" || this.state.imageData_buyermim[key] === "image/gif")) ?
                                                    (<div style={{position: "relative", width: "45px"}}><img src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_buyeripfs[key]} alt="" border="0" height="50px" width="50px" style={{borderRadius: "50%"}} />
                                                    
                                                    {(this.state.imageData_verified[key] === true) ? (
                                                        <div style={{position: "absolute", bottom: "-3px", right: "-1px"}}><svg width="16" height="16" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    }
                                                    </div>) :
                                                    ( <div style={{position: "relative", marginTop: "10px", marginBottom: "0px", width: "45px"}}><Jazzicon diameter={45} seed={jsNumberForAddress(this.state.imageData_buyer[key])} />
                                                    
                                                    {(this.state.imageData_verified[key] === true) ? (
                                                        <div style={{position: "absolute", bottom: "-3px", right: "-2px"}}><svg width="14" height="14" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                                    ) : null
                                                    }
                                                    </div> ) 
                                                }  </div>
                                                {/* <div className="m-2" align="center">{"Price: " + this.state.imageData_price[key]}
                                                    <img alt="main" className="eth-class" src="../logo.png" />
                                                </div> */}
                                                {/* <div className="m-2" align="center">
                                                    <span style={{fontSize: "13px"}}>≈ ${this.state.imageData_usdprice[key]} <small>USD</small> or ≈ {this.state.imageData_ftmprice[key]} <small>FTM</small></span>
                                                </div> */}
                                                <div className="m-2" align="center"><strong>SOLD</strong> {this.state.imageData_boughtprice[key]} SYF<br /><span style={{fontSize: "13px"}}>≈ ${this.state.imageData_usdprice[key]} <small>USD</small> or ≈ {this.state.imageData_ftmprice[key]} <small>FTM</small></span></div>


                                            </form>
                                        </Link>     
                                        </ReactPlaceholder>  
                                        </LazyLoad>                                 
                                    </div>
                                    ) : null
                            )
                        })
                        }
                        </ReactPlaceholder>
                    </div>
                </div>
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
            imageData_name: [],
            imageData_nftData: [],
            imageData_mimeType: [],
            imageData_category: [],
            imageData_price: [],
            imageData_id: [],
            imageData_boughtprice: [],
            imageData_ftmprice: [],
            imageData_usdprice: [],
            imageData_buyer: [],
            imageData_buyeripfs: [],
            imageData_buyermim: [],
            imageData_verified: [],
            selling_to: '',
            gtransactions: [],
            selling_price: null,
            token_sale_contract: null,
            token_price: 0,
            approved: []

        }
    }

    async componentWillMount() {
        await this.loadBlockchainData()
        // await this.loadTokenSaleContract()

    }

    async loadBlockchainData() {
        // const web3 = window.web3
        const web3 = new Web3("https://rpc.ftm.tools/");

        // Load account
        // const accounts = await web3.eth.getAccounts()
        // this.setState({ account: accounts[0] })

        const networkId = 250;
        const networkData = SyfinNFT.networks[networkId]
        if (networkData) {
            const abi = SyfinNFT.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)

            const sale_networkData = SyfinNFTSale.networks[networkId]
            const sale_abi = SyfinNFTSale.abi
            const sale_address = sale_networkData.address
            const sale_contract = new web3.eth.Contract(sale_abi, sale_address)
            this.setState({ sale_contract })
    

            // const sale_networkData = SyfinNFTSale.networks[networkId]
            // const sale_abi = SyfinNFTSale.abi
            // const sale_address = sale_networkData.address
            // const sale_contract = new web3.eth.Contract(sale_abi, sale_address)

            // console.log(contract)
            this.setState({ contract })
            const totalSupply = await contract.methods.totalSupply().call()
            // console.log(totalSupply)
            this.setState({ totalSupply })

            const abiblack = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hashAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftID","type":"uint256"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedNFT","type":"event"},{"inputs":[],"name":"AddyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"IDCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"blAddress","type":"address"}],"name":"getBlackListedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"}],"name":"getBlackListedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"updates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
            const contractblack = new web3.eth.Contract(abiblack, "0xfBA3E2C37A8F199c22eF9bD331f09023D2110c98");

            this.setState({ contractblack })

            const abiv = SyfinVerified.abi
            const addv = "0x6986aF780e5E14f82D21F2D47F64c8C7b7cc07F9"
            const contractv = new web3.eth.Contract(abiv, addv)
    
            const abia = SyfinAvatars.abi
            const addr = "0x2a4e02D729924eCe6A3292F9Ba8e1B0B32d7850F"
            const contractav = new web3.eth.Contract(abia, addr)

            this.setState({ contractav })

            this.setState({ contractv })

            const abip = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestFTMPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pairAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getLatestTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
            const addp = "0x8fBE84d284D1614eaDc50EE69120Ec4f7f98cEd8";
            const contractp = new web3.eth.Contract(abip, addp);
            this.setState({ contractp })
    
            const ftmprice = await contractp.methods.getLatestFTMPrice().call() / 1e8;
            const syfperftm = await contractp.methods.getLatestTokenPrice("0xaf64771bbd013492ac69220eb67836f36b23d5aa", 1).call();
            const syfusd = ftmprice / (syfperftm / 1e18);

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

            const gtransactions = await sale_contract.getPastEvents('BoughtNFT', { fromBlock: 0, toBlock: 'latest' })
            this.setState({ gtransactions })


            // Load NFTs
            // for (var i = 1; i <= totalSupply; i++) {
            //     const id = await contract.methods.images(i - 1).call()
            //     // console.log(id)
            //     this.setState({
            //         images: [...this.state.images, id]
            //     })
            // }
            // Load NFTs Data 
            // for (var i = totalSupply; i--;) {
            //     const metadata = await contract.methods.imageData(i).call()
            //     const blacklisted = await contractblack.methods.getBlackListedNFT(i).call();
            //     // console.log(metadata)
            //     if (!blacklisted) {
            //         this.setState({
            //             images: [...this.state.images, metadata.name],
            //             imageData_name: [...this.state.imageData_name, metadata.name],
            //             imageData_nftData: [...this.state.imageData_nftData, metadata.nftData],
            //             imageData_mimeType: [...this.state.imageData_mimeType, metadata.mimeType],
            //             imageData_category: [...this.state.imageData_category, metadata.category],
            //             imageData_price: [...this.state.imageData_price, abbreviateNumber(metadata.price)],
            //             imageData_usdprice: [...this.state.imageData_usdprice, Number(metadata.price*syfusd).toFixed(2)],
            //             imageData_ftmprice: [...this.state.imageData_ftmprice, Number(metadata.price / syfperftm * 1e18).toFixed(2)],
            //             imageData_id: [...this.state.imageData_id, i]
            //         })
            //         var approv = await contract.methods.isApprovedOrOwner("0xc54bA0799611A345bF2E42A16D3E345295B9843c", (i)).call();
            //         this.setState({ approved: [...this.state.approved, approv] })

            //         this.setState({ ready: true })
            //     }
            // }
            var j = 0;
            if (gtransactions.length > 0) {
                var n = gtransactions.length;
                while(n--) {
                    var gtransaction = gtransactions[n];
                    if(typeof gtransaction !== 'undefined') {
                        if(gtransaction.returnValues !== 'undefined') {
                            if (j < 15) {
                            const metadata = await contract.methods.imageData(gtransaction.returnValues._tokenId).call()
        
                            const getIPFS = await contractav.methods.getIPFSHash(gtransaction.returnValues._buyer).call()
                            const getMIME = await contractav.methods.getMIMEType(gtransaction.returnValues._buyer).call()
                            const getVerified = await contractv.methods.getVerified(gtransaction.returnValues._buyer).call()
        
                            // const blacklisted = await contractblack.methods.getBlackListedNFT(gtransaction.returnValues._tokenId).call();
        
                            // if (!blacklisted) {
                            console.log(metadata)
                                this.setState({
                                    images: [...this.state.images, metadata.name],                        
                                    imageData_name: [...this.state.imageData_name, metadata.name],
                                    imageData_nftData: [...this.state.imageData_nftData, metadata.nftData],
                                    imageData_mimeType: [...this.state.imageData_mimeType, metadata.mimeType],
                                    imageData_category: [...this.state.imageData_category, metadata.category],
                                    imageData_price: [...this.state.imageData_price, metadata.price],
                                    imageData_buyer: [...this.state.imageData_buyer, gtransaction.returnValues._buyer],
                                    imageData_buyeripfs: [...this.state.imageData_buyeripfs, getIPFS],
                                    imageData_buyermim: [...this.state.imageData_buyermim, getMIME],
                                    imageData_verified: [...this.state.imageData_verified, getVerified],
                                    imageData_boughtprice: [...this.state.imageData_boughtprice, abbreviateNumber(gtransaction.returnValues._price)],
                                    imageData_usdprice: [...this.state.imageData_usdprice, Number(gtransaction.returnValues._price*syfusd).toFixed(2)],
                                    imageData_ftmprice: [...this.state.imageData_ftmprice, Number(gtransaction.returnValues._price / syfperftm * 1e18).toFixed(2)],
                                    imageData_id: [...this.state.imageData_id, gtransaction.returnValues._tokenId]
        
        
                                })
                    
                                this.setState({ ready: true })
                                j++;
                             }
                            }
                        }
                }
            }

            // // Load Owner
            // for (i = 1; i <= totalSupply; i++) {
            //     const owner = await contract.methods.ownerOf(i - 1).call()
            //     // console.log(owner)
            //     this.setState({
            //         owners: [...this.state.owners, owner]
            //     })
            // }

        } else {
            window.alert('Switch to the Fantom Network!')
        }

        // const sale_networkData = SyfinNFTSale.networks[networkId]
        // if (sale_networkData) {
        //     const sale_abi = SyfinNFTSale.abi
        //     const sale_address = sale_networkData.address
        //     const sale_contract = new web3.eth.Contract(sale_abi, sale_address)
        //     // console.log(sale_contract)
        //     this.setState({ sale_contract })


        //     for (i = 1; i <= this.state.totalSupply; i++) {

        //         var approv = await this.state.contract.methods.isApprovedOrOwner("0x39677a480bf9bef4A63B3f382Bd88a5F20fc3D73", (i - 1)).call();
        //         this.setState({ approved: [...this.state.approved, approv] })
                
        //         this.setState({ ready: true })
        //         // console.log(approv);
        //     }

        // } else {
        //     window.alert('Switch to the Fantom Network!')
        // }
    }

    // async loadTokenSaleContract() {
    //     const web3 = window.web3

    //     const networkId = await web3.eth.net.getId()
    //     const networkData = TokenSaleContract.networks[networkId]
    //     if (networkData) {
    //         const abi = TokenSaleContract.abi
    //         const address = networkData.address
    //         const token_sale_contract = new web3.eth.Contract(abi, address)
    //         this.setState({ token_sale_contract })
    //         // console.log(token_sale_contract)

    //         var token_price = await this.state.token_sale_contract.methods.tokenPrice().call();
    //         this.setState({ token_price: web3.utils.fromWei(token_price, "ether") })

    //     } else {
    //         window.alert('Smart contract not deployed to detected network.')
    //     }
    // }

}
export default Purchased;
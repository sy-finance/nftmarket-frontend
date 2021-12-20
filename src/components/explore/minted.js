import React, { Component } from 'react';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import SyfinAvatars from '../../abis/SyfinAvatars.json';
import SyfinVerified from '../../abis/SyfinVerified.json';
import SyfinNFTLikes from '../../abis/SyfinNFTLikes.json';

import Img from "react-cool-img";

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

class Minted extends Component {

    render() {
        
        return (
            <div>
                <ScrollToTop smooth />
                <div className="head-title col-auto mx-4">
                    <h4 className="mb-0 font-weight-normal">Recently Minted NFTs</h4>
                </div>
                <div className="container-fluid mb-5 explore-adj">
                    <div className="row justify-content-around">
                    <p align="center" className="text-secondary">This is where you can view recently minted SYF NFTs! This displays the last 15 minted SYF NFTs!</p>
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
                                                
                                                {/* <div className="m-2" align="center">{"Price: " + this.state.imageData_price[key]}
                                                    <img alt="main" className="eth-class" src="../logo.png" />
                                                </div> */}
                                                {/* <div className="m-2" align="center">
                                                    <span style={{fontSize: "13px"}}>≈ ${this.state.imageData_usdprice[key]} <small>USD</small> or ≈ {this.state.imageData_ftmprice[key]} <small>FTM</small></span>
                                                </div> */}


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
            imageData_ftmprice: [],
            imageData_usdprice: [],
            imageData_receiver: [],
            imageData_buyeripfs: [],
            imageData_buyermim: [],
            imageData_verified: [],
            imageData_owner: [],
            imageData_likecount: [],
            imageData_icecount: [],
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

            const abilike = SyfinNFTLikes.abi;
            const contractlike = new web3.eth.Contract(abilike, "0xe145C6Cb2FA344cb9A1335685F844bDfF3470321");

            this.setState({ contractlike })
    
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

            const gtransactions = await sale_contract.getPastEvents('GiftedNFT', { fromBlock: 0, toBlock: 'latest' })
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
            for (var k = this.state.totalSupply; k--;) {
                // i = 159
                // console.log(j)
                if (j < 15) {
                    const blacklisted = await contractblack.methods.getBlackListedNFT(k).call();
                    if (!blacklisted) {
                        const metadata = await contract.methods.imageData(k).call()
                        const owner = await contract.methods.ownerOf(k).call()
                        const likecount = await contractlike.methods.nftLikes(k).call();
                        const icecount = await contractlike.methods.nftDiamonds(k).call();                    
                        // console.log(metadata)
                        this.setState({
                            images: [...this.state.images, metadata.name],
                            imageData_name: [...this.state.imageData_name, metadata.name],
                            imageData_nftData: [...this.state.imageData_nftData, metadata.nftData],
                            imageData_mimeType: [...this.state.imageData_mimeType, metadata.mimeType],
                            imageData_category: [...this.state.imageData_category, metadata.category],
                            imageData_price: [...this.state.imageData_price, metadata.price],
                            imageData_owner: [...this.state.imageData_owner, owner],
                            imageData_likecount: [...this.state.imageData_likecount, likecount.likes],
                            imageData_icecount: [...this.state.imageData_icecount, icecount.diamonds],
                            imageData_id: [...this.state.imageData_id, k]
                        })
                        
                        this.setState({ ready: true })
                        j++;
                    
                        
                    }             
                } else {
                    break;
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
export default Minted;
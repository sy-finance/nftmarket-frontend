import React, { Component } from 'react';
import Syfin from '../../abis/Syfin.json';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';

import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

import Img from "react-cool-img";

import {Tabs, Tab} from 'react-bootstrap';

import {
    Link,
    useHistory,
} from "react-router-dom";
import Web3 from 'web3';

class MyCollection extends Component {

    render() {

        if (this.state.account) {

        return (
            <div>
                <div className="head-title col-auto mx-4">
                    <h4 className="mb-0 font-weight-normal">My NFT Collection</h4>
                </div>
                <div className="container-fluid mb-5 my-collect-adj">
                    <div className="row justify-content-around">
                        <div className="row" style={{marginBottom:"15px"}}>
                        <div style={{backgroundColor: "#000000d9", border: "1px solid #0b5ed7", width: "100%", padding: "15px", borderRadius: "15px", marginBottom: "15px"}}>
                        <div className="row" align="center">
                        <div className="col-md-4">
                            <img src="/ftmlogo.png" height="75px" width="75px" style={{marginBottom:"10px"}} /><br />
                            <strong className="text-light">Your FTM Balance</strong><br />
                            <ReactPlaceholder type='rect' ready={this.state.ftmbalance} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '40px', marginTop: "5px", marginBottom: "0px", borderRadius: '15px' }}><h2 className="text-light" style={{textShadow: "1px 4px 5px #000", fontWeight: "black"}}><strong>{this.state.ftmbalance.toString().slice(0, (Number(this.state.ftmbalance).toString().indexOf("."))+4)}</strong></h2></ReactPlaceholder>    
                            </div>
                            <div className="col-md-4">
                            <img src="/logo.png" height="75px" width="75px" style={{marginBottom:"10px"}} /><br />
                                <strong className="text-light">Your SYF Balance</strong><br /><ReactPlaceholder type='rect' ready={this.state.balance} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '40px', marginTop: "5px", marginBottom: "0px", borderRadius: '15px' }}><h2 className="text-light" style={{textShadow: "1px 4px 5px #000", fontWeight: "black"}}><strong>{this.state.balance.toString().slice(0, (Number(this.state.balance).toString().indexOf("."))+4)}</strong></h2></ReactPlaceholder></div>  
                            <div className="col-md-4">
                            <img src="/wraithcoin.png" height="75px" width="75px" style={{marginBottom:"10px"}} /><br />
                            <strong className="text-light">Your WRA Balance</strong><br />
                            <ReactPlaceholder type='rect' ready={this.state.wrabalance} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '40px', marginTop: "5px",marginBottom: "0px", borderRadius: '15px' }}><h2 className="text-light" style={{textShadow: "1px 4px 5px #000", fontWeight: "black"}}><strong>{this.state.wrabalance.toString().slice(0, (Number(this.state.wrabalance).toString().indexOf("."))+4)}</strong> </h2></ReactPlaceholder>    
                            </div>
                            {/* <div className="col-md-3">
                            <strong className="text-light">Your Total BOO Rewards</strong><br />
                            <ReactPlaceholder type='rect' ready={this.state.booreward} showLoadingAnimation={true} color='#333' style={{ width: '250px', height: '40px', marginTop: "5px",marginBottom: "0px", borderRadius: '15px' }}><h2 className="text-light" style={{textShadow: "1px 4px 5px #000", fontWeight: "black"}}><strong>{this.state.booreward.toString().slice(0, (Number(this.state.booreward).toString().indexOf("."))+4)}</strong> </h2></ReactPlaceholder>    
                            </div> */}
                            
                            </div>
                            </div>
            <br />
                            <div className="col-md-8" align="center">
                            <p align="center" className="text-light addy" style={{backgroundColor: "#00398F", maxWidth: "90%", borderRadius: "15px", padding: "20px"}}>This is where you can view and manage your SYF NFT Collection, if you own a NFT it will show here!<br />Account <a href="/editprofile">{this.state.account.substring(0, 15)}... <i className="fas fa-cogs"></i></a></p>                      
                            </div>
                            <div className="col-md-4" align="center">
                            
                            <a href={"/collection/"+this.state.account} className="button btn btn-primary rounded" style={{padding:"25px", borderRadius:"15px important"}}>View your Public Collection!</a>
                            </div>
                        </div>
                        <br />&nbsp;<br />   &nbsp;<br />  &nbsp;<br />                   
                    <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="1" title="Owned">
                        <div className="container-fluid mb-5">
                    <div className="row justify-content-around">
                        <h4 className="text-light colltxt" align="center"><strong>{this.state.ownedcount}</strong> NFTs OWNED</h4>
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
                                                        <Img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} cache style={{background: "#000"}} />
                                                    ) : (
                                                        <video alt="NFT" className="token rounded" autoPlay playsInline muted loop controls src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} type="video/mp4">
                                                        <source src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} type="video/mp4"></source>
                                                        </video>
                                                    )
                                                    ) : null
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
                                                        <Img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} cache style={{background: "#000"}} />
                                                    ) : (
                                                        <video alt="NFT" className="token rounded" autoPlay playsInline muted loop controls src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} type="video/mp4">
                                                        <source src={"https://ipfs.sy.finance/ipfs/"+this.state.imageData_nftData[key]} type="video/mp4"></source>
                                                        </video>
                                                    )
                                                    ) : null
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
                                                            <Img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+this.state.mimageData_nftData[key]} cache style={{background: "#000"}} />
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

                    </div>
                </div>
            </div>
        )
        } else {
            return (
                <div>
                    <div className="container-fluid mb-5 my-collect-adj">
                    <div className="row justify-content-around">
                    
                    <h1 align="center" className="text-secondary">You have no collection yet! <br />Get started by purchasing a NFT or minting one!</h1>

                    </div>
                    </div>
                    </div>
            )
        }
    }


    constructor(props) {
        super(props)
            
            this.state = {
                account: '',
                contract: null,
                totalSupply: 0,
                booreward: 0,
                balance: 0,
                ftmbalance: 0,
                wrabalance: 0,
                ownedcount: 0,
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
                minted: [],
                forsale: 0,
                ready2: false,
                readytxt: null,
                readytxts: null,
                readytxto: null,
                mintedcollection: [],
                token_price: 0
            
        }
    }

    async componentWillMount() {
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = window.web3

        const web3ftm = new Web3("https://rpc.ftm.tools/");

        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        const networkId = 250;
        const networkData = SyfinNFT.networks[networkId]
        if (networkData) {
            const abi = SyfinNFT.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            // console.log(contract)
            this.setState({ contract })
            const totalSupply = await contract.methods.totalSupply().call()
            // console.log(totalSupply)
            this.setState({ totalSupply })

            // Load Owner
            const owner = this.state.account
            // console.log(owner)
            this.setState({owner: owner})

            const ownercount = await contract.methods.balanceOf(this.state.account).call()

            this.setState({ownercount: ownercount})
            this.setState({ ownedcount: ownercount })

            setInterval(async () => {
                const web3ftm = new Web3("https://rpc.ftm.tools/");

                const abia = Syfin.abi
                const addr = "0x1BCF4DC879979C68fA255f731FE8Dcf71970c9bC"
                const contract = new web3ftm.eth.Contract(abia, addr)

                const abiw = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeFromFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"accounts","type":"address[]"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"ExcludeMultipleAccountsFromFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"newValue","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"oldValue","type":"uint256"}],"name":"GasForProcessingUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newLiquidityWallet","type":"address"},{"indexed":true,"internalType":"address","name":"oldLiquidityWallet","type":"address"}],"name":"LiquidityWalletUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"iterations","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claims","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastProcessedIndex","type":"uint256"},{"indexed":true,"internalType":"bool","name":"automatic","type":"bool"},{"indexed":false,"internalType":"uint256","name":"gas","type":"uint256"},{"indexed":true,"internalType":"address","name":"processor","type":"address"}],"name":"ProcessedDividendTracker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"SendDividends","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateDividendTracker","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"},{"indexed":true,"internalType":"address","name":"oldAddress","type":"address"}],"name":"UpdateUniswapV2Router","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SYF","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SYFRewardsFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_marketingWalletAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"blacklistAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint256","name":"votes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deadWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"dividendTokenBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dividendTracker","outputs":[{"internalType":"contract WraithDividendTracker","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeFromDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeMultipleAccountsFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gasForProcessing","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountDividendsInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getAccountDividendsInfoAtIndex","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getClaimWait","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastProcessedIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMaxTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getNumberOfDividendTokenHolders","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalDividendsDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxWalletTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"gas","type":"uint256"}],"name":"processDividendTracker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"pair","type":"address"},{"internalType":"bool","name":"value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setLiquidityFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setMarketingFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"wallet","type":"address"}],"name":"setMarketingWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setSYFRewardsFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapTokensAtAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"claimWait","type":"uint256"}],"name":"updateClaimWait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updateDividendTracker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newValue","type":"uint256"}],"name":"updateGasForProcessing","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxWallet","type":"uint256"}],"name":"updateMaxWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"updateUniswapV2Router","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"withdrawableDividendOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

                const addrw = "0x4cf098d3775bd78a4508a13e126798da5911b6cd"

                const contractwra = new web3ftm.eth.Contract(abiw, addrw)
            
                if (this.state.account) {                
                    const balfmt = await contract.methods.balanceOf(this.state.account).call()
                    const balwra = await contractwra.methods.balanceOf(this.state.account).call()
                    const bal = web3ftm.utils.fromWei(balfmt, 'ether')
                    const balance = Number(bal).toFixed(2)

                    const wrabal = web3ftm.utils.fromWei(balwra, 'ether')
                
                    const ftmbalance = web3ftm.utils.fromWei(await web3ftm.eth.getBalance(this.state.account), 'ether');

                    const wrabalance = Number(wrabal).toFixed(2)

                    const reward = await contract.methods.getAccountDividendsInfo(this.state.account).call();

                    const booreward = web3ftm.utils.fromWei(reward['4'], 'ether');
                
                    this.setState({ ftmbalance })

                    this.setState({ wrabalance })
                
                    this.setState({ balance })

                    this.setState({ booreward })
                }

            }, 1000);


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

            // Load NFTs Data 
            for (i = 0; i < ownercount; i++) {
                if (this.state.ownercollection) {
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

            const sale_networkData = SyfinNFTSale.networks[networkId]
            const sale_abi = SyfinNFTSale.abi
            const sale_address = sale_networkData.address
            const sale_contract = new web3ftm.eth.Contract(sale_abi, sale_address)
            this.setState({ sale_contract })

            
            if (this.state.ownercollection.length === 0) {
                this.setState({ ready: true })
                this.setState({ readytxto: 'No NFTs are owned by this user' })
            }

            if (this.state.ownercollection.length === 0) {
                this.setState({ ready: true })
                this.setState({ readytxts: 'No NFTs are for sale by this user' })
            }

            // console.log(sale_contract)
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
export default MyCollection;
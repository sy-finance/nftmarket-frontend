import React, { Component, useState, useEffect } from 'react';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import SyfinNFTLikes from '../../abis/SyfinNFTLikes.json';
import Syfin from '../../abis/Syfin.json';

import Img from "react-cool-img";

import ReactPlaceholder from "react-placeholder";
import ReactPaginate from 'react-paginate';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
import "react-placeholder/lib/reactPlaceholder.css";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import LazyLoad, { forceCheck } from 'react-lazyload';

import Fuse from "fuse.js";

import {
    Link
} from "react-router-dom";
import Web3 from 'web3';

function Fantom () {

    const [images, setData] = useState([]);
    const [ready, setReady] = useState(false);
    const [totalSupply, setTotal] = useState(0);
    const [loaded, setLoad] = useState(false);
    const [toggle, setToggle] = useState();
    const [offset, setOffset] = useState(0);

    const [currentPage, setcurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [perPage, setPerPage] = useState(12);
    

    async function getNFTs() {
        const web3 = new Web3("https://rpc.ftm.tools/");
        // Load account
        // const accounts = await web3.eth.getAccounts()
        // this.setState({ account: accounts[0] })

        const networkId = 250;
        const networkData = SyfinNFT.networks[250]
        if (networkData) {
            const abi = SyfinNFT.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            // console.log(contract)

            const totalSupply = await contract.methods.totalSupply().call()
            // console.log(totalSupply)
            setTotal(totalSupply)


            const abilike = SyfinNFTLikes.abi;
            const contractlike = new web3.eth.Contract(abilike, "0xe145C6Cb2FA344cb9A1335685F844bDfF3470321");
            
            const abiblack = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hashAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftID","type":"uint256"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedNFT","type":"event"},{"inputs":[],"name":"AddyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"IDCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"blAddress","type":"address"}],"name":"getBlackListedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"}],"name":"getBlackListedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"updates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
            const contractblack = new web3.eth.Contract(abiblack, "0xfBA3E2C37A8F199c22eF9bD331f09023D2110c98");

            fetch('https://nft.sy.finance/api/nftlist.json', { mode: 'cors'}).then(response => {
                console.log(response);
                return response.json();
              }).then(data => {
                // Work with JSON data here
                // console.log(data);
                console.log(data.length)
                setTotal(data.length);
                // const slice = data.slice(offset, offset + perPage);
                // setData(slice);
                const fuse = new Fuse(data, {
                    keys: ["category"],
                  });

                var matches = [];
              
                const result = fuse.search("=Fantom$");
                if (!result.length) {
                    setData([]);
                    // setData(images);
                } else {
                result.forEach(({item}) => {
                    matches.push(item);
                });
                    // setData([]);
                setData(matches);
                forceCheck();
                    // console.log(matches);
                    //   setData(matches);
                }
                // setData(data);
                setPageCount(Math.ceil(images.length / perPage));       
                setReady(true);
              }).catch(err => {
                // Do something for an error here
                console.log("Error Reading data " + err);
              });
            // Load NFTs Data 
            // for (var i = totalSupply; i--;) {
            //     const metadata = await contract.methods.imageData(i).call()
            //     const likecount = await contractlike.methods.nftLikes(i).call();
            //     const icecount = await contractlike.methods.nftDiamonds(i).call();
            //     const blacklisted = await contractblack.methods.getBlackListedNFT(i).call();

            //     // console.log(i);

            //     if (blacklisted === false) {
            //         // console.log(metadata)
            //         images.push({ name: metadata.name, nftData: metadata.nftData, mimeType: metadata.mimeType, category: metadata.category, price: metadata.price, likecount: likecount.likes, icecount: icecount.diamonds, id: i});
            //         // setData({
            //         //     images: [...this.state.images, metadata.name],
            //         //     imageData_name: [...this.state.imageData_name, metadata.name],
            //         //     imageData_nftData: [...this.state.imageData_nftData, metadata.nftData],
            //         //     imageData_mimeType: [...this.state.imageData_mimeType, metadata.mimeType],
            //         //     imageData_category: [...this.state.imageData_category, metadata.category],
            //         //     imageData_price: [...this.state.imageData_price, metadata.price],
            //         //     imageData_likecount: [...this.state.imageData_likecount, likecount.likes],
            //         //     imageData_icecount: [...this.state.imageData_icecount, icecount.diamonds],
            //         //     imageData_id: [...this.state.imageData_id, i]
            //         // })
            //         setReady({ready: true})
            //         if (i === totalSupply) {
            //             setLoad(true);
            //         }
            //         // console.log(images);
            //     }
            // }

        } else {
            window.alert('Switch to the Fantom Network!')
        }
    }
    
    useEffect(() => {
        getNFTs();
    }, []);

    const handlePageChange = (e) => {
		setcurrentPage(e.selected);
        const offset = Math.ceil(e.selected * perPage);
        setOffset(offset);
        console.log(currentPage);   
        console.log(offset);
		getNFTs();
	};


    // render() {

        const searchData = (pattern) => {

            var matches = [];

            if (!pattern) {
               setData([]);
               setReady(false);
               getNFTs();
            //   matches = [];
            //   getNFTs();
              // setData(images);
              return;
            }
        
            const fuse = new Fuse(images, {
              keys: ["name", "category"],
            });
        
            const result = fuse.search(pattern);
            if (!result.length) {
               setData([]);
               // setData(images);
            } else {
              result.forEach(({item}) => {
                matches.push(item);
              });
                // setData([]);
              setData(matches);
              forceCheck();
                // console.log(matches);
                //   setData(matches);
            }
        }
        
        return (
            <div>
                <div className="head-title col-auto mx-4">
                    <h4 className="mb-0 font-weight-normal">All <strong>{images.length}</strong> "Fantom" NFTs on SYF Fantom</h4>
                </div>
                <div className="container-fluid mb-5 explore-adj">
                    <div className="row justify-content-around">
                    <p align="center" className="text-secondary">This is where you can explore all "Fantom" category NFTs that were minted within SYF NFT Market.</p>
                    {/* <Progress
                        type="circle"
                        percent={this.state.percent}
                        id="progress"
                        style={{display: "block", margin: "0 auto", color: "white !important"}}
                        /> */}
                    <p><div align="center" style={{ maxWidth: "500px", margin: "0 auto"}}><input placeholder="Search all 'Fantom' SYF NFTs..." type="text" className="form-control my-2" onChange={(e) => searchData(e.target.value)} disabled={loaded}></input></div></p>
                    {/* <div align="center">
                        <ReactPaginate
                            pageCount={pageCount}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageChange}
                            forcePage={currentPage-1}
                            containerClassName={'container'}
                            previousLinkClassName={'page'}
                            breakClassName={'page'}
                            nextLinkClassName={'page'}
                            pageClassName={'page'}
                            disabledClassNae={'disabled'}
                            activeClassName={'active'}
                        />
                        </div> */}
                    <ReactPlaceholder type='rect' ready={ready} showLoadingAnimation={true} color='#333' style={{ width: '300px', height: '300px', borderRadius: '15px' }}>                        
                        {images.map((key) => (
                            // return (

                                // (ready === true) ?
                                //     (
                                    
                                    <div key={key.id} className="col-md-2 card bg-light m-3 p-2">    
                                    <LazyLoad height={300}>
                                        <div className="m-2 row" align="center">
                                            <div className="col-6">
                                                <span id={"count"+key.id}>{key.likecount}</span> <i className="fa fa-heart like" id={"like"+key.id}></i>
                                            </div>
                                            <div className="col-6">
                                                <span id={"counti"+key.id}>{key.icecount}</span> <i className="fas fa-gem ice" id={"ice"+key.id}></i>
                                            </div>
                                        </div>                                      
                                        <Link to={{
                                            pathname: `/nft/${key.id}`,
                                            // state: {name: "vikas"}
                                        }}>                                            
                                            <form onSubmit={(event) => {

                                            }}>

                                                <div className="col-auto max-250"> 
                                                <div className="text-secondary idbadge" align="center">ID #{key.id}</div>                                        
                                                {(typeof key.nftData !== 'undefined') ? (

                                                (key.mimeType === "image/jpeg" || key.mimeType === "image/png" || key.mimeType === "image/gif") ? ( 
                                                    <Img alt="NFT" className="token rounded" src={"https://ipfs.sy.finance/ipfs/"+key.nftData} cache style={{background: "#000"}}/>
                                                ) : (key.mimeType === "video/mp4") ? (
                                                    <video alt="NFT" className="token rounded" autoPlay playsInline muted loop controls src={"https://ipfs.sy.finance/ipfs/"+key.nftData} type="video/mp4">
                                                    <source src={"https://ipfs.sy.finance/ipfs/"+key.nftData} type="video/mp4"></source>
                                                    </video>
                                                ) : (key.mimeType === "model/gltf-binary") ? (
                                                    <model-viewer src={"https://ipfs.sy.finance/ipfs/"+key.nftData} alt={key.name} ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls style={{width: "100%", height: "250px"}}></model-viewer> 
                                                ) : ( null )
                                                ) : ( null )
                                                }
                                                    
                                                </div>
                                                <div className="m-2" align="center">{key.name}</div>
                                                {/* <div className="m-2" align="center">{this.state.approved[key] ? ( "Price: " + this.state.imageData_price[key] )
                                                : ( "Not For Sale" )
                                                }
                                                    <img alt="main" className="eth-class" src="../logo.png" />
                                                </div> */}


                                            </form>
                                        </Link>      
                                        </LazyLoad>                                  
                                    </div>
                                    
                        ))}
                        </ReactPlaceholder>
                        
                    </div>
                </div>
            </div>
        )

    }



    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         account: '',
    //         contract: null,
    //         sale_contract: null,
    //         totalSupply: 0,
    //         images: [],
    //         owners: [],
    //         percent: 0,
    //         imageData_name: [],
    //         imageData_nftData: [],
    //         imageData_mimeType: [],
    //         imageData_category: [],
    //         imageData_price: [],
    //         imageData_id: [],
    //         imageData_icecount: [],
    //         imageData_likecount: [],
    //         minted: [],
    //         mintedcollection: '',
    //         selling_to: '',
    //         selling_price: null,
    //         token_sale_contract: null,
    //         token_price: 0,
    //         approved: []

    //     }
    // }
    

    // async componentWillMount() {
    //     await this.loadBlockchainData()
    // }

    async function like(ev, owner, key) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

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

    async function ice(ev, owner, key) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

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


export default Fantom;
import React, { Component } from 'react';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import { create, CID } from 'ipfs-http-client';

import LoadingOverlay from 'react-loading-overlay';

import ReactCanvasConfetti from 'react-canvas-confetti';

import * as imageConversion from 'image-conversion';

import axios from 'axios';

import Web3 from 'web3';

const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
};
  

class Mint extends Component {
    twoCalls = e => {

        console.log(e.target.files[0])

        if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
            var compressmodel = document.getElementById('compressing');
            compressmodel.style.display = 'block';
            // Compress the NFT 512kb if png/jpeg/gif
            imageConversion.compressAccurately(e.target.files[0], 512).then(async res=>{
                //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
                console.log("Compressed", res);
                compressmodel.style.display = 'none';

                this.setState({ new_image: res })

                document.getElementById('fileupload').innerText = e.target.files[0].name;

                var blob = res; // See step 1 above
                var fileReader = new FileReader();
                fileReader.onloadend = function(evt) {
                var arr = (new Uint8Array(evt.target.result)).subarray(0, 4);
                var header = "";
                for(var i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                // console.log(header);
    
                document.getElementById('uplabel').innerText = e.target.files[0].name;
                
                // Check the file signature against known types
                // 676c5446 is glb model (gltf-binary)
    
                if (res.type === 'image/png' || res.type === 'image/jpeg' || res.type === 'image/gif') {
                    var outputmodel = document.getElementById('outputmodel');
                        outputmodel.style.display = 'none';
                        var outputvideo = document.getElementById('outputvideo');
                        outputvideo.style.display = 'none';
                        var output = document.getElementById('output');
                        var div = document.getElementById('wrapperdiv');
                        div.style.display = 'block';
                        output.style.display = 'block';
                        var mainfile = URL.createObjectURL(res);
                        output.src = mainfile;
                    } else if (res.type === 'video/mp4') {
                        var outputmodel = document.getElementById('outputmodel');
                        outputmodel.style.display = 'none';
                        var output = document.getElementById('output');
                        output.style.display = 'none';
                        var outputvideo = document.getElementById('outputvideo');
                        var div = document.getElementById('wrapperdiv');
                        div.style.display = 'block';
                        outputvideo.style.display = 'block';
                        var mainfile = URL.createObjectURL(res);
                        outputvideo.src = mainfile;
                    } else if (header === '676c5446') {
                        var output = document.getElementById('output');
                        output.style.display = 'none';
                        var outputvideo = document.getElementById('outputvideo');
                        outputvideo.style.display = 'none';
                        var outputmodel = document.getElementById('outputmodel');
                        var div = document.getElementById('wrapperdiv');
                        div.style.display = 'block';
                        outputmodel.style.display = 'block';
                    var mainfile = URL.createObjectURL(res);
                    outputmodel.src = mainfile;
                }
                
                };
                fileReader.readAsArrayBuffer(blob);

            });
        } else {
            this.setState({ new_image: e.target.files[0] });
            document.getElementById('fileupload').innerText = e.target.files[0].name;
            var blob = e.target.files[0]; // See step 1 above
            var fileReader = new FileReader();
            fileReader.onloadend = function(evt) {
            var arr = (new Uint8Array(evt.target.result)).subarray(0, 4);
            var header = "";
            for(var i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            // console.log(header);

            document.getElementById('uplabel').innerText = e.target.files[0].name;
            
            // Check the file signature against known types
            // 676c5446 is glb model (gltf-binary)

            if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/gif') {
                var outputmodel = document.getElementById('outputmodel');
                    outputmodel.style.display = 'none';
                    var outputvideo = document.getElementById('outputvideo');
                    outputvideo.style.display = 'none';
                    var output = document.getElementById('output');
                    var div = document.getElementById('wrapperdiv');
                    div.style.display = 'block';
                    output.style.display = 'block';
                    var mainfile = URL.createObjectURL(e.target.files[0]);
                    output.src = mainfile;
                } else if (e.target.files[0].type === 'video/mp4') {
                    var outputmodel = document.getElementById('outputmodel');
                    outputmodel.style.display = 'none';
                    var output = document.getElementById('output');
                    output.style.display = 'none';
                    var outputvideo = document.getElementById('outputvideo');
                    var div = document.getElementById('wrapperdiv');
                    div.style.display = 'block';
                    outputvideo.style.display = 'block';
                    var mainfile = URL.createObjectURL(e.target.files[0]);
                    outputvideo.src = mainfile;
                } else if (header === '676c5446') {
                    var output = document.getElementById('output');
                    output.style.display = 'none';
                    var outputvideo = document.getElementById('outputvideo');
                    outputvideo.style.display = 'none';
                    var outputmodel = document.getElementById('outputmodel');
                    var div = document.getElementById('wrapperdiv');
                    div.style.display = 'block';
                    outputmodel.style.display = 'block';
                var mainfile = URL.createObjectURL(e.target.files[0]);
                outputmodel.src = mainfile;
            }
            
            };
            fileReader.readAsArrayBuffer(blob);
        }

    }
    

    

    render() {


        return (
            <div>
                <LoadingOverlay
                    active={this.state.txpend}
                    spinner
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
                    <h4 className="mb-0 font-weight-normal">Create a Non-Fungible Token</h4>
                </div>
                <div className="container-fluid pt-5 create-mint-adj">
                    <div className="row">
                        {(!this.state.blacklisted) ? 
                        (
                        <div className="col-12 form-wrapper px-3">
                            <div className="form-container">
                                <div className="row">
                                <div className="col-md-6 align-middle my-auto">
                                <p className="text-secondary align-middle my-auto" style={{backgroundColor: "#000", width:"100%", padding: "20px", borderRadius: "15px"}} align="center">Mint a new SYF NFT! The Syfin NFT Minting process only costs gas (a fraction of FTM), you can set a price in SYF to sell your NFT after minting! All NFTs are uploaded to IPFS for decentralization! We support the media formats of <strong>png, jpeg, gif, mp4, and glb</strong>! Your IPFS hash and NFT metadata is stored on the Fantom blockchain. To sell your NFT and list it on the market, after minting you must go to your NFT details under your collection and then do two transactions to approve and list your NFT! JPEGs and PNGs are compressed and optimized for uploading. Max File Size is 50MB.</p>
                                
                                </div>
                                <div className="col-md-6">
                                <h3 className="mb-4" style={{color:"white", marginTop: "0px"}} align="center"><span className="rainbowtxt1">MINT A</span>&nbsp;&nbsp;&nbsp;<span className="rainbowtxt2">SYFIN</span><br /><span className="rainbowtxt3">FANTOM NFT</span></h3>
                                </div>
                                </div>
                                {/* <div align="center" id="wrapperdiv" style={{display: "none"}}><img id="output" className="rounded" width="350px" style={{display: "none"}} align="center" />
                                <model-viewer id="outputmodel" align="center" alt="SYF 3D NFT" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls></model-viewer>
                                <video id="outputvideo" controls="controls" className="rounded" align="center" style={{margin: "0 auto"}} width="350px" height="100%" autoPlay="true" loop="true" muted="true" style={{display: "none"}}>
                                    <source id="outputvideo" type="video/mp4" />
                                </video><br/></div> */}
                                <form className="row text-end" onSubmit={(event) => {
                                    event.preventDefault()
                                    this.mintImage();
                                }}>
                                    <div className="col-md-6">
                                        
                                    
                                    <div className="col-12">
                                    <div id="drop-area">
                                        <h3 align="center" className="text-secondary">DRAG & DROP A FILE TO MINT</h3>
                                        <p align="center" className="text-secondary">png, jpeg, gif, mp4, and glb...</p>
                                    {/* <label className="form-control my-2" id="fileupload">Click here to select media to Syfin to NFT... */}
                                    <input
                                        type='file'
                                        className='form-control my-2'
                                        id='fileupload'
                                        style={{display: 'none'}}
                                        onChange={this.twoCalls}
                                        accept="image/png, image/gif, image/jpeg, video/mp4, model/gtfl-binary"
                                    />
                                    <label className="form-control btn text-light" for="fileupload" id="uplabel">Select a file...</label>
                                    {/* </label> */}
                                    </div>
                                    </div>
                                    <div className="col-12">
                                        <div id="compressing" align="center" style={{color: "#fff", marginTop: "65px", display: "none"}}>Compressing your image, please wait...</div>
                                    <div align="center" id="wrapperdiv" className="watermark" style={{display: "none", padding: "40px"}}><img id="output" className="rounded boxshadow" width="100%" style={{display: "none"}} align="center" />
                                    <model-viewer id="outputmodel" className="rounded boxshadow" align="center" alt="SYF 3D NFT" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls style={{width:"100%", height: "500px"}}></model-viewer>
                                    <video id="outputvideo" controls="controls" className="rounded boxshadow" align="center" style={{margin: "0 auto"}} width="100%" height="100%" autoPlay="true" loop="true" muted="true" style={{display: "none"}}>
                                        <source id="outputvideo" type="video/mp4" />
                                    </video><br/></div>
                                    </div>
                                    </div>
                                    <div className='col-md-6'>
                                    <div className="col-12">
                                    <input
                                        type='text'
                                        className='form-control my-2 mintinputs'
                                        placeholder='Name of NFT'
                                        maxLength='50'
                                        onChange={event => this.setState({ new_name: event.target.value })}
                                    />
                                    </div>
                                    <div className="col-12">
                                    <select value={this.state.value} onChange={event => this.setState({ new_category: event.target.value })}
                                        type='text'
                                        className='form-control my-2 mintinputs'
                                    >
                                        <option value="">Select a Category ↴</option>
                                        <option value='Art'>🎨 Art</option>
                                        <option value='Photography'>📷 Photography</option>
                                        <option value='Metaverse'>👾 Metaverse</option>
                                        <option value='Collectibles'>🏆 Collectibles</option>
                                        <option value='Fantom'>👻 Fantom</option>
                                        <option value='Fantasy'>👹 Fantasy</option>
                                        <option value='Trading Cards'>🃏 Trading Cards</option>
                                        <option value='Anime'>💢 Anime</option>
                                        <option value='Memes'>🙈 Memes</option>
                                        <option value='NSFW'>🚫 NSFW</option>
                                        <option value='Other'>👀 Other</option>
                                    </select>
                                    </div>
                                    <div className="col-12">
                                    <input
                                        type='text'
                                        className='form-control my-2 mintinputs'
                                        placeholder='URL for promotion e.g. (https://syfin.art or https://yourhost.com/metadata.json)'
                                        onChange={event => this.setState({ new_url: event.target.value })}
                                    />
                                    </div>
                                    <div className="col-12">
                                    <textarea
                                        type='text'
                                        className='form-control my-2 mintinputs'
                                        placeholder='Description'
                                        rows="3"
                                        onChange={event => this.setState({ new_des: event.target.value })}
                                    />
                                    </div>
                                    <div className="col-12 text-light" align="center">
                                    
                                    <div className="row" align="center">
                                        <div className="col-md-12" align="center">
                                        <input
                                        name="isAgree"
                                        type="checkbox"
                                        className="checkbox"
                                        checked={this.state.isAgree}
                                        onChange={this.handleInputChange} /></div>
<div className="col-md-12" align="center">
                                        <span style={{marginLeft: "5px"}}>By minting this NFT, You agree it is your own Intellectual property & agree that the content is not illegal or unlawful in any jursidiction.</span>
                                        </div>
</div><span style={{color: "#777"}}>Your IP: {this.state.ipaddy}</span><br />
                                        <div id="progress" style={{color:"white"}} align="center"></div>
                                    </div>
                                    <div className="col-12" align="center">
                                    <input
                                        type='submit'
                                        className='btn btn-block btn-primary my-3 rounded p-3'
                                        value='MINT YOUR NFT!'
                                    />
                                    </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                        ) : <h1 className="text-danger" align="center">You are blacklisted.</h1> }
                    </div>
                </div>
                </LoadingOverlay>
                <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles}/>
            </div>
        )

    }

    constructor(props) {
        super(props)
        this.animationInstance = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            account: '',
            contract: null,
            sale_contract: null,
            isAgree: false,
            totalSupply: 0,
            images: [],
            owners: [],
            imageData_name: [],
            imageData_nftData: [],
            imageData_price: [],
            selling_to: '',
            selling_price: null,
            new_image: new Blob(),
            new_name: '',
            blacklisted: false,
            new_category: '',
            ipaddy: '',
            new_mimetype: '',
            modelmime: '',
            new_des: '',
            new_price: '',
            new_url: '',
            progress: '',
            txpend: false,
            txs: 0
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        if (target.checked === true) {
            this.setState({ isAgree: true });
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

    async componentWillMount() {
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = window.web3

        const web3f = new Web3("https://rpc.ftm.tools/");
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        const abiblack = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"hashAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nftID","type":"uint256"},{"indexed":false,"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"SetBlackListedNFT","type":"event"},{"inputs":[],"name":"AddyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"IDCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"blAddress","type":"address"}],"name":"getBlackListedAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"}],"name":"getBlackListedNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idupdates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addy","type":"address"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"nftID","type":"uint256"},{"internalType":"bool","name":"blacklisted","type":"bool"}],"name":"setBlackListedNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"updates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
        const contractblack = new web3f.eth.Contract(abiblack, "0xfBA3E2C37A8F199c22eF9bD331f09023D2110c98");

        if (this.state.account) {
            const blacklisted = await contractblack.methods.getBlackListedAddress(this.state.account).call();
            this.setState({ blacklisted })
        }

        if (!this.state.blacklisted) {

        let dropArea = document.getElementById('drop-area')

        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)
          })
          
        function preventDefaults (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        ;['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false)
        })
        
        ;['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false)
        })
        
        function highlight(e) {
            dropArea.classList.add('highlight')
        }
        
        function unhighlight(e) {
            dropArea.classList.remove('highlight')
        }

        const getData = async () => {
            const res = await axios.get('https://geolocation-db.com/json/')
            console.log(res.data);
            this.setState({ ipaddy: res.data.IPv4})
        }

        getData();    

        function handleFiles (file) {
            // this.setState({ new_image: file })
            // document.getElementById('fileupload').innerText = file[0].name;

            console.log("Uncompressed", file[0])

            if (file[0].type === 'image/png' || file[0].type === 'image/jpeg') {

                // Display Compressing Text Info
                var compressmodel = document.getElementById('compressing');
                compressmodel.style.display = 'block';

                // Compress the NFT 512kb if png/jpeg/gif
                imageConversion.compressAccurately(file[0], 512).then(async res=>{
                    //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
                    console.log("Compressed", res);

                    compressmodel.style.display = 'none';

                    var blob = res; // See step 1 above

                    // this.state.new_image = file[0];
                    document.getElementById('fileupload').innerText = file[0].name;
                    var fileReader = new FileReader();
                    fileReader.onloadend = function(evt) {
                    var arr = (new Uint8Array(evt.target.result)).subarray(0, 4);
                    var header = "";
                    for(var i = 0; i < arr.length; i++) {
                        header += arr[i].toString(16);
                    }
                    console.log(header);
                    
                    // Check the file signature against known types
                    // 676c5446 is glb model (gltf-binary)

                    if (res.type === 'image/png' || res.type === 'image/jpeg' || res.type === 'image/gif') {
                        var outputmodel = document.getElementById('outputmodel');
                        outputmodel.style.display = 'none';
                        var outputvideo = document.getElementById('outputvideo');
                        outputvideo.style.display = 'none';
                        var output = document.getElementById('output');
                        var div = document.getElementById('wrapperdiv');
                        div.style.display = 'block';
                        output.style.display = 'block';
                        var mainfile = URL.createObjectURL(res);
                        output.src = mainfile;
                    } else if (res.type === 'video/mp4') {
                        var outputmodel = document.getElementById('outputmodel');
                        outputmodel.style.display = 'none';
                        var output = document.getElementById('output');
                        output.style.display = 'none';
                        var outputvideo = document.getElementById('outputvideo');
                        var div = document.getElementById('wrapperdiv');
                        div.style.display = 'block';
                        outputvideo.style.display = 'block';
                        var mainfile = URL.createObjectURL(file[0]);
                        outputvideo.src = mainfile;
                    } else if (header === '676c5446') {
                        var output = document.getElementById('output');
                        output.style.display = 'none';
                        var outputvideo = document.getElementById('outputvideo');
                        outputvideo.style.display = 'none';
                        var outputmodel = document.getElementById('outputmodel');
                        var div = document.getElementById('wrapperdiv');
                        div.style.display = 'block';
                        outputmodel.style.display = 'block';
                        var mainfile = URL.createObjectURL(file[0]);
                        outputmodel.src = mainfile;
                    }
                    
                    };
                    fileReader.readAsArrayBuffer(blob);

                });

        } else {
                // Don't compress it yet for gif, mp4, and glb mime types, work in progress

                var blob = file[0]; // See step 1 above

                // this.state.new_image = file[0];
                document.getElementById('fileupload').innerText = file[0].name;
                var fileReader = new FileReader();
                fileReader.onloadend = function(evt) {
                var arr = (new Uint8Array(evt.target.result)).subarray(0, 4);
                var header = "";
                for(var i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                console.log(header);
                
                // Check the file signature against known types
                // 676c5446 is glb model (gltf-binary)

                if (file[0].type === 'image/png' || file[0].type === 'image/jpeg' || file[0].type === 'image/gif') {
                    var outputmodel = document.getElementById('outputmodel');
                    outputmodel.style.display = 'none';
                    var outputvideo = document.getElementById('outputvideo');
                    outputvideo.style.display = 'none';
                    var output = document.getElementById('output');
                    var div = document.getElementById('wrapperdiv');
                    div.style.display = 'block';
                    output.style.display = 'block';
                    var mainfile = URL.createObjectURL(file[0]);
                    output.src = mainfile;
                } else if (file[0].type === 'video/mp4') {
                    var outputmodel = document.getElementById('outputmodel');
                    outputmodel.style.display = 'none';
                    var output = document.getElementById('output');
                    output.style.display = 'none';
                    var outputvideo = document.getElementById('outputvideo');
                    var div = document.getElementById('wrapperdiv');
                    div.style.display = 'block';
                    outputvideo.style.display = 'block';
                    var mainfile = URL.createObjectURL(file[0]);
                    outputvideo.src = mainfile;
                } else if (header === '676c5446') {
                    var output = document.getElementById('output');
                    output.style.display = 'none';
                    var outputvideo = document.getElementById('outputvideo');
                    outputvideo.style.display = 'none';
                    var outputmodel = document.getElementById('outputmodel');
                    var div = document.getElementById('wrapperdiv');
                    div.style.display = 'block';
                    outputmodel.style.display = 'block';
                    var mainfile = URL.createObjectURL(file[0]);
                    outputmodel.src = mainfile;
                }
                
                };
                fileReader.readAsArrayBuffer(blob);
        }

        }
        

        const handleDrop = (e) => {
            let dt = e.dataTransfer
            let files = dt.files
            if (files[0].type === 'image/png' || files[0].type === 'image/jpeg') {
                // Compress the NFT
                imageConversion.compressAccurately(files[0], 512).then(async res=>{
                    console.log("Compressed", res);
                    this.setState({ new_image: res });
                });
            } else {
                this.setState({ new_image: files[0] });
            }

            handleFiles(files)
        }

        dropArea.addEventListener('drop', handleDrop, false)

        const networkId = await web3.eth.net.getId()
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

            this.setState({ new_price: 50000000 }) // Default SYF Price on fresh mints

            // Load NFTs
            for (var i = 1; i <= totalSupply; i++) {
                const id = await contract.methods.images(i - 1).call()
                // console.log(id)
                this.setState({
                    images: [...this.state.images, id]
                })
            }
            // Load Owner
            for (i = 1; i <= totalSupply; i++) {
                const owner = await contract.methods.ownerOf(i - 1).call()
                // console.log(owner)
                this.setState({
                    owners: [...this.state.owners, owner]
                })
            }
            // Load NFTs Data 
            for (i = 1; i <= totalSupply; i++) {
                const metadata = await contract.methods.imageData(i - 1).call()
                // console.log(metadata)
                this.setState({
                    imageData_name: [...this.state.imageData_name, metadata.name],
                    imageData_nftData: [...this.state.imageData_nftData, metadata.nftData],
                    imageData_price: [...this.state.imageData_price, metadata.price]
                })
            }

        } else {
            // window.alert('Smart contract not deployed to detected network.')
        }


        const sale_networkData = SyfinNFTSale.networks[networkId]
        if (sale_networkData) {
            const sale_abi = SyfinNFTSale.abi
            const sale_address = sale_networkData.address
            const sale_contract = new web3.eth.Contract(sale_abi, sale_address)
            console.log(sale_contract)
            this.setState({ sale_contract })

        } else {
            // window.alert('Smart contract not deployed to detected network.')
        }

    }

    }

    

    mintImage = () => {
        let file = '';
        let mimetype = '';
        let hash = '';

        // window.Buffer = buffer.Buffer;

        this.setState({ txpend: true })
        this.setState({ txs: 1 })

        //IPFS
        var ipfs = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https'
        });

        this.getBase64(this.state.new_image, async (result) => {
            file = result; // Buffer of Image for IPFS
            mimetype = this.state.new_image.type;

            // 2 MB Max File Size Limit
            if (file.size > 2000000) {
                alert('Image size is too large');
                this.setState({ txpend: false });
                this.setState({ txs: 0 });
                return;
            }

            var arr = (new Uint8Array(file)).subarray(0, 4);
            var header = "";
            for(var i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            console.log(header);

            if (header === '676c5446') {
                mimetype = 'model/gltf-binary';
            }
            console.log(mimetype);

            console.log(this.state.new_url);

            if (file === null || file === '' || typeof file === 'undefined') {
                // Do nothing if Buffer is empty or null
                return;

            } else if (this.state.new_url === '' || this.state.new_des === '' || this.state.new_name === '' || this.state.new_category === '' || this.state.new_price === '') {
                alert('Please fill in all fields!');
                this.setState({ txpend: false })
                this.setState({ txs: 0 })
                return;
            } else if (this.state.isAgree === false) {
                alert('Please check the box to agree that the NFT is your IP!');
                this.setState({ txpend: false })
                this.setState({ txs: 0 })
                return;
            } else {

                function progressCall (data) {
                    var totalsize = file.length;
            
                    //console.log(totalsize);                    
            
                    document.getElementById("progress").innerHTML = "Preparing and Uploading NFT to IPFS <strong>"+(data / 1000000).toFixed(2)+" MB</strong> out of <strong>"+(totalsize / 1000000).toFixed(2)+" MB</strong>";
            
                    // console.log('uploaded progress: ' + data);
                }               

                const results = await ipfs.add([{
                    path: 'syfin',
                    content: file,
                }], {
                    recursive: true,
                    progress: progressCall
                })


                console.log(results);
                hash = results.cid.toString();
                console.log(hash);

                console.log(this.state.new_category);

                fetch('https://ipfs.infura.io:5001/api/v0/pin/add?arg=/ipfs/'+hash, { credentials: 'omit' })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        if (hash != null && typeof hash != 'undefined') {

                            this.state.contract.methods.mint(
                                this.state.new_name,
                                mimetype,
                                hash,                
                                this.state.new_category,
                                this.state.new_des,
                                this.state.new_url,
                                this.state.new_price
                            ).send({ from: this.state.account })
                                .once('receipt', (receipt) => {
                                    // console.log(receipt);
                                    // console.log(receipt.events.Transfer.returnValues.tokenId);
                                    const tokenId = receipt.events.Transfer.returnValues.tokenId;
                                    console.log("NFT Created!");
                                    document.getElementById("progress").innerHTML = "<strong>Successfully minted your new NFT!<br /><a href='https://syfin.art/nft/"+tokenId+"' style='color:#89b9ff;text-decoration: none;'>Go to your new NFT #"+tokenId+"</a> to list it for sale!</strong>";
                                    this.setState({ txpend: false })
                                    this.setState({ txs: 0 })
                                    this.handlerFire();
                                }).catch((error) => {
                                    console.error('Error:', error);
                                    this.setState({ txpend: false })
                                    this.setState({ txs: 0 })
                                });
                            }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        this.setState({ txpend: false })
                        this.setState({ txs: 0 })
                    });

                // localStorage.setItem(this.state.new_name, hash);
            }
            
        });
    }

    getBase64(file, cb) {
        let reader = new FileReader();

        reader.onload = function () {
            let buf = new Buffer(reader.result);
            cb(buf)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        reader.onloadend = function(evt) {
            
                var arr = (new Uint8Array(evt.target.result)).subarray(0, 4);
                var header = "";
                for(var i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
                console.log(header);

                if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'video/mp4' && header != '676c5446') {
                    cb(null);
                    alert("You can only currently mint a NFT that is a png, jpeg, gif, mp4, or glb!");
                    window.location.reload();
                    return;
                }
                if (header === '676c5446') {
                    // setState of modelmime
                }

                function getMimetype(signature) {
                    switch (signature) {
                        case '89504E47':
                            return 'image/png'
                        case '47494638':
                            return 'image/gif'
                        case '25504446':
                            return 'application/pdf'
                        case 'FFD8FFDB':
                        case 'FFD8FFE0':
                            return 'image/jpeg'
                        case '6674797069736F6D':
                            return 'video/mp4'
                        case '676c5446':
                            return 'model/gltf-binary'
                        case '504B0304':
                            return 'application/zip'
                        default:
                            return 'Unknown filetype'
                    }
                }

                // const mimetype = getMimetype(hex);
                // console.log(file.type);
                // uploads.push({
                //     filename: file.name,
                //     filetype: file.type ? file.type : 'Unknown/Extension missing',
                //     binaryFileType: getMimetype(hex),
                //     hex: hex
                // })
            
        }
        reader.readAsArrayBuffer(file);
    }

}
export default Mint;
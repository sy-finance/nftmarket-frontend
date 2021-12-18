import React, { Component } from 'react';
import SyfinNFT from '../../abis/SyfinNFT.json';
import SyfinNFTSale from '../../abis/SyfinNFTSale.json';
import SyfinAvatars from '../../abis/SyfinAvatars.json';
import SyfinVerified from '../../abis/SyfinVerified.json';

import Web3 from 'web3';
import { create, CID } from 'ipfs-http-client';

import Jazzicon, { jsNumberForAddress }  from 'react-jazzicon'

class EditProfile extends Component {
    twoCalls = e => {
        this.setState({ new_image: e.target.files[0] })
        document.getElementById('fileupload').innerText = e.target.files[0].name;

        console.log(e.target.files[0])

        var blob = e.target.files[0]; // See step 1 above
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

          if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/gif') {
            var output = document.getElementById('output');
            var div = document.getElementById('wrapperdiv');
            div.style.display = 'block';
            output.style.display = 'block';
            var mainfile = URL.createObjectURL(e.target.files[0]);
            output.src = mainfile;
        } else if (e.target.files[0].type === 'video/mp4') {
            var outputvideo = document.getElementById('outputvideo');
            var div = document.getElementById('wrapperdiv');
            div.style.display = 'block';
            outputvideo.style.display = 'block';
            var mainfile = URL.createObjectURL(e.target.files[0]);
            outputvideo.src = mainfile;
        } else if (header === '676c5446') {
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

    render() {


        return (
            <div>
                <div className="head-title col-auto mx-4">
                    <h4 className="mb-0 font-weight-normal">Edit Profile</h4>
                </div>
                <div className="container-fluid pt-5 create-mint-adj">
                    <div className="row">
                        <div className="col-12 form-wrapper px-3">
                            <div className="form-container">
                                <h3 className="mb-4" style={{color:"white"}}>Update your profile on Fantom!</h3>
                                <div align="center">
                                {(this.state.ipfs !== "" && (this.state.mim === "image/jpeg" || this.state.mim === "image/png" || this.state.mim === "image/gif")) ?
                                (<div style={{position: "relative", width: "125px"}}><img src={"https://ipfs.sy.finance/ipfs/"+this.state.ipfs} alt="" border="0" height="125px" style={{borderRadius: "50%"}} />
                                {(this.state.verified === true) ? (
                                    <div style={{position: "absolute", bottom: "5px", right: "5px"}}><svg width="26" height="26" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                ) : null
                                }                                
                                </div>) :
                                (<div style={{position: "relative", width: "125px"}}><Jazzicon diameter={100} seed={jsNumberForAddress(this.state.account)} />
                                {(this.state.verified === true) ? (
                                    <div style={{position: "absolute", bottom: "5px", right: "5px"}}><svg width="26" height="26" viewBox="0 0 12 12" fill="#4E78FF" xmlns="http://www.w3.org/2000/svg"><path d="M4.78117 0.743103C5.29164 -0.247701 6.70826 -0.247701 7.21872 0.743103C7.52545 1.33846 8.21742 1.62509 8.8553 1.42099C9.91685 1.08134 10.9186 2.08304 10.5789 3.1446C10.3748 3.78247 10.6614 4.47445 11.2568 4.78117C12.2476 5.29164 12.2476 6.70826 11.2568 7.21872C10.6614 7.52545 10.3748 8.21742 10.5789 8.8553C10.9186 9.91685 9.91685 10.9186 8.8553 10.5789C8.21742 10.3748 7.52545 10.6614 7.21872 11.2568C6.70826 12.2476 5.29164 12.2476 4.78117 11.2568C4.47445 10.6614 3.78247 10.3748 3.1446 10.5789C2.08304 10.9186 1.08134 9.91685 1.42099 8.8553C1.62509 8.21742 1.33846 7.52545 0.743103 7.21872C-0.247701 6.70826 -0.247701 5.29164 0.743103 4.78117C1.33846 4.47445 1.62509 3.78247 1.42099 3.1446C1.08134 2.08304 2.08304 1.08134 3.1446 1.42099C3.78247 1.62509 4.47445 1.33846 4.78117 0.743103Z" fill="#FFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.43961 4.23998C8.64623 4.43922 8.65221 4.76823 8.45297 4.97484L5.40604 8.13462L3.54703 6.20676C3.34779 6.00014 3.35377 5.67113 3.56039 5.47189C3.76701 5.27266 4.09602 5.27864 4.29526 5.48525L5.40604 6.63718L7.70475 4.25334C7.90398 4.04672 8.23299 4.04074 8.43961 4.23998Z" fill="#000"></path></svg></div>
                                ) : null
                                }
                                </div>)}
                                </div>
                                <br />
                                <p className="text-secondary">This is where you can upload a new avatar for your Fantom address profile on the Fantom blockchain through this form. All avatar data is stored on IPFS and the Fantom blockchain with our SYF Avatar Contract. This will create one transaction, costs minimal gas, with no extra fee to update your avatar.</p>
                                <div align="center" id="wrapperdiv" style={{display: "none"}}><img id="output" className="rounded" width="350px" style={{display: "none"}} align="center" />                               
                                <video id="outputvideo" controls="controls" className="rounded" align="center" style={{margin: "0 auto"}} width="350px" height="100%" autoPlay="true" loop="true" muted="true" style={{display: "none"}}>
                                    <source id="outputvideo" type="video/mp4" />
                                </video><br/></div>
                                <form className="row text-end" onSubmit={(event) => {
                                    event.preventDefault()
                                    this.mintImage();
                                }}>
                                    <div className="col-6">
                                    <label className="form-control my-2" id="fileupload">Click here to select media to Syfin to Avatar...
                                    <input
                                        type='file'
                                        className='form-control my-2'
                                        id='fileupload'
                                        style={{display: 'none'}}
                                        onChange={this.twoCalls}
                                        accept="image/png, image/gif, image/jpeg"
                                    />
                                    </label>
                                    </div>
                                    <div className="col-6">
                                    <input
                                        type='text'
                                        className='form-control my-2'
                                        placeholder={this.state.name === "" ? "Name" : this.state.name}
                                        onChange={event => this.setState({ new_name: event.target.value })}
                                    />
                                    </div>
                                    <div className="col-12">
                                    <textarea
                                        type='text'
                                        className='form-control my-2'
                                        placeholder={this.state.bio === "" ? "Biography of Profile" : this.state.bio}
                                        rows="3"
                                        onChange={event => this.setState({ new_des: event.target.value })}
                                    />
                                    </div>
                                    <div className="col-12">
                                        <div id="progress" style={{color:"white"}} align="center"></div>
                                    </div>
                                    <div className="col-12">
                                    <input
                                        type='submit'
                                        className='btn btn-block btn-primary my-3 rounded'
                                        value='Update your Profile!'
                                    />
                                    </div>
                                </form>
                            </div>
                        </div>
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
            imageData_price: [],
            selling_to: '',
            selling_price: null,
            new_image: new Blob(),
            new_name: '',
            new_category: '',
            new_mimetype: '',
            modelmime: '',
            new_des: '',
            new_price: '',
            new_url: '',
            ipfs: '',
            mim: '',
            name: '',
            bio: '',
            verified: false
        }
    }

    async componentWillMount() {
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        // const web3ftm = new Web3("https://rpcapi.fantom.network/");

        const abi = SyfinAvatars.abi
        const address = "0x2a4e02D729924eCe6A3292F9Ba8e1B0B32d7850F"
        const contractava = new web3.eth.Contract(abi, address)
        // console.log(contract)
        this.setState({ contractava })
        const getIPFS = await contractava.methods.getIPFSHash(this.state.account).call()
        console.log(getIPFS)
        const getMIME = await contractava.methods.getMIMEType(this.state.account).call()
        console.log(getMIME)
        const getName = await contractava.methods.getName(this.state.account).call()
        console.log(getName)
        const getBio = await contractava.methods.getBio(this.state.account).call()
        console.log(getBio)
        this.setState({ ipfs: getIPFS })
        this.setState({ mim: getMIME })
        this.setState({ name: getName })
        this.setState({ bio: getBio })

        const abiv = SyfinVerified.abi
        const addv = "0x6986aF780e5E14f82D21F2D47F64c8C7b7cc07F9"
        const contractv = new web3.eth.Contract(abiv, addv)
        // console.log(contract)
        this.setState({ contractv })

        const getOwnerVerified = await contractv.methods.getVerified(this.state.account).call()

        this.setState({ verified: getOwnerVerified })


    }

    mintImage = () => {
        let file = '';
        let mimetype = '';
        let hash = '';

        // window.Buffer = buffer.Buffer;

        //IPFS
        var ipfs = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https'
        });

        this.getBase64(this.state.new_image, async (result) => {
            file = result; // Buffer of Image for IPFS
            mimetype = this.state.new_image.type;

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

            if (file == null || file == '' || typeof file == 'undefined') {
                // Do nothing if Buffer is empty or null
                return;

            } else if (this.state.new_des == '' || this.state.new_name == '') {
                alert('Please fill in all fields!');
                return;
            } else {

                function progressCall(data) {
                    var totalsize = file.length;
            
                    //console.log(totalsize);
            
                    document.getElementById("progress").innerHTML = "Preparing and Uploading NFT to IPFS <strong>"+(data / 1000000).toFixed(2)+" MB</strong> out of <strong>"+(totalsize / 1000000).toFixed(2)+" MB</strong>";
            
                    //console.log('uploaded progress: ' + data);
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

                fetch('https://ipfs.infura.io:5001/api/v0/pin/add?arg=/ipfs/'+hash, { credentials: 'omit' })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        if (hash != null && typeof hash != 'undefined') {

                            this.state.contractava.methods.setAvatar(
                                hash,
                                mimetype,
                                this.state.new_name,
                                this.state.new_des
                            ).send({ from: this.state.account })
                                .once('receipt', (receipt) => {
                                    console.log("Avatar Updated!");
                                    document.getElementById("progress").innerHTML = "Successfully updated your Avatar! Go to your profile!";
                                });
                            }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                if (hash != null && typeof hash != 'undefined') {

                // this.state.contract.methods.mint(
                //     this.state.new_name,
                //     mimetype,
                //     hash,                
                //     this.state.new_category,
                //     this.state.new_des,
                //     this.state.new_url,
                //     this.state.new_price
                // ).send({ from: this.state.account })
                //     .once('receipt', (receipt) => {
                //         console.log("NFT Created!");
                //     });
                }

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

                if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/gif') {
                    cb(null);
                    alert("You can only currently upload an avatar that is a png, jpeg, or gif!");
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
export default EditProfile;
import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom";

import Home from './home/home';
import Explore from './explore/explore';
import Mint from './mint/mint';
import NftDetail from './nft-detail/nft-detail';
import MyCollection from './my-collection/my-collection';
import Collection from './collection/collection';
import NavbarMain from './navbar/navbar'; 
import EditProfile from './editprofile/editprofile';
import Oldest from './oldest/oldest';
import Stake from './stake/stake';
import All from './all/all';

import Art from './categories/art';
import Photography from './categories/photography';
import Metaverse from './categories/metaverse';
import Collectibles from './categories/collectibles';
import Fantom from './categories/fantom';
import Fantasy from './categories/fantasy';
import Cards from './categories/cards';
import Anime from './categories/anime';
import Memes from './categories/memes';
import NSFW from './categories/nsfw';
import Other from './categories/other';
import Gifted from './explore/gifted';
import Purchased from './explore/purchased';
import Minted from './explore/minted';
import NotFoundPage from './NotFoundPage.js';
import Landing from './landing/landing';

import Gantom from './gantom/gantom';
import Fantums from './fantums/fantums';


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      window.loaded_web3 = true
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      window.loaded_web3 = true
    }
    else {
      // window.alert('Non-Fantom browser detected. You should consider trying MetaMask!')
    }
  }

  render() {

    return (
      <div>

        <Router>
            <NavbarMain />
          <div className="container">
            <div>
              <Switch>
                <Route exact path="/">
                  <Landing />
                </Route>

                <Route path="/explore">
                  <Home />
                </Route>
                <Route path="/search">
                  <All />
                </Route>
                <Route path="/forsale">
                  <Explore />
                </Route>
                <Route path="/categories/art">
                  <Art />
                </Route>
                <Route path="/categories/photography">
                  <Photography />
                </Route>
                <Route path="/categories/metaverse">
                  <Metaverse />
                </Route>
                <Route path="/categories/collectibles">
                  <Collectibles />
                </Route>
                <Route path="/categories/fantom">
                  <Fantom />
                </Route>
                <Route path="/categories/fantasy">
                  <Fantasy />
                </Route>
                <Route path="/categories/cards">
                  <Cards />
                </Route>
                <Route path="/categories/anime">
                  <Anime />
                </Route>
                <Route path="/categories/memes">
                  <Memes />
                </Route>
                <Route path="/categories/nsfw">
                  <NSFW />
                </Route>
                <Route path="/categories/other">
                  <Other />
                </Route>
                <Route path="/categories/gifted">
                  <Gifted />
                </Route>
                <Route path="/categories/purchased">
                  <Purchased />
                </Route>
                <Route path="/categories/minted">
                  <Minted />
                </Route>
                <Route path="/stake">
                  <Stake />
                </Route>
                <Route path="/oldest">
                  <Oldest />
                </Route>
                <Route path="/mint">
                  <Mint />
                </Route>
                <Route path="/gs/:id">
                  <Gantom />
                </Route>

                <Route path="/fum/:id">
                  <Fantums />
                </Route>

                <Route path="/collection/:owner">
                  <Collection />
                </Route>
                <Route path="/my-collection">
                  <MyCollection />
                </Route>
                <Route path="/editprofile">
                  <EditProfile />
                </Route>
                <Route path="/nft/:name">
                  <NftDetail />
                </Route>
                <Route path="/nft-detail/:name">
                  <NftDetail />
                </Route>
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </Router>

        <footer id="mainfoot" className="mainfoot page-footer bg-light rounded footer-adj" style={{display: "block"}}>
          <br />
          <p className="text-center"><img src="/logo.png" border="0" height="100px" /><br /><br />Syfin ERC721 NFT Market on the Fantom Blockchain<br /><span style={{fontSize: "13px"}}>Alpha Version v1.4.2</span></p>
          <p className="text-center text-light foottxt">
            <a href="https://sy.finance" target="_blank">HOME</a> • <a href="https://app.sy.finance" target="_blank">SYF DAPP</a> • <a href="https://twitter.com/syfinance" target="_blank">TWITTER</a> • <a href="https://discord.gg/kq63ZWAJzz" target="_blank">DISCORD</a> • <a href="https://t.me/fantomsyfin" target="_blank">TELEGRAM</a> • <a href="https://syfinance.gitbook.io/sy-finance/" target="_blank">DOCS</a>
            </p>
        </footer>
      </div>
    );
  }
}

export default App;
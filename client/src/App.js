import React, { Component } from "react";
import SimpleStorageContract from "./contracts/LinkShortner.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, loading: true };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const id = window.location.search.replace("?", "")
      if(id.length > 0){
        instance.methods.getLink(id).call().then((response) => {
          if(response[1].includes('http')){
            window.location = response[1]
          }else{
            window.location = "http://" + response[1]
          }
        })
      }else{
        this.setState({loading: false})
      }

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.listenEvent);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  submit = () => {
    const { accounts, contract } = this.state;
    contract.methods.createNewLink(this.state.url).send({ from: accounts[0] })
  }

  updateUrl = (e) => {
    this.setState({url: e.target.value})
  }

  listenEvent = async () => {
    const { contract } = this.state;
    const _this = this
    contract.events.LinkAdded({}, function(){
      contract.methods.getLastLink().call().then((response) => {
        _this.setState({short_url: window.location.href + '?' + response[2].toNumber()})
      })
    })


  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        {
          !this.state.loading &&
          <>
            <h1>Link Shortner</h1>
            <p>Build on Blockchain using Smart Contract.</p>
            <h3>Enter Url</h3>
            <p>
              <input name="url" val={this.state.url} onChange={this.updateUrl} className="input_style"/>
            </p>
            <button onClick={this.submit} className="submit_style">Submit</button>
            {
              this.state.short_url &&
              <p>
                Short url is <a href={this.state.short_url} rel="noopener noreferrer" target="_blank" > {this.state.short_url} </a>
              </p>
            }

          </>
        }
      </div>
    );
  }
}

export default App;

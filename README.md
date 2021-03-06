### Link Shortner

Gives you short link for long url, it is build upon blockchain therefore does not depend on central server.

### How to create short url

1. Install Metamask chrome extension
2. Create account on metamask, change network to Ropsten Test Network.
3. Get free ether from https://faucet.metamask.io/
4. Visit https://anilmaurya.github.io/link-shortner/

![Demo](clip.gif)
### Share short link

Short link created can be shared with everyone without any dependencies on metamask.
For example: https://anilmaurya.github.io/link-shortner/?12

## Installation

1. Clone this Repository
   ```js
   git clone git@github.com:anilmaurya/link-shortner.git
   ```

2. Run the development console.
    ```javascript
    truffle develop
    ```

3. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

4. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm run start
    ```

5. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```

6. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run test
    ```

7. To build the application for production, use the build script. A production build will be in the `client/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```

8. Deploying contract on Ropsten network
  ```
  truffle migrate --network ropsten
  ```

## Deployment

1. Deploy client App on github
    ```
    cd client
    npm run deploy
    ```
2. Deploy Api for reading contract on heroku
   ```
   heroku create
   heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack
   heroku buildpacks:add heroku/ruby
   heroku config:set PROJECT_PATH=backend
   git push heroku master
   ```

## FAQ

* __How do I use this with the Ganache-CLI?__

    It's as easy as modifying the config file! [Check out our documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks). Depending on the port you're using, you'll also need to update line 29 of `client/src/utils/getWeb3.js`.

* __Where is my production build?__

    The production build will be in the `client/build` folder after running `npm run build` in the `client` folder.

* __Where can I find more documentation?__

    This box is a marriage of [Truffle](http://truffleframework.com/) and a React setup created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start!

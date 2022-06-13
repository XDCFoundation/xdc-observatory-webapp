# XDC Observatory Webapp #

The [XDC Observatory](https://observer.xdc.org/) is a feature-rich block explorer and analytics platform for the XDC Network.

XDC Observatory is a decentralized block watcher to view transactions, blocks, smart contracts, wallet addresses and other on-chain information
of XDC Network in real-time. Beyond basic functionalities, the platform provides advanced features like analytics, sorting and filtering. Accessible
as a web application, it’s a completely free platform compatible with all devices and operating systems

### Usage ###

This Webapp basically handle all operations related Observatory -
* User Login/Logout
* Latest Transactions / Transaction Details
* Account Details
* Latest Blocks / Block Details  
* Block Height
* Address Details
* Token List / Details
* Contract List / Details
* Watchlist / Private note / Tag Address   
* etc.

### Steps for local setup ###

* Clone the repository in your local system
* Run `npm install` : To install the dependencies
* Run `npm start` : It will start your server on your local machine
* src : `src` directory contains all the components modules    
* Dependencies : Defined under `package.json` 
* Deployment instructions : Docker based deployment, Dockerfile is there in parent directory

### About env files ###

This folder is having different type of variable like DB url, PORT, microservice url etc.
* **env.mainnetprod** : it have all variable which is use for mainnet production environment. 
* **env.apothem** : it have all variable which is use for apothem environment.
* **env.mainnetdev** : it have all variable which is use for mainnet development environment. 


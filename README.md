## Land Registry dApp on Stellar

A decentralized application (dApp) built on the Stellar blockchain designed to modernize and secure property registration. Users can utilize this platform to anonymously and securely register land/property with a specific area and location, and later search for and fetch those property details on-chain.

![Land Registry dApp Demo](https://drive.google.com/file/d/1iRnMZzfByjy9DhHI--L_EDjdaOKmfguf/view?usp=drive_link)

---

## Features
- **Register Property**: Input a location and area size (sq meters) and submit a secure transaction on the Stellar testnet to capture and lock property data to your Freighter wallet address.
- **Fetch Property**: Query the blockchain by an ID to retrieve verified information about the land, its location, area size, and its recorded owner.
- **Dark Mode Support**: Comes tightly integrated with a modern Tailwind day/night styling interface.
- **Sleek UX**: Provides a lively and interactive user interface to guide users globally.

---

## Technologies Used:
- **Smart Contract** : Rust, Soroban-SDK
- **Wallet Auth** : Freighter (Available as a Chrome Extension)
- **Frontend** : ReactJS, TailwindCSS
- **Integration Layer** : Stellar-SDK

---

## Project Setup Guide:

### Requirements
You will need to have the following installed on your machine:
1. **Node.js** (v18+)
2. **Rust**
3. **Stellar-CLI**
4. **Freighter Wallet** Extension (in your browser, initialized with the Testnet).

### 1. Clone & Install
Clone the repository to your local machine:
```bash
git clone https://github.com/SudiptaSanki/Stellar-project.git
cd "Stellar-project"
npm install
```

### 2. Smart Contract Initialization (Optional)
If you wish to compile and deploy your own contract:
1. Ensure `stellar-cli` is installed `cargo install --locked stellar-cli`.
2. Navigate into the smart contract directory: `cd LandRegistrySmartContract/contracts/hello-world`
3. Run the build command: `stellar contract build`
4. Deploy to Testnet and take note of the output **Contract ID**.
5. Go into `src/components/LandRegistryService.js` and paste your deployed Contract ID at line `18`.

### 3. Run the Frontend Dashboard
Navigate back to the main directory and run the frontend interface:
```bash
npm start
```
Go to `https://localhost:3000` to interact with your secure decentralized land registry!

# Land Registry Smart Contract

This is the Soroban smart contract for the Land Registry dApp.

## Setup & Deployment Guide

1. Generate your account keys:
```bash
stellar keys generate alice
```

2. See your public key:
```bash
stellar keys address alice
```

3. Fund your account with testnet XLM via the [Testnet Faucet](https://laboratory.stellar.org/#account-creator?network=test).

4. Install the CLI & Run the build command:
```bash
cargo install --locked stellar-cli
make build
```
Or running without make:
```bash
stellar contract build
```

5. Deploy the compiled web assembly payload to the testnet:
```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/hello_world.wasm \
  --source alice \
  --network testnet
```

Take note of the smart contract ID provided to update your Frontend configuration!

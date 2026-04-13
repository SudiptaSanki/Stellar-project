import {
  Contract,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
  scValToNative,
  rpc as StellarRpc,
} from "@stellar/stellar-sdk";

import { userSignTransaction } from "./Freighter";

/* ================= Config ================= */
const RPC_URL = "https://soroban-testnet.stellar.org:443";
const NETWORK = Networks.TESTNET;
const CONTRACT_ADDRESS = "CBK6DMOHM7I7G3IDNQS7JAJOCJ4XVO5SLXP6KHQAWNVTKW5YHETSE5UA"; // Update once deployed!

const server = new StellarRpc.Server(RPC_URL);
const TX_PARAMS = {
  fee: BASE_FEE,
  networkPassphrase: NETWORK,
};

/* ================= Helpers ================= */
const stringToScVal = (value) => nativeToScVal(value);
const numberToU64 = (value) => nativeToScVal(value, { type: "u64" });
const addressToScVal = (address) => nativeToScVal(address, { type: "address" });

/* ================= Core Contract Interaction ================= */
async function contractInt(caller, fnName, values) {
  const sourceAccount = await server.getAccount(caller);
  const contract = new Contract(CONTRACT_ADDRESS);

  const builder = new TransactionBuilder(sourceAccount, TX_PARAMS);

  if (Array.isArray(values)) {
    builder.addOperation(contract.call(fnName, ...values));
  } else if (values !== undefined && values !== null) {
    builder.addOperation(contract.call(fnName, values));
  } else {
    builder.addOperation(contract.call(fnName));
  }

  const tx = builder.setTimeout(30).build();

  const preparedTx = await server.prepareTransaction(tx);
  const xdr = preparedTx.toXDR();
  const signed = await userSignTransaction(xdr, caller);

  const signedTx = TransactionBuilder.fromXDR(signed.signedTxXdr, NETWORK);
  const send = await server.sendTransaction(signedTx);

  for (let i = 0; i < 10; i++) {
    const res = await server.getTransaction(send.hash);
    if (res.status === "SUCCESS") {
      if (res.returnValue) {
        return scValToNative(res.returnValue);
      }
      return null;
    }
    if (res.status === "FAILED") {
      throw new Error("Transaction failed");
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  throw new Error("Transaction timeout");
}

/* ================= Contract Functions ================= */
async function registerProperty(caller, location, area) {
  try {
    const callerAddressVal = addressToScVal(caller);
    const locationVal = stringToScVal(location);
    const areaVal = numberToU64(area);

    const result = await contractInt(caller, "register_property", [
      callerAddressVal,
      locationVal,
      areaVal,
    ]);

    console.log("Property ID:", Number(result));
    return Number(result);
  } catch (error) {
    console.error("registerProperty failed:", error);
    throw error;
  }
}

async function fetchProperty(caller, propId) {
  try {
    const value = numberToU64(propId);
    const result = await contractInt(caller, "fetch_property", value);
    return {
      prop_id: Number(result.prop_id),
      owner: result.owner,
      location: result.location.toString(),
      area: Number(result.area),
    };
  } catch (error) {
    console.error("fetchProperty failed:", error);
    throw error;
  }
}

export { registerProperty, fetchProperty };

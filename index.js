import bls from "@chainsafe/bls/blst-native";
import { ethers } from "ethers";
import { randomBytes } from "crypto";
import * as crypto from "libp2p-crypto";
import * as Peer from "@libp2p/peer-id";

const myRandomBytes = await randomBytes(32);
const myWallet = new ethers.Wallet(myRandomBytes);
console.log(
  `Account Private Key: 0x${Buffer.from(myRandomBytes).toString("hex")}`
);
console.log(`Account Public Address: ${myWallet.address}`);

const libp2p = await crypto.keys.generateKeyPair("secp256k1", 256);
console.log(`LibP2P Private: 0x${Buffer.from(libp2p.bytes).toString("hex")}`);
console.log(
  `LibP2P Public: 0x${Buffer.from(libp2p.public.bytes).toString("hex")}`
);
const id = await Peer.peerIdFromKeys(libp2p.public.bytes);
console.log(`Node ID: ${id}`);

const secretKeyBLS = await bls.SecretKey.fromKeygen(myRandomBytes);
const sk = secretKeyBLS.toBytes();
const pk = bls.secretKeyToPublicKey(sk);

console.log(`BLS Private: 0x${Buffer.from(sk).toString("hex")}`);
console.log(`BLS Public: 0x${Buffer.from(pk).toString("hex")}`);

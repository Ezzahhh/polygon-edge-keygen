import bls from "@chainsafe/bls/blst-native";
import { ethers } from "ethers";
import { randomBytes } from "crypto";
import * as crypto from "libp2p-crypto";
import * as Peer from "@libp2p/peer-id";

const myRandomBytes = randomBytes(32);
const myWallet = new ethers.Wallet(myRandomBytes);
const accountPrivKey = Buffer.from(myRandomBytes).toString("hex");
const accountAddress = myWallet.address;

console.log(`Account Private Key: 0x${accountPrivKey}`);
console.log(`Account Public Address: ${accountAddress}`);

const libp2p = await crypto.keys.generateKeyPair("secp256k1", 256);
const libp2pPrivKey = Buffer.from(libp2p.bytes).toString("hex");
const libp2pPubKey = Buffer.from(libp2p.public.bytes).toString("hex");
console.log(`LibP2P Private: 0x${libp2pPrivKey}`);
console.log(`LibP2P Public: 0x${libp2pPubKey}`);

const id = await Peer.peerIdFromKeys(libp2p.public.bytes);
console.log(`Node ID: ${id}`);

const secretKeyBLS = bls.SecretKey.fromKeygen(myRandomBytes);
const sk = secretKeyBLS.toBytes();
const pk = bls.secretKeyToPublicKey(sk);

const privKeyBLS = Buffer.from(sk).toString("hex");
const pubKeyBLS = Buffer.from(pk).toString("hex");

console.log(`BLS Private: 0x${privKeyBLS}`);
console.log(`BLS Public: 0x${pubKeyBLS}`);

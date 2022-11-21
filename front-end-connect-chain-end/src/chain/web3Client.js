import { contractABI, contractAddress } from "./constants";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const nftContract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

/**
 * 连接钱包
 * @returns
 */

export async function connect() {
	if (typeof window.ethereum !== "undefined") {
		try {
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
			if (accounts) {
				return accounts[0];
			}
		} catch (e) {
			console.log(e);
		}
	} else {
		setIsConnected(false);
	}
}

/**
 * 获取制定类型NFT个数
 * @param {*} account
 * @param {*} tokenID
 * @returns
 */
export async function getOwnBalance(account, tokenID) {
	const balance = await nftContract.balanceOf(account, tokenID);
	console.log(balance);
	return balance;
}

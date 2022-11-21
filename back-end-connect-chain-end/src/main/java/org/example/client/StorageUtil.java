package org.example.client;

import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.StaticGasProvider;

import java.math.BigInteger;

/**
 *
 */
@Service
public class StorageUtil {

    private static Storage contract;

    static {
        try {
            // RPC调用url(此处为BNB TEST)
            Web3j web3 = Web3j.build(new HttpService("https://data-seed-prebsc-1-s1.binance.org:8545"));
            // 账户私钥
            Credentials credentials = Credentials.create("70938dc5a43b1de494c09a462a06f8078d6c197fbe2190bdaea3a6ba027014d3");
            // 加载已经部署在链上的合约
            BigInteger gasPrice = web3.ethGasPrice().send().getGasPrice();
            // 合约地址
            contract = Storage.load("0x083AE81C4e1867254e7Dee5f7C27D5D76270aF7E",
                            web3, credentials, new StaticGasProvider(gasPrice, BigInteger.valueOf(3000000L)));
        } catch (Exception e) {
//            log.error("init failed, errMsg = {}.", e.getMessage());
        }
    }


    /**
     * 根据用户钱包地址，获取指定类型的NFT数量
     *
     * @param account account
     * @param id id
     * @return 返回对象
     */
    public int getBalanceOf(String account, BigInteger id) {
        int nftNum = 0;
        try {
            RemoteFunctionCall<BigInteger> nftInfosFromFunctionCall = contract.balanceOf(account, id);
            nftNum = nftInfosFromFunctionCall.send().intValue();
            System.out.println("nft数量："+nftNum);
        } catch (Exception e) {
//            log.error("getBalanceOfBatch from Smart Contract error, account = {}.", account.substring(account.length() - 3));
        }
        return nftNum;
    }

    /**
     * 获取用户的余额
     *
     * @return 返回数量
     */
    public int getBalance() {
        BigInteger balanceNum = new BigInteger(String.valueOf(0));
        try {
            RemoteFunctionCall<BigInteger> balanceCall = contract.getBalance();
            balanceNum = balanceCall.sendAsync().get();
        } catch (Exception e) {
            System.out.println("getBalance from Smart Contract error.");
        }
        return balanceNum.getLowestSetBit();
    }
}

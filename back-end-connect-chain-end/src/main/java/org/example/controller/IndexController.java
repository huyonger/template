package org.example.controller;

import org.example.client.StorageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@RestController
public class IndexController {
    @Autowired
    private StorageUtil storageUtil;

    @GetMapping("/chain/get_balanceof")
    public Integer getBalanceOf(){
        System.out.println(storageUtil.getBalance());
        return storageUtil.getBalanceOf("0xE9004e1e7319D7ADea71D64C22A1F6D4387dF33D", BigInteger.valueOf(0));
    }
}

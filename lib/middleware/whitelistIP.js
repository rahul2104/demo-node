"use strict";
//========================== Load Modules Start ===========================
const express = require('express');
var _ = require("lodash");
var ip = require('ip');
//========================== Load internal Module =========================
var config = require('../config');

var whiteListService = require('../module/whiteList/whiteListService');
//========================== Load Modules End =============================

var whitelistIP = function (request, response, next) {
    
    if(process.env.NODE_ENV==='prod'||process.env.NODE_ENV==='production'){
        return whiteListService.getAllwhiteListIP()
        .then(function (IPArr) {
            console.log('Current IP ',ip.address());
            console.log('whitelist ',IPArr);
            
            let IPres=_.find(IPArr, function(IP) {
                return IP.IP === ip.address(); 
            });
            if(IPres){
                next();
            }else{
                response.statusCode = 401
                response.send({message:'Access denied - Invalid IP'})
            }
        })
    }else{
        next();
    }
}


module.exports = {
    whitelistIP 
}

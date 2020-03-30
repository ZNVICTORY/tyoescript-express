"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("../utils/util"));
exports.checkLogin = function (req, res, next) {
    var isLogin = (req.session ? req.session.isLogin : undefined);
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.default(null, "请先登陆"));
    }
};
exports.test = function (req, res, next) {
    console.log("ok");
    next();
};

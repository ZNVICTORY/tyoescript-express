"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("reflect-metadata");
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
exports.router = express_1.Router();
function controller() {
    return function (target) {
        for (var key in target.prototype) {
            var path = Reflect.getMetadata("path", target.prototype, key);
            var method = Reflect.getMetadata("method", target.prototype, key);
            var middleware = Reflect.getMetadata("middleware", target.prototype, key);
            var handler = target.prototype[key];
            if (path && method) {
                if (middleware) {
                    exports.router[method](path, middleware, handler);
                }
                else {
                    exports.router[method](path, handler);
                }
            }
        }
    };
}
exports.controller = controller;

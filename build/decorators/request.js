"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var interfaces_1 = require("../interfaces");
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator(interfaces_1.Methods.get);
exports.post = getRequestDecorator(interfaces_1.Methods.post);

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var crowller_1 = __importDefault(require("../utils/crowller"));
var Analyzer_1 = __importDefault(require("../utils/Analyzer"));
var util_1 = __importDefault(require("../utils/util"));
var decorators_1 = require("../decorators");
var checkLogin_1 = require("../middlewares/checkLogin");
var CrowllerController = (function () {
    function CrowllerController() {
    }
    CrowllerController.prototype.getData = function (req, res) {
        console.log(req.params, "ok");
        var secret = 'secretKey';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
        var analyze = Analyzer_1.default.getInstance();
        new crowller_1.default(url, analyze);
        res.json(util_1.default(true));
    };
    CrowllerController.prototype.showData = function (req, res) {
        try {
            var position = path_1.default.resolve(__dirname, '../../data/course.json');
            var result = fs_1.default.readFileSync(position, "utf-8");
            res.json(util_1.default(JSON.parse(result)));
        }
        catch (e) {
            res.json(util_1.default(null, "未爬去到数据"));
        }
    };
    __decorate([
        decorators_1.get("/getData"),
        decorators_1.use(checkLogin_1.checkLogin),
        decorators_1.use(checkLogin_1.test),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "getData", null);
    __decorate([
        decorators_1.get("/showData"),
        decorators_1.use(checkLogin_1.checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrowllerController.prototype, "showData", null);
    CrowllerController = __decorate([
        decorators_1.controller()
    ], CrowllerController);
    return CrowllerController;
}());
;
exports.default = CrowllerController;

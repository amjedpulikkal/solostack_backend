"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esClientConnection = esClientConnection;
const elasticsearch_1 = require("@elastic/elasticsearch");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const caCertPath = path_1.default.join(__dirname, '../../../../http_ca.crt');
const caCert = fs_1.default.readFileSync(caCertPath);
let esClient;
function esClientConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        esClient = new elasticsearch_1.Client({
            node: "https://127.0.0.1:9200",
            auth: {
                username: "elastic",
                password: "xixV+TAKHjjcV-3cPS8M",
            },
            tls: {
                ca: caCert
            }
        });
        try {
            yield checkConnection();
        }
        catch (error) {
            console.error("Error setting up Elasticsearch client:", error);
        }
    });
}
function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isConnected = yield esClient.info();
            console.log(isConnected);
            if (isConnected) {
                console.log("Elasticsearch cluster is connected!");
            }
            else {
                console.log("Elasticsearch cluster is not connected.");
            }
        }
        catch (error) {
            console.error("Error connecting to Elasticsearch:", error);
        }
    });
}

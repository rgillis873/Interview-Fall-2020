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
const express_1 = __importDefault(require("express"));
const launches_1 = require("./spaceX/launches");
const app = express_1.default();
app.use(express_1.default.json());
const port = 8001; // default port to listen
// define a route handler for the default home page
app.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send({});
}));
// Handle get requests to /nasa
app.get('/yearly-launches', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const daily = new launches_1.Launches();
    // Sends in today's date as a formatted string
    const result = yield daily.getLaunchesByYear(request.query.year);
    // Sends back the result of the image getter
    response.send(result);
}));
//Handle get requests to /nasa for range of years
app.get('/range-launches', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const range = new launches_1.Launches();
    //Make request to api for launches in the range
    let result = yield range.getLaunchRange(request.query.start, request.query.end);
    //Make sure the result is sorted by year
    result.sort((launchOne, launchTwo) => {
        if (launchOne.year > launchTwo.year) {
            return 1;
        }
        if (launchOne.year < launchTwo.year) {
            return -1;
        }
        return 0;
    });
    //Send the response
    response.send(result);
}));
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
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
exports.Launches = void 0;
const moment_1 = __importDefault(require("moment"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class Launches {
    constructor() {
        this.url = 'https://api.spacexdata.com/v3/launches';
    }
    /**
     * Gets the daily spaceX launches
     * @param date string with YYYY format
     */
    getLaunchesByYear(year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the date as a moment object
                const dateAsMoment = moment_1.default(year, 'YYYY');
                // Check that the date string is valid, and that the date is before or equal to today's date
                // moment() creates a moment with today's date
                if (!dateAsMoment.isValid() || !dateAsMoment.isSameOrBefore(moment_1.default())) {
                    return [{ error: 'invalid year' }];
                }
                // Get the parsed request
                const parsed = yield this.requestLaunchesByYear(year);
                // Maps and creates the return list
                return this.filterFields(parsed);
            }
            catch (e) {
                console.log(e);
                return [
                    {
                        error: `There was an error retrieving this launch`,
                    },
                ];
            }
        });
    }
    /**
     * Makes the api request for launches per year
     * @param year
     */
    requestLaunchesByYear(year) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default(`${this.url}?launch_year=${year}`);
            return res.json();
        });
    }
    /**
     * Helpers
     */
    /**
     * Makes api request for lanches in the range from start to end
     * @param start
     * @param end
     */
    getLaunchRange(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield node_fetch_1.default(`${this.url}?start=${start}&end=${end}`);
            return res.json();
        });
    }
    /**
     * Filters out desired fields
     * @param data
     */
    filterFields(data) {
        return data.map((p) => {
            var _a, _b;
            return ({
                flight_number: p.flight_number,
                mission_name: p.mission_name,
                rocket_name: (_a = p.rocket) === null || _a === void 0 ? void 0 : _a.rocket_name,
                rocket_type: (_b = p.rocket) === null || _b === void 0 ? void 0 : _b.rocket_type,
                details: p.details,
                launch_success: p.launch_success,
            });
        });
    }
}
exports.Launches = Launches;
//# sourceMappingURL=launches.js.map
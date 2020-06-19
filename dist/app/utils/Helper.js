"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    static validateProps(props, sample) {
        const errors = [];
        sample.forEach((key) => {
            if (key === 'id')
                return;
            if (!props[key])
                errors.push(key);
        });
        return errors;
    }
}
exports.default = Helper;
//# sourceMappingURL=Helper.js.map
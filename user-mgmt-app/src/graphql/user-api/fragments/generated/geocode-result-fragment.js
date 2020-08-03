"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeocodeResultFragmentDoc = void 0;
var graphql_tag_1 = require("graphql-tag");
exports.GeocodeResultFragmentDoc = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment GeocodeResult on GeocodeResult {\n    latitude\n    longitude\n    error\n  }\n"], ["\n  fragment GeocodeResult on GeocodeResult {\n    latitude\n    longitude\n    error\n  }\n"])));
var templateObject_1;

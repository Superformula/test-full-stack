"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFragmentDoc = void 0;
var graphql_tag_1 = require("graphql-tag");
exports.UserFragmentDoc = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment User on User {\n    id\n    name\n    dob\n    address\n    description\n    createdAt\n    updatedAt\n  }\n"], ["\n  fragment User on User {\n    id\n    name\n    dob\n    address\n    description\n    createdAt\n    updatedAt\n  }\n"])));
var templateObject_1;

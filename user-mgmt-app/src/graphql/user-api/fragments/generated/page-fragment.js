"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagedUserResultFragmentDoc = void 0;
var graphql_tag_1 = require("graphql-tag");
var user_fragment_1 = require("./user-fragment");
exports.PagedUserResultFragmentDoc = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment PagedUserResult on PagedUserResult {\n    values {\n      ...User\n    }\n    isLastPage\n    count\n    cursor\n  }\n  ", "\n"], ["\n  fragment PagedUserResult on PagedUserResult {\n    values {\n      ...User\n    }\n    isLastPage\n    count\n    cursor\n  }\n  ", "\n"])), user_fragment_1.UserFragmentDoc);
var templateObject_1;

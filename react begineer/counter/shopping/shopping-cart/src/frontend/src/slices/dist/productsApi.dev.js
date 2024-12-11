"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetAllProductsQuery = exports.productsApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

// Need to use the React-specific entry point to import createApi
// Define a service using a base URL and expected endpoints
var productsApi = (0, _react.createApi)({
  reducerPath: "productsApi",
  baseQuery: (0, _react.fetchBaseQuery)({
    baseUrl: "http://localhost:5000/"
  }),
  endpoints: function endpoints(builder) {
    return {
      getAllProducts: builder.query({
        query: function query() {
          return "products";
        }
      })
    };
  }
}); // Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

exports.productsApi = productsApi;
var useGetAllProductsQuery = productsApi.useGetAllProductsQuery;
exports.useGetAllProductsQuery = useGetAllProductsQuery;
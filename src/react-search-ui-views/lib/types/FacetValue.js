"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FilterValue = _interopRequireDefault(require("./FilterValue"));

var _default = _propTypes.default.shape({
  // Number of results for this filter
  count: _propTypes.default.number.isRequired,
  // Filter to apply if selected
  value: _FilterValue.default.isRequired,
  // Whether or not this facet value is selected
  selected: _propTypes.default.bool
});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlcy9GYWNldFZhbHVlLmpzIl0sIm5hbWVzIjpbIlByb3BUeXBlcyIsInNoYXBlIiwiY291bnQiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwidmFsdWUiLCJGaWx0ZXJWYWx1ZSIsInNlbGVjdGVkIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O2VBRWVBLG1CQUFVQyxLQUFWLENBQWdCO0FBQzdCO0FBQ0FDLEVBQUFBLEtBQUssRUFBRUYsbUJBQVVHLE1BQVYsQ0FBaUJDLFVBRks7QUFHN0I7QUFDQUMsRUFBQUEsS0FBSyxFQUFFQyxxQkFBWUYsVUFKVTtBQUs3QjtBQUNBRyxFQUFBQSxRQUFRLEVBQUVQLG1CQUFVUTtBQU5TLENBQWhCLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgRmlsdGVyVmFsdWUgZnJvbSBcIi4vRmlsdGVyVmFsdWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgUHJvcFR5cGVzLnNoYXBlKHtcbiAgLy8gTnVtYmVyIG9mIHJlc3VsdHMgZm9yIHRoaXMgZmlsdGVyXG4gIGNvdW50OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8vIEZpbHRlciB0byBhcHBseSBpZiBzZWxlY3RlZFxuICB2YWx1ZTogRmlsdGVyVmFsdWUuaXNSZXF1aXJlZCxcbiAgLy8gV2hldGhlciBvciBub3QgdGhpcyBmYWNldCB2YWx1ZSBpcyBzZWxlY3RlZFxuICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2xcbn0pO1xuIl19
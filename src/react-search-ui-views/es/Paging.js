import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import PropTypes from "prop-types";
import React from "react";
import RCPagination from "rc-pagination";
import enUsLocale from "rc-pagination/lib/locale/en_US";
import { appendClassName } from "./view-helpers";

function Paging(_ref) {
  var className = _ref.className,
      current = _ref.current,
      resultsPerPage = _ref.resultsPerPage,
      onChange = _ref.onChange,
      totalPages = _ref.totalPages,
      rest = _objectWithoutProperties(_ref, ["className", "current", "resultsPerPage", "onChange", "totalPages"]);

  return /*#__PURE__*/React.createElement(RCPagination, _extends({
    current: current,
    onChange: onChange,
    pageSize: resultsPerPage,
    total: totalPages * resultsPerPage,
    className: appendClassName("sui-paging", className),
    locale: enUsLocale
  }, rest));
}

Paging.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  className: PropTypes.string
};
export default Paging;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QYWdpbmcuanMiXSwibmFtZXMiOlsiUHJvcFR5cGVzIiwiUmVhY3QiLCJSQ1BhZ2luYXRpb24iLCJlblVzTG9jYWxlIiwiYXBwZW5kQ2xhc3NOYW1lIiwiUGFnaW5nIiwiY2xhc3NOYW1lIiwiY3VycmVudCIsInJlc3VsdHNQZXJQYWdlIiwib25DaGFuZ2UiLCJ0b3RhbFBhZ2VzIiwicmVzdCIsInByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJmdW5jIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU9BLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsWUFBUCxNQUF5QixlQUF6QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsZ0NBQXZCO0FBRUEsU0FBU0MsZUFBVCxRQUFnQyxnQkFBaEM7O0FBRUEsU0FBU0MsTUFBVCxPQU9HO0FBQUEsTUFOREMsU0FNQyxRQU5EQSxTQU1DO0FBQUEsTUFMREMsT0FLQyxRQUxEQSxPQUtDO0FBQUEsTUFKREMsY0FJQyxRQUpEQSxjQUlDO0FBQUEsTUFIREMsUUFHQyxRQUhEQSxRQUdDO0FBQUEsTUFGREMsVUFFQyxRQUZEQSxVQUVDO0FBQUEsTUFERUMsSUFDRjs7QUFDRCxzQkFDRSxvQkFBQyxZQUFEO0FBQ0UsSUFBQSxPQUFPLEVBQUVKLE9BRFg7QUFFRSxJQUFBLFFBQVEsRUFBRUUsUUFGWjtBQUdFLElBQUEsUUFBUSxFQUFFRCxjQUhaO0FBSUUsSUFBQSxLQUFLLEVBQUVFLFVBQVUsR0FBR0YsY0FKdEI7QUFLRSxJQUFBLFNBQVMsRUFBRUosZUFBZSxDQUFDLFlBQUQsRUFBZUUsU0FBZixDQUw1QjtBQU1FLElBQUEsTUFBTSxFQUFFSDtBQU5WLEtBT01RLElBUE4sRUFERjtBQVdEOztBQUVETixNQUFNLENBQUNPLFNBQVAsR0FBbUI7QUFDakJMLEVBQUFBLE9BQU8sRUFBRVAsU0FBUyxDQUFDYSxNQUFWLENBQWlCQyxVQURUO0FBRWpCTCxFQUFBQSxRQUFRLEVBQUVULFNBQVMsQ0FBQ2UsSUFBVixDQUFlRCxVQUZSO0FBR2pCTixFQUFBQSxjQUFjLEVBQUVSLFNBQVMsQ0FBQ2EsTUFBVixDQUFpQkMsVUFIaEI7QUFJakJKLEVBQUFBLFVBQVUsRUFBRVYsU0FBUyxDQUFDYSxNQUFWLENBQWlCQyxVQUpaO0FBS2pCUixFQUFBQSxTQUFTLEVBQUVOLFNBQVMsQ0FBQ2dCO0FBTEosQ0FBbkI7QUFRQSxlQUFlWCxNQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJDUGFnaW5hdGlvbiBmcm9tIFwicmMtcGFnaW5hdGlvblwiO1xuaW1wb3J0IGVuVXNMb2NhbGUgZnJvbSBcInJjLXBhZ2luYXRpb24vbGliL2xvY2FsZS9lbl9VU1wiO1xuXG5pbXBvcnQgeyBhcHBlbmRDbGFzc05hbWUgfSBmcm9tIFwiLi92aWV3LWhlbHBlcnNcIjtcblxuZnVuY3Rpb24gUGFnaW5nKHtcbiAgY2xhc3NOYW1lLFxuICBjdXJyZW50LFxuICByZXN1bHRzUGVyUGFnZSxcbiAgb25DaGFuZ2UsXG4gIHRvdGFsUGFnZXMsXG4gIC4uLnJlc3Rcbn0pIHtcbiAgcmV0dXJuIChcbiAgICA8UkNQYWdpbmF0aW9uXG4gICAgICBjdXJyZW50PXtjdXJyZW50fVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgcGFnZVNpemU9e3Jlc3VsdHNQZXJQYWdlfVxuICAgICAgdG90YWw9e3RvdGFsUGFnZXMgKiByZXN1bHRzUGVyUGFnZX1cbiAgICAgIGNsYXNzTmFtZT17YXBwZW5kQ2xhc3NOYW1lKFwic3VpLXBhZ2luZ1wiLCBjbGFzc05hbWUpfVxuICAgICAgbG9jYWxlPXtlblVzTG9jYWxlfVxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKTtcbn1cblxuUGFnaW5nLnByb3BUeXBlcyA9IHtcbiAgY3VycmVudDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgcmVzdWx0c1BlclBhZ2U6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgdG90YWxQYWdlczogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2luZztcbiJdfQ==
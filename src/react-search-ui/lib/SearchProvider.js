"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _searchUi = require("@elastic/search-ui");

var _SearchContext = _interopRequireDefault(require("./SearchContext"));

var _A11yNotifications = _interopRequireDefault(require("./A11yNotifications"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * The SearchProvider primarily holds a reference to the SearchDriver and
 * exposes it to the rest of the application in a Context.
 */
var SearchProvider = function SearchProvider(_ref) {
  var children = _ref.children,
      _ref$config = _ref.config,
      config = _ref$config === void 0 ? {} : _ref$config,
      driver = _ref.driver;

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      driverInstance = _useState2[0],
      setDriverInstance = _useState2[1];

  (0, _react.useEffect)(function () {
    // This initialization is done inside of useEffect, because initializing the SearchDriver server side
    // will error out, since the driver depends on window. Placing the initialization inside of useEffect
    // assures that it won't attempt to initialize server side.
    var currentDriver = driver || new _searchUi.SearchDriver(_objectSpread(_objectSpread({}, config), {}, {
      a11yNotificationMessages: _objectSpread(_objectSpread({}, _A11yNotifications.default), config.a11yNotificationMessages)
    }));
    setDriverInstance(currentDriver);
    return function () {
      currentDriver.tearDown();
    };
  }, []); // This effect allows users to dynamically update their searchQuery without re-mounting a SearchProvider,
  // which would be destructive. An example of why this is useful is dynamically updating facets.

  (0, _react.useEffect)(function () {
    if (driverInstance) {
      driverInstance.setSearchQuery(config.searchQuery);
    }
  }, [config.searchQuery]);
  (0, _react.useEffect)(function () {
    if (driverInstance) {
      driverInstance.setAutocompleteQuery(config.autocompleteQuery);
    }
  }, [config.autocompleteQuery]); // Since driver is initialized in useEffect above, we are waiting
  // to render until the driver is available.

  if (!driverInstance) return null; // Passing the entire "this.state" to the Context is significant. Because
  // Context determines when to re-render based on referential identity
  // something like this could cause unnecessary renders:
  //
  // <SearchContext.Provider value={{driver: this.state.driver}}>
  //
  // By passing the entire state, we ensure that re-renders only occur when
  // state is actually updated.

  return /*#__PURE__*/_react.default.createElement(_SearchContext.default.Provider, {
    value: {
      driver: driverInstance
    }
  }, children);
};

SearchProvider.propTypes = {
  children: _propTypes.default.node.isRequired,
  // Not providing a shape here because the shape matches the shape of
  // SearchDriver. SearchDriver can do it's own parameter validation.
  config: _propTypes.default.object,
  driver: _propTypes.default.object
};
var _default = SearchProvider;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZWFyY2hQcm92aWRlci5qcyJdLCJuYW1lcyI6WyJTZWFyY2hQcm92aWRlciIsImNoaWxkcmVuIiwiY29uZmlnIiwiZHJpdmVyIiwiZHJpdmVySW5zdGFuY2UiLCJzZXREcml2ZXJJbnN0YW5jZSIsImN1cnJlbnREcml2ZXIiLCJTZWFyY2hEcml2ZXIiLCJhMTF5Tm90aWZpY2F0aW9uTWVzc2FnZXMiLCJkZWZhdWx0QTExeU1lc3NhZ2VzIiwidGVhckRvd24iLCJzZXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5Iiwic2V0QXV0b2NvbXBsZXRlUXVlcnkiLCJhdXRvY29tcGxldGVRdWVyeSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm5vZGUiLCJpc1JlcXVpcmVkIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLE9BQXVDO0FBQUEsTUFBcENDLFFBQW9DLFFBQXBDQSxRQUFvQztBQUFBLHlCQUExQkMsTUFBMEI7QUFBQSxNQUExQkEsTUFBMEIsNEJBQWpCLEVBQWlCO0FBQUEsTUFBYkMsTUFBYSxRQUFiQSxNQUFhOztBQUFBLGtCQUNoQixxQkFBUyxJQUFULENBRGdCO0FBQUE7QUFBQSxNQUNyREMsY0FEcUQ7QUFBQSxNQUNyQ0MsaUJBRHFDOztBQUc1RCx3QkFBVSxZQUFNO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsUUFBTUMsYUFBYSxHQUNqQkgsTUFBTSxJQUNOLElBQUlJLHNCQUFKLGlDQUNLTCxNQURMO0FBRUVNLE1BQUFBLHdCQUF3QixrQ0FDbkJDLDBCQURtQixHQUVuQlAsTUFBTSxDQUFDTSx3QkFGWTtBQUYxQixPQUZGO0FBU0FILElBQUFBLGlCQUFpQixDQUFDQyxhQUFELENBQWpCO0FBRUEsV0FBTyxZQUFNO0FBQ1hBLE1BQUFBLGFBQWEsQ0FBQ0ksUUFBZDtBQUNELEtBRkQ7QUFHRCxHQWxCRCxFQWtCRyxFQWxCSCxFQUg0RCxDQXVCNUQ7QUFDQTs7QUFDQSx3QkFBVSxZQUFNO0FBQ2QsUUFBSU4sY0FBSixFQUFvQjtBQUNsQkEsTUFBQUEsY0FBYyxDQUFDTyxjQUFmLENBQThCVCxNQUFNLENBQUNVLFdBQXJDO0FBQ0Q7QUFDRixHQUpELEVBSUcsQ0FBQ1YsTUFBTSxDQUFDVSxXQUFSLENBSkg7QUFNQSx3QkFBVSxZQUFNO0FBQ2QsUUFBSVIsY0FBSixFQUFvQjtBQUNsQkEsTUFBQUEsY0FBYyxDQUFDUyxvQkFBZixDQUFvQ1gsTUFBTSxDQUFDWSxpQkFBM0M7QUFDRDtBQUNGLEdBSkQsRUFJRyxDQUFDWixNQUFNLENBQUNZLGlCQUFSLENBSkgsRUEvQjRELENBcUM1RDtBQUNBOztBQUNBLE1BQUksQ0FBQ1YsY0FBTCxFQUFxQixPQUFPLElBQVAsQ0F2Q3VDLENBeUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLHNCQUNFLDZCQUFDLHNCQUFELENBQWUsUUFBZjtBQUF3QixJQUFBLEtBQUssRUFBRTtBQUFFRCxNQUFBQSxNQUFNLEVBQUVDO0FBQVY7QUFBL0IsS0FDR0gsUUFESCxDQURGO0FBS0QsQ0F0REQ7O0FBd0RBRCxjQUFjLENBQUNlLFNBQWYsR0FBMkI7QUFDekJkLEVBQUFBLFFBQVEsRUFBRWUsbUJBQVVDLElBQVYsQ0FBZUMsVUFEQTtBQUV6QjtBQUNBO0FBQ0FoQixFQUFBQSxNQUFNLEVBQUVjLG1CQUFVRyxNQUpPO0FBS3pCaEIsRUFBQUEsTUFBTSxFQUFFYSxtQkFBVUc7QUFMTyxDQUEzQjtlQVFlbkIsYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IFNlYXJjaERyaXZlciB9IGZyb20gXCJAZWxhc3RpYy9zZWFyY2gtdWlcIjtcbmltcG9ydCBTZWFyY2hDb250ZXh0IGZyb20gXCIuL1NlYXJjaENvbnRleHRcIjtcblxuaW1wb3J0IGRlZmF1bHRBMTF5TWVzc2FnZXMgZnJvbSBcIi4vQTExeU5vdGlmaWNhdGlvbnNcIjtcblxuLyoqXG4gKiBUaGUgU2VhcmNoUHJvdmlkZXIgcHJpbWFyaWx5IGhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBTZWFyY2hEcml2ZXIgYW5kXG4gKiBleHBvc2VzIGl0IHRvIHRoZSByZXN0IG9mIHRoZSBhcHBsaWNhdGlvbiBpbiBhIENvbnRleHQuXG4gKi9cbmNvbnN0IFNlYXJjaFByb3ZpZGVyID0gKHsgY2hpbGRyZW4sIGNvbmZpZyA9IHt9LCBkcml2ZXIgfSkgPT4ge1xuICBjb25zdCBbZHJpdmVySW5zdGFuY2UsIHNldERyaXZlckluc3RhbmNlXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gVGhpcyBpbml0aWFsaXphdGlvbiBpcyBkb25lIGluc2lkZSBvZiB1c2VFZmZlY3QsIGJlY2F1c2UgaW5pdGlhbGl6aW5nIHRoZSBTZWFyY2hEcml2ZXIgc2VydmVyIHNpZGVcbiAgICAvLyB3aWxsIGVycm9yIG91dCwgc2luY2UgdGhlIGRyaXZlciBkZXBlbmRzIG9uIHdpbmRvdy4gUGxhY2luZyB0aGUgaW5pdGlhbGl6YXRpb24gaW5zaWRlIG9mIHVzZUVmZmVjdFxuICAgIC8vIGFzc3VyZXMgdGhhdCBpdCB3b24ndCBhdHRlbXB0IHRvIGluaXRpYWxpemUgc2VydmVyIHNpZGUuXG4gICAgY29uc3QgY3VycmVudERyaXZlciA9XG4gICAgICBkcml2ZXIgfHxcbiAgICAgIG5ldyBTZWFyY2hEcml2ZXIoe1xuICAgICAgICAuLi5jb25maWcsXG4gICAgICAgIGExMXlOb3RpZmljYXRpb25NZXNzYWdlczoge1xuICAgICAgICAgIC4uLmRlZmF1bHRBMTF5TWVzc2FnZXMsXG4gICAgICAgICAgLi4uY29uZmlnLmExMXlOb3RpZmljYXRpb25NZXNzYWdlc1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBzZXREcml2ZXJJbnN0YW5jZShjdXJyZW50RHJpdmVyKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjdXJyZW50RHJpdmVyLnRlYXJEb3duKCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIC8vIFRoaXMgZWZmZWN0IGFsbG93cyB1c2VycyB0byBkeW5hbWljYWxseSB1cGRhdGUgdGhlaXIgc2VhcmNoUXVlcnkgd2l0aG91dCByZS1tb3VudGluZyBhIFNlYXJjaFByb3ZpZGVyLFxuICAvLyB3aGljaCB3b3VsZCBiZSBkZXN0cnVjdGl2ZS4gQW4gZXhhbXBsZSBvZiB3aHkgdGhpcyBpcyB1c2VmdWwgaXMgZHluYW1pY2FsbHkgdXBkYXRpbmcgZmFjZXRzLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkcml2ZXJJbnN0YW5jZSkge1xuICAgICAgZHJpdmVySW5zdGFuY2Uuc2V0U2VhcmNoUXVlcnkoY29uZmlnLnNlYXJjaFF1ZXJ5KTtcbiAgICB9XG4gIH0sIFtjb25maWcuc2VhcmNoUXVlcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkcml2ZXJJbnN0YW5jZSkge1xuICAgICAgZHJpdmVySW5zdGFuY2Uuc2V0QXV0b2NvbXBsZXRlUXVlcnkoY29uZmlnLmF1dG9jb21wbGV0ZVF1ZXJ5KTtcbiAgICB9XG4gIH0sIFtjb25maWcuYXV0b2NvbXBsZXRlUXVlcnldKTtcblxuICAvLyBTaW5jZSBkcml2ZXIgaXMgaW5pdGlhbGl6ZWQgaW4gdXNlRWZmZWN0IGFib3ZlLCB3ZSBhcmUgd2FpdGluZ1xuICAvLyB0byByZW5kZXIgdW50aWwgdGhlIGRyaXZlciBpcyBhdmFpbGFibGUuXG4gIGlmICghZHJpdmVySW5zdGFuY2UpIHJldHVybiBudWxsO1xuXG4gIC8vIFBhc3NpbmcgdGhlIGVudGlyZSBcInRoaXMuc3RhdGVcIiB0byB0aGUgQ29udGV4dCBpcyBzaWduaWZpY2FudC4gQmVjYXVzZVxuICAvLyBDb250ZXh0IGRldGVybWluZXMgd2hlbiB0byByZS1yZW5kZXIgYmFzZWQgb24gcmVmZXJlbnRpYWwgaWRlbnRpdHlcbiAgLy8gc29tZXRoaW5nIGxpa2UgdGhpcyBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeSByZW5kZXJzOlxuICAvL1xuICAvLyA8U2VhcmNoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17e2RyaXZlcjogdGhpcy5zdGF0ZS5kcml2ZXJ9fT5cbiAgLy9cbiAgLy8gQnkgcGFzc2luZyB0aGUgZW50aXJlIHN0YXRlLCB3ZSBlbnN1cmUgdGhhdCByZS1yZW5kZXJzIG9ubHkgb2NjdXIgd2hlblxuICAvLyBzdGF0ZSBpcyBhY3R1YWxseSB1cGRhdGVkLlxuICByZXR1cm4gKFxuICAgIDxTZWFyY2hDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IGRyaXZlcjogZHJpdmVySW5zdGFuY2UgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9TZWFyY2hDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufTtcblxuU2VhcmNoUHJvdmlkZXIucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgLy8gTm90IHByb3ZpZGluZyBhIHNoYXBlIGhlcmUgYmVjYXVzZSB0aGUgc2hhcGUgbWF0Y2hlcyB0aGUgc2hhcGUgb2ZcbiAgLy8gU2VhcmNoRHJpdmVyLiBTZWFyY2hEcml2ZXIgY2FuIGRvIGl0J3Mgb3duIHBhcmFtZXRlciB2YWxpZGF0aW9uLlxuICBjb25maWc6IFByb3BUeXBlcy5vYmplY3QsXG4gIGRyaXZlcjogUHJvcFR5cGVzLm9iamVjdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoUHJvdmlkZXI7XG4iXX0=
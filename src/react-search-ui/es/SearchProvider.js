import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { SearchDriver } from "@elastic/search-ui";
import SearchContext from "./SearchContext";
import defaultA11yMessages from "./A11yNotifications";
/**
 * The SearchProvider primarily holds a reference to the SearchDriver and
 * exposes it to the rest of the application in a Context.
 */

var SearchProvider = function SearchProvider(_ref) {
  var children = _ref.children,
      _ref$config = _ref.config,
      config = _ref$config === void 0 ? {} : _ref$config,
      driver = _ref.driver;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      driverInstance = _useState2[0],
      setDriverInstance = _useState2[1];

  useEffect(function () {
    // This initialization is done inside of useEffect, because initializing the SearchDriver server side
    // will error out, since the driver depends on window. Placing the initialization inside of useEffect
    // assures that it won't attempt to initialize server side.
    var currentDriver = driver || new SearchDriver(_objectSpread(_objectSpread({}, config), {}, {
      a11yNotificationMessages: _objectSpread(_objectSpread({}, defaultA11yMessages), config.a11yNotificationMessages)
    }));
    setDriverInstance(currentDriver);
    return function () {
      currentDriver.tearDown();
    };
  }, []); // This effect allows users to dynamically update their searchQuery without re-mounting a SearchProvider,
  // which would be destructive. An example of why this is useful is dynamically updating facets.

  useEffect(function () {
    if (driverInstance) {
      driverInstance.setSearchQuery(config.searchQuery);
    }
  }, [config.searchQuery]);
  useEffect(function () {
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

  return /*#__PURE__*/React.createElement(SearchContext.Provider, {
    value: {
      driver: driverInstance
    }
  }, children);
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // Not providing a shape here because the shape matches the shape of
  // SearchDriver. SearchDriver can do it's own parameter validation.
  config: PropTypes.object,
  driver: PropTypes.object
};
export default SearchProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TZWFyY2hQcm92aWRlci5qcyJdLCJuYW1lcyI6WyJQcm9wVHlwZXMiLCJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiU2VhcmNoRHJpdmVyIiwiU2VhcmNoQ29udGV4dCIsImRlZmF1bHRBMTF5TWVzc2FnZXMiLCJTZWFyY2hQcm92aWRlciIsImNoaWxkcmVuIiwiY29uZmlnIiwiZHJpdmVyIiwiZHJpdmVySW5zdGFuY2UiLCJzZXREcml2ZXJJbnN0YW5jZSIsImN1cnJlbnREcml2ZXIiLCJhMTF5Tm90aWZpY2F0aW9uTWVzc2FnZXMiLCJ0ZWFyRG93biIsInNldFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJzZXRBdXRvY29tcGxldGVRdWVyeSIsImF1dG9jb21wbGV0ZVF1ZXJ5IiwicHJvcFR5cGVzIiwibm9kZSIsImlzUmVxdWlyZWQiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxPQUFPQSxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsS0FBUCxJQUFnQkMsUUFBaEIsRUFBMEJDLFNBQTFCLFFBQTJDLE9BQTNDO0FBRUEsU0FBU0MsWUFBVCxRQUE2QixvQkFBN0I7QUFDQSxPQUFPQyxhQUFQLE1BQTBCLGlCQUExQjtBQUVBLE9BQU9DLG1CQUFQLE1BQWdDLHFCQUFoQztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsT0FBdUM7QUFBQSxNQUFwQ0MsUUFBb0MsUUFBcENBLFFBQW9DO0FBQUEseUJBQTFCQyxNQUEwQjtBQUFBLE1BQTFCQSxNQUEwQiw0QkFBakIsRUFBaUI7QUFBQSxNQUFiQyxNQUFhLFFBQWJBLE1BQWE7O0FBQUEsa0JBQ2hCUixRQUFRLENBQUMsSUFBRCxDQURRO0FBQUE7QUFBQSxNQUNyRFMsY0FEcUQ7QUFBQSxNQUNyQ0MsaUJBRHFDOztBQUc1RFQsRUFBQUEsU0FBUyxDQUFDLFlBQU07QUFDZDtBQUNBO0FBQ0E7QUFDQSxRQUFNVSxhQUFhLEdBQ2pCSCxNQUFNLElBQ04sSUFBSU4sWUFBSixpQ0FDS0ssTUFETDtBQUVFSyxNQUFBQSx3QkFBd0Isa0NBQ25CUixtQkFEbUIsR0FFbkJHLE1BQU0sQ0FBQ0ssd0JBRlk7QUFGMUIsT0FGRjtBQVNBRixJQUFBQSxpQkFBaUIsQ0FBQ0MsYUFBRCxDQUFqQjtBQUVBLFdBQU8sWUFBTTtBQUNYQSxNQUFBQSxhQUFhLENBQUNFLFFBQWQ7QUFDRCxLQUZEO0FBR0QsR0FsQlEsRUFrQk4sRUFsQk0sQ0FBVCxDQUg0RCxDQXVCNUQ7QUFDQTs7QUFDQVosRUFBQUEsU0FBUyxDQUFDLFlBQU07QUFDZCxRQUFJUSxjQUFKLEVBQW9CO0FBQ2xCQSxNQUFBQSxjQUFjLENBQUNLLGNBQWYsQ0FBOEJQLE1BQU0sQ0FBQ1EsV0FBckM7QUFDRDtBQUNGLEdBSlEsRUFJTixDQUFDUixNQUFNLENBQUNRLFdBQVIsQ0FKTSxDQUFUO0FBTUFkLEVBQUFBLFNBQVMsQ0FBQyxZQUFNO0FBQ2QsUUFBSVEsY0FBSixFQUFvQjtBQUNsQkEsTUFBQUEsY0FBYyxDQUFDTyxvQkFBZixDQUFvQ1QsTUFBTSxDQUFDVSxpQkFBM0M7QUFDRDtBQUNGLEdBSlEsRUFJTixDQUFDVixNQUFNLENBQUNVLGlCQUFSLENBSk0sQ0FBVCxDQS9CNEQsQ0FxQzVEO0FBQ0E7O0FBQ0EsTUFBSSxDQUFDUixjQUFMLEVBQXFCLE9BQU8sSUFBUCxDQXZDdUMsQ0F5QzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0Esc0JBQ0Usb0JBQUMsYUFBRCxDQUFlLFFBQWY7QUFBd0IsSUFBQSxLQUFLLEVBQUU7QUFBRUQsTUFBQUEsTUFBTSxFQUFFQztBQUFWO0FBQS9CLEtBQ0dILFFBREgsQ0FERjtBQUtELENBdEREOztBQXdEQUQsY0FBYyxDQUFDYSxTQUFmLEdBQTJCO0FBQ3pCWixFQUFBQSxRQUFRLEVBQUVSLFNBQVMsQ0FBQ3FCLElBQVYsQ0FBZUMsVUFEQTtBQUV6QjtBQUNBO0FBQ0FiLEVBQUFBLE1BQU0sRUFBRVQsU0FBUyxDQUFDdUIsTUFKTztBQUt6QmIsRUFBQUEsTUFBTSxFQUFFVixTQUFTLENBQUN1QjtBQUxPLENBQTNCO0FBUUEsZUFBZWhCLGNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBTZWFyY2hEcml2ZXIgfSBmcm9tIFwiQGVsYXN0aWMvc2VhcmNoLXVpXCI7XG5pbXBvcnQgU2VhcmNoQ29udGV4dCBmcm9tIFwiLi9TZWFyY2hDb250ZXh0XCI7XG5cbmltcG9ydCBkZWZhdWx0QTExeU1lc3NhZ2VzIGZyb20gXCIuL0ExMXlOb3RpZmljYXRpb25zXCI7XG5cbi8qKlxuICogVGhlIFNlYXJjaFByb3ZpZGVyIHByaW1hcmlseSBob2xkcyBhIHJlZmVyZW5jZSB0byB0aGUgU2VhcmNoRHJpdmVyIGFuZFxuICogZXhwb3NlcyBpdCB0byB0aGUgcmVzdCBvZiB0aGUgYXBwbGljYXRpb24gaW4gYSBDb250ZXh0LlxuICovXG5jb25zdCBTZWFyY2hQcm92aWRlciA9ICh7IGNoaWxkcmVuLCBjb25maWcgPSB7fSwgZHJpdmVyIH0pID0+IHtcbiAgY29uc3QgW2RyaXZlckluc3RhbmNlLCBzZXREcml2ZXJJbnN0YW5jZV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIFRoaXMgaW5pdGlhbGl6YXRpb24gaXMgZG9uZSBpbnNpZGUgb2YgdXNlRWZmZWN0LCBiZWNhdXNlIGluaXRpYWxpemluZyB0aGUgU2VhcmNoRHJpdmVyIHNlcnZlciBzaWRlXG4gICAgLy8gd2lsbCBlcnJvciBvdXQsIHNpbmNlIHRoZSBkcml2ZXIgZGVwZW5kcyBvbiB3aW5kb3cuIFBsYWNpbmcgdGhlIGluaXRpYWxpemF0aW9uIGluc2lkZSBvZiB1c2VFZmZlY3RcbiAgICAvLyBhc3N1cmVzIHRoYXQgaXQgd29uJ3QgYXR0ZW1wdCB0byBpbml0aWFsaXplIHNlcnZlciBzaWRlLlxuICAgIGNvbnN0IGN1cnJlbnREcml2ZXIgPVxuICAgICAgZHJpdmVyIHx8XG4gICAgICBuZXcgU2VhcmNoRHJpdmVyKHtcbiAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICBhMTF5Tm90aWZpY2F0aW9uTWVzc2FnZXM6IHtcbiAgICAgICAgICAuLi5kZWZhdWx0QTExeU1lc3NhZ2VzLFxuICAgICAgICAgIC4uLmNvbmZpZy5hMTF5Tm90aWZpY2F0aW9uTWVzc2FnZXNcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgc2V0RHJpdmVySW5zdGFuY2UoY3VycmVudERyaXZlcik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY3VycmVudERyaXZlci50ZWFyRG93bigpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICAvLyBUaGlzIGVmZmVjdCBhbGxvd3MgdXNlcnMgdG8gZHluYW1pY2FsbHkgdXBkYXRlIHRoZWlyIHNlYXJjaFF1ZXJ5IHdpdGhvdXQgcmUtbW91bnRpbmcgYSBTZWFyY2hQcm92aWRlcixcbiAgLy8gd2hpY2ggd291bGQgYmUgZGVzdHJ1Y3RpdmUuIEFuIGV4YW1wbGUgb2Ygd2h5IHRoaXMgaXMgdXNlZnVsIGlzIGR5bmFtaWNhbGx5IHVwZGF0aW5nIGZhY2V0cy5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZHJpdmVySW5zdGFuY2UpIHtcbiAgICAgIGRyaXZlckluc3RhbmNlLnNldFNlYXJjaFF1ZXJ5KGNvbmZpZy5zZWFyY2hRdWVyeSk7XG4gICAgfVxuICB9LCBbY29uZmlnLnNlYXJjaFF1ZXJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZHJpdmVySW5zdGFuY2UpIHtcbiAgICAgIGRyaXZlckluc3RhbmNlLnNldEF1dG9jb21wbGV0ZVF1ZXJ5KGNvbmZpZy5hdXRvY29tcGxldGVRdWVyeSk7XG4gICAgfVxuICB9LCBbY29uZmlnLmF1dG9jb21wbGV0ZVF1ZXJ5XSk7XG5cbiAgLy8gU2luY2UgZHJpdmVyIGlzIGluaXRpYWxpemVkIGluIHVzZUVmZmVjdCBhYm92ZSwgd2UgYXJlIHdhaXRpbmdcbiAgLy8gdG8gcmVuZGVyIHVudGlsIHRoZSBkcml2ZXIgaXMgYXZhaWxhYmxlLlxuICBpZiAoIWRyaXZlckluc3RhbmNlKSByZXR1cm4gbnVsbDtcblxuICAvLyBQYXNzaW5nIHRoZSBlbnRpcmUgXCJ0aGlzLnN0YXRlXCIgdG8gdGhlIENvbnRleHQgaXMgc2lnbmlmaWNhbnQuIEJlY2F1c2VcbiAgLy8gQ29udGV4dCBkZXRlcm1pbmVzIHdoZW4gdG8gcmUtcmVuZGVyIGJhc2VkIG9uIHJlZmVyZW50aWFsIGlkZW50aXR5XG4gIC8vIHNvbWV0aGluZyBsaWtlIHRoaXMgY291bGQgY2F1c2UgdW5uZWNlc3NhcnkgcmVuZGVyczpcbiAgLy9cbiAgLy8gPFNlYXJjaENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3tkcml2ZXI6IHRoaXMuc3RhdGUuZHJpdmVyfX0+XG4gIC8vXG4gIC8vIEJ5IHBhc3NpbmcgdGhlIGVudGlyZSBzdGF0ZSwgd2UgZW5zdXJlIHRoYXQgcmUtcmVuZGVycyBvbmx5IG9jY3VyIHdoZW5cbiAgLy8gc3RhdGUgaXMgYWN0dWFsbHkgdXBkYXRlZC5cbiAgcmV0dXJuIChcbiAgICA8U2VhcmNoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyBkcml2ZXI6IGRyaXZlckluc3RhbmNlIH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvU2VhcmNoQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG5cblNlYXJjaFByb3ZpZGVyLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gIC8vIE5vdCBwcm92aWRpbmcgYSBzaGFwZSBoZXJlIGJlY2F1c2UgdGhlIHNoYXBlIG1hdGNoZXMgdGhlIHNoYXBlIG9mXG4gIC8vIFNlYXJjaERyaXZlci4gU2VhcmNoRHJpdmVyIGNhbiBkbyBpdCdzIG93biBwYXJhbWV0ZXIgdmFsaWRhdGlvbi5cbiAgY29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LFxuICBkcml2ZXI6IFByb3BUeXBlcy5vYmplY3Rcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFByb3ZpZGVyO1xuIl19
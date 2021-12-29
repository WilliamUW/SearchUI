import React from "react";
import withSearch from "./withSearch";
import PropTypes from "prop-types";

function WithSearch(_ref) {
  var mapContextToProps = _ref.mapContextToProps,
      children = _ref.children;
  var Search = withSearch(mapContextToProps)(function (props) {
    return children(props);
  });
  return /*#__PURE__*/React.createElement(Search, null);
}

WithSearch.propTypes = {
  mapContextToProps: PropTypes.func,
  children: PropTypes.func.isRequired
};
export default WithSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9XaXRoU2VhcmNoUmVuZGVyUHJvcHMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJ3aXRoU2VhcmNoIiwiUHJvcFR5cGVzIiwiV2l0aFNlYXJjaCIsIm1hcENvbnRleHRUb1Byb3BzIiwiY2hpbGRyZW4iLCJTZWFyY2giLCJwcm9wcyIsInByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixjQUF2QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0MsVUFBVCxPQUFxRDtBQUFBLE1BQS9CQyxpQkFBK0IsUUFBL0JBLGlCQUErQjtBQUFBLE1BQVpDLFFBQVksUUFBWkEsUUFBWTtBQUNuRCxNQUFNQyxNQUFNLEdBQUdMLFVBQVUsQ0FBQ0csaUJBQUQsQ0FBVixDQUE4QixVQUFBRyxLQUFLLEVBQUk7QUFDcEQsV0FBT0YsUUFBUSxDQUFDRSxLQUFELENBQWY7QUFDRCxHQUZjLENBQWY7QUFJQSxzQkFBTyxvQkFBQyxNQUFELE9BQVA7QUFDRDs7QUFFREosVUFBVSxDQUFDSyxTQUFYLEdBQXVCO0FBQ3JCSixFQUFBQSxpQkFBaUIsRUFBRUYsU0FBUyxDQUFDTyxJQURSO0FBRXJCSixFQUFBQSxRQUFRLEVBQUVILFNBQVMsQ0FBQ08sSUFBVixDQUFlQztBQUZKLENBQXZCO0FBS0EsZUFBZVAsVUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB3aXRoU2VhcmNoIGZyb20gXCIuL3dpdGhTZWFyY2hcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZnVuY3Rpb24gV2l0aFNlYXJjaCh7IG1hcENvbnRleHRUb1Byb3BzLCBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFNlYXJjaCA9IHdpdGhTZWFyY2gobWFwQ29udGV4dFRvUHJvcHMpKHByb3BzID0+IHtcbiAgICByZXR1cm4gY2hpbGRyZW4ocHJvcHMpO1xuICB9KTtcblxuICByZXR1cm4gPFNlYXJjaCAvPjtcbn1cblxuV2l0aFNlYXJjaC5wcm9wVHlwZXMgPSB7XG4gIG1hcENvbnRleHRUb1Byb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdpdGhTZWFyY2g7XG4iXX0=
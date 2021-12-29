"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Accessibility notifications
 * @see packages/search-ui/src/A11yNotifications.js
 */
var defaultMessages = {
  moreFilters: function moreFilters(_ref) {
    var visibleOptionsCount = _ref.visibleOptionsCount,
        showingAll = _ref.showingAll;
    var message = showingAll ? "All " : "";
    message += "".concat(visibleOptionsCount, " options shown.");
    return message;
  }
};
var _default = defaultMessages;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BMTF5Tm90aWZpY2F0aW9ucy5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0TWVzc2FnZXMiLCJtb3JlRmlsdGVycyIsInZpc2libGVPcHRpb25zQ291bnQiLCJzaG93aW5nQWxsIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsZUFBZSxHQUFHO0FBQ3RCQyxFQUFBQSxXQUFXLEVBQUUsMkJBQXlDO0FBQUEsUUFBdENDLG1CQUFzQyxRQUF0Q0EsbUJBQXNDO0FBQUEsUUFBakJDLFVBQWlCLFFBQWpCQSxVQUFpQjtBQUNwRCxRQUFJQyxPQUFPLEdBQUdELFVBQVUsR0FBRyxNQUFILEdBQVksRUFBcEM7QUFDQUMsSUFBQUEsT0FBTyxjQUFPRixtQkFBUCxvQkFBUDtBQUNBLFdBQU9FLE9BQVA7QUFDRDtBQUxxQixDQUF4QjtlQVFlSixlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBY2Nlc3NpYmlsaXR5IG5vdGlmaWNhdGlvbnNcbiAqIEBzZWUgcGFja2FnZXMvc2VhcmNoLXVpL3NyYy9BMTF5Tm90aWZpY2F0aW9ucy5qc1xuICovXG5cbmNvbnN0IGRlZmF1bHRNZXNzYWdlcyA9IHtcbiAgbW9yZUZpbHRlcnM6ICh7IHZpc2libGVPcHRpb25zQ291bnQsIHNob3dpbmdBbGwgfSkgPT4ge1xuICAgIGxldCBtZXNzYWdlID0gc2hvd2luZ0FsbCA/IFwiQWxsIFwiIDogXCJcIjtcbiAgICBtZXNzYWdlICs9IGAke3Zpc2libGVPcHRpb25zQ291bnR9IG9wdGlvbnMgc2hvd24uYDtcbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdE1lc3NhZ2VzO1xuIl19
import PropTypes from "prop-types";
import FieldValue from "./FieldValue";
export default PropTypes.shape({
  // A raw field value, like 'I am a raw result', or 2, or true. Raw values may
  // or may not be html escaped, so *always* sanitize a raw value before rendering
  // it on a page as html.
  raw: FieldValue,
  // A snippet value contains a highlighted value. I.e., 'I <em>am</em> a raw
  // result'. These are always sanitized and safe to render as html.
  snippet: PropTypes.string
});
export function isFieldValueWrapper(object) {
  return object && (object.hasOwnProperty("raw") || object.hasOwnProperty("snippet"));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlcy9GaWVsZFZhbHVlV3JhcHBlci5qcyJdLCJuYW1lcyI6WyJQcm9wVHlwZXMiLCJGaWVsZFZhbHVlIiwic2hhcGUiLCJyYXciLCJzbmlwcGV0Iiwic3RyaW5nIiwiaXNGaWVsZFZhbHVlV3JhcHBlciIsIm9iamVjdCIsImhhc093blByb3BlcnR5Il0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxTQUFQLE1BQXNCLFlBQXRCO0FBRUEsT0FBT0MsVUFBUCxNQUF1QixjQUF2QjtBQUVBLGVBQWVELFNBQVMsQ0FBQ0UsS0FBVixDQUFnQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQUMsRUFBQUEsR0FBRyxFQUFFRixVQUp3QjtBQUs3QjtBQUNBO0FBQ0FHLEVBQUFBLE9BQU8sRUFBRUosU0FBUyxDQUFDSztBQVBVLENBQWhCLENBQWY7QUFVQSxPQUFPLFNBQVNDLG1CQUFULENBQTZCQyxNQUE3QixFQUFxQztBQUMxQyxTQUNFQSxNQUFNLEtBQUtBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQixLQUF0QixLQUFnQ0QsTUFBTSxDQUFDQyxjQUFQLENBQXNCLFNBQXRCLENBQXJDLENBRFI7QUFHRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuaW1wb3J0IEZpZWxkVmFsdWUgZnJvbSBcIi4vRmllbGRWYWx1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9wVHlwZXMuc2hhcGUoe1xuICAvLyBBIHJhdyBmaWVsZCB2YWx1ZSwgbGlrZSAnSSBhbSBhIHJhdyByZXN1bHQnLCBvciAyLCBvciB0cnVlLiBSYXcgdmFsdWVzIG1heVxuICAvLyBvciBtYXkgbm90IGJlIGh0bWwgZXNjYXBlZCwgc28gKmFsd2F5cyogc2FuaXRpemUgYSByYXcgdmFsdWUgYmVmb3JlIHJlbmRlcmluZ1xuICAvLyBpdCBvbiBhIHBhZ2UgYXMgaHRtbC5cbiAgcmF3OiBGaWVsZFZhbHVlLFxuICAvLyBBIHNuaXBwZXQgdmFsdWUgY29udGFpbnMgYSBoaWdobGlnaHRlZCB2YWx1ZS4gSS5lLiwgJ0kgPGVtPmFtPC9lbT4gYSByYXdcbiAgLy8gcmVzdWx0Jy4gVGhlc2UgYXJlIGFsd2F5cyBzYW5pdGl6ZWQgYW5kIHNhZmUgdG8gcmVuZGVyIGFzIGh0bWwuXG4gIHNuaXBwZXQ6IFByb3BUeXBlcy5zdHJpbmdcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNGaWVsZFZhbHVlV3JhcHBlcihvYmplY3QpIHtcbiAgcmV0dXJuIChcbiAgICBvYmplY3QgJiYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShcInJhd1wiKSB8fCBvYmplY3QuaGFzT3duUHJvcGVydHkoXCJzbmlwcGV0XCIpKVxuICApO1xufVxuIl19
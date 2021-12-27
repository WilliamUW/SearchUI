import config from "../config/engine.json";
import myInitObject from "./myInitObject";
import displayRuntime from "../App";

/**
 * This file abstracts most logic around the configuration of the Reference UI.
 *
 * Configuration is an important part of the "reusability" and "generic-ness" of
 * the Reference UI, but if you are using this app as a starting point for own
 * project, everything related to configuration can largely be thrown away. To
 * that end, this file attempts to contain most of that logic to one place.
 */

export function read() {
  return myInitObject;
}

export function getConfig() {
  var t0 = performance.now();
  if (process.env.NODE_ENV === "test") {
    return {};
  }

  if (config.engineName) return config;

  if (
    typeof window !== "undefined" &&
    window.appConfig &&
    window.appConfig.engineName
  ) {
    return window.appConfig;
  }
  var t1 = performance.now();
  console.log("getConfig took " + (t1 - t0) + " milliseconds.");

  return {};
}

function toLowerCase(string) {
  if (string) return string.toLowerCase();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getTitleField() {
  // If no title field configuration has been provided, we attempt
  // to use a "title" field, if one exists
  return getConfig().titleField || "title";
}

export function getUrlField() {
  return getConfig().urlField;
}

export function getThumbnailField() {
  return getConfig().thumbnailField;
  //return "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg";
  //return "hi";
}

export function getFacetFields() {
  return getConfig().facets || [];
}

export function getSortFields() {
  return getConfig().sortFields || [];
}

export function getResultTitle(result) {
  const titleField = getTitleField();

  return result.getSnippet(titleField);
}

// Because if a field is configured to display as a "title", we don't want
// to display it again in the fields list
export function stripUnnecessaryResultFields(resultFields) {
  return Object.keys(resultFields).reduce((acc, n) => {
    if (
      [
        "_meta",
        "id",
        toLowerCase(getTitleField()),
        toLowerCase(getUrlField()),
        toLowerCase(getThumbnailField())
      ].includes(toLowerCase(n))
    ) {
      return acc;
    }

    acc[n] = resultFields[n];
    return acc;
  }, {});
}

export function buildSearchOptionsFromConfig() {
  var t0 = performance.now();

  const config = getConfig();
  const searchFields = (config.searchFields || config.fields || []).reduce(
    (acc, n) => {
      acc = acc || {};
      acc[n] = {};
      return acc;
    },
    undefined
  );

  const resultFields = (config.resultFields || config.fields || []).reduce(
    (acc, n) => {
      acc = acc || {};
      acc[n] = {
        raw: {},
        snippet: {
          size: 100,
          fallback: true
        }
      };
      return acc;
    },
    undefined
  );

  // for testing purposes allow any fields
  /*
  // We can't use url, thumbnail, or title fields unless they're actually
  // in the reuslts.
  if (config.urlField) {
    resultFields[config.urlField] = {
      raw: {},
      snippet: {
        size: 100,
        fallback: true
      }
    };
  }

  if (config.thumbnailField) {
    resultFields[config.thumbnailField] = {
      raw: {},
      snippet: {
        size: 100,
        fallback: true
      }
    };
  }

  if (config.titleField) {
    resultFields[config.titleField] = {
      raw: {},
      snippet: {
        size: 100,
        fallback: true
      }
    };
  }
  */

  const searchOptions = {};
  searchOptions.result_fields = resultFields;
  searchOptions.search_fields = searchFields;

  var t1 = performance.now();
  global.runtime = t1 - t0;
  console.log(
    "Call to buildSearchOptions took " + (t1 - t0) + " milliseconds."
  );

  return searchOptions;
}

export function buildFacetConfigFromConfig() {
  const config = getConfig();

  const facets = (config.facets || []).reduce((acc, n) => {
    acc = acc || {};
    acc[n] = {
      type: "value",
      size: 100
    };
    return acc;
  }, undefined);

  return facets;
}

export function buildSortOptionsFromConfig() {
  const config = getConfig();
  return [
    {
      name: "Relevance",
      value: "",
      direction: ""
    },
    ...(config.sortFields || []).reduce((acc, sortField) => {
      acc.push({
        name: `${capitalizeFirstLetter(sortField)} ASC`,
        value: sortField,
        direction: "asc"
      });
      acc.push({
        name: `${capitalizeFirstLetter(sortField)} DESC`,
        value: sortField,
        direction: "desc"
      });
      return acc;
    }, [])
  ];
}

export function buildAutocompleteQueryConfig() {
  const querySuggestFields = getConfig().querySuggestFields;
  if (
    !querySuggestFields ||
    !Array.isArray(querySuggestFields) ||
    querySuggestFields.length === 0
  ) {
    return {};
  }

  return {
    suggestions: {
      types: {
        documents: {
          fields: getConfig().querySuggestFields
        }
      }
    }
  };
}

import config from "../config/engine.json";

var truncateFields = ["0body_plain"];

/**
 * This file abstracts most logic around the configuration of the Reference UI.
 *
 * Configuration is an important part of the "reusability" and "generic-ness" of
 * the Reference UI, but if you are using this app as a starting point for own
 * project, everything related to configuration can largely be thrown away. To
 * that end, this file attempts to contain most of that logic to one place.
 */

var resultsFieldLength = 250;

export function getConfig() {
  var t0 = performance.now();
  var t1 = 0;
  if (process.env.NODE_ENV === "test") {
    t1 = performance.now();
    console.log("getConfig == test took " + (t1 - t0) + " milliseconds.");
    return {};
  }

  if (config.engineName) {
    t1 = performance.now();
    console.log("getConfig engine name took " + (t1 - t0) + " milliseconds.");
    return config;
  }

  if (
    typeof window !== "undefined" &&
    window.appConfig &&
    window.appConfig.engineName
  ) {
    t1 = performance.now();
    console.log(
      "getConfig app config not undefined took " + (t1 - t0) + " milliseconds."
    );
    return window.appConfig;
  }
  t1 = performance.now();
  console.log("getConfig empty took " + (t1 - t0) + " milliseconds.");
  return {};
}

/*
function toLowerCase(string) {
  if (string) return string.toLowerCase();
}
*/

function capitalizeFirstLetter(string) {
  string = string.replace("0", "");
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
  //return getConfig().thumbnailField;
  return "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg";
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
  return titleField;
  //return result.getSnippet(titleField);
}
/*
// Because if a field is configured to display as a "title", we don't want
// to display it again in the fields list
export function stripUnnecessaryResultFields(resultFields) {
  console.log("Strip function called");
  var t0 = performance.now();
  var output = Object.keys(resultFields).reduce((acc, n) => {
    // for every field/key in the email
    console.log("Acc: " + acc + " | n: " + n);
    if (
      // if key is part of list (special key)
      [
        "_meta",
        "id",
        toLowerCase(getTitleField()),
        toLowerCase(getUrlField()),
        toLowerCase(getThumbnailField())
      ].includes(toLowerCase(n))
    ) {
      return acc; // return it without changing
    }
    // otherwise, add resultField to output
    acc[n] = resultFields[n];
    return acc;
  }, {});
  var t1 = performance.now();
  console.log("stripUnnecessaryResultFields: " + (t1 - t0));
  return output;
}
*/

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
        raw: {}
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
        size: resultsFieldLength,
        fallback: true
      }
    };
  }

  if (config.thumbnailField) {
    resultFields[config.thumbnailField] = {
      raw: {},
      snippet: {
        size: resultsFieldLength,
        fallback: true
      }
    };
  }

  if (config.titleField) {
    resultFields[config.titleField] = {
      raw: {},
      snippet: {
        size: resultsFieldLength,
        fallback: true
      }
    };
  }
  */
  /*
  for (const index in truncateFields) {
    if (truncateFields[index]) {
      resultFields[truncateFields[index]] = {
        raw: {},
        snippet: {}
      };
    }
  }
  */

  // truncate body field to set length
  resultFields["0body_plain"] = {
    snippet: {
      size: resultsFieldLength,
      fallback: true
    }
  };

  const searchOptions = {};
  searchOptions.result_fields = resultFields;
  searchOptions.search_fields = searchFields;

  console.log(resultFields);

  var t1 = performance.now();
  console.log(
    "Call to buildSearchOptions took " + (t1 - t0) + " milliseconds."
  );

  // global.runtime = t1 - t0;

  return searchOptions;
}

export function buildFacetConfigFromConfig() {
  var t0 = performance.now();
  const config = getConfig();

  const facets = (config.facets || []).reduce((acc, n) => {
    acc = acc || {};
    acc[n] = {
      type: "value",
      size: resultsFieldLength
    };
    return acc;
  }, undefined);
  /*
  const facets = (config.facets || []).reduce((acc, n) => {
    acc = acc || {};
    acc[n] = {
      type: "value",
      size: resultsFieldLength
    };
    return acc;
  }, undefined);
  */

  var t1 = performance.now();
  console.log(
    "Call to buildFacetConfigFromConfig took " + (t1 - t0) + " milliseconds."
  );

  return facets;
}

export function buildSortOptionsFromConfig() {
  var t0 = performance.now();
  const config = getConfig();
  return [
    {
      name: "Relevance",
      value: "",
      direction: ""
    },
    ...(config.sortFields || []).reduce((acc, sortField) => {
      acc.push({
        name: `${capitalizeFirstLetter(sortField)} Ascending`,
        value: sortField,
        direction: "asc"
      });
      acc.push({
        name: `${capitalizeFirstLetter(sortField)} Descending`,
        value: sortField,
        direction: "desc"
      });
      var t1 = performance.now();
      console.log(
        "Call to buildSortOptionsFromConfig took " +
          (t1 - t0) +
          " milliseconds."
      );
      return acc;
    }, [])
  ];
}

export function buildAutocompleteQueryConfig() {
  var t0 = performance.now();
  const querySuggestFields = getConfig().querySuggestFields;
  if (
    !querySuggestFields ||
    !Array.isArray(querySuggestFields) ||
    querySuggestFields.length === 0
  ) {
    return {};
  }

  var t1 = performance.now();
  console.log(
    "Call to buildAutocompleteQueryConfig took " + (t1 - t0) + " milliseconds."
  );
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

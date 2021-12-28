import React from "react";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

import "../react-search-ui-views/lib/styles/styles.css";
// import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields
} from "./config/config-helper";
import { displayRuntime } from ".";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
  endpointBase
});
const config = {
  searchQuery: {
    facets: buildFacetConfigFromConfig(),
    ...buildSearchOptionsFromConfig()
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true
};

export default function App() {
  var t0 = performance.now();
  var result = (
    // searchprovider uses API config from engine.json
    // all imported from "@elastic/react-search-ui"
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ True }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  // Search box where you enter your search term
                  header={<SearchBox autocompleteSuggestions={true} />}
                  sideContent={
                    // sort and filter options on the right side
                    <div>
                      {
                        <Sorting // sort dropdown box
                          label={"Sort by"}
                          sortOptions={buildSortOptionsFromConfig()}
                        />
                      }
                      {getFacetFields().map((
                        field // filter fields
                      ) => (
                        <Facet key={field} field={field} label={field} />
                      ))}
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField={getConfig().titleField}
                      urlField={getConfig().urlField}
                      thumbnailField={getConfig().thumbnailField}
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {<PagingInfo />}
                      {<ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
  var t1 = performance.now();
  global.runtime = t1 - t0;
  displayRuntime();
  return result;
}

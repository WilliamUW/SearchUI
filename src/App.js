
import {
  ErrorBoundary,
  Facet, Paging,
  //Results,
  PagingInfo,
  ResultsPerPage, SearchBox, SearchProvider, Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Avatar, Card, Modal } from "antd";
import "antd/dist/antd.css";
import React, { useState } from 'react';
import "./additional.css";
import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields
} from "./config/config-helper";
import Item from "./Item"


const { Meta } = Card;








// make modal class


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
console.log("Config");
console.log(config);

var displayStringLength = 100;

const innerFormat = (string) => {
  var input = string;
  if (input.length > displayStringLength) {
    input = input.substring(0, displayStringLength) + "...";
  }
  return input.replace(/em/g, "mark");
}

export default function App() {
  var wasSearched = true;
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ results }) => ({ results })}>
        {({ results }) => {

          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox autocompleteSuggestions={true} />}
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting
                          label={"Sort by"}
                          sortOptions={buildSortOptionsFromConfig()}
                        />
                      )}

                      {getFacetFields().map((field) => (
                        <Facet // where all the filters are stored
                          key={field}
                          field={field}
                          label={field}
                          filterType="any"
                          isFilterable={true}
                        />
                      ))}
                    </div>
                  }
                  // the results are stored here\

                  bodyContent={
                    //

                    <div className="App">
                      <br />

                      {results.map(r=>
                      <ErrorBoundary>
                        <Item r={r}/>
                        </ErrorBoundary>
                        )}

                    </div>
                  }
                  // Result header (e.g. "showing 1-20 out of 1037")
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
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
}


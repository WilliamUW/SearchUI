import {
  ErrorBoundary,
  Facet,
  Paging,
  PagingInfo,
  ResultsPerPage,
  SearchBox,
  SearchProvider,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { Card } from "antd";
import "antd/dist/antd.css";
import React from "react";
import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields
} from "./config/config-helper";
import Item from "./Item";
import "./styles/additional.css";
import "./styles/Dashboard.css";


const { Meta } = Card;

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



  var wasSearched = true;
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ results }) => ({ results })}>
        {({ results }) => {
          return (
            <div
              className="App"
              id="reactAppDiv"
              // style={{ visibility: "hidden" }}
            >
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

                      {results.map((r) => (
                        <ErrorBoundary>
                          <Item r={r} />
                        </ErrorBoundary>
                      ))}
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

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
  WithSearch,
  Showing,
  Filtering,
  Footer,
  Header,
  ModalProvider
} from "@elastic/react-search-ui";

// import { Result } from "./react-search-ui-view/lib/index";

import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
  buildAutocompleteQueryConfig, // search auto complete
  buildFacetConfigFromConfig, // filters
  buildSearchOptionsFromConfig, //
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields
} from "./config/config-helper";

import { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

import { Card } from "antd";

const ModalAppTest = (param) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Email Modal
      </Button>
      <Modal
        title="Test Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Content 1</p>
        <p>This is a test.</p>
        <p>Value: {param}</p>
      </Modal>
    </>
  );
};

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
/* game App function

export default function App() {
  return (
    <SearchProvider config={config}>
      <ModalProvider>
        <Header />
        <Layout
          bodyContent={<Results view={Games} renderResult={Game} />}
          sideContent={<Filtering />}
          bodyHeader={<Showing />}
          bodyFooter={<Paging />}
        />
        <Footer />
      </ModalProvider>
    </SearchProvider>
  );
}
*/

export default function App() {
  var wasSearched = false;
  return (
    /*
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ result }) => ({ result })}>
        {({ result }) => {
          console.log("result");
          console.log(result);
          return <div className="App"></div>;
        }}
      </WithSearch>
    </SearchProvider>
    */
    /* working results
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ results }) => ({
          results
        })}
      >
        {({ results }) => {
          console.log("results");
          console.log(results);
          return (
            <div className="App">
              {results.map((r) => (
                <div key={r.id.raw}>
                  <Card style={{ width: 3000 }}>
                    {
                      // console.log(r) // log current email
                    }
                    <h1>Email Title {r.subject.raw}</h1>
                    <h2>Email Subtitle {r.from.raw}</h2>
                    <p>Card content 1: {r.stripped_text.snippet}</p>
                    <p>Card content 2: {r.stripped_html.snippet}</p>
                    <p>Card content 3: {r.date.raw}</p>
                    <ModalAppTest
                      param={10}
                      // result: {r}
                    />
                  </Card>
                  <br />
                </div>
              ))}
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
    */
    // {results != null ? (wasSearched = true) : (wasSearched = false)}

    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ results }) => ({ results })}>
        {({ results }) => {
          console.log("wasSearched");
          console.log(wasSearched);
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
                      <br />
                      <br />
                      <p>Filter by Fields below!</p>

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
                      {results.map((r) => (
                        <div key={r.id.raw}>
                          <Card style={{ width: 3000 }}>
                            {
                              // console.log(r) // log current email
                            }
                            <h1>Email Title {r.subject.raw}</h1>
                            <h2>Email Subtitle {r.from.raw}</h2>
                            <p>Card content 1: {r.stripped_text.snippet}</p>
                            <p>Card content 2: {r.stripped_html.snippet}</p>
                            <p>Card content 3: {r.date.raw}</p>
                            <ModalAppTest
                              param={10}
                              // result: {r}
                            />
                          </Card>
                          <br />
                        </div>
                      ))}
                    </div>

                    /*
                    <Results
                      view={(wasSearched) => {
                        console.log(wasSearched);
                        console.log(wasSearched.children);
                        return (
                          <>
                            {wasSearched.map((x) => (
                              <>
                                <div>
                                  <Card style={{ width: 300 }}>
                                    <h1>Email Title {x.subject.raw}</h1>
                                    <h2>Email Subtitle</h2>
                                    <p>Card content 1</p>
                                    <p>Card content 2</p>
                                    <p>Card content 3</p>
                                    <ModalAppTest />
                                  </Card>
                                </div>
                              </>
                            ))}
                          </>
                        );
                      }}
                      renderResult={(wasSearched) => <>test render</>}
                    />
                    */
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
/*
 <div>
                      <p>Body Content Start</p>
                      <Results
                        titleField={getConfig().titleField}
                        urlField={getConfig().urlField}
                        thumbnailField={getConfig().thumbnailField}
                        shouldTrackClickThrough={true}
                      />
                      <p>Body Content End</p>
                    </div>
                    */

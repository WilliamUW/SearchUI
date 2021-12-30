import React from "react";
import ReactDOM from "react-dom";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  //Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";

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

// import { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

import { Card } from "antd";

// make modal class

const ModalAppTest = (r) => {
  var isModalVisible = true;

  /*
  const showModal = () => {
    isModalVisible = true;
  };
  */

  async function handleOk() {
    isModalVisible = false;
    ReactDOM.render("", document.getElementById(r.id.raw));
  }

  const handleCancel = () => {
    isModalVisible = false;
    ReactDOM.render("", document.getElementById(r.id.raw));
  };

  // console.log(r);
  r = r.r;
  /*
  <Modal
        id="test"
        title="Test Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1>{r.subject.raw}</h1>
        <h4>{r.from.raw}</h4>
        <p>{new Date(r.date.raw).toDateString()}</p>
        <p>{r.stripped_text.snippet}</p>
      </Modal>
      var srcHtml =
    "<html><div><h1>" +
    r.subject.raw +
    "</h1><h4>" +
    r.from.raw +
    "</h4><p>" +
    r.date.raw +
    "</p><p>" +
    r.stripped_text.snippet +
    "</p></div></html>";
      */

  var bodyHtml = r.stripped_html.raw;

  return (
    <>
      <Modal
        id="test"
        title="Test Modal"
        style={{ width: "80em" }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1>{r.subject.raw}</h1>
        <h4>From: {r.from.raw}</h4>
        <p>Date: {new Date(r.date.raw).toDateString()}</p>
        <iframe
          srcDoc={bodyHtml}
          style={{ width: "35em", height: "20em" }}
          title="Test iframe"
          id="iframe"
        ></iframe>
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

export default function App() {
  var wasSearched = true;
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ results }) => ({ results })}>
        {({ results }) => {
          console.log("wasSearched");
          console.log(wasSearched);
          //results.map((r) => modals.push(ModalAppTest(r.subject.raw)));
          //console.log(modals[0]);
          console.log("Config after loading results");
          console.log(config);
          // console.log(document.getElementById("downshift-0-input").textContent)
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
                      <br />

                      {results.map((r) => (
                        <div
                          key={r.id.raw}
                          // onClick={() => displayFullEmail(r)}
                        >
                          <Card style={{ width: "auto" }}>
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "0"
                              }}
                            >
                              <span>
                                <strong>{r.from.snippet.split("<")[0]}</strong>
                              </span>
                              <span style={{ color: "grey" }}>
                                {r.date.raw}
                              </span>
                            </p>

                            <h3>{r.subject.snippet}</h3>

                            <p style={{ color: "grey" }}>
                              {r.stripped_text.snippet + "..."}
                            </p>

                            <Button
                              type="primary"
                              onClick={() => displayFullEmail(r)}
                            >
                              Open Email Modal
                            </Button>
                            <div
                              id={r.id.raw} // style={"padding"=24px}
                            />
                            <script>
                              var mountNode =
                              document.getElementById('container');
                            </script>
                          </Card>
                          <br />
                        </div>
                      ))}
                      <script>
                        var mountNode = document.getElementById('container');
                      </script>
                    </div>

                    /*
                    <Results
                      view={(results) => {
                        console.log(results);
                        return (
                          <>
                            {results.map((x) => (
                              <>
                                <div key={x.id.raw}>
                                  <Card style={{ width: 300 }}>
                                    <h1>Email Title {x.subject.raw}</h1>
                                    <h2>Email Subtitle</h2>
                                    <p>Card content 1</p>
                                    <p>Card content 2</p>
                                    <p>Card content 3</p>
                                  </Card>
                                </div>
                              </>
                            ))}
                          </>
                        );
                      }}
                    />
                    */
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

export function displayFullEmail(r) {
  console.log(document.getElementById(r.id.raw));
  ReactDOM.render(<ModalAppTest r={r} />, document.getElementById(r.id.raw));
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

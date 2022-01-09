import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { Avatar, Card, Modal } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";
import "./additional.css";
import { Button, Radio } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";

const { Meta } = Card;

const defaultIconUrl = "https://logo.clearbit.com/www.somm.ai";

const dateFormat = (input) => {
  if (!input) {
    return;
  }
  var ms = Date.parse(input); // parse date string
  var dateParsed = new Date(ms);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  };

  // dateParsed = dateParsed.toDateString(); // to readable date string
  dateParsed = dateParsed.toLocaleString("en-us", options); // to local readable date string

  return dateParsed;
};

function bodyPreviewFormat(input) {
  if (!input) {
    return;
  }
  // console.log("Before preview format: " + input);
  var linkSign = "ThisIsALink";
  // console.log("Remove Links called");
  var links = input.match(/(?:www|https?)[^\s]+/g);
  // console.log(links);
  var index = 0;
  input = input.replace(/(?:www|https?)[^\s]+/g, "");
  input = input.replace(/&[^;]*;/g, ""); // remove special characters
  input = input.replace(/[\s]+/g, " "); // limit whitespace to one space
  input = input.replace(/[-]+/g, "-"); // limit repeated hyphen to one
  input = input.replace(/\[[^\s]+\(</, "Square");
  // input = input.replace(/(?:www|https?)[^\s]+/g, "");
  // console.log("After preview format: " + input);
  return input;
}

const emailFormat = (email) => {
  if (!email) {
    return;
  }
  // console.log(email);
  // console.log(email.slice(email.length - 4));
  if (email.slice(email.length - 4) !== "&gt;") {
    email += "&gt;"; // add closing bracket if not there already
  }
  email = email.replace(/&quot;/g, ""); // remove " in email
  // console.log("Changed email: " + email);
  return email;
};

// logo source url formatter
function logoSourceFormat(input) {
  if (!input) {
    return defaultIconUrl;
  }
  var url = "https://logo.clearbit.com/" + input.split("@")[1].split(">")[0];
  url = url.replace(/&gt;/g, "");
  // console.log(url);
  //console.log(result);
  return url;
}

const innerFormat = (string) => {
  var input = string;
  if (!input) {
    return;
  }
  // remove everything between circle brackets
  input = input.replace(/ *\([^)]*\) */g, "");

  // remove everything between ( and ]
  //input = input.replace(/ *\([^)]*$ */g, "");

  // remove leftover (
  input = input.replace(/\(/g, "");

  // remove everything between [ and ]
  // input = input.replace(/\[.*\]/g, "");

  input = input.replace(/\[/g, "");
  input = input.replace(/\]/g, ""); // remove leftover square brackets
  input = input.replace(/d@mg.glas.vin/g, "");
  return <span dangerouslySetInnerHTML={{ __html: input }} />;
};

class Item extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      isModalVisible: false
    };
  }

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleOk = () => {
    this.setSstate({ isModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  render() {
    let r = this.props.r;
    // console.log(bodyPreviewFormat(r.body_plain.snippet));
    return (
      <div>
        <a onClick={this.showModal}>
          <Card
            style={{ width: "auto" }}
            title={r.subject && innerFormat(r.subject.snippet)}
            extra={r.date && dateFormat(r.date.snippet)}
          >
            <Meta
              avatar={
                <Avatar
                  src={logoSourceFormat(r.from.snippet)}
                  alt="From Avatar Logo"
                  icon={<UserOutlined />}
                >
                  U
                </Avatar>
              }
              title={r.from && innerFormat(emailFormat(r.from.snippet))}
              description={
                r.body_plain &&
                innerFormat(bodyPreviewFormat(r.body_plain.snippet))
              }
            />
          </Card>
          <br />
        </a>

        <Modal
          id="test"
          title={innerFormat(r.subject.snippet)}
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1000}
          centered
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>
              <Avatar
                src={logoSourceFormat(r.from.snippet)}
                alt="From Avatar Logo for Modal"
                icon={<UserOutlined />}
              />
              {innerFormat(emailFormat(" " + r.from.snippet))}
            </div>
            {dateFormat(r.date.snippet)}
          </div>

          <br />

          {r.stripped_html && r.stripped_html.raw && (
            <iframe
              srcDoc={r.stripped_html.raw
                .replace(/href=".+?"/g, "")
                .replace(/d@mg.glas.vin/g, "")}
              style={{ width: "100%", height: "60vh", display: "block" }}
              title="Email Body iframe"
              id="iframe"
              alt="iFrame for Modal"
            ></iframe>
          )}
          <br />
          {showAttachment(r.mailgunattachments)}
        </Modal>
      </div>
    );
  }
}

function showAttachment(input) {
  if (!input) {
    // no attachment
    return; // return nothing
  }
  return (
    <div>
      <a href={"https://" + input.raw} title={"https://" + input.raw}>
        <Button
          type="primary"
          shape="round"
          icon={<LinkOutlined />}
          size={"large"}
          float="center"
        >
          {input ? input.raw : ""}
        </Button>
      </a>
    </div>
  );
}

export default Item;

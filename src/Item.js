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

const emailFormat = (email) => {
  if (!email) {
    return;
  }
  // console.log(email);
  // console.log(email.slice(email.length - 4));
  if (email.slice(email.length - 4) !== "&gt;") {
    email += "&gt;"; // add closing bracket if not there already
  }
  // console.log("Changed email: " + email);
  return email;
};

// logo source url formatter
function logoSourceFormat(input) {
  if (!input) {
    return defaultIconUrl;
  }
  var url = "https://logo.clearbit.com/" + input.split("@")[1].split(">")[0];
  url.replace("&gt;", "");
  console.log(url);
  //console.log(result);
  return url;
}

const innerFormat = (string) => {
  var input = string;
  if (!input) {
    return;
  }
  input = input.replace(/ *\([^)]*\) */g, "");
  input = input.replace(/ *\([^)]*$ */g, "");
  input = input.replace(/\[.*\]/g, "");
  input = input.replace(/d@mg.glas.vin/g, "");
  return <span dangerouslySetInnerHTML={{ __html: input }} />;
};

function checkURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

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
              description={r.body_plain && innerFormat(r.body_plain.snippet)}
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

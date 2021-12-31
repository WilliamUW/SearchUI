

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { Avatar, Card, Modal } from "antd";
import "antd/dist/antd.css";
import React, { Component } from 'react';
import "./additional.css";




const { Meta } = Card;



const innerFormat = (string) => {
  var input = string;
  input = input.replace(/ *\([^)]*\) */g, "")
  input = input.replace(/ *\([^)]*$ */g, "")
  input = input.replace(/\[.*\]/g, '')
  input = input.replace(/d@mg.glas.vin/g, "")
  return <span dangerouslySetInnerHTML={{__html:input}}/>;
}


class Item extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      isModalVisible: false
    }
  }


  
  showModal = () => {
    this.setState({isModalVisible:true})
  };

  handleOk = () => {
    this.setSstate({isModalVisible:false})
  };

  handleCancel = () => {
    this.setState({isModalVisible:false})
  };
  render() {

    let r = this.props.r
    return (

      <div>
          <a
          onClick={this.showModal}

          >
            <Card style={{ width: "auto" }}
            title={r.subject&&innerFormat(r.subject.snippet)} extra={r.date&&r.date.snippet}
            >
            <Meta
          avatar={<Avatar src={"https://logo.clearbit.com/"+r.from.snippet.split('@')[1].split('>')[0]} />}
          title={r.from&&innerFormat(r.from.snippet)}
          description={r.body_plain&&innerFormat(r.body_plain.snippet)}
        />
    
    
    
    
    
            </Card>
            <br />
          </a>
    
          <Modal
            id="test"
            title={innerFormat(r.subject.snippet)}
            // style={{ width: "80em" }}
            visible={this.state.isModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={1000}
            centered
          >
            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0"
              }}
            >
              {innerFormat(r.from.snippet)}
              {innerFormat(r.date.snippet)}
            </p>
    
            
            
            {r.stripped_html&&<iframe
              srcDoc={r.stripped_html.raw.replace(/href=".+?"/g,"").replace(/d@mg.glas.vin/g, "")}
              style={{ width: "100%", height: "60vh", display: "block" }}
              title="Email Body iframe"
              id="iframe"
            ></iframe>}
            <p>{r.mailgunattachments ? r.mailgunattachments.raw : ""}</p>
          </Modal>
      </div>
    );
  }
}

export default Item;


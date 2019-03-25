import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Input, Button } from "antd";
import download from 'downloadjs';
import utils from '../utils';

class InterfaceTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ts: '',
      rootName: 'Root'
    }
  }
  async componentDidMount() {
    const { match: { params: { actionId } } } = this.props;
    const { data: { res_body: schema, path } } = await utils.getApiDetail(actionId);
    const rootName = utils.pathToTypeName(path);
    const data = await utils.translate(schema, rootName);
    this.setState({
      rootName,
      ts: data.ts
    });
  }
  handleDownload = () => {
    download(this.state.ts, `${this.state.rootName}.ts`);
  };
  render() {
    return (
      <div style={{ padding: '1em' }}>
        <Card>
          <Button
            icon={'download'}
            onClick={this.handleDownload}
            style={{ marginBottom: '1em' }}
          >
            下载文件
          </Button>
          <Input.TextArea value={this.state.ts} rows={20} />
        </Card>
      </div>
    );
  }
}

export default withRouter(InterfaceTab);
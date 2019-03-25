import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Modal, Input, Button, Tabs, Card, Spin } from 'antd';
import download from 'downloadjs';
import ApiTable from "./components/ApiTable";
import utils from '../utils';

class SubNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      ids: [] // Api id array
    }
  }
  handleTranslate = async () => {
    this.setState({ loading: true });
    const result = await Promise.all(this.state.ids.map(e => utils.translateByApi(e)));
    this.setState({ loading: false });
    const content = result.map(e => e.ts).join('\n\n');
    Modal.success({
      width: '80%',
      okText: '关闭',
      content: (
        <div>
          <a onClick={() => {
            const filename = prompt('文件名', 'types');
            if (!filename) return;
            download(content, `${filename}.ts`);
          }}
          ><Icon type={'download'} />下载</a>
          <div style={{ height: 10 }} />
          <Input.TextArea
            rows={22}
            value={content}
          />
        </div>
      )
    })
  };
  render() {
    return (
      <Spin spinning={this.state.loading}>
        <Card style={{ margin: '1em' }}>
          <Tabs type={'card'}>
            <Tabs.TabPane tab={'响应 -> 声明'} key={'r2t'}>
              <div style={{ height: '1em' }} />
              <Button onClick={this.handleTranslate} disabled={!this.state.ids.length}>GO!</Button>
              <div style={{ height: '1em' }} />
              <ApiTable onChange={ids => this.setState({ ids })} />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Spin>
    );
  }
}

export default withRouter(SubNav);

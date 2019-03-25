import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Table, Tag } from 'antd';
import axios from 'axios';

const MethodColor = {
  GET: 'green',
  POST: 'blue',
  DELETE: 'red'
};
class ApiTable extends React.Component {
  static propTypes = {
    match: PropTypes.any,
    onChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false,
      selectedKeys: []
    }
  }
  async componentDidMount() {
    this.setState({ loading: true });
    const { id } = this.props.match.params;
    const { data: { data: { list } } } = await axios.get('/api/interface/list', {
      params: { project_id: id, limit: 10000 }
    });
    this.setState({ dataSource: list, loading: false });
  }
  render() {
    return (
      <Table
        loading={this.state.loading}
        rowSelection={{
          onChange: keys => {
            this.setState({ selectedKeys: keys });
            this.props.onChange(keys);
          },
          selectedRowKeys: this.state.selectedKeys
        }}
        rowKey={'_id'}
        dataSource={this.state.dataSource}
        size={'middle'}
      >
        <Table.Column title={'接口名称'} dataIndex={'title'} />
        <Table.Column
          title={'路径'}
          dataIndex={'method'}
          render={(m, { path }) => {
            return (
              <span>
                <Tag color={MethodColor[m]}>{m}</Tag>
                {path}
              </span>
            )
          }}
        />
      </Table>
    );
  }
}

export default withRouter(ApiTable);
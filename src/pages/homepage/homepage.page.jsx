import React, { useEffect, useState } from 'react';
import reqwest from 'reqwest';

import { Row, Col, Checkbox, Radio, Table, Menu, Dropdown, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import WorldCupTable from './../../components/table/table.component';

const Homepage = () => {
  const [tableState, setTableState] = useState({
    data: [],
    loading: true,
    language: 0,
    showRed: false,
    showYellow: false
  });

  const fetchData = () => {
    setTableState({ loading: true });
    reqwest({
      url: '/worldcup.data.json',
      method: 'get',
      type: 'json',
    }).then(data => {
      setTableState({
        ...tableState,
        loading: false,
        data: data.results,
      })
    });
  };

  useEffect(() => {
    fetchData();
    console.log('render')
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">主队进球+1</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">主队红牌+1</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="http://www.taobao.com/">主队黄牌+1</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a href="http://www.alipay.com/">客队进球+1</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a href="http://www.taobao.com/">客队红牌+1</a>
      </Menu.Item>
      <Menu.Item key="5">
        <a href="http://www.taobao.com/">客队黄牌+1</a>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: '赛事',
      dataIndex: 'league',
      render: (league) => `${league[tableState.language]}`,
      width: '5%',
    },
    {
      title: '时间',
      dataIndex: 'matchDateAndTime',
      render: (text, record) => `${record.matchDate} ${record.matchTime}`,
      width: '5%',
    },
    {
      title: '主队',
      dataIndex: 'home',
      render: (text, record) => 
        <div>
          <Badge count={record.homeYellow} style={{ display: tableState.showYellow ? 'block' : 'none', borderRadius: 2, color: 'black', backgroundColor: 'yellow', marginRight: 4, paddingTop: 2 }} />
          <Badge count={record.homeRed} style={{ display: tableState.showRed ? 'block' : 'none', borderRadius: 2, color: 'white', backgroundColor: 'red', marginRight: 4, paddingTop: 2  }} />
          {record.home[tableState.language]}
        </div>,
      width: '5%',
    },
    {
      title: '全场比分',
      dataIndex: 'homeScoreAndGuestScore',
      render: (text, record) => `${record.homeScore} - ${record.guestScore}`,
      width: '5%',
    },
    {
      title: '客队',
      dataIndex: 'guest',
      render: (text, record) => 
      <div>
        <Badge className='yellow-badge badge' count={record.guestYellow} style={{ display: tableState.showYellow ? 'block' : 'none', borderRadius: 2, color: 'black', backgroundColor: 'yellow', marginRight: 4, paddingTop: 2 }} />
        <Badge className='red-badge badge' count={record.guestRed} style={{ display: tableState.showRed ? 'block' : 'none', borderRadius: 2, color: 'white', backgroundColor: 'red', marginRight: 4, paddingTop: 2  }} />
        {record.guest[tableState.language]}
      </div>,
      width: '5%',
    },
    {
      title: '半场比分',
      dataIndex: 'homeHalfScoreAndGuestHalfScore',
      render: (text, record) => `${record.homeHalfScore} - ${record.guestHalfScore}`,
      width: '5%',
    },
    {
      title: '本地模拟',
      dataIndex: 'operation',
      render: () => (
        <Dropdown overlay={menu} trigger={['click']}>
          <a onClick={e => e.preventDefault()}>
            模拟 <DownOutlined />
          </a>
        </Dropdown>
      ),
      width: '5%',
    }
  ];

  const onRedChange = checked => {
    setTableState({
      ...tableState,
      showRed: checked
    })
  }

  const onYellowChange = checked => {
    setTableState({
      ...tableState,
      showYellow: checked
    })
  }

  const onLanguageChange = value => {
    setTableState({
      ...tableState,
      language: value
    });
  }

  return (
    <div>
      <Row style={{ marginBottom: 24 }}>
        <Col span={18} offset={3}>
          <Checkbox onChange={ e => onYellowChange(e.target.checked) } >显示黄牌</Checkbox>
          <Checkbox onChange={ e => onRedChange(e.target.checked) } >显示红牌</Checkbox>
          <Radio.Group defaultValue={0} size="default" style={{ marginLeft: 16 }} onChange={ e => onLanguageChange(e.target.value) } >
            <Radio.Button value={0} >简体</Radio.Button>
            <Radio.Button value={1} >繁体</Radio.Button>
            <Radio.Button value={2} >English</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <Table
            columns={columns}
            rowKey={record => record.matchId}
            dataSource={tableState.data}
            loading={tableState.loading}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Homepage;

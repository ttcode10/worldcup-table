import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import reqwest from 'reqwest';

const WorldCupTable = () => {
  const [tableState, setTableState] = useState({
    data: [],
    loading: false
  })

  const fetchData = () => {
    setTableState({ loading: true });
    reqwest({
      url: '/worldcup.data.json',
      method: 'get',
      type: 'json',
    }).then(data => {
      setTableState({
        loading: false,
        data: data.results
      });
    });
  };

  useEffect(() => {
    fetchData()
  }, []);

  const columns = [
    {
      title: '赛事',
      dataIndex: 'league',
      render: league => `${league[0]}`,
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
      render: home => `${home[0]}`,
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
      render: guest => `${guest[0]}`,
      width: '5%',
    },
    {
      title: '半场比分',
      dataIndex: 'homeHalfScoreAndGuestHalfScore',
      render: (text, record) => `${record.homeHalfScore} - ${record.guestHalfScore}`,
      width: '5%',
    }
  ];


  return (
    <Table
      columns={columns}
      rowKey={record => record.matchId}
      dataSource={tableState.data}
      loading={tableState.loading}
      pagination={false}
    />
  );
}

export default WorldCupTable;


// "results": [
//   {
//     "matchDate": "06-14",
//     "matchDateTime": "2018,5,15,00,06,00",
//     "homeScore": "5",
//     "guestYellow": "1",
//     "leagueColor": "#660000",
//     "league": [
//       "世界杯",
//       "世界盃",
//       "World Cup"
//     ],
//     "homeCorner": "0",
//     "guestRank": "67",
//     "matchTime": "23:00",
//     "homeYellow": "1",
//     "home": [
//       "俄罗斯",
//       "俄羅斯",
//       "Russia"
//     ],
//     "guestRed": "0",
//     "homeRank": "66",
//     "guestScore": "0",
//     "homeRed": "0",
//     "leagueId": "75",
//     "matchYear": "2018",
//     "guestCorner": "0",
//     "guest": [
//       "沙特阿拉伯",
//       "沙地阿拉伯",
//       "Saudi Arabia"
//     ],
//     "homeHalfScore": "2",
//     "matchId": 1482823,
//     "status": -1,
//     "guestHalfScore": "0"
//   },
import React from 'react';

import { Row, Col } from 'antd';
import WorldCupTable from './../../components/table/table.component';

const Homepage = () => {
  return (
    <div>
      <Row>
        <Col span={18} offset={3}>
          <WorldCupTable />
        </Col>
      </Row>
    </div>
  );
}

export default Homepage;

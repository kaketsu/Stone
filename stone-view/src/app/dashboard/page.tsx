'use client'

import { Dashboard } from '@/types/index'
import { getDashboard } from '@/utils/service'
import { Column } from '@ant-design/plots'
import { Card, Col, Row, Statistic, Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

export default function DashboardPage() {
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([])
  const [currentTab, setCurrentTab] = useState('tab1')
  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    getDashboard().then((data) => {
      setDashboardList(data)
    })
  }

  const config = {
    data: dashboardList,
    xField: 'date',
    yField: 'tradingVolume',
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    slider: {
      start: 0.1,
      end: 0.2,
    },
  }

  const tabList = [
    {
      key: 'tab1',
      tab: 'tab1',
    },
    {
      key: 'tab2',
      tab: 'tab2',
    },
  ]

  const contentList: any = {
    tab1: (
      <div>
        <Column {...config} />
      </div>
    ),
    tab2: <p>content2</p>,
  }

  const columns = useMemo(() => {
    return [
      {
        title: 'date',
        dataIndex: 'date',
        key: 'date',
        width: 120,
        render: (val: string) => {
          return dayjs(val).format('YYYY-MM-DD')
        },
      },
      {
        title: 'tradingVolume',
        dataIndex: 'tradingVolume',
        key: 'tradingVolume',
      },
      {
        title: 'limitUpCount1',
        dataIndex: 'limitUpCount1',
        key: 'limitUpCount1',
      },
      {
        title: 'limitUpCount2',
        dataIndex: 'limitUpCount2',
        key: 'limitUpCount2',
      },
      {
        title: 'limitUpCount3',
        dataIndex: 'limitUpCount3',
        key: 'limitUpCount3',
      },
      {
        title: 'limitUpCountBeforeCallAuction',
        dataIndex: 'limitUpCountBeforeCallAuction',
        key: 'limitUpCountBeforeCallAuction',
      },
      {
        title: 'limitDownCount1',
        dataIndex: 'limitDownCount1',
        key: 'limitDownCount1',
      },
      {
        title: 'limitDownCount2',
        dataIndex: 'limitDownCount2',
        key: 'limitDownCount2',
      },
      {
        title: 'limitDownCount3',
        dataIndex: 'limitDownCount3',
        key: 'limitDownCount3',
      },
      {
        title: 'limitDownCountBeforeCallAuction',
        dataIndex: 'limitDownCountBeforeCallAuction',
        key: 'limitDownCountBeforeCallAuction',
      },
      {
        title: 'redStockCount',
        dataIndex: 'redStockCount',
        key: 'redStockCount',
      },
    ]
  }, [])

  useEffect(() => {}, [])

  return (
    <div>
      <Card style={{ width: '100%' }} title="Dashboard" bordered={false}>
        <Table
          columns={columns}
          dataSource={dashboardList}
          scroll={{ x: 'max-content' }}
          expandable={{
            expandedRowRender: (record: any) => {
              return (
                <Row gutter={16}>
                  <Col span={4}>
                    <Statistic
                      title="tradingVolume1"
                      value={record.tradingVolume1}
                      valueStyle={{
                        fontSize: 16,
                      }}
                    />
                  </Col>
                  <Col span={4}>
                    <Statistic
                      title="tradingVolume2"
                      value={record.tradingVolume2}
                      valueStyle={{
                        fontSize: 16,
                      }}
                    />
                  </Col>
                  <Col span={4}>
                    <Statistic
                      title="tradingVolume2"
                      value={record.tradingVolume3}
                      valueStyle={{
                        fontSize: 16,
                      }}
                    />
                  </Col>
                </Row>
              )
            },
            // rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
        />
      </Card>
      {/* <Card
        style={{ width: '100%' }}
        title="Card title"
        tabList={tabList}
        activeTabKey={currentTab}
        onTabChange={(key) => {
          setCurrentTab(key)
        }}
      >
        {contentList[currentTab]}
      </Card> */}
    </div>
  )
}

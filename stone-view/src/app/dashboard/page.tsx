'use client'

import { Dashboard } from '@/types/index'
import { DATE_FORMAT } from '@/utils/constants'
import { crawlDashboardByDate, getAllDashboards, getDashboardByDate } from '@/utils/service'
import { CalendarOutlined } from '@ant-design/icons'
import { Column } from '@ant-design/plots'
import { Button, Card, Col, Row, Space, Statistic, Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import styles from './style.module.scss'

export default function DashboardPage() {
  const currentDate = dayjs().format(DATE_FORMAT)

  const [loading, setLoading] = useState<boolean>(false)
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([])
  const [currentBoard, setCurrentBoard] = useState<Dashboard>()

  const [currentTab, setCurrentTab] = useState('tab1')
  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    setLoading(true)
    getAllDashboards().then((data) => {
      setDashboardList(data)
      setLoading(false)
    })
    getDashboardByDate(currentDate).then((current) => {
      setCurrentBoard(current)
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

  const calStatisticsValue = (val: number | undefined) => {
    if (!val) return ''
    if (val < 0) {
      return styles.green
    } else {
      return styles.red
    }
  }

  const crawlDashboard = () => {
    const res = crawlDashboardByDate(currentDate)
  }
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <CalendarOutlined className="text-2xl" style={{ color: '#4099ff' }} />
          <span className="ml-2">{currentDate}</span>
        </div>
        <Button type="primary" onClick={crawlDashboard} size="small">
          Crawl Dashboard
        </Button>
      </div>

      {currentBoard && (
        <Space className="mb-4 flex !items-start">
          <Card className="flex-1">
            <Row gutter={[16, 16]} className={styles.boardStatistic}>
              <Col span={12}>
                <Statistic
                  title="上证指数"
                  className={calStatisticsValue(currentBoard?.percentageChange1)}
                  value={currentBoard?.percentageChange1}
                  suffix={'%'}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="深圳指数"
                  className={calStatisticsValue(currentBoard?.percentageChange2)}
                  value={currentBoard?.percentageChange2}
                  suffix={'%'}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="创业板指数"
                  className={calStatisticsValue(currentBoard?.percentageChange3)}
                  value={currentBoard?.percentageChange3}
                  suffix={'%'}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="北证50"
                  className={calStatisticsValue(currentBoard?.percentageChange4)}
                  value={currentBoard?.percentageChange4}
                  suffix={'%'}
                />
              </Col>
            </Row>
          </Card>

          <Card className="flex-1">
            <Row gutter={[16, 16]} className={styles.boardStatistic}>
              <Col span={16}>
                <Statistic
                  title="涨停个数"
                  loading={loading}
                  value={currentBoard?.limitUpCount1 + currentBoard?.limitUpCount2 + currentBoard?.limitUpCount3}
                />
              </Col>

              <Col span={6}>
                <Statistic title="1字涨停" value={currentBoard?.limitUpCountBeforeCallAuction} />
              </Col>

              <Col span={8}>
                <Statistic title="10%" value={currentBoard?.limitUpCount1} />
              </Col>
              <Col span={8}>
                <Statistic title="20%" value={currentBoard?.limitUpCount2} />
              </Col>
              <Col span={8}>
                <Statistic title="30%" value={currentBoard?.limitUpCount3} />
              </Col>
            </Row>
          </Card>

          <Card className="flex-1">
            <Row gutter={[16, 16]} className={styles.boardStatistic}>
              <Col span={16}>
                <Statistic
                  loading={loading}
                  title="跌停个数"
                  value={currentBoard?.limitDownCount1 + currentBoard?.limitDownCount2 + currentBoard?.limitDownCount3}
                />
              </Col>

              <Col span={6}>
                <Statistic title="一字板" value={currentBoard?.limitDownCountBeforeCallAuction} />
              </Col>

              <Col span={8}>
                <Statistic title="10%" value={currentBoard?.limitDownCount1} />
              </Col>
              <Col span={8}>
                <Statistic title="20%" value={currentBoard?.limitDownCount2} />
              </Col>
              <Col span={8}>
                <Statistic title="30%" value={currentBoard?.limitDownCount3} />
              </Col>
            </Row>
          </Card>

          <Card className="flex-1">
            <Row gutter={[16, 16]} className={styles.boardStatistic}>
              <Col span={24}>
                <Statistic title="成交额" loading={loading} value={currentBoard?.tradingVolume} />
              </Col>

              <Col span={6}>
                <Statistic title="上证" value={currentBoard?.tradingVolume1} />
              </Col>

              <Col span={6}>
                <Statistic title="深证" value={currentBoard?.tradingVolume2} />
              </Col>

              <Col span={6}>
                <Statistic title="创业板" value={currentBoard?.tradingVolume3} />
              </Col>

              <Col span={6}>
                <Statistic title="北证" value={currentBoard?.tradingVolume4} />
              </Col>
            </Row>
          </Card>
        </Space>
      )}

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

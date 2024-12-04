'use client'

import { Dashboard } from '@/types/index'
import { DATE_FORMAT } from '@/utils/constants'
import {
  crawlDashboardByDate,
  getAllLimitUpByDate,
  getDashboardByDate,
  getLimitUpStatistics,
  getLimitUpStatisticsByDate,
} from '@/utils/service'
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, Empty, Row, Statistic, Table, Tabs } from 'antd'
import dayjs from 'dayjs'
import ReactEcharts from 'echarts-for-react'
import { useEffect, useMemo, useState } from 'react'
import styles from './style.module.scss'

export default function LimitUpPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentDate, setCurrentDate] = useState<string>(dayjs().format(DATE_FORMAT))
  const [currentBoard, setCurrentBoard] = useState<Dashboard>()
  const [currentStatistics, setCurrentStatistics] = useState<any>()
  const [currentLimitUp, setCurrentLimitUp] = useState<any[]>([])

  const [statistics, setStatistics] = useState<any[]>([])

  const changeDate = (num: number) => {
    setCurrentDate(dayjs(dayjs(currentDate).add(num, 'day')).format(DATE_FORMAT))
  }

  useEffect(() => {
    getDashboardByDate(currentDate).then((current) => {
      setCurrentBoard(current)
      setLoading(false)
    })
    getLimitUpStatisticsByDate(currentDate).then((res) => {
      setCurrentStatistics(res)
    })

    getAllLimitUpByDate(currentDate).then((res) => {
      setCurrentLimitUp(res)
    })
  }, [currentDate])

  useEffect(() => {
    getLimitUpStatistics().then((res) => {
      setStatistics(res)
    })
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

  const columns = useMemo(() => {
    return [
      {
        title: '1',
        dataIndex: 'stockCode',
        key: 'stockCode',
      },
      {
        title: '2',
        dataIndex: 'stockName',
        key: 'stockName',
      },
      {
        title: 'limitUpLevel',
        dataIndex: 'limitUpLevel',
        key: 'limitUpLevel',
      },
      {
        title: 'tradingVolume',
        dataIndex: 'tradingVolume',
        key: 'tradingVolume',
      },
    ]
  }, [])

  const LimitUpTable = () => {
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={currentLimitUp}
        scroll={{ x: 'max-content' }}
        pagination={{
          size: 'small',
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    )
  }

  const chartOptions = useMemo(() => {
    const dates = statistics?.map((item) => {
      return dayjs(item.date).format(DATE_FORMAT)
    })

    const keys = [
      'limitUpLevel1',
      'limitUpLevel2',
      'limitUpLevel3',
      'limitUpLevel4',
      'limitUpLevel5',
      'limitUpLevel6',
      'limitUpLevel7',
      'limitUpLevelMore',

      'limitUpLevel1Percentage',
      'limitUpLevel2Percentage',
      'limitUpLevel3Percentage',
      'limitUpLevel4Percentage',
      'limitUpLevel5Percentage',
      'limitUpLevel6Percentage',
      'limitUpLevel7Percentage',
      'limitUpLevelMorePercentage',
    ]

    const series = keys.map((key) => {
      return {
        name: key,
        type: 'line',
        smooth: true,
        data: statistics?.map((item) => {
          return item[key]
        }),
      }
    })

    return {
      title: { text: 'Limit Up' },
      legend: {
        data: keys,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: { data: dates },
      yAxis: {},
      series: series,
    }
  }, [statistics])

  const LimitUpStatisticsChart = () => {
    return <ReactEcharts option={chartOptions} style={{ height: 600 }} />
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <CalendarOutlined className="mr-4 text-2xl" style={{ color: '#4099ff' }} />
          <DatePicker value={dayjs(currentDate, DATE_FORMAT)}></DatePicker>
          <Button.Group className="ml-2">
            <Button value="A" onClick={() => changeDate(-1)} icon={<LeftOutlined />} size="middle" />
            <Button value="B" onClick={() => changeDate(1)} icon={<RightOutlined />} size="middle" />
          </Button.Group>
        </div>
        {/* <Button type="primary" onClick={crawlDashboard} size="small">
          Crawl Dashboard
        </Button> */}
      </div>

      <Tabs
        defaultActiveKey="1"
        type="card"
        size={'middle'}
        items={[
          {
            label: `Card Tab 1`,
            key: 'tab1',
            children: <LimitUpTable></LimitUpTable>,
          },
          {
            label: `Card Tab 2`,
            key: 'tab2',
            children: <LimitUpStatisticsChart></LimitUpStatisticsChart>,
          },
        ]}
      />

      <Card className="flex-1">
        {currentBoard && (
          <Row gutter={[16, 16]} className={styles.statistic}>
            <Col span={24}>
              <Statistic title="涨停个数" loading={loading} value={currentBoard?.limitUpCount} />
            </Col>

            <Col span={6}>
              <Statistic title="1板" value={currentStatistics?.limitUpLevel1} />
            </Col>

            <Col span={6}>
              <Statistic
                title="2板(晋级率)"
                value={
                  currentStatistics?.limitUpLevel2 +
                  ` (${Number(currentStatistics?.limitUpLevel2Percentage * 100).toFixed(2)}%)`
                }
              />
            </Col>

            <Col span={6}>
              <Statistic
                title="3板"
                value={
                  currentStatistics?.limitUpLevel3 +
                  ` (${Number(currentStatistics?.limitUpLevel3Percentage * 100).toFixed(2)}%)`
                }
              />
            </Col>

            <Col span={6}>
              <Statistic
                title="4板"
                value={
                  currentStatistics?.limitUpLevel4 +
                  ` (${Number(currentStatistics?.limitUpLevel4Percentage * 100).toFixed(2)}%)`
                }
              />
            </Col>

            <Col span={6}>
              <Statistic
                title="5板"
                value={
                  currentStatistics?.limitUpLevel5 +
                  ` (${Number(currentStatistics?.limitUpLevel5Percentage * 100).toFixed(2)}%)`
                }
              />
            </Col>

            <Col span={6}>
              <Statistic
                title="6板"
                value={
                  currentStatistics?.limitUpLevel6 +
                  ` (${Number(currentStatistics?.limitUpLevel6Percentage * 100).toFixed(2)}%)`
                }
              />
            </Col>

            <Col span={6}>
              <Statistic
                title="7板"
                value={
                  currentStatistics?.limitUpLevel7 +
                  ` (${Number(currentStatistics?.limitUpLevel7Percentage * 100).toFixed(2)}%)`
                }
              />
            </Col>

            <Col span={6}>
              <Statistic
                title="more板"
                value={
                  currentStatistics?.limitUpLevelMore +
                  ` (${Number(currentStatistics?.limitUpLevelMorePercentage * 100).toFixed(2)}%)`
                }
              />
            </Col>
          </Row>
        )}
        {!currentBoard && <Empty description={'No Data'} />}
      </Card>

      {/* <Card style={{ width: '100%' }} title="Dashboard" bordered={false}>
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
          }}
        />
      </Card> */}
    </div>
  )
}

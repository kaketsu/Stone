'use client'

import { Dashboard } from '@/types/index'
import { DATE_FORMAT } from '@/utils/constants'
import { getDashboardByDateRange } from '@/utils/service'
import { LineChartOutlined, TableOutlined } from '@ant-design/icons'
import { Column } from '@ant-design/plots'
import { Card, DatePicker, Radio, Space, Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
const { RangePicker } = DatePicker

export default function TrendPage() {
  const currentDate = dayjs().format(DATE_FORMAT)

  const [loading, setLoading] = useState<boolean>(false)
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([])
  const [displayType, setDisplayType] = useState('chart')
  const [currentTab, setCurrentTab] = useState('tab1')
  const [rangeType, setRangeType] = useState('week')

  const config = {
    data: dashboardList,
    xField: 'date',
    xAxis: {
      label: {
        autoRotate: false,
        formatter: (value: any) => {
          return dayjs(value).format(DATE_FORMAT)
        },
      },
    },
    yField: 'tradingVolume',
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

  const changeDateRange = (dates: [any, any]) => {
    const [startDate, endDate] = dates
    const start = dayjs(startDate).format(DATE_FORMAT)
    const end = dayjs(endDate).format(DATE_FORMAT)

    getDashboardByDateRange(start, end).then((res) => {
      setDashboardList(res)
    })
  }

  const changeWeek = (startDate: Date) => {
    const start = dayjs(startDate).format(DATE_FORMAT)
    const end = dayjs(startDate).add(5, 'days').format(DATE_FORMAT)

    getDashboardByDateRange(start, end).then((res) => {
      setDashboardList(res)
    })
  }

  const changeMonth = (startDate: Date) => {
    const start = dayjs(startDate).format(DATE_FORMAT)
    const end = dayjs(startDate).add(5, 'days').format(DATE_FORMAT)

    getDashboardByDateRange(start, end).then((res) => {
      setDashboardList(res)
    })
  }

  useEffect(() => {
    changeWeek(dayjs().startOf('week').toDate())
  }, [])

  return (
    <div>
      <Space direction="vertical" size={12}>
        <Radio.Group value={rangeType} onChange={(e) => setRangeType(e.target.value)}>
          <Radio.Button value="range">Range</Radio.Button>
          <Radio.Button value="week">Week</Radio.Button>
          <Radio.Button value="month">Month</Radio.Button>
        </Radio.Group>

        {/* <CalendarOutlined className="text-2xl" style={{ color: '#4099ff' }} /> */}
        <div className="mb-4 flex items-center">
          {rangeType === 'week' && <DatePicker picker="week" className="ml-2" onChange={changeWeek} />}
          {rangeType === 'range' && <RangePicker className="ml-2" onChange={changeDateRange} />}
          {rangeType === 'month' && <DatePicker picker="month" className="ml-2" onChange={changeMonth} />}
        </div>
      </Space>

      <Card
        style={{ width: '100%' }}
        title={
          <div className="text-right">
            <Radio.Group value={displayType} onChange={(e) => setDisplayType(e.target.value)}>
              <Radio.Button value="chart">
                <LineChartOutlined />
              </Radio.Button>
              <Radio.Button value="table">
                <TableOutlined />
              </Radio.Button>
            </Radio.Group>
          </div>
        }
        bordered={false}
      >
        {displayType === 'chart' && (
          <>
            <Column {...config} />
          </>
        )}
        {displayType === 'table' && (
          <Table columns={columns} dataSource={dashboardList} scroll={{ x: 'max-content' }} expandable={{}} />
        )}
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

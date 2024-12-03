'use client'

// https://ant-design-charts.antgroup.com/manual/introduction
// https://echarts.apache.org/examples/zh/index.html

import { Dashboard } from '@/types/index'
import { DATE_FORMAT } from '@/utils/constants'
import { getAllDashboards, getDashboardByDateRange } from '@/utils/service'
import { Line } from '@ant-design/charts'
import { LineChartOutlined, TableOutlined } from '@ant-design/icons'
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

  const columnConfig = useMemo(() => {
    return {
      // data: {
      //   value: dashboardList,
      //   transform: [
      //     {
      //       type: 'fold',
      //       fields: ['tradingVolume'],
      //       key: 'type',
      //       value: 'value',
      //     },
      //   ],
      // },
      data: dashboardList,
      xField: (d: any) => {
        return dayjs(d.date).format(DATE_FORMAT)
      },
      yField: 'tradingVolume',
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      colorField: 'type',

      // axis: {
      //   x: { labelAutoHide: 'greedy' },
      // },
      // axis: {
      //   x: { labelAutoHide: 'greedy' },
      // },
      // xAxis: {
      //   label: {
      //     autoRotate: false,
      //     formatter: (value: any) => {
      //       return dayjs(value).format(DATE_FORMAT)
      //     },
      //   },
      // },

      // slider: {
      //   start: 0.1,
      //   end: 0.2,
      // },
    }
  }, [dashboardList])

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
    getAllDashboards().then((res) => {
      setDashboardList(res)
    })
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
            <Line {...columnConfig} />
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

// 1板晋级个数（率）
// 2板
// 3板晋级
// 4
// 5板
// 5板+

// 1 和昨天比较，找到所有连板的股票, 总晋级率是可以算出来的
// 2 加一个currentLimitUp

// 昨天是2 今天是3的时候就变成晋级成功
// 加一个limitUpStatistics

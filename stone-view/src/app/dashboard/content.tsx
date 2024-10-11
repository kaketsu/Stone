'use client'

import { Dashboard } from '@/types/index'
import { getDashboard } from '@/utils/service'
import { Column } from '@ant-design/plots'
import { Card } from 'antd'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [data, setData] = useState<Dashboard[]>([])
  const [currentTab, setCurrentTab] = useState('tab1')
  useEffect(() => {
    asyncFetch()
  }, [])

  useEffect(() => {}, [])

  const asyncFetch = () => {
    getDashboard().then((data) => {
      setData(data)
    })
  }

  const config = {
    data,
    xField: 'openDate',
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

  return (
    <div>
      <Card
        style={{ width: '100%' }}
        title="Card title"
        tabList={tabList}
        activeTabKey={currentTab}
        onTabChange={(key) => {
          setCurrentTab(key)
        }}
      >
        {contentList[currentTab]}
      </Card>
    </div>
  )
}

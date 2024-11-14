'use client'

import { DesktopOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { MenuProps } from 'antd'
import { Breadcrumb, Button, Layout, Menu } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import './globals.css'
import styles from './style.module.scss'
const { Header, Content, Footer, Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DesktopOutlined />,
      onClick: () => {
        router.push('/dashboard')
      },
    },
  ]

  return (
    <html lang="zh">
      <body className="flex">
        <AntdRegistry>
          <div className="flex flex-1 flex-col">
            <Header className="bg-">
              <div className="demo-logo" />
            </Header>
            <Layout className="flex-1">
              <Sider width={200} collapsed={collapsed}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  items={items}
                  className={styles.stoneMenu}
                />
              </Sider>
              <Layout className="px-6 pb-6">
                <div className="my-4 flex items-center">
                  <Button
                    className="mr-2"
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                  <Breadcrumb className="h-[26px]">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                </div>

                {children}
              </Layout>
            </Layout>
          </div>
        </AntdRegistry>
      </body>
    </html>
  )
}

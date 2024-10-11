"use client";

import "./globals.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DesktopOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DesktopOutlined />,
      onClick: () => {
        router.push("/dashboard");
      },
    },
  ];

  return (
    <html lang="zh">
      <body className="flex">
        <div className="flex-1 flex flex-col">
          <Header style={{ display: "flex", alignItems: "center" }}>
            <div className="demo-logo" />
          </Header>
          <Layout className="flex-1">
            <Sider width={200} collapsed>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
                items={items}
              />
            </Sider>
            <Layout className="px-6 pb-6">
              <Breadcrumb className="my-4">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  padding: 16,
                  margin: 0,
                  minHeight: 280,
                  background: "#fff",
                  borderRadius: "4px",
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </div>
      </body>
    </html>
  );
}

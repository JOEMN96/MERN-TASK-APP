import React from "react";
import { Drawer, Button, Radio, Space } from "antd";
import Link from "next/link";

class SideNav extends React.Component {
  state = { visible: false, placement: "left" };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <Space>
          <Button type="primary" onClick={this.showDrawer}>
            Open
          </Button>
        </Space>
        <Drawer
          className="appbar"
          title="Blog"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={visible}
        >
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/signUp">
            <a>Sign In</a>
          </Link>
        </Drawer>
      </>
    );
  }
}

export default SideNav;

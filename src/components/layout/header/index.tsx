import { useContext } from "react";
import {
  useGetLocale,
  useSetLocale,
  useGetIdentity,
} from "@pankod/refine-core";
import {
  AntdLayout,
  Space,
  Menu,
  Button,
  Icons,
  Dropdown,
  Avatar,
  Typography,
  Switch,
} from "@pankod/refine-antd";
import { useRouter } from "next/router";
import NextRouter from "@pankod/refine-nextjs-router";

import { ColorModeContext } from "@contexts";

const { DownOutlined } = Icons;
const { Text } = Typography;
const { Link } = NextRouter;

export const Header: React.FC = () => {
  const locale = useGetLocale();
  const { locales } = useRouter();
  const currentLocale = locale();
  const { data: user } = useGetIdentity();
  const { mode, setMode } = useContext(ColorModeContext);

  const menu = (
    <Menu selectedKeys={currentLocale ? [currentLocale] : []}>
      {[...(locales || [])].sort().map((lang: string) => (
        <Menu.Item
          key={lang}
          icon={
            <span style={{ marginRight: 8 }}>
              <Avatar size={16} src={`/images/flags/${lang}.svg`} />
            </span>
          }
        >
          <Link href="/" locale={lang}>
            {lang === "en" ? "English" : "German"}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
      }}
    >
      <Button type="link">
        <Link to="/home">Home</Link>
      </Button>
      <Switch
        checkedChildren="🌛"
        unCheckedChildren="🔆"
        onChange={() => setMode(mode === "light" ? "dark" : "light")}
        defaultChecked={mode === "light"}
      />
      <Dropdown overlay={menu}>
        <Button type="link">
          <Space>
            <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
            {currentLocale === "en" ? "English" : "German"}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Space style={{ marginLeft: "8px", color: "gray" }}>
        {user?.name && (
          <Text ellipsis strong>
            {user.name}
          </Text>
        )}
        {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
      </Space>
    </AntdLayout.Header>
  );
};

import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigation } from "@pankod/refine-core";
import { Avatar, Badge, Button, Col, Row } from "antd";
import React, { useState } from "react";
// import { useLocation } from "react-router";
import { useRouter } from "next/router";

import { Cart } from "./Cart";
import type { MenuProps } from "antd";
import CartLogo from "../../public/images/cart.svg";
import { Dropdown, Space } from "antd";

import { Product } from "./Product";
import { nhost } from "pages/_app";

export interface INavbar {
  showDrawer?: any;
  itemsCount?: any;
  //   username: string;
  //   password: string;q
}

export const Navbar: React.FC<INavbar> = ({ showDrawer, itemsCount }) => {
  //   // const { data, mutateAsync, isLoading } = useLogin();
  //   const { mutate: login, isLoading } = useLogin<ILoginForm>();
  //   const [form] = Form.useForm();
  const { push } = useNavigation();
  const pathname = useRouter().pathname;

  console.log("pathname", pathname);

  //   const onFinish = (values: any) => {
  //     console.log("Success:", values);

  //     login(values);

  //     props._setRole(values);
  //   };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log("Failed:", errorInfo);
  //   };

  const userDetails: any = nhost.auth.getUser();

  const handleClickScroll = () => {
    const element = document.querySelector(".frequently_asked_questions");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClickScrollHome = () => {
    const element = document.getElementById("login-page");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log(userDetails, "userDetails : ");
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          onClick={() => push("/LoginPage/s_DriveTechnology")}
          type="link"
        >
          s-drivetechnology
        </Button>
      ),
    },
    {
      key: "1",
      label: (
        <Button
          className="alpha_button"
          onClick={() => push("/LoginPage/epigenetics")}
          type="link"
        >
          Epigenetics
        </Button>
      ),
    },
    {
      key: "1",
      label: (
        <Button
          className="alpha_button"
          onClick={() => push("/LoginPage//hairBulbFolicle")}
          type="link"
        >
          Hair Bulb Follicle
        </Button>
      ),
    },
    {
      key: "1",
      label: (
        <Button
          className="alpha_button"
          onClick={() => push("/LoginPage/products-list")}
          type="link"
        >
          Products
        </Button>
      ),
    },
  ];

  return (
    <>
      <section className="navbar" style={{ zIndex: "1000" }}>
        <div className="logo">
          <img
            src="https://uploads-ssl.webflow.com/63f7267539759cafd312faae/63f733050ef63f2e151dc369_AW-logo.jpeg"
            alt="logo"
            style={{ height: "50px", cursor: "pointer" }}
            onClick={() => (push("/home"), handleClickScrollHome())}
          />
        </div>

        {/* <Dropdown menu={{ items }} placement="bottomLeft">
          What We Do?
        </Dropdown> */}

        <div
          className="nav-links"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Button onClick={() => push("/products")} type="link">
            Products
          </Button>
          <Button onClick={() => push("/about")} type="link">
            About
          </Button>
          <Button onClick={() => handleClickScroll()} type="link">
            Help
          </Button>
          <Button onClick={() => push("/contact")} type="link">
            Contact
          </Button>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>What We Do ?</Space>
            </a>
          </Dropdown>

          <Button onClick={() => push("/pets")} type="link">
            Manage
          </Button>

          {userDetails ? (
            <Button
              onClick={() => {
                nhost.auth.signOut();
                push("./login");
              }}
              type="link"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                push("./login");
              }}
              type="link"
            >
              Login
            </Button>
          )}

          {pathname === "/products" ? (
            <Button
              size="large"
              icon={
                <Badge count={itemsCount} color="blue">
                  <ShoppingCartOutlined
                    style={{ fontSize: "2em" }}
                  ></ShoppingCartOutlined>
                </Badge>
              }
              type="primary"
              style={{
                backgroundColor: "#c4b2a0",
                height: "3em",
                width: "3em",
              }}
              onClick={showDrawer}
            ></Button>
          ) : null}
        </div>
      </section>
    </>
  );
};

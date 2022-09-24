import {
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon
} from "@heroicons/react/outline";
import NavItems from "./navItems";
import React from "react";
import Router from 'next/router';
import Link from "next/link";

const nav = () => {
  return (
    <div className="nav-before-sign-in">
      <nav className="nav">
        <NavItems title="RizzUp" />
        <div className="icons">
          <button onClick={() => Router.push("/")}>
            <NavItems title="HOME" Icon={HomeIcon} />
          </button>
          <NavItems title="SEARCH" Icon={SearchIcon} />
          <NavItems title="TRENDING" Icon={LightningBoltIcon} />
          <button onClick={() => Router.push("/collections")}>
            <NavItems title="COLLECTIONS" Icon={CollectionIcon} />
          </button>
          <button onClick={() => Router.push("/auth/login")}>
            <NavItems title="ACCOUNT" Icon={UserIcon} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default nav;

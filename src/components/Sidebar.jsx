import React, { Fragment } from "react";
import Logo from "./Logo";
import BoardIcon from "../svg/BoardIcon";
import HideEyeIcon from "../svg/HideEyeIcon";
import ThemeSwitcher from "./ThemeSwitcher";
import { DataContext } from "../hooks/DataContext";
function Sidebar() {
  const { toggleSideBar, data, setCurrentBoard } =
    React.useContext(DataContext);

  function switchBoardBtn(index) {
    const boardBtns = document.querySelectorAll("#board-list .board-btn");
    boardBtns.forEach((item) => {
      item.classList.remove("active");
    });
    boardBtns[index].classList.add("active");
  }

  return (
    <>
      <div id="sidebar">
        <div className="header">
          <Logo />
        </div>
        <div id="board-list">
          <span>all boards ({data?.length})</span>
          {data?.map((item, index) => {
            return (
              <Fragment key={index}>
                <div
                  className={"board-btn " + (index === 0 ? "active" : "")}
                  onClick={() => {
                    setCurrentBoard(item);
                    switchBoardBtn(index);
                  }}
                >
                  <BoardIcon />
                  <h3>{item.name}</h3>
                </div>
              </Fragment>
            );
          })}
          {/* <div className="board-btn active">
            <BoardIcon />
            <h3>platform launch</h3>
          </div>
          <div className="board-btn">
            <BoardIcon />
            <h3>marketing plan</h3>
          </div>
          <div className="board-btn">
            <BoardIcon />
            <h3>roadmap</h3>
          </div> */}
          <button className="board-btn create-board-btn">
            <BoardIcon />
            <h3>+ create new brand</h3>
          </button>
        </div>
        <ThemeSwitcher />
        <button className="board-btn hide-sidebar-btn" onClick={toggleSideBar}>
          <HideEyeIcon />
          <h3>Hide Sidebar</h3>
        </button>
      </div>
    </>
  );
}

export default Sidebar;

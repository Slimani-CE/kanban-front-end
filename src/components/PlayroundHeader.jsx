import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import React, { useContext } from "react";
import MenuIcon from "../svg/MenuIcon";
import AlertModal from "./AlertModal";
import Logo from "./Logo";
import { DataContext } from "../hooks/DataContext";
import DeleteForever from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

function PlayroundHeader({ isSideBarOpen }) {
  const { currentBoard } = useContext(DataContext);

  return (
    <div id="playground-header">
      <div className="board-title-container">
        {!isSideBarOpen && (
          <div className="header-logo">
            <Logo />
          </div>
        )}
        <h1>{currentBoard?.name}</h1>
      </div>
      <div className="menu">
        <button
          className="add-btn"
          disabled={currentBoard?.columns.length === 0}
          onClick={() => {
            console.log("DEBUG add new task");
          }}
        >
          + Add New Task
        </button>
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { color: "transparent" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem sx={{ display: "flex", justifyContent: "space-between" }}>
              Edit Board <ModeEditOutlineIcon />
            </MenuItem>
            <MenuItem sx={{ color: "var(--red)" }}>
              Delete Board
              <DeleteForever />
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default PlayroundHeader;

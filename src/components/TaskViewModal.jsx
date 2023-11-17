import {
  Button,
  Card,
  Checkbox,
  DialogContent,
  DialogTitle,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import { selectClasses } from "@mui/joy/Select";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { checkboxClasses } from "@mui/joy/Checkbox";
import { Transition } from "react-transition-group";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import React, { useContext } from "react";
import MoreVert from "@mui/icons-material/MoreVert";
import DeleteForever from "@mui/icons-material/DeleteForever";
import AlertModal from "./AlertModal";
import { DataContext } from "../hooks/DataContext";

function TaskViewModal({ open, setOpen, task }) {
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false);
  const { setData } = useContext(DataContext);

  return (
    <React.Fragment>
      <Transition in={open} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => setOpen(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
              className="task-view-modal"
            >
              <div className="header">
                <h2>{task.title}</h2>
                <Dropdown>
                  <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: { color: "transparent" } }}
                  >
                    <MoreVert />
                  </MenuButton>
                  <Menu disablePortal>
                    <MenuItem
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      Edit Task <ModeEditOutlineIcon />
                    </MenuItem>
                    <MenuItem
                      sx={{ color: "var(--red)" }}
                      onClick={() => {
                        setIsAlertModalOpen(true);
                        setOpen(false);
                      }}
                    >
                      Delete Task
                      <DeleteForever />
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </div>
              <p class="task-details">{task.description}</p>
              <div className="subtasks-container">
                <h3>
                  Subtasks (
                  {task.subtasks.filter((sub) => sub.isCompleted).length} of{" "}
                  {task.subtasks.length})
                </h3>
                <div className="list">
                  {task.subtasks.map((subtask, index) => {
                    return (
                      <Checkbox
                        key={index}
                        className="checkbox-container"
                        label={subtask.title}
                        defaultChecked={subtask.isCompleted}
                      />
                    );
                  })}
                  {/* <Checkbox
                    className="checkbox-container"
                    label="THIS IS A GOOD TEXT"
                    onChange={(event) => console.log(event.target.checked)}
                  />
                  <Checkbox
                    className="checkbox-container"
                    label="THIS IS A GOOD TEXT"
                  />
                  <Checkbox
                    className="checkbox-container"
                    label="THIS IS A GOOD TEXT"
                  /> */}
                </div>
              </div>
              <div className="task-footer">
                <label>Current Status</label>
                <Select
                  value={task.status}
                  placeholder="Select a status..."
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: "100%",
                    height: "40px",
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                  <Option value="Todo">Todo</Option>
                  <Option value="Doing">Doing</Option>
                  <Option value="Done">Done</Option>
                </Select>
              </div>
            </ModalDialog>
          </Modal>
        )}
      </Transition>

      <AlertModal
        open={isAlertModalOpen}
        setOpen={setIsAlertModalOpen}
        title="Delete this task ?"
        description="Are you sure you want to delete this task? This action cannot be undone."
        execute={() => console.log("delete")}
        setParent={setOpen}
      />
    </React.Fragment>
  );
}

export default TaskViewModal;

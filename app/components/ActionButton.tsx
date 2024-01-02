"use client";

import { MdDeleteOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdMan } from "react-icons/md";
import { RiRunFill } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";

import { Status } from "./Table/Table";

interface ActionButtonProps {
  id: number;
  status: Status;
  setRefetchData?: (value: boolean) => void;
}

const ActionButton = ({ id, status, setRefetchData }: ActionButtonProps) => {
  const avaibleActions = {
    DONE: ["TO_DO", "In Progress", "Delete"],
    IN_PROGRESS: ["DONE", "TO_DO", "Delete"],
    TO_DO: ["DONE", "In Progress", "Delete"],
  };

  const [actions, setActions] = useState(avaibleActions[status]);

  const handleTODO = async () => {
    await axios.put(`/api/todos/${id}`, { status: "TO_DO" }).catch((err) => {
      console.log(err);
    });
    setRefetchData && setRefetchData(true);
    setActions(avaibleActions["TO_DO"]);
  };

  const handleDone = async () => {
    await axios.put(`/api/todos/${id}`, { status: "DONE" }).catch((err) => {
      console.log(err);
    });
    setRefetchData && setRefetchData(true);
    setActions(avaibleActions["DONE"]);
  };

  const handleInProgress = async () => {
    await axios
      .put(`/api/todos/${id}`, { status: "IN_PROGRESS" })
      .catch((err) => {
        console.log(err);
      });
    setRefetchData && setRefetchData(true);
    setActions(avaibleActions["IN_PROGRESS"]);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/todos/${id}`).catch((err) => {
      console.log(err);
    });
    setRefetchData && setRefetchData(true);
  };

  const handleActionButtons = (action: string) => {
    switch (action) {
      case "done":
        handleDone();
        break;
      case "inProgress":
        handleInProgress();
        break;
      case "delete":
        handleDelete();
        break;
      case "toDo":
        handleTODO();
        break;
      default:
        break;
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="z-0">
          <BiDotsVerticalRounded />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right z-10 divide-y divide-green-900 rounded-md bg-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            {actions.includes("DONE") && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-lime-500 text-white" : "text-green-600"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleActionButtons("done")}
                  >
                    {active ? (
                      <MdDone className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <MdDoneOutline
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Done
                  </button>
                )}
              </Menu.Item>
            )}
            {actions.includes("In Progress") && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-lime-500 text-white" : "text-green-600"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleActionButtons("inProgress")}
                  >
                    {active ? (
                      <RiRunFill className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <MdMan className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    In Progress
                  </button>
                )}
              </Menu.Item>
            )}
            {actions.includes("TO_DO") && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-lime-500 text-white" : "text-green-600"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleActionButtons("toDo")}
                  >
                    {active ? (
                      <MdMan className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <RiRunFill className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    TODO
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-lime-500 text-white" : "text-green-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => handleActionButtons("delete")}
                >
                  {active ? (
                    <MdDelete className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <MdDeleteOutline
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ActionButton;

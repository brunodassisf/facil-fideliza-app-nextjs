"use client";

import { updateNotification } from "@/core/actions/store";
import { formatDateTime } from "@/core/util";
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Notification } from "@prisma/client";
import { useState } from "react";
import {
  FaBell,
  FaRegClock,
  FaTriangleExclamation,
  FaUserPlus,
  FaXmark,
} from "react-icons/fa6";

type NotificationProps = {
  data: Notification[];
  bgColor?: string;
};

const CoreNotification: React.FC<NotificationProps> = ({ data, bgColor }) => {
  const [open, setOpen] = useState<boolean>(false);

  const notificationIcons = {
    ALERT: <FaTriangleExclamation style={{ color: bgColor }} />,
    NEWUSER: <FaUserPlus style={{ color: bgColor }} />,
  };
  const handleViewsTrue = (arr: Notification[]) => {
    return arr.reduce((contador, objeto) => {
      return objeto["view"] === true ? contador + 1 : contador;
    }, 0);
  };

  const handleStateOpen = () => {
    setOpen(!open);
  };

  const handleDisableView = async (id: string) => {
    await updateNotification(id);
  };

  return (
    <>
      <div
        className="relative select-none cursor-pointer"
        onClick={handleStateOpen}
      >
        <FaBell size={24} />
        <div
          style={{ borderColor: bgColor }}
          className={`absolute bg-red-600 text-white rounded-full w-2 h-2 flex justify-center items-center -bottom-0.5 -right-2  border-2 text-sm p-2`}
        >
          {handleViewsTrue(data)}
        </div>
      </div>
      <Drawer
        open={open}
        anchor="right"
        onClose={handleStateOpen}
        aria-hidden={false}
      >
        <div className="w-full flex justify-between pt-10 px-4 border-b-2 border-gray-100 pb-5">
          <Typography variant="h6">Suas notificações</Typography>
          <FaXmark size={24} onClick={handleStateOpen} />
        </div>
        <List className="w-72 overflow-y-auto !pt-0">
          {data
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((item) => {
              const isActive = item.view ? "bg-gray-100" : "";
              return (
                <ListItem
                  key={item.id}
                  className={isActive}
                  onClick={() => handleDisableView(item.id)}
                >
                  <ListItemAvatar>
                    <Avatar className="!bg-gray-200">
                      {
                        notificationIcons[
                          item.icon as keyof typeof notificationIcons
                        ]
                      }
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<strong>{item.name}</strong>}
                    secondary={
                      <>
                        {item.message}

                        <Typography
                          component="span"
                          variant="body2"
                          className="pr-2 text-xs flex items-center pt-2"
                        >
                          <FaRegClock size={14} className="mr-1" />
                          {formatDateTime(item.date)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              );
            })}
        </List>
      </Drawer>
    </>
  );
};

export default CoreNotification;

import React, { useEffect } from "react";

import Card from "@/shared/ui/Card";

import "@/pages/ConfirmExit/style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { getUser } from "@/entities/Auth";
import { useNotifications } from "./hook";
import { UUID } from "@/entities/Common";
import { Notification } from "@/entities/Notification";
import { NotificationsContent } from "./Content";
import { setCurrentPageId } from "@/app/model/appSlice";
import { useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

const NotificationsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const queryClient = useQueryClient();

  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    dispatch(setCurrentPageId("notifications"));

    return () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      dispatch(setCurrentPageId(undefined));
    };
  }, [dispatch, queryClient]);

  const {
    notifications,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loaderRef,
    deleteNotification,
    readNotification,
  } = useNotifications({});

  const handleReadNotification = async (notification: Notification) => {
    await readNotification(notification.id);
    dispatch(getUser(userId!));
  };

  const handleDeleteNotification = async (id: UUID) => {
    await deleteNotification(id);
    dispatch(getUser(userId!));
  };

  return (
    <>
      <div className="page">
        <div
          className="main-grid"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div></div>
          <div>
            <Card>
              {isLoading ? (
                <div className="loading-overlay">
                  <CircularProgress color="primary" size={60} />
                </div>
              ) : (
                <NotificationsContent
                  notifications={notifications}
                  hasNextPage={hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  loaderRef={loaderRef as any}
                  onEdit={handleReadNotification}
                  onDelete={handleDeleteNotification}
                />
              )}
            </Card>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;

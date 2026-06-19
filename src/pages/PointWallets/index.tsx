import React, { useEffect, useState } from "react";

import Card from "@/shared/ui/Card";

import "@/pages/ConfirmExit/style.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { UserAPI } from "@/entities/User";
import { PointWallet } from "@/entities/PointWallet";
import { PointWalletsContent } from "./Content";
import { useNavigate } from "react-router-dom";

const WalletsPage: React.FC = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const [pointWallets, setPointWallets] = useState<PointWallet[]>([]);

  useEffect(() => {
    if (user?.id) {
      UserAPI.fetchUserStudentById(user.id).then((userStudent) => {
        setPointWallets(userStudent.pointWallets);
      });
    }
  }, [user?.id]);

  const handleOnClick = (pointWallet: PointWallet) => {
    navigate(`${pointWallet.id}`);
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
              <PointWalletsContent
                pointWallets={pointWallets}
                hasNextPage={false}
                isFetchingNextPage={false}
                onClick={handleOnClick}
              />
            </Card>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default WalletsPage;

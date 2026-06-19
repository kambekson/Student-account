import React, { useEffect, useState } from "react";

import Card from "../../Components/Card";

import "@/Presentation/Styles/pages/confirmExit.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UserAPI from "@/Transport/api/User";
import { PointWallet } from "@/Common/Entity/Base/Point";
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

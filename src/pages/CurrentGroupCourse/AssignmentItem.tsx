import { FC } from "react";

import { Avatar, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ClassIcon from "@mui/icons-material/Class";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { AssignmentSubmissionStatus } from "@/entities/AssignmentSubmission";
import {
  Assignment,
  AssignmentType,
  ScheduledAssignment,
} from "@/entities/ScheduledAssignment";
import { PointType } from "@/entities/PointWallet";
import { pointTypeToVisual } from "@/entities/Common";
import { CoinIcon } from "@/shared/ui/Icons/Coin";

export const AssignmentItem: FC<{
  scheduledAssignment: ScheduledAssignment;
  currentAssignment: Assignment | undefined;
  onSelectAssignment: (assignment: ScheduledAssignment) => void;
  pointType?: PointType;
}> = ({
  scheduledAssignment,
  currentAssignment,
  onSelectAssignment,
  pointType,
}) => {
  const getScheduledAssignmentColor = (item: ScheduledAssignment): string => {
    const colorMap: Record<AssignmentSubmissionStatus, string> = {
      [AssignmentSubmissionStatus.ATTACHED]: "var(--color-accent)",
      [AssignmentSubmissionStatus.EVALUATED]: "var(--color-good)",
      [AssignmentSubmissionStatus.ON_REVISION]: "var(--color-alert)",
    };

    const status = item.studentAssignmentSubmission?.status;
    return status
      ? colorMap[status] || "var(--color-background-2)"
      : "var(--color-background-2)";
  };

  const getAssignmentIcon = (item: ScheduledAssignment) => {
    const iconProps = {
      sx: {
        fontSize: 22,
        color: "var(--color-background)",
      },
    };

    switch (item.assignmentSnapshot.type) {
      case AssignmentType.HOMEWORK:
        return <HomeWorkIcon {...iconProps} />;
      case AssignmentType.CLASSWORK:
        return <ClassIcon {...iconProps} />;
      case AssignmentType.TEST:
        return <NoteAltIcon {...iconProps} />;
      default:
        return <BookmarkBorderIcon {...iconProps} />;
    }
  };

  const isActive = scheduledAssignment.assignment.id === currentAssignment?.id;

  const isEvaluated =
    scheduledAssignment.studentAssignmentSubmission?.status ===
    AssignmentSubmissionStatus.EVALUATED;

  const textColor = isEvaluated ? "inherit" : "#555555";
  const coin = pointTypeToVisual(pointType);

  return (
    <ListItem
      onClick={() => onSelectAssignment(scheduledAssignment)}
      className="lessons-list-item"
      style={{
        padding: "6px 0px",
        cursor: "pointer",
        backgroundColor: isActive ? "#e9e9e9" : "",
      }}
    >
      <ListItemIcon style={{ minWidth: "15px", marginRight: "10px" }}>
        <Avatar
          sx={{
            width: 28,
            height: 28,
            bgcolor: getScheduledAssignmentColor(scheduledAssignment),
            "&:hover": {
              bgcolor: getScheduledAssignmentColor(scheduledAssignment),
            },
          }}
        >
          {getAssignmentIcon(scheduledAssignment)}
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={scheduledAssignment.assignmentSnapshot.name}
        style={{ margin: 0 }}
      />
      <CoinIcon
        pointType={coin}
        size={14}
        filter={isEvaluated ? "none" : "grayscale(1)"}
      />
      <span
        style={{
          fontSize: 12,
          paddingLeft: 6,
          color: textColor,
        }}
      >{`${
        scheduledAssignment.studentAssignmentSubmission?.status !==
        AssignmentSubmissionStatus.EVALUATED
          ? scheduledAssignment.assignmentSnapshot.maxPoints
          : scheduledAssignment.studentAssignmentSubmission?.points || 0
      } ${coin.name}`}</span>
    </ListItem>
  );
};

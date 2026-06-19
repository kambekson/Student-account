import { FC } from "react";
import { Home, BookOpen, FileText, Bookmark } from "lucide-react";

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
      className: "w-4 h-4 text-[var(--color-background)]",
    };

    switch (item.assignmentSnapshot.type) {
      case AssignmentType.HOMEWORK:
        return <Home {...iconProps} />;
      case AssignmentType.CLASSWORK:
        return <BookOpen {...iconProps} />;
      case AssignmentType.TEST:
        return <FileText {...iconProps} />;
      default:
        return <Bookmark {...iconProps} />;
    }
  };

  const isActive = scheduledAssignment.assignment.id === currentAssignment?.id;

  const isEvaluated =
    scheduledAssignment.studentAssignmentSubmission?.status ===
    AssignmentSubmissionStatus.EVALUATED;

  const textColor = isEvaluated ? "inherit" : "#555555";
  const coin = pointTypeToVisual(pointType);

  return (
    <div
      onClick={() => onSelectAssignment(scheduledAssignment)}
      className={`lessons-list-item flex items-center py-1.5 px-3 rounded-lg cursor-pointer transition-colors ${
        isActive ? "bg-[#e9e9e9]" : ""
      }`}
    >
      <div className="mr-2.5 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: getScheduledAssignmentColor(scheduledAssignment) }}
        >
          {getAssignmentIcon(scheduledAssignment)}
        </div>
      </div>
      <div className="flex-grow text-sm font-medium mr-2 overflow-hidden text-ellipsis whitespace-nowrap">
        {scheduledAssignment.assignmentSnapshot.name}
      </div>
      <div className="flex items-center flex-shrink-0">
        <CoinIcon
          pointType={coin}
          size={14}
          filter={isEvaluated ? "none" : "grayscale(1)"}
        />
        <span
          className="text-xs pl-1.5"
          style={{ color: textColor }}
        >
          {`${
            scheduledAssignment.studentAssignmentSubmission?.status !==
            AssignmentSubmissionStatus.EVALUATED
              ? scheduledAssignment.assignmentSnapshot.maxPoints
              : scheduledAssignment.studentAssignmentSubmission?.points || 0
          } ${coin.name}`}
        </span>
      </div>
    </div>
  );
};

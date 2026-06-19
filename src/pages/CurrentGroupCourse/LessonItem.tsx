import { FC } from "react";

import {
  CircularProgress,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import CircleIcon from "@mui/icons-material/Circle";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { ScheduledLesson } from "@/entities/ScheduledLesson";
import {
  Assignment,
  ScheduledAssignment,
} from "@/entities/ScheduledAssignment";
import { AssignmentItem } from "./AssignmentItem";
import { PointType } from "@/entities/PointWallet";
import { useTranslation } from "react-i18next";

export const LessonItem: FC<{
  lesson: ScheduledLesson;
  openItems: Record<string, boolean>;
  onToggle: (lessonKey: string, lessonId: string) => Promise<void>;
  scheduledAssignmentsMap: Record<string, ScheduledAssignment[]>;
  currentAssignment: Assignment | undefined;
  onSelectAssignment: (assignment: ScheduledAssignment) => void;
  pointType?: PointType;
}> = ({
  lesson,
  openItems,
  onToggle,
  scheduledAssignmentsMap,
  currentAssignment,
  onSelectAssignment,
  pointType,
}) => {
  const { id: lessonId, lesson: lessonData } = lesson;
  const isOpen = openItems[lessonId];

  const { t } = useTranslation();

  return (
    <>
      <ListItem style={{ padding: "10px 0px" }}>
        <ListItemIcon style={{ minWidth: "15px", marginRight: "10px" }}>
          <CircleIcon
            style={{
              width: "14px",
              color: "var(--color-background-2)",
              margin: 0,
              padding: 0,
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={lessonData.name}
          secondary={
            lessonData.description || `${t("Описание урока отсутствует")}`
          }
          style={{ margin: 0 }}
        />
        <IconButton onClick={() => onToggle(lessonId, lessonId)}>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div style={{ padding: "0 21px" }}>
          {scheduledAssignmentsMap[lessonId] ? (
            <List>
              {scheduledAssignmentsMap[lessonId].map((item) => (
                <AssignmentItem
                  key={item.id}
                  scheduledAssignment={item}
                  currentAssignment={currentAssignment}
                  onSelectAssignment={onSelectAssignment}
                  pointType={pointType}
                />
              ))}
            </List>
          ) : (
            <center>
              <CircularProgress color="primary" />
            </center>
          )}
        </div>
      </Collapse>
    </>
  );
};

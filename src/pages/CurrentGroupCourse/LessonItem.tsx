import { FC } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

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
      <div className="flex items-center justify-between py-2 px-1 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center flex-grow overflow-hidden mr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-background-2)] mr-3 flex-shrink-0"></div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-gray-900 truncate">{lessonData.name}</span>
            <span className="text-xs text-gray-500 truncate">
              {lessonData.description || `${t("Описание урока отсутствует")}`}
            </span>
          </div>
        </div>
        <button
          onClick={() => onToggle(lessonId, lessonId)}
          className="p-1.5 rounded-full hover:bg-black/5 transition-colors focus:outline-none"
        >
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="pl-6 pr-2 py-2 transition-all duration-300">
          {scheduledAssignmentsMap[lessonId] ? (
            <div className="flex flex-col gap-1">
              {scheduledAssignmentsMap[lessonId].map((item) => (
                <AssignmentItem
                  key={item.id}
                  scheduledAssignment={item}
                  currentAssignment={currentAssignment}
                  onSelectAssignment={onSelectAssignment}
                  pointType={pointType}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-accent-2)]"></div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

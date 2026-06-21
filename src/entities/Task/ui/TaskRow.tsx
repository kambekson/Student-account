import React from "react";
import { TaskItem } from "@/shared/types";

interface TaskRowProps {
  task: TaskItem;
  onToggle: (id: string) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task, onToggle }) => {
  return (
    <div className="flex items-start gap-3">
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
          task.completed ? "bg-primary border-primary text-on-primary" : "border-outline-variant hover:border-primary"
        }`}
      >
        {task.completed && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
      </button>
      <div className="flex-1">
        <p
          className={`font-label-md text-xs font-semibold text-on-surface ${
            task.completed ? "line-through text-on-surface-variant/60" : ""
          }`}
        >
          {task.text}
        </p>
        {task.deadline && <p className="text-[10px] text-error font-semibold mt-0.5">Срок: {task.deadline}</p>}
        {task.subtext && <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{task.subtext}</p>}
      </div>
    </div>
  );
};

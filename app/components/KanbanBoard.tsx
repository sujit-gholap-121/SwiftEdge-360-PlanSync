"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  ClockIcon,
  TagIcon,
  UserCircleIcon,
  FlagIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "High" | "Medium" | "Low";
  epic?: string;
  dueDate?: string;
  timeEstimate?: string;
  tags: string[];
  description: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  limit?: number;
}

interface Columns {
  [key: string]: Column;
}

const initialColumns: Columns = {
  backlog: {
    id: "backlog",
    title: "Backlog",
    tasks: [
      {
        id: "1",
        title: "Design System Implementation",
        assignee: "Alice",
        priority: "High",
        epic: "UI Redesign",
        dueDate: "2023-12-20",
        timeEstimate: "3d",
        tags: ["design", "frontend"],
        description: "Create a comprehensive design system for the application",
      },
      {
        id: "2",
        title: "API Authentication",
        assignee: "Bob",
        priority: "High",
        epic: "Security",
        dueDate: "2023-12-15",
        timeEstimate: "5d",
        tags: ["backend", "security"],
        description: "Implement OAuth2 authentication",
      },
    ],
  },
  todo: {
    id: "todo",
    title: "To Do",
    limit: 5,
    tasks: [
      {
        id: "3",
        title: "User Dashboard Analytics",
        assignee: "Charlie",
        priority: "Medium",
        epic: "Analytics",
        dueDate: "2023-12-25",
        timeEstimate: "4d",
        tags: ["frontend", "analytics"],
        description: "Add analytics charts to user dashboard",
      },
    ],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    limit: 3,
    tasks: [
      {
        id: "4",
        title: "Database Optimization",
        assignee: "David",
        priority: "High",
        epic: "Performance",
        dueDate: "2023-12-10",
        timeEstimate: "2d",
        tags: ["backend", "performance"],
        description: "Optimize database queries for better performance",
      },
    ],
  },
  review: {
    id: "review",
    title: "Review",
    limit: 4,
    tasks: [
      {
        id: "5",
        title: "Mobile Responsiveness",
        assignee: "Eve",
        priority: "Medium",
        epic: "UI Redesign",
        dueDate: "2023-12-18",
        timeEstimate: "3d",
        tags: ["frontend", "mobile"],
        description: "Ensure all pages are mobile responsive",
      },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "6",
        title: "Project Setup",
        assignee: "Frank",
        priority: "Low",
        epic: "Infrastructure",
        dueDate: "2023-12-05",
        timeEstimate: "1d",
        tags: ["setup"],
        description: "Initial project setup and configuration",
      },
    ],
  },
};

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};

const epicColors = {
  "UI Redesign": "bg-purple-100 text-purple-800",
  Security: "bg-blue-100 text-blue-800",
  Analytics: "bg-indigo-100 text-indigo-800",
  Performance: "bg-pink-100 text-pink-800",
  Infrastructure: "bg-gray-100 text-gray-800",
};

type epicColorKeys = keyof typeof epicColors;

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Check WIP limits
    if (columns[destination.droppableId].limit) {
      const destColumn = columns[destination.droppableId];
      if (
        destColumn.tasks.length >= (destColumn.limit || 0) &&
        source.droppableId !== destination.droppableId
      ) {
        return; // Cancel drag if WIP limit would be exceeded
      }
    }

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const tasks = Array.from(column.tasks);
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks,
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto min-h-fit flex-wrap justify-between">
        {Object.values(columns).map((column) => (
          <div
            key={column.id}
            className="w-78 flex flex-col bg-gray-50 rounded-lg"
          >
            <div className="p-4 bg-gray-100 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">
                  {column.title}
                  <span className="ml-2 text-sm text-gray-500">
                    {column.tasks.length}
                    {column.limit ? `/${column.limit}` : ""}
                  </span>
                </h3>
              </div>
            </div>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 p-2 space-y-2 overflow-y-auto"
                >
                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="p-3 cursor-move"
                            onClick={() =>
                              setExpandedTask(
                                expandedTask === task.id ? null : task.id
                              )
                            }
                          >
                            {/* Epic Label */}
                            {task.epic && (
                              <div className="flex items-center gap-1 mb-2">
                                <TagIcon className="h-4 w-4 text-gray-500" />
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    epicColors[task.epic as epicColorKeys]
                                  }`}
                                >
                                  {task.epic}
                                </span>
                              </div>
                            )}

                            {/* Title */}
                            <h4 className="font-medium text-gray-900 mb-2">
                              {task.title}
                            </h4>

                            {/* Meta information */}
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <UserCircleIcon className="h-4 w-4" />
                                <span>{task.assignee}</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <FlagIcon className="h-4 w-4" />
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs ${
                                    priorityColors[task.priority]
                                  }`}
                                >
                                  {task.priority}
                                </span>
                              </div>

                              {task.timeEstimate && (
                                <div className="flex items-center gap-1">
                                  <ClockIcon className="h-4 w-4" />
                                  <span>{task.timeEstimate}</span>
                                </div>
                              )}
                            </div>

                            {/* Expanded View */}
                            {expandedTask === task.id && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-sm text-gray-600 mb-2">
                                  {task.description}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {task.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                {task.dueDate && (
                                  <div className="mt-2 text-sm text-gray-500">
                                    Due:{" "}
                                    {new Date(
                                      task.dueDate
                                    ).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            )}

                            <ChevronDownIcon
                              className={`h-4 w-4 text-gray-400 mt-2 transform transition-transform ${
                                expandedTask === task.id ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

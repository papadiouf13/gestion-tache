import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TachesList from '../../../../models/tache.model';
import emptyImage from '../../../../assets/empty.png'; 

interface TaskListProps {
  tasks: TachesList[];
  onEditTask: (task: TachesList) => void;
  onDeleteTask: (taskId: number) => void;
  onToggleComplete: (taskId: number) => void;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDrop: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onEditTask,
    onDeleteTask,
    onToggleComplete,
    onDragStart,
    onDragOver,
    onDrop,
  }) => {
    if (tasks.length === 0) {
      return (
        <div className="text-center">
          <img src={emptyImage} alt="Empty" className="mx-auto" />
          <p className="text-gray-500 text-xl font-bold">Empty...</p>
        </div>
      );
    }
  
    return (
      <ul>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 border-b"
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => {
              e.preventDefault();
              onDragOver(index);
            }}
            onDrop={onDrop}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.statut === 'complete'}
                onChange={() => onToggleComplete(task.id)}
                className="mr-2"
              />
              <span className={`text-sm ${task.statut === 'complete' ? 'line-through' : ''}`}>
                {task.libelle}
              </span>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => onEditTask(task)} className="text-blue-500">
                <FaEdit />
              </button>
              <button onClick={() => onDeleteTask(task.id)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  

export default TaskList;

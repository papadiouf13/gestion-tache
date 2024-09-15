import React, { useState, useEffect } from 'react';
import TachesList from '../../../../models/tache.model';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskLibelle: string) => void;
  currentTask: TachesList | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask, currentTask }) => {
  const [taskLibelle, setTaskLibelle] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    if (currentTask) {
      setTaskLibelle(currentTask.libelle);
    } else {
      setTaskLibelle('');
    }
  }, [currentTask]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskLibelle.trim()) {
      setErrorMessage('Ecrivez quelque chose ou fermez le Pop-up.');
      return;
    }

    onAddTask(taskLibelle);
    setErrorMessage(''); 
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-200 p-6 rounded-md w-96">
        <h2 className="text-xl mb-4">{currentTask ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={taskLibelle}
            onChange={(e) => setTaskLibelle(e.target.value)}
            className="border p-2 w-full dark:text-gray-950"
            placeholder="Enter task description"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p> 
          )}
          <div className="flex justify-between mt-4 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-indigo-500 text-indigo-500 py-2 px-4 hover:bg-indigo-100"
            >
              Cancel
            </button>

            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">
              {currentTask ? 'UPDATE' : 'APPLY'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;

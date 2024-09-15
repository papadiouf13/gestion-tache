import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './components/searchTache/searchTacheComponent';
import AddTaskModal from './components/addTache/addTacheComponent';
import TaskList from './components/liste/listeTacheComponent';
import TachesList from '../../models/tache.model';
import useTaches from '../../hooks/useTache';
import { useAuth } from '../../utils/AuthProvider';

const TachePage: React.FC = () => {
  const { user } = useAuth(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TachesList | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [localTasks, setLocalTasks] = useState<TachesList[]>([]); 

  const { taches, isLoading, isError, mutationAdd, mutationUpdate, mutationDelete, mutationComplete, mutationinComplete } = useTaches();

  const dragPerson = useRef<number | null>(null);
  const draggedOverPerson = useRef<number | null>(null);

  useEffect(() => {
    if (taches) {
      setLocalTasks(taches); 
    }
  }, [taches]);

  const filteredTasks = localTasks.filter((task) => {
    if (filter === 'all') {
      return true; 
    }
    if (filter === 'complete') {
      return task.statut === 'complete'; 
    }
    if (filter === 'incomplete') {
      return task.statut === 'incomplete'; 
    }
    return task.libelle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddTask = (taskLibelle: string) => {
    if (currentTask) {
      mutationUpdate.mutate({
        id: currentTask.id,
        updatedTache: {
          libelle: taskLibelle,
          statut: currentTask.statut, 
          etat: true, 
        },
      });
    } else {
      if (!user) {
        console.error('User is not authenticated');
        return;
      }
  
      mutationAdd.mutate({
        id: localTasks.length + 1, 
        libelle: taskLibelle,
        statut: 'incomplete', 
        etat: true, 
        userId: user.id,
      });
    }
    setCurrentTask(null); 
    setModalOpen(false); 
    setSearchTerm('');
  };

  const handleDeleteTask = (taskId: number) => {
    mutationDelete.mutate(taskId);
  };

  const handleEditTask = (task: TachesList) => {
    setCurrentTask(task);
    setModalOpen(true);
  };

  const handleToggleComplete = (taskId: number) => {
    const taskToToggle = localTasks.find((task) => task.id === taskId);
    if (taskToToggle) {
      if (taskToToggle.statut === 'incomplete') {
        mutationComplete.mutate(taskId);
      } else {
        mutationinComplete.mutate(taskId);
      }
    }
  };

  const handleDragStart = (index: number) => {
    dragPerson.current = index;
  };

  const handleDragOver = (index: number) => {
    draggedOverPerson.current = index;
  };

  const handleDrop = () => {
    if (dragPerson.current !== null && draggedOverPerson.current !== null) {
      const tasksClone = [...localTasks];
      const draggedItemContent = tasksClone[dragPerson.current];
      tasksClone.splice(dragPerson.current, 1); 
      tasksClone.splice(draggedOverPerson.current, 0, draggedItemContent); 
      setLocalTasks(tasksClone); 
      dragPerson.current = null;
      draggedOverPerson.current = null;
    }
  };
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tasks</div>;
  }

  return (

    <div className={`p-8 w-3/4 mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-semibold mb-6 text-center">TODO LIST</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filter={filter}
        onFilterChange={(e) => setFilter(e.target.value)}
        toggleDarkMode={toggleDarkMode}
      />
      <TaskList
        tasks={filteredTasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      <button
        onClick={() => {
          setCurrentTask(null);
          setModalOpen(true);
        }}
        className="fixed bottom-10 right-10 bg-indigo-500 text-white p-4 rounded-full"
      >
        +
      </button>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddTask={handleAddTask}
        currentTask={currentTask}
      />
    </div>
  );
};

export default TachePage;

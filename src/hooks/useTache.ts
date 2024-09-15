import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../services/api-client';
import TachesList, { TacheCreation, TacheUpdate } from '../models/tache.model';

const fetchTaches = async () => {
  const response = await apiClient.get<{ data: TachesList[] }>('/taches');
  return response.data.data;
};

const postTache = async (newTache: TacheCreation) => {
  const response = await apiClient.post<{ data: TachesList }>('/taches', newTache);
  return response.data.data;
};

const updateTache = async ({ id, updatedTache }: TacheUpdate) => {
  const response = await apiClient.post<{ data: TachesList }>(`/taches/${id}`, updatedTache);
  return response.data.data;
};

const deleteTache = async (id: number) => {
  await apiClient.delete(`/taches/${id}`);
};

const completeTache = async (id: number) => {
  const response = await apiClient.patch<{ data: TachesList }>(`/taches/${id}`);
  return response.data.data;
};

const incompleteTache = async (id: number) => {
    const response = await apiClient.patch<{ data: TachesList }>(`/taches/incomplete/${id}`);
    return response.data.data;
  };

const useTaches = () => {
  const queryClient = useQueryClient();

  const { data: taches, isLoading, isError } = useQuery('taches', fetchTaches);

  const mutationAdd = useMutation(postTache, {
    onSuccess: () => {
      queryClient.invalidateQueries('taches');
    },
  });

  const mutationUpdate = useMutation(updateTache, {
    onSuccess: () => {
      queryClient.invalidateQueries('taches');
    },
  });

  const mutationDelete = useMutation(deleteTache, {
    onSuccess: () => {
      queryClient.invalidateQueries('taches');
    },
  });

  const mutationComplete = useMutation(completeTache, {
    onSuccess: () => {
      queryClient.invalidateQueries('taches');
    },
  });

  const mutationinComplete = useMutation(incompleteTache, {
    onSuccess: () => {
      queryClient.invalidateQueries('taches');
    },
  });

  return {
    taches,
    isLoading,
    isError,
    mutationAdd,
    mutationUpdate,
    mutationDelete,
    mutationComplete,
    mutationinComplete
  };
};

export default useTaches;

import { useState, useEffect, useRef } from 'react';
import { api } from '../Services/GithubApi';
import useDebounce from './UseDebounce';

export function useGithubUser(username) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controller = useRef();

  const debouncedUsername = useDebounce(username, 1000);

  useEffect(() => {
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
      setUserData(JSON.parse(lastUser));
    }
  }, []);

  useEffect(() => {
    if (!debouncedUsername) return;

    if (controller.current) controller.current.abort();
    controller.current = new AbortController();

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api(debouncedUsername, controller.current.signal);
        setUserData(response);
        localStorage.setItem('lastUser', JSON.stringify(response));
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

  }, [debouncedUsername]);

  return { userData, loading, error };
}

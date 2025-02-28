import { useState } from "react"

const BASE_URL = 'http://localhost:3000';

export function useGetApi() {
  const [inProgress, setInProgress] = useState(false);

  const get = async (path = '') => {
    try {
      setInProgress(true);
      const response = await fetch(`${BASE_URL}/${path}`);
      return response.json();
    } catch {

    } finally {
      setInProgress(false);
    }
  }
  return {
    makeRequest: get,
    status: inProgress,
  }
}

import React from 'react';
import useAxios from "axios-hooks";

export default function Hello() {
  const [{ data, loading, error }, refetch] = useAxios(
    'https://www.revrobotics.com/content/sw/max/sparkmax-gui-cfg.json'
  );

  return (
    <div>
      <button onClick={refetch}>refetch</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error!!!</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
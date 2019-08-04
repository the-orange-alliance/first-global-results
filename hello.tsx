import * as React from 'react';
import useAxios from "axios-hooks";

export default function Hello() {
  const [{ data, loading, error }] = useAxios(
    'https://www.revrobotics.com/content/sw/max/sparkmax-gui-cfg.json'
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error!!!</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
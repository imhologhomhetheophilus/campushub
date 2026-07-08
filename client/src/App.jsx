import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/health')
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-5xl font-bold mb-6">CampusHub 🚀</h1>

      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <p className="text-xl">{message}</p>
      </div>
    </div>
  );
}

export default App;

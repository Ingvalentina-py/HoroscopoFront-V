import { useState } from 'react';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://horoscopo-back-v.vercel.app//v1/calculadora/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Usuario creado con éxito
      } else {
        setError(data.error); // Mostrar error si no se pudo crear el usuario
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      setError('Error en el servidor. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
}

export default CreateUser;

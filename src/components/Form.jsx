import './styles/Form.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Asegúrate de importar Link

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://horoscopo-back-v.vercel.app//v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                callback(data.role);
                if (data.role === 'user') {
                    goTo("/userHome");
                } else if (data.role === 'admin') {
                    goTo("/adminHome");
                }
            } else {
                alert("Credenciales inválidas");
            }
        } catch (error) {
            console.error('Error al intentar autenticar:', error);
            alert("Ocurrió un error, por favor intenta nuevamente.");
        }
    }

    const goToChangePassword = () => {
        goTo('/changePassword');
    }

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" /><br />
            <input 
                type="button" 
                value="Cambiar Contraseña" 
                id="btnEnviar"  // Reutilizamos el mismo id para aplicar el estilo existente
                onClick={goToChangePassword}
            /><br />
            <Link to="/createUser">Crear un nuevo usuario</Link> {/* Enlace para crear usuario */}
        </form>
    )
}

export default Form;

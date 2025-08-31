import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import '../styles/Form.css'


function Form({route, method, setUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pass2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pass2 && password != pass2) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }
        try {
            let payload = {username, password};
            if (method != "login") {
                payload.pass2 = pass2;
            }

            const res = await api.post(route, {username, password, pass2})
            if (method =="login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                const decoded = jwtDecode(res.data.access);
                setUser({username: decoded.username});
                console.log(decoded.username);
                navigate('/', {state: {username: decoded.username}});
            } else {
                navigate("/login")
            }
        }
        catch (error) {
            alert("Invalid username or password");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    //Registration
    if (method == "Register" || method == "register") {
        return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>

        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />

        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />

        <input
            className="form-input"
            type="password"
            value={pass2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
        />

        <button className="form-button" type="submit">
            {name}
        </button>

    </form>;
    }
    
    //Login
    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>

        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />

        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />

        <button className="form-button" type="submit">
            {name}
        </button>

        <a onClick={() => navigate('/register')}>Sign up for an account!</a>

    </form>;
}


export default Form;
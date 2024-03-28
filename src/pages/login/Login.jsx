import { useState } from 'react'
import './login.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

function Login() {
    const { user, loading, error, dispatch } = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("http://localhost:8000/auth/login", credentials)
            console.log(res);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })

        }
    }

    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder='username' id='username' onChange={handleChange} className='lInput' />
                <input type="password" placeholder='password' id='password' onChange={handleChange} className='lInput' />
                <button onClick={handleClick} className="llButton">Login</button>

                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login
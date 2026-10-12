
import { useState } from 'react'
import './Login.css'
import API_URL from "./api.jsx";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 
async function handleSubmit(e) {
  e.preventDefault()

    const url = isLogin
      ? `${API_URL}/user/login`
      : `${API_URL}/user/register`

  const data = isLogin
    ? { email, password }
    : { name, email, password }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (!response.ok) {
      alert(result.message)
      return
    }

    alert(result.message)

      if (isLogin) {
      onLogin(result.role)
    } else {
      setIsLogin(true)
      setName('')
      setEmail('')
      setPassword('')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('Error: ' + error.message)
  }
}


  return (
    <div className="login-page">
      <div className="card login-card p-4">
        <h2 className="text-center mb-4">
          🎬 Movie Club
        </h2>

        <h4 className="text-center mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h4>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}
        </p>

        <button
          className="btn btn-outline-info"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Create Account' : 'Go to Login'}
        </button>
      </div>
    </div>
  )
}

export default Login

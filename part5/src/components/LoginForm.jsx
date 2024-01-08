import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin
}) => {
  return (
    <div className='login'>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
                    username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}

          />
        </div>
        <div>
                    password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id='submitButton' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = ({
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
})

export default LoginForm
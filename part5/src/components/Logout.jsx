const Logout = ({ handleLogout }) => {
  return (
    <div className='logout'>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default Logout
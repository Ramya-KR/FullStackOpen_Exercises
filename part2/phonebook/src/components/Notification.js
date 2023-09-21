const Notification = ({ message, success }) => {
    if (message === null) {
        return null
    }

    return (
        success ?
            <div className="successMessage">
                {message}
            </div> :
            <div className="errorMessage">
                {message}
            </div>
    )
}

export default Notification
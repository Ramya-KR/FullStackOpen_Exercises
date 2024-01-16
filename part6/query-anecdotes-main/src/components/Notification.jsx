import { useNotification } from '../NotificationContext'
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationToShow = useNotification()

  console.log(notificationToShow)
  return (notificationToShow &&
    <div style={style}>
      {notificationToShow}
    </div>
  )
}

export default Notification

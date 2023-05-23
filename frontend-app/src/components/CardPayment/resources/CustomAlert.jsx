import { Alert } from 'reactstrap'

const CustomAlert = ({ params }) => {

  return (
    <Alert
      className='status-alert'
      color={params.color}
    >
      {params.message}
    </Alert>
  )
}

export default CustomAlert

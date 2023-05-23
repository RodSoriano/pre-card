import './styles.css'
import axios from 'axios'
import { useState } from 'react'
import FormInput from './Payment/FormInput'
import CustomInputGroup from './Payment/CustomInputGroup'
import CustomAlert from './Payment/CustomAlert'
import { colors, message } from './Payment/alertOptions'
import { Button, Col, Form, Row } from 'reactstrap'

const PaymentForm = () => {
  const [status, setStatus] = useState(false)

  const [cvv, setCvv] = useState('')
  const [cvvLength, setCvvLength] = useState(3)
  const [cvvIsVisible, setCvvIsVisible] = useState('password')

  const [cardNumber, setCardNumber] = useState('')
  const [expDate, setExpDate] = useState('')
  const [cardHolder, setCardHolder] = useState('')

  const localHost = 'http://www.localhost:8000'

  const numbersOnly = (input) => {
    const { value } = input.target
    const inputValue = value.replace(/[^0-9]/g, '')

    return inputValue
  }

  const charactersOnly = (input) => {
    const { value } = input.target
    const inputValue = value.replace(/[^a-z ]/gi, '')

    return inputValue
  }

  const formatCardNumber = (e) => {
    const inputValue = numbersOnly(e)

    if (inputValue.length <= 19) {
      setCardNumber(inputValue)
    }
  }

  const formatExpDate = (e) => {
    const inputValue = numbersOnly(e)

    if (inputValue.length <= 2) {
      setExpDate(inputValue)
    } else if (inputValue.length <= 4) {
      setExpDate(`${inputValue.slice(0, 2)}/${inputValue.slice(2)}`)
    }
  }

  const formatCvvNumber = (e) => {
    const inputValue = numbersOnly(e)
    const cardFirstNumbers = cardNumber.slice(0, 2)

    setCvv(inputValue)

    switch (cardFirstNumbers) {
      case '34':
        setCvvLength(4)
        break;
      case '37':
        setCvvLength(4)
        break;
      default:
        setCvvLength(3)
        break;
    }
  }

  const makeVisible = () => {
    switch (cvvIsVisible) {
      case 'password':
        setCvvIsVisible('text')
        break;
      default:
        setCvvIsVisible('password')
        break;
    }
  }

  const formatCardHolder = (e) => {
    const inputValue = charactersOnly(e)

    setCardHolder(inputValue)
  }

  const handleOnSubmitt = async (form) => {
    form.preventDefault()

    const dataToSend = {
      "card_number": cardNumber,
      "expiration_date": expDate,
      "security_number": cvv,
      "card_holder": cardHolder
    }

    try {
      const postResponse = await axios.post(`${localHost}/api/v1/payment`, dataToSend)
      setStatus(postResponse.status)
    } catch (err) {
      if (err.response) {
        setStatus(err.response.status)
      }
    } finally {
      setTimeout(() => {
        setStatus('')
      }, 5000)
    }
  }

  const alertStatus = () => {
    const isValid = status === 201

    return {
      color: isValid ? colors.success : colors.error,
      message: isValid ? message.success : message.error
    }
  }

  return (
    <>
      <Form onSubmit={handleOnSubmitt}>
        <FormInput
          labelText={'Card Number'}
          nameProp={'card_number'}
          valueProp={cardNumber?.match(/.{1,4}/g)?.join(' ') || ''}
          onChangeProp={(e) => formatCardNumber(e)}
          typeProp={'text'}
          maxLengthProp={23}
        />

        <FormInput
          labelText={'Expiration Date'}
          nameProp={'expiration_date'}
          placeHolderProp={'mm/yy'}
          valueProp={expDate}
          onChangeProp={(e) => formatExpDate(e)}
          typeProp={'text'}
          maxLengthProp={5}
        />

        <CustomInputGroup
          labelText={'Security Number'}
          nameProp={'security_number'}
          valueProp={cvv || ''}
          onChangeProp={(e) => formatCvvNumber(e)}
          typeProp={cvvIsVisible}
          maxLengthProp={cvvLength}
          onClickProp={() => makeVisible()}
        />

        <FormInput
          labelText={'Card Holder'}
          nameProp={'card_holder'}
          valueProp={cardHolder || ''}
          onChangeProp={(e) => formatCardHolder(e)}
          typeProp={'text'}
        />

        <Row>
          <Col className='form-button'>
            <Button
              color='primary'
            >
              Make a Payment
            </Button>
          </Col>
        </Row>
      </Form>

      {status && (
        <CustomAlert params={alertStatus()} />
      )}
    </>
  )
}

export default PaymentForm

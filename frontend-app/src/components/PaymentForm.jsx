import './styles.css'
import axios from 'axios'
import { useState } from 'react'
import CustomAlert from './CustomAlert'
import { colors, message } from './alertOptions'
import { Button, Col, Form, Input, Label, Row } from 'reactstrap'

const PaymentForm = () => {
  const [status, setStatus] = useState(false)
  const [expDate, setExpDate] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const localHost = 'http://www.localhost:8000'

  const numbersOnly = (e) => {
    const { value } = e.target
    const inputValue = value.replace(/[^0-9]/g, '')

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


  const handleOnSubmitt = async (formData) => {
    formData.preventDefault()

    const dataToSend = {
      "card_number": cardNumber,
      "expiration_date": expDate,
      "security_number": formData.target.security_number.value,
      "card_holder": formData.target.card_holder.value
    }

    try {
      const postResponse = await axios.post(`${localHost}/api/v1/payment`, dataToSend);
      setStatus(postResponse.status);
    } catch (err) {
      if (err.response) {
        setStatus(err.response.status);
      }
    } finally {
      setTimeout(() => {
        setStatus('');
      }, 5000);
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
        <Row>
          <Col>
            <Label>
              Card Number
            </Label>
            <Input
              name='card_number'
              value={cardNumber?.match(/.{1,4}/g)?.join(' ') || ''}
              onChange={(e) => formatCardNumber(e)}
              type='text'
              maxLength={23}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Label>
              Expiration Date
            </Label>
            <Input
              name='expiration_date'
              placeholder='mm/yy'
              value={expDate}
              onChange={(e) => formatExpDate(e)}
              type='text'
              required
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Label>
              Security Number
            </Label>
            <Input
              name='security_number'
              type='password'
              required maxLength={4}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Label>
              Card Holder
            </Label>
            <Input
              name='card_holder'
              type='text'
              required
            />
          </Col>
        </Row>

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

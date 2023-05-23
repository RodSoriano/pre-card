import './styles.css'
import axios from 'axios'
import { useState } from 'react'
import CustomAlert from './CustomAlert'
import { colors, message } from './alertOptions'
import { Button, Col, Form, Input, Label, Row, InputGroup } from 'reactstrap'

const PaymentForm = () => {
  const [status, setStatus] = useState(false)

  const [cvvIsVisible, setCvvIsVisible] = useState('password')
  const [cvv, setCvv] = useState('')
  const [cvvLength, setCvvLength] = useState(3)

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
    const inputValue = value.replace(/[^a-z]\s/gi, '')

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
      case '34' || '37':
        setCvvLength(4)
        break;
      default:
        setCvvLength(3)
    }
  }

  const makeVisible = (e) => {
    if (cvvIsVisible === 'password') {
      setCvvIsVisible('text')
    } else {
      setCvvIsVisible('password')
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
              value={cvv || ''}
              onChange={(e) => formatCvvNumber(e)}
              maxLength={cvvLength}
              type={cvvIsVisible}
              required
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
              value={cardHolder || ''}
              onChange={(e) => formatCardHolder(e)}
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

        <br />

        <InputGroup>
          <Input />
          <Button
            onClick={() => makeVisible()}
          />
        </InputGroup>
      </Form>

      {status && (
        <CustomAlert params={alertStatus()} />
      )}
    </>
  )
}

export default PaymentForm

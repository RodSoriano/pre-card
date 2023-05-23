import { Row, Col, Label, Input } from 'reactstrap'

const FormInput = ({
  labelText,
  nameProp,
  placeHolderProp,
  valueProp,
  onChangeProp,
  typeProp,
  maxLengthProp
}) => {
  return (
    <Row>
      <Col>
        <Label>
          {labelText}
        </Label>
        <Input
          name={nameProp}
          placeholder={placeHolderProp}
          value={valueProp}
          onChange={onChangeProp}
          type={typeProp}
          maxLength={maxLengthProp}
          required
        />
      </Col>
    </Row>
  )
}

export default FormInput

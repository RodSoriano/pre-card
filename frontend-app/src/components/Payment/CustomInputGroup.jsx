import { Row, Col, Label, InputGroup, Input, Button } from 'reactstrap'

const CustomInputGroup = ({
  labelText,
  nameProp,
  valueProp,
  onChangeProp,
  typeProp,
  maxLengthProp,
  onClickProp,
  colorProp
}) => {
  return (
    <Row>
      <Col>
        <Label>
          {labelText}
        </Label>
        <InputGroup>
          <Input
            name={nameProp}
            value={valueProp}
            onChange={onChangeProp}
            maxLength={maxLengthProp}
            type={typeProp}
            required
          />
          <Button
            onClick={onClickProp}
            color={colorProp}
          >
          </Button>
        </InputGroup>
      </Col>
    </Row>
  )
}

export default CustomInputGroup

import { Field } from 'formik';
import { Col, Row } from 'reactstrap';

type CreateCaseModalFieldProps = {
    label?: string
    fieldType?: string
    fieldName: string
    value: string | boolean
    onChange?: (event) => void
}

export const CreateCaseModalField = ({
    label,
    fieldType = 'text',
    fieldName,
    value,
    onChange
}: CreateCaseModalFieldProps) => {


    return (
        <Row className='mb-2 flexBase'>
            <Col >{label}</Col>
            <Col>
                <Field className='form-control'
                    type={fieldType}
                    name={fieldName}
                    value={value}
                />
            </Col>
        </Row>
    );
};


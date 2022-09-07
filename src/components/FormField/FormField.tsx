import { Col } from 'reactstrap';
import { Field } from 'formik';
import { IFieldFormProps } from './FormFieldTypes';
import { VALUE_FIELDS_FOR_FORM } from 'constants/app_сonstants';

const FieldForm = ({ label, value, typeInput = 'text' }: IFieldFormProps) => {
  return (
    <Col>
      <h6>
        <strong>{VALUE_FIELDS_FOR_FORM[label]}</strong>
      </h6>
      {typeInput === 'text' ? (
        value
      ) : (
        <Field name={label}>
          {({ field }) => (
            <div>
              <input
                className='form-control'
                type={typeInput}
                id='example-date-input'
                {...field}
              />
            </div>
          )}
        </Field>
      )}
    </Col>
  );
};

export default FieldForm;

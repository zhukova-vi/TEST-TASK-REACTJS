import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Button, Col, Input, Label, Modal, Row } from 'reactstrap';
import { CreateCaseModalField } from './CreateCaseModalField';
import { connect } from 'react-redux';
import { INITIAL_VALUE_CASE_FOR_FORM } from './CreateCaseModal.const';
import { createCaseModalDataSend } from './useCreateCaseModal';
import { getDataCases } from 'store/selectors';
import { RootState } from 'store/reducers';
import { addJudicalCase } from 'store/actions';
import { CreateCaseModalSetField } from './CreateCaseModalSetField';

type CreateCaseModalProps = {
  areaId: number,
  isOpenModal: boolean,
  closeModal: () => void,
  addJudicalCase: (data: any) => {};
}

const CreateCaseModal = ({ areaId, isOpenModal, closeModal, addJudicalCase }: CreateCaseModalProps) => {

  const [plaintiffIsLegalPerson, setPlaintiffIsLegalPerson] = useState(false);
  const [defendantIsLegalPerson, setDefendantIsLegalPerson] = useState(true);

  return (
    <Modal
      centered
      isOpen={isOpenModal}
      toggle={closeModal}
      className={'modal-dialog modal-dialog-centered'}
      size='ld'>
      <div onClick={closeModal} className='modal-closebtn'>
        <i className='fas fa-times' />
      </div>
      <div className='bg-primary bg-soft modal-header__narrow'>
        <div className='text-primary'>
          <h5 className='text-primary h3'>Создать дело</h5>
        </div>
      </div>
      <Formik
        initialValues={INITIAL_VALUE_CASE_FOR_FORM}
        onSubmit={(values) => {
          const dataSend = createCaseModalDataSend(areaId, values, plaintiffIsLegalPerson, defendantIsLegalPerson)
          console.log(dataSend);

          // addJudicalCase(dataSend);
          // closeModal();
        }}>
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className='modal-body'>
              <Row>
                <Col>
                  <CreateCaseModalField label='УИД' fieldName='uid' value={values.uid} />
                  <CreateCaseModalField label='Номер' fieldName='case_id' value={values.case_id} />
                </Col>
                <Col>
                  <Row className='flexBase'>
                    <Col><strong>Дата:</strong></Col>
                    <Col>
                      <CreateCaseModalField fieldType='date' fieldName='date' value={values.date} />
                    </Col>
                  </Row>
                </Col>
                <Row className='mb-4'></Row>
              </Row>
              <Row className='mb-2'>
                <Col>
                  <Row className='flexBase'>
                    <Col>
                      <Label> <strong>Истец:</strong></Label>
                    </Col>
                    <Col style={{ display: 'flex', gap: '10px' }}>
                      <Input type='checkbox' onChange={() => setPlaintiffIsLegalPerson(prevState => !prevState)} />
                      <Label>Юридическое лицо</Label>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row className='flexBase'>
                    <Col>
                      <Label> <strong>Ответчик:</strong></Label>
                    </Col>
                    <Col style={{ display: 'flex', gap: '10px' }}>
                      <Input type='checkbox' checked={defendantIsLegalPerson} onChange={() => setDefendantIsLegalPerson(prevState => !prevState)} />
                      <Label>Юридическое лицо</Label>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <CreateCaseModalSetField prefixfieldName='plaintiff' values={values} isLegalPerson={plaintiffIsLegalPerson} ></CreateCaseModalSetField>
                <CreateCaseModalSetField prefixfieldName='defendant' values={values} isLegalPerson={defendantIsLegalPerson} ></CreateCaseModalSetField>
              </Row>
              <Row>
                <Col>
                  <div className='mt-5 modal-buttons-container'>
                    <Button className='btn btn-secondary' onClick={closeModal}>Отмена</Button>
                    <Button className='btn btn-primary' color='primary' type='submit'>Сохранить</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </Modal >
  );
};

const mapStatetoProps = (state: RootState) => {
  return { data: getDataCases(state) };
};

export default connect(mapStatetoProps, {
  addJudicalCase,
})(CreateCaseModal);
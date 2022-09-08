import { Field, useField } from 'formik';
import { useEffect, useState } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';
import { ICreateCaseModal } from './CreateCaseModal.types';
import { CreateCaseModalField } from './CreateCaseModalField';

type CreateCaseModalFieldSetProps = {
    prefixfieldName: string
    values: ICreateCaseModal
    isLegalPerson: boolean
}


export const CreateCaseModalSetField = ({
    prefixfieldName,
    values,
    isLegalPerson
}: CreateCaseModalFieldSetProps) => {

    const [sameOfAddresses, seteSameOfAddresses] = useState(false);
    const [, , mailingHelpers] = useField(`${prefixfieldName}Mailing_address`);
    const [, legalMeta] = useField(`${prefixfieldName}Legal_address`);
    const { value } = legalMeta;
    const { setValue } = mailingHelpers;

    useEffect(() => {
        sameOfAddresses && setValue(value);
    }, [sameOfAddresses, value])

    return (
        <Col>
            {/* Физическое лицо */}
            {!isLegalPerson &&
                <div>
                    <CreateCaseModalField label='Фамилия' fieldName={`${prefixfieldName}Lastname`} value={values[`${prefixfieldName}Lastname`]} />
                    <CreateCaseModalField label='Имя' fieldName={`${prefixfieldName}Name`} value={values[`${prefixfieldName}Name`]} />
                    <CreateCaseModalField label='Отчество' fieldName={`${prefixfieldName}Surname`} value={values[`${prefixfieldName}Surname`]} />
                    <CreateCaseModalField label='Дата рождения' fieldType='date' fieldName={`${prefixfieldName}Birthday`} value={values[`${prefixfieldName}Birthday`]} />
                    <CreateCaseModalField label='Адрес регистрации' fieldName={`${prefixfieldName}Reg_address`} value={values[`${prefixfieldName}Reg_address`]} />
                    <CreateCaseModalField label='Адрес проживания' fieldName={`${prefixfieldName}Res_address`} value={values[`${prefixfieldName}Res_address`]} />
                    <CreateCaseModalField label='Номер телефона' fieldName={`${prefixfieldName}Phone`} value={values[`${prefixfieldName}Phone`]} />
                </div>}

            {/* Юр.лицо*/}
            {isLegalPerson &&
                <div>
                    <CreateCaseModalField label='ИНН' fieldName={`${prefixfieldName}Inn`} value={values[`${prefixfieldName}Inn`]} />
                    <CreateCaseModalField label='ОГРН' fieldName={`${prefixfieldName}Ogrn`} value={values[`${prefixfieldName}Ogrn`]} />
                    <CreateCaseModalField label='Название компании' fieldName={`${prefixfieldName}Company`} value={values[`${prefixfieldName}Company`]} />
                    <CreateCaseModalField label='Юридический адрес' fieldName={`${prefixfieldName}Legal_address`} value={values[`${prefixfieldName}Legal_address`]} />
                    {/* Почтовый адрес совпадает с юридическим */}
                    <Row>
                        <Col></Col>
                        <Col style={{ display: 'flex', gap: '5px' }}>
                            <Input className='modal-chexkbox-min' type='checkbox' onChange={() => seteSameOfAddresses(prevState => !prevState)} />
                            <Label > Почтовый адрес совпадает с юридическим</Label>
                        </Col>
                    </Row>

                    <CreateCaseModalField label='Почтовый адрес' fieldName={`${prefixfieldName}Mailing_address`} value={values[`${prefixfieldName}Mailing_address`]} />
                    <CreateCaseModalField label='КПП' fieldName={`${prefixfieldName}Kpp`} value={values[`${prefixfieldName}Kpp`]} />
                    <CreateCaseModalField label='Р/с' fieldName={`${prefixfieldName}Pc`} value={values[`${prefixfieldName}Pc`]} />
                    <CreateCaseModalField label='Банк' fieldName={`${prefixfieldName}Bank`} value={values[`${prefixfieldName}Bank`]} />
                    <CreateCaseModalField label='БИК' fieldName={`${prefixfieldName}Bic`} value={values[`${prefixfieldName}Bic`]} />
                    <CreateCaseModalField label='К/с' fieldName={`${prefixfieldName}Kc`} value={values[`${prefixfieldName}Kc`]} />
                </div>
            }
        </Col>
    );
};

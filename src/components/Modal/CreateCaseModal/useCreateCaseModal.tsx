export const createCaseModalDataSend = (areaId, values, plaintiffIsLegalPerson, defendantIsLegalPerson) => {
    const plaintiff = plaintiffIsLegalPerson ? {
        inn: values.plaintiffInn,
        ogrn: values.plaintiffOgrn,
        company: values.plaintiffCompany,
        legal_address: values.plaintiffLegal_address,
        mailing_address: values.plaintiffMailing_address,
        kpp: values.plaintiffKpp,
        pc: values.plaintiffPc,
        bank: values.plaintiffBank,
        bic: values.plaintiffBic,
        kc: values.plaintiffKc,
        type: 1,
    } :
        {
            birthday: values.plaintiffBirthday,
            lastname: values.plaintiffLastname,
            name: values.plaintiffName,
            surname: values.plaintiffSurname,
            phone: values.plaintiffPhone,
            reg_address: values.plaintiffReg_address,
            res_address: values.plaintiffRes_address,
            type: 0,
        }

    const defendant = defendantIsLegalPerson ? {
        inn: values.defendantInn,
        ogrn: values.defendantOgrn,
        company: values.defendantCompany,
        legal_address: values.defendantLegal_address,
        mailing_address: values.defendantMailing_address,
        kpp: values.defendantKpp,
        pc: values.defendantPc,
        bank: values.defendantBank,
        bic: values.defendantBic,
        kc: values.defendantKc,
        type: 1,
    } :
        {
            birthday: values.defendantBirthday,
            lastname: values.defendantLastname,
            name: values.defendantName,
            surname: values.defendantSurname,
            phone: values.defendantPhone,
            reg_address: values.defendantReg_address,
            res_address: values.defendantRes_address,
            type: 0,
        }

    const dataSend = {
        uid: values.uid,
        case_id: values.case_id,
        plaintiff: { ...plaintiff },
        defendant: { ...defendant },
        start: values.date,
        end: '',
        area_id: areaId,
    }
    return dataSend;
}
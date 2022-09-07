import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { loadJudicialCases } from 'store/actions';
import { RootState } from 'store/reducers';
import { Breadcrumbs, Table } from 'components';
import { columnsTable } from './components';
import { IJudicialCasesProps } from './JudicialCasesTypes';
import { getDateInFormat } from 'utils/app_helper';
import { judicialCasesRenderPeopleType } from './components/JudicialCasesTable/JudicialCasesTableColumns';
import CreateCaseModal from 'components/Modal/CreateCaseModal/CreateCaseModal';

const JudicialCases = ({
  areaId,
  loadJudicialCases,
  listJudicialCases,
}: IJudicialCasesProps) => {
  const [listCasesSorted, setListCasesSorted] = useState(listJudicialCases);
  const [searchInput, setSearchInput] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    areaId && loadJudicialCases(areaId);
  }, [loadJudicialCases, areaId]);

  useEffect(() => {
    setListCasesSorted(listJudicialCases);
  }, [listJudicialCases]);
  useEffect(() => {
    if (searchInput === '') return setListCasesSorted(listJudicialCases);
    const sortedArray = listJudicialCases?.filter(
      item =>
        item.uid.toString().toLowerCase().indexOf(searchInput.toLowerCase()) !==
        -1 ||
        item.case_id
          .toString()
          .toLowerCase()
          .indexOf(searchInput.toLowerCase()) !== -1 ||
        getDateInFormat(item.start)
          .toString()
          .toLowerCase()
          .indexOf(searchInput.toLowerCase()) !== -1 ||
        getDateInFormat(item?.end)
          .toString()
          .toLowerCase()
          .indexOf(searchInput.toLowerCase()) !== -1 ||
        judicialCasesRenderPeopleType(item?.plaintiff)
          .toString()
          .toLowerCase()
          .indexOf(searchInput.toLowerCase()) !== -1 ||
        judicialCasesRenderPeopleType(item?.defendant)
          .toString()
          .toLowerCase()
          .indexOf(searchInput.toLowerCase()) !== -1,
    );

    setListCasesSorted(sortedArray);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, listJudicialCases]);

  const searchInputHandler = e => {
    setSearchInput(e.target.value);
  };

  const openModalhandler = () => {
    setIsOpenModal(true);
  }

  const closeModalHandler = () => {
    setIsOpenModal(false);
    areaId && loadJudicialCases(areaId);
  }

  if (areaId === undefined) {
    return null;
  }

  return (
    <>
      <Breadcrumbs
        title='Дела судебного участка'
        breadcrumbItems={['Дела судебного участка', 'Создание']}
      />
      <Row>
        <Col xs='12'>
          <div className='judicialcases-content-wrapper'>
            <div className='judicialcases-header'>
              <div className='judicialcases-header-search'>
                <span className='me-2'>Поиск по делам : </span>
                <input
                  className='judicialcases-header-search-input'
                  type='text'
                  value={searchInput}
                  onChange={searchInputHandler}
                />
              </div>
              <Button color='primary' onClick={openModalhandler}>Создать дело</Button>
            </div>

            <Table
              data={listCasesSorted}
              columns={columnsTable}
              keyField='id'
            />
          </div>
        </Col>
      </Row>
      <CreateCaseModal
        areaId={areaId}
        isOpenModal={isOpenModal}
        closeModal={closeModalHandler}
      />
    </>
  );
};
const mapStateToProps = (state: RootState) => {
  const { areaId } = state.Profile;
  const { listJudicialCases, currentItem } = state.JudicialCases;

  return { areaId, listJudicialCases, currentItem };
};

export default connect(mapStateToProps, {
  loadJudicialCases,
})(withRouter(JudicialCases));

import { createSelector } from 'reselect';
import { RootState } from 'store/reducers';
import { CreateCaseData, IJudicialCases } from './types';

const getState = (rootState: RootState) => {
  return rootState.JudicialCases;
};

export const getCaseNumber = createSelector(
  getState,
  (state: IJudicialCases) => state.selectedCaseNumber || '_',
);

export const getCaseId = createSelector(
  getState,
  (state: IJudicialCases) => state.selectedCaseId || '_',
);

export const getDataCases = createSelector(
  getState,
  (state: CreateCaseData) => {
    const data = state.dataCases;

    if (data) {
      return { ...data };
    }

    return undefined;
  },
);

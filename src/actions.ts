import actionCreatorFactory from 'typescript-fsa';

import { FormValues } from './components';

const actionCreator = actionCreatorFactory();

export const submitForm = actionCreator<FormValues>('SUBMIT_FORM');

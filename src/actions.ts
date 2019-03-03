import actionCreatorFactory from "typescript-fsa";

import { FormValues } from "./Components";

const actionCreator = actionCreatorFactory();

export const submitForm = actionCreator<FormValues>("SUBMIT_FORM");

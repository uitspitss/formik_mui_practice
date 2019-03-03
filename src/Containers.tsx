import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Action } from "typescript-fsa";

import { submitForm } from "./actions";
import PracticeForm, { FormValues } from "./Components";

interface DispatchProps {
  submit: (values: FormValues) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action<FormValues>>
): DispatchProps =>
  bindActionCreators(
    {
      submit: values => submitForm(values)
    },
    dispatch
  );

export default connect<{}, DispatchProps>(
  null,
  mapDispatchToProps
)(PracticeForm);

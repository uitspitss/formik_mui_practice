import * as React from "react";
import * as Yup from "yup";

import {
  FormControlLabel,
  LinearProgress,
  MenuItem,
  Radio
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Field, FieldArray, InjectedFormikProps, withFormik } from "formik";
import {
  Checkbox,
  CheckboxWithLabel,
  RadioGroup,
  Switch,
  TextField
} from "formik-material-ui";
import { DropzoneArea } from "material-ui-dropzone";

export interface FormValues {
  text: string;
  email: string;
  password: string;
  textarea: string;
  select: string;
  gender: string;
  switch: boolean;
  checkbox: boolean;
  checkboxwithlabel: boolean;
  file: string;
  files: File[];
  extra: boolean;
  array: any[];
}

export interface FormProps {
  submit: (values: FormValues) => void;
}

const PracticeForm: React.FC<InjectedFormikProps<FormProps, FormValues>> = ({
  touched,
  errors,
  values,
  isSubmitting,
  isValid,
  handleSubmit,
  handleChange,
  setFieldValue
}) => (
  <form
    className="practice-form"
    onSubmit={handleSubmit}
    encType="multipart/form-data"
  >
    <Field
      name="text"
      label="text *"
      type="text"
      component={TextField}
      value={values.text}
      onChange={handleChange}
      fullWidth={true}
    />
    <br />
    <Field
      name="email"
      label="email *"
      type="email"
      component={TextField}
      value={values.email}
      onChange={handleChange}
      fullWidth={true}
    />
    <br />
    <Field
      name="password"
      label="password *"
      type="password"
      component={TextField}
      value={values.password}
      onChange={handleChange}
      error={errors.password && touched.password}
      fullWidth={true}
    />
    <br />
    <Field
      name="textarea"
      label="textarea *"
      type="text"
      component={TextField}
      value={values.textarea}
      multiline={true}
      fullWidth={true}
    />
    <br />
    <Field
      name="gender"
      label="gender *"
      component={RadioGroup}
      values={values.gender}
      onChange={handleChange}
    >
      <FormControlLabel
        value="male"
        label="Male"
        control={<Radio disabled={isSubmitting} />}
        disabled={isSubmitting}
      />
      <FormControlLabel
        value="female"
        label="Female"
        control={<Radio disabled={isSubmitting} />}
        disabled={isSubmitting}
      />
      <FormControlLabel
        value="other"
        label="Other"
        control={<Radio disabled={isSubmitting} />}
        disabled={isSubmitting}
      />
    </Field>
    <br />
    <Field
      name="select"
      label="select *"
      select={true}
      component={TextField}
      variant="outlined"
      InputLabelProps={{ shrink: true }}
    >
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((value, index) => (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      ))}
    </Field>
    <br />
    <Field name="switch" label="switch" component={Switch} />
    <br />
    <Field name="checkbox" label="checkbox" component={Checkbox} />
    <br />
    <Field
      name="checkboxwithlabel"
      label="checkboxwithlabel"
      component={CheckboxWithLabel}
      Label={{ label: "checkbox with label" }}
    />
    <br />

    <Field
      name="date"
      label="date *"
      type="date"
      InputLabelProps={{ shrink: true }}
      component={TextField}
      variant="outlined"
    />
    <br />

    <Field
      name="file"
      type="file"
      onChange={(e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (item: any) => {
          setFieldValue("file_data", item.target.result);
        };

        reader.readAsDataURL(file);
      }}
    />

    <DropzoneArea
      onChange={acceptedFiles => {
        setFieldValue("files", acceptedFiles);
        acceptedFiles.map((f: any, index: number) => {
          const reader = new FileReader();
          reader.onload = (item: any) => {
            setFieldValue(`files_data${index}`, item.target.result);
          };
          reader.readAsDataURL(f);
        });
      }}
    />
    <br />

    <Field
      name="extra"
      label="extra"
      component={CheckboxWithLabel}
      Label={{ label: "extra" }}
      values={values.extra.toString()}
      onChange={handleChange}
    />
    <br />

    {values.extra && (
      <Field name="extraText" label="extraText" component={TextField} />
    )}
    <br />

    <FieldArray
      name="array"
      render={helpers => (
        <div>
          {values.array && values.array.length > 0 ? (
            values.array.map((content, index) => (
              <div key={index}>
                <Field
                  name={`array-text.${index}`}
                  label="text"
                  component={TextField}
                />
                &nbsp;
                <Field
                  name={`array-select.${index}`}
                  label="select"
                  select={true}
                  component={TextField}
                  style={{ width: 100 }}
                  InputLabelProps={{ shrink: true }}
                >
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (value, idx) => (
                      <MenuItem key={idx} value={value}>
                        {value}
                      </MenuItem>
                    )
                  )}
                </Field>
                &nbsp;
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => helpers.remove(index)}
                >
                  -
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => helpers.push("")}
                >
                  +
                </Button>
              </div>
            ))
          ) : (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => helpers.push("")}
            >
              Add a array
            </Button>
          )}
        </div>
      )}
    />
    <br />

    {isSubmitting && <LinearProgress />}
    <br />

    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={isSubmitting || !isValid}
    >
      Submit
    </Button>
  </form>
);

export default withFormik<FormProps, FormValues>({
  mapPropsToValues: props => ({
    text: "hello world",
    email: "hello_world@example.com",
    password: "hello___world123",
    textarea: "multiline\ntextarea",
    select: "Thu",
    gender: "male",
    switch: true,
    checkbox: true,
    checkboxwithlabel: true,
    date: "2019-03-05",
    file: "",
    files: [],
    extra: false,
    array: []
  }),
  validationSchema: Yup.object().shape({
    text: Yup.string().required("please input text"),
    email: Yup.string()
      .email("Email is not valied")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "password has to be longer than 6 characters")
      .required("password is required"),
    gender: Yup.string().required("gender has to select one")
    // file: Yup.mixed()
    //   .required("Required")
    //   .test(
    //     "file",
    //     "File must be less than 10MB",
    //     value => value === null || value.size < 10485760
    //   )
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(() => {
      props.submit(values);
      setSubmitting(false);
    }, 1000);
  }
})(PracticeForm);

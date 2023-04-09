import { local } from "@utils";
import { Field, Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import { TypeOf, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import "./styles.css";

const userFormSchema = object({
  username: string({
    required_error: "Please enter your username",
  }),
});

type UserFormInputs = TypeOf<typeof userFormSchema>;

type Props = {
  hasPrevUser: boolean;
  setPrevUsername: Dispatch<SetStateAction<string>>;
};

const UserForm = ({ hasPrevUser, setPrevUsername }: Props) => {
  const handleDoneClick = (e: any) => {
    if (!hasPrevUser) return;
    e.preventDefault(); // prevent not to validate when Start New
    local({ key: "username" }).bye(); // update local storage
    setPrevUsername(""); // update prevUser -> rerender

    // TODO: clear DB here -> optimize usage of storage
  };

  return (
    <Formik<UserFormInputs>
      initialValues={{
        username: "",
      }}
      onSubmit={(values, helpers) => {
        // update local storage
        local({ key: "username", value: values.username }).set();

        // update prevUser -> rerender
        setPrevUsername(values.username);

        // reset form fields
        helpers.resetForm();
      }}
      validationSchema={toFormikValidationSchema(userFormSchema)}
    >
      {(formikState) => {
        const errors = formikState.errors;
        return (
          <Form className="user-form-wrapper">
            {/* username field */}
            {!hasPrevUser && (
              <Field
                type="text"
                name="username"
                placeholder="What makes you unique?"
                className="user-form-input"
              />
            )}
            {!!errors.username && (
              <label className="label">
                <span className="label-text text-error">{errors.username}</span>
              </label>
            )}

            {/* submit button */}
            <button
              type="submit"
              className={`btn btn-sm w-[40%] ${
                !errors.username && !hasPrevUser && "mt-5"
              }`}
              onClick={handleDoneClick}
            >
              {!hasPrevUser && "Let's Go"}
              {hasPrevUser && "Start New"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserForm;

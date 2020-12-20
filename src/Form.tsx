import { FC, useState, createContext, FormEvent } from 'react';
import { PrimaryButton, WarningButton,gray5, gray6 } from './Styles';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
type Validator = (value: any, args?: any) => string;
interface FormContextProps {
  values: Values;
  setValue?: (fieldName: string, value: any) => void;
  errors: Errors;
  validate?: (fieldName: string) => void;
  touched: Touched;
  setTouched?: (fieldName: string) => void;
}
interface Validation {
  validator: Validator;
  arg?: any;
}

interface ValidationProp {
  [key: string]: Validation | Validation[];
}
interface Props {
  submitCaption?: string;
  validationRules?: ValidationProp;
  onSubmit: (values: Values) => Promise<SubmitResult>;
  onClear?: () => void;
  initialValues?:Values;
  successMessage?: string;
  failureMessage?: string;
}
export const FormContext = createContext<FormContextProps>({
  values: {},
  errors: {},
  touched: {},
});

export const Form: FC<Props> = ({
  submitCaption,
  children,
  validationRules,
  onSubmit,
  onClear,
  initialValues,
  successMessage = 'Success!',
  failureMessage = 'Something went wrong',
}) => {
  const [values, setValues] = useState<Values>(initialValues ? initialValues: {});
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const validate = (fieldName: string): string[] => {
    if (!validationRules) {
      return [];
    }
    if (!validationRules[fieldName]) {
      return [];
    }
    const rules = Array.isArray(validationRules[fieldName])
      ? (validationRules[fieldName] as Validation[])
      : ([validationRules[fieldName]] as Validation[]);
    const fieldErrors: string[] = [];
    rules.forEach((rule) => {
      const error = rule.validator(values[fieldName], rule.arg);
      if (error) {
        fieldErrors.push(error);
      }
    });
    const newErrors = { ...errors, [fieldName]: fieldErrors };
    setErrors(newErrors);
    return fieldErrors;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      setSubmitError(false);
      const result = await onSubmit(values);
      setErrors(result.errors || {});
      setSubmitError(!result.success);
      setSubmitting(false);
      setSubmitted(true);
    }
  };
  const validateForm = () => {
    const newErrors: Errors = {};
    let haveError: boolean = false;
    if (validationRules) {
      Object.keys(validationRules).forEach((fieldName) => {
        newErrors[fieldName] = validate(fieldName);
        if (newErrors[fieldName].length > 0) {
          haveError = true;
        }
      });
    }
    setErrors(newErrors);
    return !haveError;
  };

  const handleClear =(e:any) => {
    e.preventDefault();
    
    setSubmitted(false);
    setValues(initialValues ? initialValues: {});
    if(onClear){
      onClear();
    }
  
    
  };
  return (
    <FormContext.Provider
      value={{
        values,
        setValue: (fieldName: string, value: any) => {
          setValues({ ...values, [fieldName]: value });
          setSubmitted(false);
        },
        
        errors,
        validate,
        touched,
        setTouched: (fieldName: string) => {
          setTouched({ ...touched, [fieldName]: true });
        },
      }}
    >

      <form noValidate={true} onSubmit={handleSubmit}>
        <fieldset
         
          css={css`
            margin: 10px 10px;
            padding: 30px;
            width: 350px;
            background-color: ${gray6};
            border-radius: 4px;
            border: 1px solid ${gray5};
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
          `}
        >
          {children}
          <div 
         css={css`
         display:flex;
         justify-content: space-between;
        
           
       `}
       >
          <div
            css={css`
              margin: 30px 0px 0px 0px;
              padding: 1px 0px 0px 0px;
              border-top: 1px solid ${gray5};

            `}
          >
            <PrimaryButton type="submit"> {submitCaption} </PrimaryButton>
          </div>
          <div
            css={css`
              margin: 30px 0px 0px 0px;
              padding: 1px 0px 0px 0px;
              border-top: 1px solid ${gray5};
              float:right;
            `}
          >
            <WarningButton onClick={handleClear} > Clear </WarningButton>
          </div>
          </div>
  
       
       
          {submitted && submitError && (
            <p
              css={css`
                color: red;
              `}
            >
              {failureMessage}
            </p>
          )}
          {submitted && !submitError && (
            <p
              css={css`
                color: green;
              `}
            >
              {successMessage}
            </p>
          )}
        </fieldset>
      </form>
    </FormContext.Provider>
  );
};

export interface Values {
  [key: string]: any;
}

export interface Errors {
  [key: string]: string[];
}
export interface Touched {
  [key: string]: boolean;
}

export const required: Validator = (value: any): string =>
  value === undefined || value === null || value === ''
    ? 'This must be populated'
    : '';
export const minLength: Validator = (value: any, length: number): string =>
  value && value.length < length
    ? `This must be at least ${length} characters`
    : '';

export const minValue: Validator = (value: any, minValue: number): string =>
  value && value < minValue
    ? `This must be at least of value ${minValue}`
    : '';
export interface SubmitResult {
  success: boolean;
  errors?: Errors;
}

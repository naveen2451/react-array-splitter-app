/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { fontFamily, fontSize, gray5, gray2, gray6 } from './Styles';
import { FC, useContext, ChangeEvent } from 'react';
import { FormContext } from './Form';
interface Props {
  name: string;
  label?: string;
  type?: 'Text' | 'TextArea' | 'Password' | 'Number' ;
  min?:string;
  max?:string;
}
const baseCSS = css`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  margin-bottom: 5px;
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 100%;
  :focus {
    outline-color: ${gray5};
  }
  :disabled {
    background-color: ${gray6};
  }
`;
export const Field: FC<Props> = ({ name, label, type = 'Text',min =0,max }) => {
  const { setValue, touched, validate, setTouched } = useContext(FormContext);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    
    if (setValue) {
      setValue(name, e.currentTarget.value);
      if (touched[name]) {
        if (validate) {
          validate(name);
        }
      }
    }
  };
  const handleBlur = () => {
   
    if (setTouched) {
      setTouched(name);
    }
    if (validate) {
      validate(name);
    }
  };
  const handleKeyPress= (e:any) => {
    
    
  // For Now focussing for only integers on common field
  if(type === 'Number' && !(e.charCode >= 48 && e.charCode <= 57)) {
    e.preventDefault();
  }
 
  }
  return (
    <FormContext.Consumer>
      {({ values, errors }) => (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
          `}
        >
          {label && (
            <label
              css={css`
                font-weight: bold;
              `}
              htmlFor={name}
            >
              {label}
            </label>
          )}
          {(type === 'Text' || type === 'Password') && (
            <input
              type={type.toLowerCase()}
              id={name}
              css={baseCSS}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values[name] === undefined ? '' : values[name]}
            />
          )}
          {type === 'TextArea' && (
            <textarea
              id={name}
              onChange={handleChange}
              onBlur={handleBlur}
              css={css`
                ${baseCSS};
                height: 100px;
              `}
              value={values[name] === undefined ? '' : values[name]}
             
            />
          )}
           {(type === 'Number') && (
            <input
              type={type.toLowerCase()}
              id={name}
              css={baseCSS}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values[name] === undefined ? '' : values[name]}
              min={min}
              max={max}
              step="1"
              onKeyPress={handleKeyPress}
            />
          )}
      
          {errors[name] &&
            errors[name].length > 0 &&
            errors[name].map((error) => (
              <div
                key={error}
                css={css`
                  font-size: 12px;
                  color: red;
                `}
              >
                {error}
              </div>
            ))}
        </div>
      )}
    </FormContext.Consumer>
  );
};

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC,useState} from 'react';
import { Page } from './Page';
import { Form, required, minLength, minValue, SubmitResult, Values } from './Form';
import { Field } from './Field';
import { RouteComponentProps }from 'react-router-dom';
import { ResultContainer } from './ResultContainer';
import {populateArrayOnRange,populateSplitArray} from './ArrayGenerator.Utils';


export const HomePage :FC<RouteComponentProps> =  ({history}) => {
  const initialFormData:Values ={
     inputArraySize:0,
     name:'',
     splitSize:1

  }
  const [inputArray, setInputArray] = useState<number[] | undefined>([]);
  const [splitArray, setsplitArray] = useState<number[][] | undefined>([]);
  const [formData,setFormData] = useState<Values>(initialFormData);
  const handleSubmit = async (values: Values) => {
  const isValid = await  validateInput(values);
  const initialArray = populateArrayOnRange(1,Number(values.inputArraySize),1);
  
  setInputArray(initialArray);

  const formatArray = populateSplitArray(initialArray,Number(values.splitSize));
  
  setsplitArray(formatArray);
  setFormData(values as InputForm);
  return { success: isValid ? true:false  };
  };
const handleClear = () => {
setFormData(initialFormData);
setInputArray([]);
setsplitArray([]);
}

  const validateInput =(values: Values):Promise<SubmitResult> => {
   return new Promise<SubmitResult>((resolve) => {
    const result :SubmitResult ={success:true, errors:undefined}
  // Any additional validation can be added here
  if(values && values.inputArraySize > 0 && values.splitSize > 0 ){
    result.success= true;
  } 
  result.success = false;
  resolve(result);
   
  });
    
  }

  return (
    <div 
    css={css`
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction:row;
    
  `}>
    <div>
    <Page title="Please Enter Details">
      <Form 
        
        onSubmit={handleSubmit}
        onClear={handleClear}
        initialValues={initialFormData}
        submitCaption="Submit Your Input"
        validationRules={{
          name: [{ validator: required }, { validator: minLength, arg: 2 }],
          inputArraySize: [{ validator: required }, { validator: minValue, arg: 0 }],
          splitSize: [{ validator: required }, { validator: minValue, arg: 1 }],
        }}
        
        failureMessage="There was a problem with your request"
        successMessage="Your Request was Processed ,please see results section."
      >
        <Field name="name" label="Name" />
        <Field name="inputArraySize" label="Input Array Size" type="Number" min={initialFormData.inputArraySize.toString()} />
        <Field name="splitSize" label="Split Size" type="Number"  min={initialFormData.splitSize.toString()}/>
      </Form>
    </Page>
    </div>
    <div
    css={css`
    margin:0 20px;
    /* justify-content: space-between; */
    
  `}>
      <ResultContainer 
      name={formData.name}
      inputArray={inputArray}
      outputArray={splitArray}
      inputArraySize={formData.inputArraySize}
      splitSize={formData.splitSize}
        />
    </div>
 
    </div>
  );
};

export default HomePage;


export interface InputForm {
  name: string;
  inputArraySize:number;
  splitSize:number;
}

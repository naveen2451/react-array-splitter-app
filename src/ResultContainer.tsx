/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { Page } from './Page';
import { FC ,Fragment} from 'react';

import ResultPage from './ResultPage';

interface Props {
 
  name:string;
  inputArraySize:number;
  splitSize:number;
  inputArray:number[] | undefined;
  outputArray:number[] | number[][]| undefined;
}


export const ResultContainer: FC<Props> = (
  {name,
  inputArraySize,
  splitSize,
  inputArray,
  outputArray
}
  ) => {
  
    
  return (
    <Fragment>
    <Page title="Search Results">
      {(name && inputArraySize  && splitSize) && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 10px;
          `}
        >
         Hey <strong>{name}</strong> results for an input array size {inputArraySize} splitted into {splitSize} sizes
        </p>
      )}
      
    </Page>
    <div
     css={css`
     display:flex;
     height:100%;
     justify-content: space-around;
     align-self:stretch;
   `}>
     {inputArray && ( <ResultPage 
   name={'inputArray'}
   data={inputArray}
   label={'Input Array'}
   />)}
  {outputArray && (   <ResultPage 
    name={'outputArray'}
    data={outputArray}
    label={'Output Array'}
   />)}

     </div>
</Fragment>
  );
};

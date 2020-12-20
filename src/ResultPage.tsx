/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import {FC} from 'react';
interface Props {
    name:string;
    label:string;
    data:number[] | number[][];
  }
export const ResultPage :FC<Props>= ({name,label,data}) => {

  return (
    <div    css={css`
    display: flex;
    flex-direction: column;
    margin: -30px 0;
    
  `}>
{label && (<label
      css={css`
        font-weight: bold;
      `}
      htmlFor={name}
    >
      {label}
    </label>)}
{data && (<textarea 


css={css`
  display:block;
  width:50%;
  height:50%;
  margin:5px 2px;
  padding:50px;
  font-size:20px;
  overflow:auto;
  border-radius:10px;
  text-align:start;
  border: 1px solid #eee;
  transition: .3s border-color;
  :hover {
    border: 1px solid #aaa;
    }

`}
value={JSON.stringify(data, undefined, 5)}

disabled={true}
readOnly
/>)}
</div>
  );
};

export default ResultPage;

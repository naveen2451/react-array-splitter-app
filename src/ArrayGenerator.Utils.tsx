
    export  const populateArrayOnRange = (start:number, end:number, step = 1) => {
      
        const allNumbers = [start =1, end, step].every(Number.isFinite);
      
        if (!allNumbers) {
          throw new TypeError('expects only finite numbers as arguments.');
        }
        
        if (step <= 0) {
          throw new Error('step must be a number greater than 0.');
        }
    
        if(end === 0) {
          return [];
        }
        if (start > end) {
          step = -step;
        }
        
        const length = Math.floor(Math.abs((end - start) / step)) + 1;
        
        return Array.from(Array(length), (x, index) => start + index * step);
        
      }
    

      export const populateSplitArray =(initialArray:number[] , splitSize:number) => {
        const splitResult = [];
        const newSplitSize = Math.ceil(initialArray.length / splitSize);
        for (let i =0; i < initialArray.length; i += newSplitSize){
            splitResult.push(initialArray.slice(i, i + newSplitSize));
        }
        return splitResult;
      }

    
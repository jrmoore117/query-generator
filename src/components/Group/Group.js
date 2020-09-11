import React, { useState, useEffect } from 'react';
import { Condition } from '../../components';
import { CKBox, CKBadge, CKButton } from '@clearkit/react';
import Caret from "@clearkit/icons/glyphs/Caret";
import AddBlock from "@clearkit/icons/glyphs/AddBlock";
import Trash from "@clearkit/icons/glyphs/Trash";

export const Group = ({ index, groupType, groupSetType, removeGroup, buildGroupString }) => {

   const [conditions, setConditions] = useState(['']);
   const buildQueryString = (condition, conditionIndex) => {
      const { attribute, operator, values } = condition;
      let queryString = '';
      values.forEach((value, i) => {
         i === values.length - 1
            ? queryString += `    '${value.value}'`
            : queryString += `    '${value.value}',\n`
      });
      const updatedQueryString = `${type} ${attribute.column} ${operator.operator} (\n${queryString}\n  )`
      const updatedConditions = conditions.map((queryString, i) => (
         i === conditionIndex
            ? updatedQueryString
            : queryString
      ));
      setConditions(updatedConditions);
   }

   const addCondition = () => {
      setConditions([...conditions, '']);
   }

   const removeCondition = (index) => {
      const remainingConditions = conditions.filter((condition, i) => i !== index);
      setConditions(remainingConditions);
   }

   const [type, setType] = useState('AND');
   const handleSetType = () => {
      const updatedType = type === 'AND' ? 'OR' : 'AND';
      const updatedConditions = conditions.map((queryString, i) => (
         queryString.includes(type)
            ? queryString.replace(type, updatedType)
            : queryString
      ));
      setConditions(updatedConditions);
      setType(updatedType);
   }

   useEffect(() => {
      buildGroupString(conditions, index);
   }, [conditions, type]);

   console.log("GROUP CONDITIONS: ", conditions);

   return (
      <div className="mx-2 mb-2 flex items-center">
         <div className="cursor-pointer flex items-center" onClick={groupSetType}>
            <CKBadge variant="rounded" className="mr-2 pl-3 h-6">
               {groupType}
               <Caret height="16px" width="16px" />
            </CKBadge>
         </div>
         <CKBox variant="tinted-frame" className="px-4 pt-6 pb-4 w-full">
            {conditions.map((condition, i) => (
               <Condition
                  key={`Condition-${i}`}
                  index={i}
                  type={type}
                  setType={handleSetType}
                  enrichmentType="company"
                  removeCondition={removeCondition}
                  buildQueryString={buildQueryString}
               />
            ))}
            <div className="flex">
               <CKButton
                  variant="tertiary"
                  variantColor="blue"
                  leftIcon={<AddBlock />}
                  onClick={addCondition}>
                  Add condition
               </CKButton>
               <CKButton
                  variant="tertiary"
                  variantColor="blue"
                  leftIcon={<Trash />}
                  onClick={() => removeGroup(index)}
               >
                  Remove group
               </CKButton>
            </div>
         </CKBox>
      </div>
   );
}
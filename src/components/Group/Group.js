import React, { memo, useState, useEffect } from 'react';
import { Condition } from '../../components';
import { CKBox, CKBadge, CKButton } from '@clearkit/react';
import Caret from "@clearkit/icons/glyphs/Caret";
import AddBlock from "@clearkit/icons/glyphs/AddBlock";
import Trash from "@clearkit/icons/glyphs/Trash";

export const Group = memo(({ index, groupType, groupSetType, removeGroup, buildGroupString }) => {

   const [conditions, setConditions] = useState([{
      id: Math.random(),
      queryString: '',
   }]);
   const buildQueryString = (condition, index) => {
      const { attribute, operator, values } = condition;
      let valuesString = '';
      values.forEach((value, i) => {
         i === values.length - 1
            ? valuesString += `    '${value.value}'`
            : valuesString += `    '${value.value}',\n`
      });
      const updatedQueryString = `${type} ${attribute.column} ${operator.operator} (\n${valuesString}\n  )`
      const updatedConditions = conditions.map((condition, i) => (
         i === index
            ? {...condition, queryString: updatedQueryString}
            : condition
      ));
      setConditions(updatedConditions);
   }

   const addCondition = () => {
      setConditions([...conditions, {
         id: Math.random(),
         queryString: '',
      }]);
   }

   const removeCondition = (i) => {
      if (conditions.length === 1) removeGroup(index);
      const remainingConditions = conditions.filter((condition, j) => j !== i);
      setConditions(remainingConditions);
   }

   const [type, setType] = useState('AND');
   const handleSetType = () => {
      const updatedType = type === 'AND' ? 'OR' : 'AND';
      const updatedConditions = conditions.map((condition, i) => (
         condition.queryString.includes(type)
            ? {...condition, queryString: condition.queryString.replace(type, updatedType)}
            : condition
      ));
      setConditions(updatedConditions);
      setType(updatedType);
   }

   useEffect(() => {
      buildGroupString(conditions, index);
   }, [conditions, type, buildGroupString, index]);

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
                  key={condition.id}
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
});
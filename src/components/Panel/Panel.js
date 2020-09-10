import React, { useState } from 'react';
import { Condition, Group } from '../../components';
import { CKBox, CKButton, CKMultilineTextField } from '@clearkit/react';
import AddHollow from "@clearkit/icons/glyphs/AddHollow";
import AddBlock from "@clearkit/icons/glyphs/AddBlock";

export const Panel = ({ companyPanel, personPanel }) => {

   const [conditions, setConditions] = useState(['']);
   const buildQueryString = (condition, index) => {
      const { attribute, operator, values } = condition;
      let queryString = '';
      values.forEach((value, i) => {
         i === values.length - 1
            ? queryString += `  '${value.value}'`
            : queryString += `  '${value.value}',\n`
      });
      const updatedQueryString = `${type} ${attribute.column} ${operator.operator} (\n${queryString}\n)`
      const updatedConditions = conditions.map((queryString, i) => (
         i === index
            ? updatedQueryString
            : queryString
      ));
      setConditions(updatedConditions);
   }

   const addCondition = () => {
      setConditions([...conditions, '']);
   }

   const [groups, setGroups] = useState([]);
   const buildGroupString = (conditions, index) => {
      const updatedGroups = groups.map((group, i) => (
         i === index
            ? `${type} (\n  ${conditions.join('\n  ')}\n)`
            : group
      ));
      setGroups(updatedGroups);
   }

   const addGroup = () => {
      setGroups([...groups, '']);
   }

   const [type, setType] = useState('AND');
   const handleSetType = () => {
      const updatedType = type === 'AND' ? 'OR' : 'AND';
      const updatedConditions = conditions.map((queryString, i) => (
         queryString.includes(type)
            ? queryString.replace(type, updatedType)
            : queryString
      ));
      const updatedGroups = groups.map((queryString, i) => (
         queryString.includes(type)
            ? queryString.replace(type, updatedType)
            : queryString
      ));
      setConditions(updatedConditions);
      setGroups(updatedGroups);
      setType(updatedType);
   }

   return (
      <div className="p-10">
         <CKBox className="p-2">
            <div className="flex mx-3 my-2">
               <h2 className="font-semibold text-gray-900">Company Criteria</h2>
            </div>
            {conditions.map((condition, i) => (
               <Condition
                  key={`Condition-${i}`}
                  index={i}
                  type={type}
                  setType={handleSetType}
                  enrichmentType="company"
                  buildQueryString={buildQueryString}
               />
            ))}
            {groups.map((group, i) => (
               <Group
                  key={`Group-${i}`}
                  index={i}
                  groupType={type}
                  groupSetType={handleSetType}
                  buildGroupString={buildGroupString}
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
                  leftIcon={<AddHollow />}
                  onClick={addGroup}>
                  Add group
               </CKButton>
            </div>
         </CKBox>
         <CKMultilineTextField
            isReadOnly
            value={`${conditions.join('\n')}\n${groups.join('\n')}`}
            className="w-full mt-4 min-h-screen"
         />
         {/* <CKButton leftIcon={<AddHollow />} className="mt-5">Add group</CKButton> */}
      </div>
   );
}
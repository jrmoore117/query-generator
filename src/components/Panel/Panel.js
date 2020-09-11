import React, { useState } from 'react';
import { Condition, Group } from '../../components';
import { CKBox, CKButton, CKMultilineTextField } from '@clearkit/react';
import AddHollow from "@clearkit/icons/glyphs/AddHollow";
import AddBlock from "@clearkit/icons/glyphs/AddBlock";

export const Panel = ({ companyPanel, personPanel }) => {

   const [conditions, setConditions] = useState([{
      id: Math.random(),
      queryString: '',
   }]);
   // new args - conditions, setConditions, index > use conditions[index] to replace current condition arg
   // Move to utils/helpers/buildConditionString.js > import wehre
   const buildQueryString = (condition, index) => {
      const { attribute, operator, values } = condition;
      let valuesString = '';
      values.forEach((value, i) => {
         i === values.length - 1
            ? valuesString += `  '${value.value}'`
            : valuesString += `  '${value.value}',\n`
      });
      const updatedQueryString = `${type} ${attribute.column} ${operator.operator} (\n${valuesString}\n)`
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

   const removeCondition = (index) => {
      const remainingConditions = conditions.filter((condition, i) => i !== index);
      setConditions(remainingConditions);
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

   const removeGroup = (index) => {
      const remainingGroups = groups.filter((group, i) => i !== index);
      setGroups(remainingGroups);
   }

   const [type, setType] = useState('AND');
   const handleSetType = () => {
      const updatedType = type === 'AND' ? 'OR' : 'AND';
      const updatedConditions = conditions.map((condition, i) => (
         condition.queryString.includes(type)
            ? {...condition, queryString: condition.queryString.replace(type, updatedType)}
            : condition
      ));
      // const updatedGroups = groups.map((queryString, i) => (
      //    queryString.includes(type)
      //       ? queryString.replace(type, updatedType)
      //       : queryString
      // ));
      setConditions(updatedConditions);
      // setGroups(updatedGroups);
      setType(updatedType);
   }

   return (
      <div className="p-10">
         <CKBox className="p-2">
            <div className="flex mx-2 mt-2 mb-4">
               <h2 className="font-semibold text-gray-900">Company Criteria</h2>
            </div>
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
            {groups.map((group, i) => (
               <Group
                  key={`Group-${i}`}
                  index={i}
                  groupType={type}
                  groupSetType={handleSetType}
                  removeGroup={removeGroup}
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
                  variantColor="blue"
                  leftIcon={<AddHollow />}
                  onClick={addGroup}>
                  Add group
               </CKButton>
            </div>
         </CKBox>
         <CKMultilineTextField
            isReadOnly
            value={`${conditions.map(c => c.queryString).join('\n')}`}
            // value={`${conditions.join('\n')}\n${groups.join('\n')}`}
            className="w-full mt-4 min-h-screen"
         />
         {/* <CKButton leftIcon={<AddHollow />} className="mt-5">Add group</CKButton> */}
      </div>
   );
}
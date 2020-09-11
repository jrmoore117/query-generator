import React, { memo, useState, useEffect } from 'react';
import Caret from "@clearkit/icons/glyphs/Caret";
import Trash from "@clearkit/icons/glyphs/Trash";
import Companies from "@clearkit/icons/nav/Companies";
import { CKSelect, CKMultiPicker, CKBadge, CKButton } from '@clearkit/react';
import enrichment from '../../data/enrichment';
import operators from '../../data/operators';

export const Condition = memo(({
   index,
   type,
   setType,
   enrichmentType,
   removeCondition,
   buildQueryString
}) => {

   const [condition, setCondition] = useState({
      attribute: '',
      operator: '',
      values: []
   });

   useEffect(() => {
      buildQueryString(condition, index);
   }, [condition, type]);

   return (
      <div className="mx-2 mb-2 flex items-center">
         <div className="cursor-pointer flex items-center" onClick={(() => setType())}>
            <CKBadge variant="rounded" className="mr-2 pl-3 h-6">
               {type}
               <Caret height="16px" width="16px" />
            </CKBadge>
         </div>
         <div className="grid grid-cols-3 gap-2 w-full">
            <div className="col-span-1">
               <CKSelect
                  placeholder="Company attributes"
                  itemToString={item => (item ? item.label : '')}
                  items={enrichment[enrichmentType].attributes}
                  leftIcon={<Companies height={17} width={17} />}
                  selectedItem={condition.attribute}
                  onSelectedItemChange={changes => setCondition({ ...condition, attribute: changes.selectedItem })}
               />
            </div>
            <div className="col-span-1">
               <CKSelect
                  placeholder={condition.attribute ? 'Select a value' : ''}
                  itemToString={item => (item ? item.label : '')}
                  items={condition.attribute ? operators[condition.attribute.type] : []}
                  selectedItem={condition.operator}
                  onSelectedItemChange={changes => setCondition({ ...condition, operator: changes.selectedItem })}
                  isDisabled={condition.attribute ? false : true}
               />
            </div>
            <div className="col-span-1">
               <CKMultiPicker
                  placeholder={condition.operator ? 'Select value(s)' : ''}
                  itemToString={item => (item ? item.label : '')}
                  items={condition.operator ? enrichment[enrichmentType][condition.attribute.value] : []}
                  selectedItems={condition.values}
                  onSelectedItemsChange={changes => setCondition({ ...condition, values: changes.selectedItems })}
                  isDisabled={condition.operator ? false : true}
               />
            </div>
         </div>
         <CKButton
            variant="tertiary"
            className="p-1 ml-1"
            onClick={() => removeCondition(index)}
         >
            <Trash />
         </CKButton>
      </div>
   );
});
import React, { useState } from 'react';
import Clearbit from "@clearkit/icons/identity/Clearbit";
import { Panel } from './components';
import {
  CKTabs,
  CKTabList,
  CKTab,
  CKTabPanels,
  CKTabPanel,
} from '@clearkit/react';

const App = () => {

  const [index, setIndex] = useState(0);
  const handleIndexChange = newIndex => {
    setIndex(newIndex);
  };

  return (
    <div className="bg-gray-0 min-h-screen">
      <div className="py-5 px-10 pb-2 bg-white flex">
        <Clearbit height="32px" width="32px" className="align-middle mr-2" />
        <h1 className="text-xl font-semibold text-gray-900">Query Generator</h1>
      </div>
      <CKTabs index={index} onChange={handleIndexChange} isBordered>
        <CKTabList aria-label="Query Categories Tabs" className="pl-10 bg-white">
          <CKTab label="Company & Person">Company & Person</CKTab>
          <CKTab label="Company Only">Company Only</CKTab>
          <CKTab label="Person Only">Person Only</CKTab>
        </CKTabList>
        <CKTabPanels>
          <CKTabPanel className="focus:outline-none">
            <Panel />
          </CKTabPanel>
          <CKTabPanel className="focus:outline-none">
            Company Only Panel
          </CKTabPanel>
          <CKTabPanel className="focus:outline-none">
            Person Only Panel
          </CKTabPanel>
        </CKTabPanels>
      </CKTabs>
    </div>
  );
}

export default App;
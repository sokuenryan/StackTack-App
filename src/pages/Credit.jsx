import React, {useEffect, useState} from "react";
import Sidebar from "../components/Sidebar";
import AddNewCredit from "../components/AddNewCredit";
import ExistingCredit from "../components/ExistingCredit";

const Credit = () => {
  const [ActiveComponent, setActiveComponent] = useState('AddNewCredit');
  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const [creditlines, setCreditLines] = useState([]);

  useEffect(() => {
    const savedCreditLines = JSON.parse(localStorage.getItem('creditlines')) || [];
    setCreditLines(savedCreditLines);
  }, []);

  const handleCreditSubmit = (newCreditLine) => {
    const updatedCreditLine = [...creditlines, newCreditLine];
    setCreditLines(updatedCreditLine);
    localStorage.setItem('creditlines', JSON.stringify(updatedCreditLine))
  };

  const handleCreditDelete = (index) => {
    const updatedCreditLine = [...creditlines];
    updatedCreditLine.splice(index, 1);
    setCreditLines(updatedCreditLine);
    localStorage.setItem('creditlines', JSON.stringify(updatedCreditLine));
  };

  const handleCreditEdit = (index, newName) => {
    const updatedCreditLine = [...creditlines];
    updatedCreditLine[index].name = newName;
    setCreditLines(updatedCreditLine);
    localStorage.setItem('creditlines', JSON.stringify(updatedCreditLine));
  };

  return (
    <div className='credit content-setup'>
      <Sidebar />
      <div className="content">
        <div className='tab-table'>
          <div className='tabs'>
            <div className="tab-btns">
              <button onClick={() => handleButtonClick('AddNewCredit')}>Create New Credit Line</button>
              <button onClick={() => handleButtonClick('ExistingCredit')}>Existing Credit Lines</button>
            </div>
            
            {ActiveComponent === 'AddNewCredit' && (
              <AddNewCredit
                onCreditSubmit={handleCreditSubmit}
                onCreditEdit={handleCreditEdit}
                onCreditDelete={handleCreditDelete}
                creditLine={creditlines}
              />
            )}
            {ActiveComponent === 'ExistingCredit' && (
              <ExistingCredit creditLine={creditlines}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit;
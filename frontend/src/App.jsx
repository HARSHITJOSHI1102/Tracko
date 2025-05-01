import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { PieChart } from '@mui/x-charts/PieChart';
import { publicRequest } from "./requestMethods.js";

const App = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [updatedId, setUpdatedID] = useState(null);
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search

  const handleAddExpense = () => setShowAddExpense(!showAddExpense);
  const handleShowReport = () => setShowReport(!showReport);

  const handleShowEdit = (item) => {
    setShowEdit(true);
    setUpdatedID(item._id);
    setUpdatedLabel(item.label);
    setUpdatedAmount(item.value);
    setUpdatedDate(item.date);
  };

  const updateExpense = async () => {
    if (updatedId) {
      try {
        await publicRequest.put(`/expenses/${updatedId}`, {
          label: updatedLabel,
          value: updatedAmount,
          date: updatedDate
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleExpense = async () => {
    try {
      await publicRequest.post("/expenses", {
        label,
        date,
        value: amount
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await publicRequest.get("/expenses");
        setExpenses(res.data.expenses);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Filtered list based on search term
  const filteredExpenses = expenses.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-[3%] w-[80%] mr-[5%] ml-[5%]">
        <h1 className='text-2xl font-medium text-[#555]'>Expense Tracker</h1>
        <div className='relative flex items-center justify-between mt-5 w-[100%]'>
          <div className='relative flex justify-between w-[300px]'>
            <button className='bg-[#af8978] p-[10px] text-white' onClick={handleAddExpense}>Add Expense</button>
            <button className='bg-blue-300 p-[10px] text-white' onClick={handleShowReport}>Expense Report</button>
          </div>

          {showAddExpense && (
            <div className='absolute z-[999] flex flex-col p-[10px] top-[20px] left-0 h-[500px] w-[500px] bg-white shadow-xl'>
              <FaWindowClose className='text-2xl text-red-500 cursor-pointer self-end' onClick={handleAddExpense} />
              <label className='mt-[10px] font-semibold text-[18px]'>Expense Name</label>
              <input type="text" className='p-[10px] border-2 border-[#555]' onChange={(e) => setLabel(e.target.value)} />
              <label className='mt-[10px] font-semibold text-[18px]'>Expense Date</label>
              <input type="date" className='p-[10px] border-2 border-[#555]' onChange={(e) => setDate(e.target.value)} />
              <label className='mt-[10px] font-semibold text-[18px]'>Expense Amount</label>
              <input type="number" className='p-[10px] border-2 border-[#555]' onChange={(e) => setAmount(e.target.value)} />
              <button className='bg-[#af8978] text-white p-[10px] mt-[10px]' onClick={handleExpense}>Add Expense</button>
            </div>
          )}

          {showReport && (
            <div className='absolute z-[999] flex flex-col p-[10px] top-[20px] left-[100px] h-[500px] w-[500px] bg-white shadow-xl'>
              <FaWindowClose className='text-2xl text-red-500 cursor-pointer self-end' onClick={handleShowReport} />
              <PieChart
                series={[
                  {
                    data: expenses,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: 150,
                    cy: 150,
                  }
                ]}
              />
            </div>
          )}

          {/* Search bar */}
          <input
            type="text"
            placeholder='Search by name or date'
            className='p-[10px] w-[200px] border-2 border-[#444]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Expenses List */}
        <div className='flex flex-col'>
          {filteredExpenses.map((item, index) => (
            <div key={index} className='relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]'>
              <h2 className='m-[20px] text-[#555] text-[18px] font-medium'>{item.label}</h2>
              <span className='m-[20px] text-[18px]'>{item.date}</span>
              <span className='m-[20px] text-[18px] font-medium'>${item.value}</span>
              <div className='m-[20px]'>
                <FaTrash className='text-red-500 mb-[5px] cursor-pointer' onClick={() => handleDelete(item._id)} />
                <FaEdit className='text-[#555] mb-[5px] cursor-pointer' onClick={() => handleShowEdit(item)} />
              </div>
            </div>
          ))}
        </div>

        {showEdit && (
          <div className='absolute z-[999] flex flex-col p-[10px] top-[25%] right-0 h-[500px] w-[500px] bg-white shadow-xl'>
            <FaWindowClose className='text-2xl text-red-500 cursor-pointer self-end' onClick={() => setShowEdit(false)} />
            <label className='mt-[10px] font-semibold text-[18px]'>Expense Name</label>
            <input
              type="text"
              value={updatedLabel}
              className='p-[10px] border-2 border-[#555]'
              onChange={(e) => setUpdatedLabel(e.target.value)}
            />
            <label className='mt-[10px] font-semibold text-[18px]'>Expense Date</label>
            <input
              type="date"
              value={updatedDate}
              className='p-[10px] border-2 border-[#555]'
              onChange={(e) => setUpdatedDate(e.target.value)}
            />
            <label className='mt-[10px] font-semibold text-[18px]'>Expense Amount</label>
            <input
              type="number"
              value={updatedAmount}
              className='p-[10px] border-2 border-[#555]'
              onChange={(e) => setUpdatedAmount(e.target.value)}
            />
            <button className='bg-[#af8978] text-white p-[10px] mt-[10px]' onClick={updateExpense}>Update Expense</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

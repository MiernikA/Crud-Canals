import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend } from 'recharts';

function Site() {

  const [data, setData] = useState<{ id: number; canal: string; amount: number }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newCanal, setNewCanal] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [originalCanal, setOriginalCanal] = useState('');
  const [originalAmount, setOriginalAmount] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/get-data');
      setData(response.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleRemoveUser = async (canal: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/remove/${canal}`);
      console.log(`rm ${canal}`);
      fetchData();
    } catch (error) {
      console.log('Error removing user:', error);
    }
  };

  const handleEditUser = (index: number) => {
    const item = data[index];
    setEditingIndex(index);
    setOriginalCanal(item.canal);
    setOriginalAmount(item.amount.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const regex = /^[0-9]*$/;

    if (regex.test(value)) {
      const updatedData = [...data];
      updatedData[index].amount = parseInt(value);
      setData(updatedData);
    }
  };

  const handleDiscard = (index: number) => {
    const updatedData = [...data];
    updatedData[index].canal = originalCanal;
    updatedData[index].amount = parseInt(originalAmount);
    setData(updatedData);
    setEditingIndex(null);
  };

  const handleSaveChanges = async (item: { canal: string; amount: number }) => {
    setEditingIndex(null);
    console.log(item);
    try {
      await axios.put(`http://localhost:8000/api/change/${item.canal}`, item);
      console.log(`User with ID ${item.canal} changed`);
      fetchData();
    } catch (error) {
      console.log('Error change:', error);
    }
  };

  const handleAddNew = async () => {
    let bool_test = true;
    if (parseInt(newAmount) <= 0) {
      alert('You cannot insert canal with a value of 0 or lower');
      bool_test = false;
      return;
    }

    data.forEach((element) => {
      if (newCanal === element.canal) {
        alert(`The channel "${newCanal}" already exists, try editing it instead of creating the same one.`);
        bool_test = false;
      }
    });

    if (bool_test) {
      try {
        await axios.post('http://localhost:8000/api/add', {
          canal: newCanal,
          amount: parseInt(newAmount),
        });
        console.log(`New record added: ${newCanal}, ${newAmount}`);
        setNewCanal('');
        setNewAmount('');
        fetchData();
      } catch (error) {
        console.log('Error adding new record:', error);
      }
    }
  };

  const canalData = data.reduce((acc: { [key: string]: number }, item) => {
    acc[item.canal] = (acc[item.canal] || 0) + item.amount;
    return acc;
  }, {});

  const totalAmount = Object.values(canalData).reduce((acc, amount) => acc + amount, 0);
  const chartData = Object.keys(canalData).map((canal) => ({
    name: canal,
    value: Math.round(((canalData[canal] / totalAmount) * 100)),
  }));

  const COLORS = [
    '#001f3f',
    '#003d79',
    '#005cb3',
    '#007bff',
    '#54a8ff',
    '#7fcdff',
    '#a9e3ff',
    '#d3f0ff',
    '#e6f5ff',
  ];

  return (
    <div className="container">
      <div className="data-section">
        <div className="input-section">

          <input
            className="input-canal"
            id="cnl"
            type="text"
            placeholder="Canal"
            value={newCanal}
            onChange={(e) => setNewCanal(e.target.value)}
          />

          <input
            className="input-amount"
            id="amt"
            type="number"
            placeholder="Amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />

          <button className="btn-add" onClick={handleAddNew}>Add New Canal</button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Canal</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.canal}>
                <td>
                  {editingIndex === index ? (
                    item.canal
                  ) : (
                    <span>{item.canal}</span>
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      className="input-amount"
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    <span>{item.amount}</span>
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <>
                      <button className="btn-discard" onClick={() => handleDiscard(index)}>Discard</button>
                      <button className="btn-save" onClick={() => handleSaveChanges(item)}>Save</button>
                    </>
                  ) : (
                    <>
                      <button className="btn-remove" onClick={() => handleRemoveUser(item.canal)}>Remove</button>
                      <button className="btn-edit" onClick={() => handleEditUser(index)}>Edit</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="chart-section">
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label={({ value }) => `${value}%`}
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            align="center"
            layout="horizontal"
            verticalAlign="bottom"
            iconSize={12}
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </div>
    </div>
  );
}

export default Site;

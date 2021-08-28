import React, { useState, useEffect, useReducer } from 'react';
import './App.scss';
import { Datatable } from './components/Datatable';
import contacts from './api/contacts.json';

const App = () => {
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({
      ...state, ...newState,
    }),
    {
      fullName: '',
      jobTitle: '',
      departments: ['Администрация', 'Бухгалтерия', 'ИТ', 'Маркетинг', null],
      manager: '',
      phone: '',
      email: '',
    },
  );

  const handleFilter = (event) => {
    const { name, value } = event.target;

    setFilterInput({
      [name]: value,
    });
  };

  const handleChangeMultiple = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      option => option.value,
    );

    setFilterInput({
      departments: value,
    });
  };

  const filteredActual = contacts
    .filter(person => person.status !== 'Уволен');

  useEffect(() => {
    setData(filteredActual);
  }, []);

  const filteredDeps = data
    .filter((person) => {
      const {
        employee,
      } = person;

      return (filterInput.departments
        .find(dep => dep === employee.department));
    });

  const hideDigit = phoneNumber =>
    phoneNumber.slice(0, -2) + '..' + phoneNumber.slice(-1);

  const filterPersons = persons => persons.filter((person) => {
    const {
      employee,
    } = person;

    const {
      fullName,
      jobTitle,
      phone,
      email,
    } = filterInput;

    const employeeConditions = (
      employee.fullName
        && employee.fullName
          .includes(fullName)
        && employee.jobTitle
        && employee.jobTitle
          .includes(jobTitle)
        && employee.phone
        && employee.phone
          .includes(phone)
        && employee.email
        && employee.email
          .includes(email)
    );

    return (
      employeeConditions
    );
  });

  return (
    <div className="App">
      <div className="App__content">
        <div className="datatable">
          <Datatable
            data={data}
            filterPersons={filterPersons}
            hideDigit={hideDigit}
            filteredDeps={filteredDeps}
          />
        </div>
      </div>
      <div className="App__sidebar">
        <div className="search">
          <h4>ПОШУК</h4>
          <select
            multiple
            value={filterInput.departments}
            onChange={handleChangeMultiple}
            className="search__select"
          >
            <option value="Администрация">Керівництво</option>
            <option value="Бухгалтерия">Бухгалтерія</option>
            <option value="ИТ">IT</option>
            <option value="Маркетинг">Маркетинг</option>
            <option value={null}>Відсутній</option>

          </select>

          <label htmlFor="fullName" className="search__input">
            <p>ПІБ</p>
            <input
              name="fullName"
              value={filterInput.fullName}
              id="fullName"
              onChange={e => handleFilter(e)}
              type="text"
            />
          </label>

          <label htmlFor="jobTitle" className="search__input">
            <p>Посада</p>
            <input
              value={filterInput.jobTitle}
              name="jobTitle"
              id="jobTitle"
              onChange={e => handleFilter(e)}
              type="text"

            />
          </label>

          <label htmlFor="manager" className="search__input">
            <p>Керівник</p>
            <input
              value={filterInput.manager}
              name="manager"
              id="manager"
              onChange={e => handleFilter(e)}
              type="text"
            />
          </label>

          <label htmlFor="phone" className="search__input">
            <p>Телефон</p>
            <input
              value={filterInput.phone}
              name="phone"
              onChange={e => handleFilter(e)}
              type="text"
              id="phone"
            />
          </label>

          <label htmlFor="email" className="search__input">
            <p>Email</p>
            <input
              name="email"
              value={filterInput.email}
              onChange={e => handleFilter(e)}
              type="text"
              id="email"
            />
          </label>

        </div>
      </div>
    </div>

  );
};

export default App;

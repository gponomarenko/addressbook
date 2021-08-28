import React from 'react';
import cn from 'classnames';
import './database.scss';
import employeePhoto from '../../img/employee.jpg';

export const Datatable = ({ filterPersons, hideDigit, filteredDeps }) => {
  return (
    <>
      <h4 className="datatable__dep">
        {`Кількість обраних працівників:
        ${filterPersons(filteredDeps).length}`}
      </h4>
      <div>
        {filterPersons(filteredDeps).map((person) => {
          const {
            id,
            employee,
            status,
          } = person;

          return (
            <div
              key={id}
              className={cn({
                person: true,
                person__maternity: status === 'Декретный отпуск',
              })}
            >
              <div className="person__box">
                <img
                  alt="employee"
                  src={employeePhoto}
                  className="person__photo"
                />
              </div>
              <div className="person__content">
                <h2 className="person__name">{employee.fullName}</h2>
                <p className="person__info">
                  {employee.jobTitle}
                  <br />
                  {employee.department && `Підрозділ: ${employee.department}`}
                  <br />
                  {`Мобільний: ${hideDigit(employee.phone)}`}
                  <br />
                  {employee.email
                    && (
                      <span className="person__email">
                        {`Email: ${employee.email}`}
                      </span>
                    )
                  }

                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using iPAS_Service_DAL;
using System.Data;
using System.Data.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
namespace iPAS_Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "EmployeeService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select EmployeeService.svc or EmployeeService.svc.cs at the Solution Explorer and start debugging.
    public class EmployeeService : IEmployeeService
    {
        //here i have fetched the employee ka existed data based on uska user name and then set the DTO
        Database db = DatabaseFactory.CreateDatabase("MyDB");
        public RegistrationInfo FetchEmployeeData(int empID)
        {
            IDataReader dataReaderForEmpAndLang = null;


            try
            {
                Database db = DatabaseFactory.CreateDatabase("MyDB");
                //employeeReader = Employee_DAL.EmployeeDataBind(db, employee.EmpID);
                dataReaderForEmpAndLang = HRDashboard_DAL.GetEmployeeByStatus(db, null, null, 0, 0, empID);
                RegistrationInfo employeeData = new RegistrationInfo();
                using (dataReaderForEmpAndLang)
                {
                    if (dataReaderForEmpAndLang.Read())
                    {
                        employeeData.FirstName = dataReaderForEmpAndLang["FirstName"].ToString();
                        employeeData.LastName = dataReaderForEmpAndLang["LastName"].ToString();
                        employeeData.EmailID = dataReaderForEmpAndLang["EmailID"].ToString();
                        // employee.UserName = employeeReader["Username"].ToString();
                        employeeData.Department = dataReaderForEmpAndLang["Department"].ToString();
                        employeeData.Address = dataReaderForEmpAndLang["Address"].ToString();
                        employeeData.MobileNumber = dataReaderForEmpAndLang["MobileNumber"].ToString();
                        employeeData.Gender = dataReaderForEmpAndLang["Gender"].ToString();
                    }
                    dataReaderForEmpAndLang.Close();
                }
                dataReaderForEmpAndLang = Employee_DAL.SelectedLanguages(db, empID);
                using (dataReaderForEmpAndLang)
                {
                    LanguageInfo langInfo = null;
                    while (dataReaderForEmpAndLang.Read())
                    {
                        langInfo = new LanguageInfo();
                        langInfo.LangID = Convert.ToInt32(dataReaderForEmpAndLang["FLANG_ID"]);
                        employeeData.LanguagesList.Add(langInfo);
                    }
                    dataReaderForEmpAndLang.Close();
                }
                return employeeData;

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dataReaderForEmpAndLang != null && !dataReaderForEmpAndLang.IsClosed)
                {
                    dataReaderForEmpAndLang.Close();
                }

            }
        }

        //here i am updating the data of employee 
        public bool updateEmployeeData(RegistrationInfo employee)
        {
            if (employee.EmpID == 0)
                return false;

            Database db = DatabaseFactory.CreateDatabase("MyDB");
            using (DbConnection connection = db.CreateConnection())
            {
                connection.Open();
                using (DbTransaction transaction = connection.BeginTransaction())
                {
                    try
                    {
                        int count = Employee_DAL.updateEmployeeData(db, transaction,
                            employee.FirstName, employee.LastName, employee.EmailID,
                            employee.Department, employee.MobileNumber, employee.Address,
                            employee.Gender, employee.EmpID);
                        string status = "A";
                        bool isLangDeleted = Employee_DAL.DeleteSelectedLang(db, transaction, employee.EmpID, status);

                        bool allLangsInserted = true;
                        foreach (LanguageInfo lang in employee.LanguagesList)
                        {
                            bool inserted = Registration_DAL.InsertSelectedLanguages(db, transaction, employee.EmpID, lang.LangID);
                            if (!inserted)
                            {
                                allLangsInserted = false;
                                break;
                            }
                        }

                        if (count > 0 && isLangDeleted && allLangsInserted)
                        {
                            transaction.Commit();
                            return true;
                        }
                        else
                        {
                            transaction.Rollback();
                            return false;
                        }
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw ex;
                    }
                    finally
                    {
                        connection.Close();
                    }
                }
            }
        }




    }
}

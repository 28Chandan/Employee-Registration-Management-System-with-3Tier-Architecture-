using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iPAS_Service;
namespace IPAS.BLL
{
 
    public class EmployeeBLL
    {
        public static RegistrationInfo FetchEmployeeData(int empID)
        {
            try
            {
                EmployeeService employeeService = new EmployeeService();
                return employeeService.FetchEmployeeData(empID);

            }catch(Exception ex)
            {
                throw ex;
            }
        }

        public static bool updateEmployeeData(RegistrationInfo employee)
        {
            try
            {
                EmployeeService employeeService = new EmployeeService();
                return employeeService.updateEmployeeData(employee);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


      

    }
}
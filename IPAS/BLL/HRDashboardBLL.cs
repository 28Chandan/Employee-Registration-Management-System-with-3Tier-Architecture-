using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iPAS_Service;
namespace IPAS.BLL
{
    public class HRDashboardBLL
    {
        public static CountInfo GetCount()
        {
            try
            {
                HRDashboardService hrDashboardService = new HRDashboardService();
                return hrDashboardService.GetCountInfo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public static RegistrationInfoClass GetEmployeeDetails(RegistrationInfo employeeDetails)
        {
            try
            {
                HRDashboardService hrDashboardService = new HRDashboardService();
                return hrDashboardService.GetEmployeeDetails(employeeDetails);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


        //public static bool AcceptPendingEmployeeBLL(int empID, string status)
        //{
        //    try
        //    {
        //        HRDashboardService hrDashboardService = new HRDashboardService();
        //        return hrDashboardService.AcceptPendingEmployeeSVC(empID,status);
        //    }
        //    catch(Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public static bool TotDeptCount(DepartmentInfo dept)
        {
            try
            {
                HRDashboardService hrDashboardService = new HRDashboardService();
                return hrDashboardService.TotDeptCountInfo(dept);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //this is to delete the employee or the department based on HR preference
        public static bool DeleteEmpOrDept(int empID, int deptID)
        {
            try
            {

                HRDashboardService hrDashboardService = new HRDashboardService();
                return hrDashboardService.DeleteEmpOrDept(empID, deptID);

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }



        public static bool AcceptRejectEmpl(RegistrationInfo emp)
        {

            try
            {

                HRDashboardService hrDashboardService = new HRDashboardService();
                return hrDashboardService.AcceptRejectEmpl(emp);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static ErrorInfo AddNewHR(string userName, string password)
        {
            try
            {

                HRDashboardService hrDashboardService = new HRDashboardService();
                return hrDashboardService.AddNewHR(userName, password);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public static RegistrationInfoClass GetAllHRDetails()
        {
            try
            {

                HRDashboardService hrDashboardService = new HRDashboardService();
                return hrDashboardService.GetALLHRDetails();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
         public static bool DeleteHR(int empID)
        {
            try
            {

                HRDashboardService hrDashboardService = new HRDashboardService();
                return hrDashboardService.DeleteHR(empID);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


    }
}
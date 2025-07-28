using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using iPAS_Service;
namespace IPAS.WEB_SERVICES
{
    /// <summary>
    /// Summary description for iPAS_HRDashboard
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class iPAS_HRDashboard : System.Web.Services.WebService
    {

        [WebMethod]
        public  CountInfo GetCountASMX()
        {
            return BLL.HRDashboardBLL.GetCount();
        }


        [WebMethod]
        public  RegistrationInfoClass GetEmployeeDetails(RegistrationInfo employeeDetails)
        {
            return BLL.HRDashboardBLL.GetEmployeeDetails(employeeDetails);
        } 
        
        //[WebMethod]
        //public bool AcceptPendingEmployeeASMX(int empID, string status)
        //{

        //    return BLL.HRDashboardBLL.AcceptPendingEmployeeBLL(empID,status);

        //}

        
       

        [WebMethod]
        //this is to delete the employee or the department based on HR preference
        public  bool DeleteEmpOrDeptASMX(int empID, int deptID)
        {
            
                return BLL.HRDashboardBLL.DeleteEmpOrDept(empID,deptID);

        }


        [WebMethod]
        public bool TotDeptCountASMX(DepartmentInfo dept)
        {
            return BLL.HRDashboardBLL.TotDeptCount(dept);
        }


        [WebMethod]
        public  bool AcceptRejectEmpASMX(RegistrationInfo employee)
        {
            return BLL.HRDashboardBLL.AcceptRejectEmpl(employee);
        }

        [WebMethod]
        public ErrorInfo AddNewHR(string userName, string password)
        {
            return BLL.HRDashboardBLL.AddNewHR(userName, password);
        }
        

        [WebMethod]
        public  RegistrationInfoClass GetAllHRDetails()
        {
            return BLL.HRDashboardBLL.GetAllHRDetails();
        }  

        [WebMethod]
        public bool DeleteHR(int empID)
        {
            return BLL.HRDashboardBLL.DeleteHR(empID);
        }

    }
}

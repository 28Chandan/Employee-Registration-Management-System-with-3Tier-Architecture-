using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using iPAS_Service;
using System.Web.Script.Services;
namespace IPAS.WEB_SERVICES
{
    /// <summary>
    /// Summary description for iPAS_Employee
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class iPAS_Employee : System.Web.Services.WebService
    {

        [WebMethod]
        [System.Web.Script.Services.ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public RegistrationInfo FetchEmployeeDataASMX(int empID)
        {
            return BLL.EmployeeBLL.FetchEmployeeData(empID);
        }




        [WebMethod]
        //[System.Web.Script.Services.ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public bool updateEmployeeDataASMX(RegistrationInfo employee)
        {
            return BLL.EmployeeBLL.updateEmployeeData(employee);
        }

        
    }
}

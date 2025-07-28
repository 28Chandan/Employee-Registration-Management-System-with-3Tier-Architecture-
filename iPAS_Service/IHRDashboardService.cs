using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using iPAS_Service_DAL;
namespace iPAS_Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IHRDashboardService" in both code and config file together.
    [ServiceContract]
    public interface IHRDashboardService
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "GetCountInfo", Method = "GET", RequestFormat = WebMessageFormat.Json)]

        CountInfo GetCountInfo();

        [OperationContract]
        [WebInvoke(UriTemplate = "GetEmployeeDetails?employeeDetails={employeeDetails}", Method = "GET", RequestFormat = WebMessageFormat.Json)]

        RegistrationInfoClass GetEmployeeDetails(RegistrationInfo employeeDetails);

       
        [OperationContract]
        [WebInvoke(UriTemplate = "TotDeptCountInfo?dept={dept}", Method = "GET", RequestFormat = WebMessageFormat.Json)]

        bool TotDeptCountInfo(DepartmentInfo dept);

        [OperationContract]
        [WebInvoke(UriTemplate = "DeleteEmpOrDept?empID={empID}&deptID={deptID}", Method = "DELETE", RequestFormat = WebMessageFormat.Json)]

        bool DeleteEmpOrDept(int empID, int deptID);


        [OperationContract]
        [WebInvoke(UriTemplate = "AcceptRejectEmpl?emp={emp}", Method = "POST", RequestFormat = WebMessageFormat.Json)]

        bool AcceptRejectEmpl(RegistrationInfo emp);

        [OperationContract]
        [WebInvoke(UriTemplate = "AddNewHR?userName={userName}&password={password}", Method = "POST", RequestFormat = WebMessageFormat.Json)]

        ErrorInfo AddNewHR(string userName, string password);

        [OperationContract]
        [WebInvoke(UriTemplate = "GetALLHRDetails", Method = "GET", RequestFormat = WebMessageFormat.Json)]

        RegistrationInfoClass GetALLHRDetails();

        [OperationContract]
        [WebInvoke(UriTemplate = "DeleteHR?empID={empID}", Method = "GET", RequestFormat = WebMessageFormat.Json)]

        bool DeleteHR(int empID);
    }
}

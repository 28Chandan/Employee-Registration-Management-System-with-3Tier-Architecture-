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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IEmployeeService" in both code and config file together.
    [ServiceContract]
    public interface IEmployeeService
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "FetchEmployeeData?empID={empID}", Method = "GET", RequestFormat = WebMessageFormat.Json)]
        
        RegistrationInfo  FetchEmployeeData(int empID);

        [OperationContract]
        [WebInvoke(UriTemplate = "updateEmployeeData?employee={employee}", Method = "PUT", RequestFormat = WebMessageFormat.Json)]

        bool updateEmployeeData(RegistrationInfo employee);
    }
}

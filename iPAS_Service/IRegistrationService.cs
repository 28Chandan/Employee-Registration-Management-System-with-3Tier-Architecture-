using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Data.Common;
using System.Data;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Data;
namespace iPAS_Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IRegistrationService" in both code and config file together.
    [ServiceContract]
    public interface IRegistrationService
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "GetDepartment", Method = "GET", RequestFormat = WebMessageFormat.Json)]

        DepartmentListInfo GetDepartment();


        [OperationContract]
        [WebInvoke(UriTemplate = "InsertNewRegisteredUser?newUser={newUser}", Method = "POST", RequestFormat = WebMessageFormat.Json)]

        RegistrationInfo InsertNewRegisteredUser(RegistrationInfo newUser);

        [OperationContract]
        [WebInvoke(UriTemplate = "BindLanguages", Method = "GET", RequestFormat = WebMessageFormat.Json)]

        RegistrationInfo BindLanguages();

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;


namespace iPAS_Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ILogin" in both code and config file together.
    [ServiceContract]
    public interface ILogin
    {
        [OperationContract]
        [WebInvoke(UriTemplate = "UserCredential?user={user}", Method = "GET", RequestFormat = WebMessageFormat.Json)]

        RegistrationInfo UserCredential(RegistrationInfo user);


    }
}

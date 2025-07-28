using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using iPAS_Service;
using System.Web.Script.Services;
namespace IPAS.WebServices
{
    
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class iPAS_Login : System.Web.Services.WebService
    {
        
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public RegistrationInfo UserCredentialASMX(RegistrationInfo user)
        {
            try
            {
                return BLL.LoginBLL.UserCredential(user);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

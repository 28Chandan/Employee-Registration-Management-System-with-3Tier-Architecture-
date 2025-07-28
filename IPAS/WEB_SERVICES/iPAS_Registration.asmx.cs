using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using iPAS_Service;
namespace IPAS.WEB_SERVICES
{
    /// <summary>
    /// Summary description for iPAS_Registration
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class iPAS_Registration : System.Web.Services.WebService
    {

        [WebMethod]
       public DepartmentListInfo GetDepartmentASMX()
        {
            try
            {
                return BLL.RegistrationBLL.GetDepartment();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [WebMethod]
        public RegistrationInfo InsertNewRegisteredUserASMX(RegistrationInfo newUser)
        {
            try
            {
                return BLL.RegistrationBLL.InsertNewRegisteredUser(newUser);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [WebMethod]
        public RegistrationInfo BindLanguagesASMX()
        {
            try
            {
                return BLL.RegistrationBLL.BindLanguages();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}

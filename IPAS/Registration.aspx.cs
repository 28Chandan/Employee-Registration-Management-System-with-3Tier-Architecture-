using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;

namespace IPAS
{
    public partial class Registration : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string webServicePath = ConfigurationManager.AppSettings["WebServicePath"].TrimEnd('/').ToString();
            Page.ClientScript.RegisterStartupScript(this.GetType(), "PageLoadFunctions", "PageLoadFunctions('" + webServicePath + "');", true);
        }
    }
}
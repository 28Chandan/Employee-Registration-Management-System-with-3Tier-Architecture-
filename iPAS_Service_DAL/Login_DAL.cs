using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Common;
using System.Data;
using System.Data.Common;
namespace iPAS_Service_DAL
{
    public  class Login_DAL
    {
        //to check whether the usrname and password matches
        //and in the registration page if the username already existed so i can fetch its status
        public static IDataReader CheckLoginCredentials(Database db, string userName)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT ROLE, STATUS,REJECTREASON, USERNAME, EMPID, PASSWORD  FROM EMPLOYEES2 WHERE USERNAME=@USERNAME  ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@USERNAME", DbType.AnsiString, userName);
            return db.ExecuteReader(dbCmd);

        }

    

    }
}

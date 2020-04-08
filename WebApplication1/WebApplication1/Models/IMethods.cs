using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public interface IMethods
    {
        public IEnumerable<employee> AllEmployees { get; }
        public IEnumerable<leave> AllLeaves{ get; }
        public IEnumerable<employeeleavemapping> AllEmployeeLeave { get; }
        public IEnumerable<employeeleavemapping> GetLeaveByEmployeeId(int Id);
        public employee GetEmployeeByEmail(string email);

    }
}

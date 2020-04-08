using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class employeeleavemapping
    {
        [Key]
        public int id { get; set; }
        public int employeeId { get; set; }
        public int leaveId { get; set; }
        public string leaveStartDate { get; set; }
        public string leaveEndDate { get; set; }
        public string status { get; set; }
    }
}

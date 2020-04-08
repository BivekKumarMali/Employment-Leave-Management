using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class WeatherForecastController : ControllerBase
    {
       

        
        private readonly IMethods _Methods;
        private readonly AppDbContext _appDbContext;

        public WeatherForecastController(IMethods method, AppDbContext appDbContext)
        {
            _Methods = method;
            _appDbContext = appDbContext;
        }
        [HttpGet]
        public async Task<IEnumerable<employee>> AllEmployee()
        {

            return await _appDbContext.Employee.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<employee>> AddEmployee(employee employee)
        {
            _appDbContext.Employee.Add(employee);
            await _appDbContext.SaveChangesAsync();
            return null;
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<employee>> DeleteEmployee(int id)
        {
            var emp = await _appDbContext.Employee.FindAsync(id);
            if (emp == null)
            {
                return NotFound();
            }

            _appDbContext.Employee.Remove(emp);
            await _appDbContext.SaveChangesAsync();

            return emp;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<employee>> GetEmployee(int id)
        {
            employee  emp = await _appDbContext.Employee.FindAsync(id);

            if (emp == null)
            {
                return NotFound();
            }

            return emp;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, employee emp)
        {
            if (id != emp.id)
            {
                return BadRequest();
            }
            _appDbContext.Entry(emp).State = EntityState.Modified;

            try
            {
                await _appDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!check(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        private bool check(int id)
        {
            return _appDbContext.Employee.Any(e => e.id == id);
        }

    }
}

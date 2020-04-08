using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class leaveController : ControllerBase
    {
        private readonly IMethods _Methods;
        private readonly AppDbContext _appDbContext;

        public leaveController(IMethods method, AppDbContext appDbContext)
        {
            _Methods = method;
            _appDbContext = appDbContext;
        }
        [HttpGet]
        public async Task<IEnumerable<leave>> AllLeave()
        {

            return await _appDbContext.Leave.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<leave>> AddList(leave leave)
        {
            _appDbContext.Leave.Add(leave);
            await _appDbContext.SaveChangesAsync();
            return null;
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<leave>> DeleteLeave(int id)
        {
            var le = await _appDbContext.Leave.FindAsync(id);
            if (le == null)
            {
                return NotFound();
            }

            _appDbContext.Leave.Remove(le);
            await _appDbContext.SaveChangesAsync();

            return le;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<leave>> GetLeave(int id)
        {
            leave le = await _appDbContext.Leave.FindAsync(id);

            if (le == null)
            {
                return NotFound();
            }

            return le;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeave(int id, leave le)
        {
            if (id != le.id)
            {
                return BadRequest();
            }
            _appDbContext.Entry(le).State = EntityState.Modified;

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
            return _appDbContext.Leave.Any(e => e.id == id);
        }
    }
}
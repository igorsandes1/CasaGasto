using Casa_Gastos_webAPI.Data;
using Casa_Gastos_webAPI.DTOs;
using Casa_Gastos_webAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Casa_Gastos_webAPI.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriasController : ControllerBase
    {

        private readonly AppDbContext _context;

        public CategoriasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get() {

            var listaCategorias = await _context.categorias.ToListAsync();
            return Ok(listaCategorias);

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateCategoryDb dto)
        {

            var novaCategoria = new Categorias
            {

                Id = Guid.NewGuid(),
                Description = dto.Description,
                Target = dto.Target,
                Created_At = DateTime.UtcNow

            };

            _context.categorias.Add(novaCategoria);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = novaCategoria.Id }, novaCategoria);

        }


    }
}

using Casa_Gastos_webAPI.Data;
using Casa_Gastos_webAPI.DTOs;
using Casa_Gastos_webAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Casa_Gastos_webAPI.Controllers
{
    [ApiController]
    [Route("/api/transacoes")]
    public class TransacoesController : ControllerBase
    {

        private readonly AppDbContext _context;

        public TransacoesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get() 
        {

        var listaTransacoes = await _context.transacoes.ToListAsync();

        return Ok(listaTransacoes);

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateTransacaoDb dto)
        {

            var novaTransacao = new Transacoes
            {

            Id = Guid.NewGuid(),
            Category = dto.Category,
            Description = dto.Description,
            Owner = dto.Owner,
            Target = dto.Target,
            Value = dto.Value,
            Created_At = DateTime.UtcNow,

            };

            _context.transacoes.Add(novaTransacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = novaTransacao.Id}, novaTransacao);

        }

    }
}

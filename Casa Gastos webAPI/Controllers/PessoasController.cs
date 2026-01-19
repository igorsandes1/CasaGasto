using System.Threading.Tasks;
using Casa_Gastos_webAPI.Data;
using Casa_Gastos_webAPI.DTOs;
using Casa_Gastos_webAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Casa_Gastos_webAPI.Controllers
{

    //Controller de API

    [ApiController]
    [Route("api/pessoas")] //Rota base de "Pessoas"
    public class PessoasController : ControllerBase
    {

    private readonly AppDbContext _context; //Context do banco

        //Injecao de dependencia do DbContext
        public PessoasController(AppDbContext context)
        {
            _context = context;
        }


        //GET api/pessoas (Faz um select em toda a base de pessoas)
        [HttpGet]
        public async Task<IActionResult> Get() 
        {
            var listaPessoas = await _context.pessoas.ToListAsync();
            return Ok(listaPessoas);
        }

        //POST api/pessoas (Criacao de um novo usuário)
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreatePessoaDb dto)
        {

            if (dto == null) return BadRequest("O body da request veio vázio"); //Evita o body vir vázio

            var novaPessoa = new Pessoas {

                Id = Guid.NewGuid(), // geracao de id
                Name = dto.Name, //name da pessoa
                DateBirth = dto.DateBirth, // data de nascimento da pessoa
                Created_At = DateTime.UtcNow //horário local

            };

            _context.pessoas.Add(novaPessoa); //adiciona a pessoa ao context
            await _context.SaveChangesAsync(); //salva no banco de dados

            return CreatedAtAction(nameof(Get), new {id = novaPessoa.Id}, novaPessoa); //retorno 201 (Created user)
        }

        //DELETE api/pessoas (Deletar usuário)
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeletePessoaDb dto)
        {

            var pessoaDeletada = await _context.pessoas.FindAsync(dto.Id); //finda a pessoa no banco de dados de acordo com o ID que recebeu do body

            if (pessoaDeletada == null) return BadRequest("Pessoa não encontrada para ser deletada"); //caso não encontre uma pessoa do id mencionado na request, retorna este erro <---

            _context.pessoas.Remove(pessoaDeletada); //remove o objeto da pessoa do db
            await _context.SaveChangesAsync(); //salva a remocao.

            return Ok("Usuário deletado com sucesso."); //retorno 200

        }

    }
}

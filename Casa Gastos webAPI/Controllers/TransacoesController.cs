using Casa_Gastos_webAPI.Data;
using Casa_Gastos_webAPI.DTOs;
using Casa_Gastos_webAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Casa_Gastos_webAPI.Controllers
{
    [ApiController]
    [Route("/api/transacoes")] //Rota base de "Transacoes"
    public class TransacoesController : ControllerBase
    {

        private readonly AppDbContext _context;  //Reponsavel pelo acesso ao banco de dados.

        //Injecao de dependencia do DbContext
        public TransacoesController(AppDbContext context)
        {
            _context = context;
        }

        //GET api/transacoes (Faz um select em toda a base de pessoas)
        [HttpGet]
        public async Task<IActionResult> Get() 
        {

        var resultadoListaTransacoes = new List<GetTransacoes>(); //cria o array das transacoes
        var listaTransacoes = await _context.transacoes.ToListAsync(); //busca todas as transacoes no banco de dados

        foreach(var transacoes in listaTransacoes) {

        var categorias = await _context.categorias.FindAsync(transacoes.Category); //está buscando no banco de categorias, categorias que contenham transacoes.Category
                var pessoas = await _context.pessoas.FindAsync(transacoes.Owner); //está buscando no banco de pessoas, pessoas que contenham transacoes.Owner

                var itemArray = new GetTransacoes
                {

                    Id = transacoes.Id,
                    Category = categorias.Description,
                    Description = transacoes.Description,
                    Owner = pessoas.Name,
                    Target = transacoes.Target,
                    Value = transacoes.Value,
                    Created_At = transacoes.Created_At
                };

                resultadoListaTransacoes.Add(itemArray); //adiciona objeto ao array

        }

        return Ok(resultadoListaTransacoes); //retorno 200

        }

        //POST api/transacoes/create (Criacao de uma nova transacao)
        [HttpPost("create")]
        public async Task<IActionResult> Post([FromBody] CreateTransacaoDb dto)
        {

            if (dto == null) BadRequest("O body da request veio vázio"); //Evita o body vir vázio

            var pessoaSelecionada = await _context.pessoas.FindAsync(dto.Owner); //finda a pessoa no base de pessoas

            if(pessoaSelecionada == null) //check para garantir que a pessoa exista na base
            {
                return BadRequest("Id de usuário não existe no banco de dados");
            }

            var date = DateOnly.FromDateTime(DateTime.Now); //data/horário atual
            var dateBirth = pessoaSelecionada.DateBirth; //data de nascimento da pessoa detectada na base


            bool checkYearsPessoa = dateBirth > date.AddYears(-18); //retorna false/true para verificar se usuario possui +18 anos

            if (checkYearsPessoa) { 
            
                if(dto.Target.ToLower() != "despesa")
                {
                    return BadRequest("O usuário possui menos de 18 anos para ter despesas"); //garantir que menores de 18, tenham somente a "Despesa" como target (finalidade)
                }

            }

            var categoryItem = await _context.categorias.FindAsync(dto.Category); //find da categoria na criacao da transacao

            if (categoryItem == null) { //garantir que a categoria exista.
                return BadRequest("Não possui nenhuma categoria com este ID");
            }

            if(categoryItem.Target != dto.Target)
            {
                return BadRequest("A finalidade da categoria mencionada, está incorreta."); //garante que a target seja a mesma
            }

            var novaTransacao = new Transacoes
            {

            Id = Guid.NewGuid(), //geracao de id
            Category = dto.Category, //categoria da transacao
            Description = dto.Description, //descricao da transacao
            Owner = dto.Owner, //pessoa da transacao
            Target = dto.Target, //finalidade da transacao
            Value = dto.Value, //valor da transacao
            Created_At = DateTime.UtcNow, //horário local

            };

            _context.transacoes.Add(novaTransacao); //adiciona a transacao ao context
            await _context.SaveChangesAsync(); //salva no banco de dados

            return CreatedAtAction(nameof(Get), new { id = novaTransacao.Id}, novaTransacao); //retorno 201 (Transacao criada)

        }

    }
}

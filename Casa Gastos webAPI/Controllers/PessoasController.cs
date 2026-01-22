using Casa_Gastos_webAPI.Data;
using Casa_Gastos_webAPI.DTOs;
using Casa_Gastos_webAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Casa_Gastos_webAPI.Controllers
{

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
            var arrayPessoas = new List<PessoaResponseDb>();
            var date = DateOnly.FromDateTime(DateTime.Now);
            var listaPessoas = await _context.pessoas.ToListAsync();
            foreach (var pessoa in listaPessoas)
            {

            //calculo da idade da pessoa

            int idade = date.Year - pessoa.DateBirth.Year; //check ano

                if(date.Month < pessoa.DateBirth.Month) { //check mes

                    idade--;

                }

                if(date.Month == pessoa.DateBirth.Month) //se for o mesmo mes, irá verificar pelo dia.
                {

                    if(date.Day < pessoa.DateBirth.Day)
                    {
                        idade--;
                    }

                }

                //obj para colocar no array
                arrayPessoas.Add(new PessoaResponseDb
                {
                    Id = pessoa.Id,
                    Created_At = pessoa.Created_At,
                    DateBirth = pessoa.DateBirth,
                    Name = pessoa.Name,
                    YearsOld = idade
                });

            }


            return Ok(arrayPessoas); //status 200
        }

        //POST api/pessoas/create (Criacao de um novo usuário)
        [HttpPost("create")]
        public async Task<IActionResult> Post([FromBody] CreatePessoaDb dto)
        {

            if (dto == null) //Evita o body vir vázio
            {
             return BadRequest("O body da request veio vázio");
            } 

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

        //DELETE api/pessoas/delete (Deletar usuário)
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromBody] DeletePessoaDb dto)
        {

            var pessoaDeletada = await _context.pessoas.FindAsync(dto.Id); //finda a pessoa no banco de dados de acordo com o ID que recebeu do body

            if (pessoaDeletada == null)
            {
            return Ok("Pessoa não encontrada para ser deletada"); //caso não encontre uma pessoa do id mencionado na request, retorna este status <---
            }

            // Verificar as transacoes do usuario

            var transacoes = _context.transacoes.Where(b => b.Owner == dto.Id);

            _context.transacoes.RemoveRange(transacoes);
            
            _context.pessoas.Remove(pessoaDeletada); //remove o objeto da pessoa do db
            await _context.SaveChangesAsync(); //salva a remocao.

            return Ok("Usuário deletado com sucesso."); //retorno 200

        }

        //GET api/pessoas/totais (Ver a média de gastos de cada pessoa)
        [HttpGet("totais")]
        public async Task<IActionResult> GetTotal()
        {

            var pessoas = await _context.pessoas.ToListAsync(); //finda todas as pessoas no banco de dados
            var arrayTotais = new List<Totais>(); //cria um array (por enquanto vázio)

            decimal totalReceitaGeral = 0; //soma total para a receita
            decimal totalDespesaGeral = 0; //soma total para a despesa

            foreach (var pessoa in pessoas) //loop para verificar pessoa por pessoa
            {

                var totalReceitas = await _context.transacoes.Where(b => b.Owner == pessoa.Id && b.Target.ToLower() == "receita").SumAsync(b => b.Value); //finda na tabela de transacoes por id e pelas receitas e no final soma os valores
                var totalDespesas = await _context.transacoes.Where(b => b.Owner == pessoa.Id && b.Target.ToLower() == "despesa").SumAsync(b => b.Value); //finda na tabela de transacoes por id e pelas despesas e no final soma os valores

                //criando o objeto para ser implementado ao arrayTotais
                var itemPessoa = new Totais { 
                
                Id = pessoa.Id,
                Name = pessoa.Name,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas

                };

                //somando para o geral
                totalReceitaGeral += totalReceitas;
                totalDespesaGeral += totalDespesas;

                arrayTotais.Add(itemPessoa); //implementando o objeto acima

            }


            //criando o objeto de resposta com os totais individuais e o total geral logo em seguida
            var resultado = new
            {
                individual = arrayTotais,
                geral = new
                {
                    TotalReceitas = totalReceitaGeral,
                    TotalDespesa = totalDespesaGeral,
                    TotalSaldo = totalReceitaGeral - totalDespesaGeral
                }
            };

            return Ok(resultado); //retorno 200

        }

    }
}

using System.ComponentModel.DataAnnotations;

namespace Casa_Gastos_webAPI.DTOs
{
    public class DeletePessoaDb
    {
    [Required(ErrorMessage = "Um Id é obrigatório para deletarmos alguma pessoa")] //Deixando o Id como obrigatório
    public Guid Id { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Casa_Gastos_webAPI.DTOs
{
    public class CreatePessoaDb
    {
        [Required(ErrorMessage = "Nome obrigatório")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Data de nascimento obrigatório")]
        [MinLength(10, ErrorMessage = "Quantidade de caractéres da data de nascimento inválidos")]
        public string DateBirth { get; set; }
    }
}

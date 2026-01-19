using System.ComponentModel.DataAnnotations;

namespace Casa_Gastos_webAPI.DTOs
{
    public class CreateCategoryDb
    {
        [Required(ErrorMessage = "Descrição é obrigatória")]
        [MinLength(1, ErrorMessage = "Descrição precisa ter ao menos 1 caractér")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Finalidade é obrigatória")]
        [MinLength(1, ErrorMessage = "Finalidade precisa ter ao menos 1 caractér")]
        public string Target { get; set; }
    }
}

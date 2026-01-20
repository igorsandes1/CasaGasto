using System.ComponentModel.DataAnnotations;

namespace Casa_Gastos_webAPI.DTOs
{
    public class CreateCategoryDb
    {
        [Required(ErrorMessage = "Descrição é obrigatória")] //Deixando a descricao como obrigatória
        public string Description { get; set; }
        [Required(ErrorMessage = "Finalidade é obrigatória")] //Deixando a finalidade como obrigatória
        public string Target { get; set; }
    }
}

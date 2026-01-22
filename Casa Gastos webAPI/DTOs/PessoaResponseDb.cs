namespace Casa_Gastos_webAPI.DTOs
{
    public class PessoaResponseDb
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateOnly DateBirth { get; set; }
        public int YearsOld { get; set; }
        public DateTime? Created_At { get; set; }
    }
}

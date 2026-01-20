namespace Casa_Gastos_webAPI.Models
{
    public class Pessoas
    {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateOnly DateBirth { get; set; }
    public DateTime? Created_At { get; set; }
    }
}

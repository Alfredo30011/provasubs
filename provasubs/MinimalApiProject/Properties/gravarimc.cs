using System.ComponentModel.DataAnnotations;

namespace StudentRegistrationApi.Models
{
    public class ImcRecord 

    {
        public int Id { get; set; }

        [Required]
        public int StudentId { get; set; }

        [Required]
        public double Height { get; set; } // Em metros

        [Required]
        public double Weight { get; set; } // Em quilos

        [Required]
        public double Imc { get; set; }

        [Required]
        public required string Classification { get; set; }

        public required Student Student { get; set; }
    }
}

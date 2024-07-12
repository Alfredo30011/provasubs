using StudentRegistrationApi.Data;
using StudentRegistrationApi.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={builder.Configuration["DatabaseFileName"]}"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Minimal API endpoints
app.MapPost("/api/registrar", async (Student student, AppDbContext dbContext) =>
{
    if (await dbContext.Students.AnyAsync(s => s.FirstName == student.FirstName && s.LastName == student.LastName))
    {
        return Results.BadRequest(new { Message = "Aluno já cadastrado com esse nome e sobrenome." });
    }
    
    dbContext.Students.Add(student);
    await dbContext.SaveChangesAsync();
    return Results.Created($"/api/students/{student.Id}", student);
});

app.MapGet("/api/students", async (AppDbContext dbContext) =>
{
    return Results.Ok(await dbContext.Students.ToListAsync());
});

string dbName = "StudentDatabase_SeuNome.db"; // Substitua 'SeuNome' pelo seu nome
builder.Configuration["DatabaseFileName"] = dbName;

// Função para calcular a classificação do IMC
string ClassifyImc(double imc)
{
    if (imc < 18.5) return "Abaixo do peso";
    if (imc >= 18.5 && imc < 24.9) return "Peso normal";
    if (imc >= 25 && imc < 29.9) return "Sobrepeso";
    return "Obesidade";
}

// Endpoint para cadastro de IMC
app.MapPost("/api/imc", async (ImcRecord imcRecord, AppDbContext dbContext) =>
{
    var student = await dbContext.Students.FindAsync(imcRecord.StudentId);
    if (student == null)
    {
        return Results.BadRequest(new { Message = "Aluno não encontrado." });
    }

    imcRecord.Imc = imcRecord.Weight / (imcRecord.Height * imcRecord.Height);
    imcRecord.Classification = ClassifyImc(imcRecord.Imc);

    dbContext.ImcRecords.Add(imcRecord);
    await dbContext.SaveChangesAsync();

    return Results.Created($"/api/imc/{imcRecord.Id}", imcRecord);
});
// Endpoint para listar todos os IMCs
app.MapGet("/api/imcs", async (AppDbContext dbContext) =>
{
    var imcRecords = await dbContext.ImcRecords
        .Include(ir => ir.Student)
        .Select(ir => new
        {
            ir.Id,
            StudentName = $"{ir.Student.FirstName} {ir.Student.LastName}",
            ir.Height,
            ir.Weight,
            ir.Imc,
            ir.Classification,
            ir.CreatedAt 
        })
        .ToListAsync();

    return Results.Ok(imcRecords);
});

// Endpoint para listar IMCs por aluno
app.MapGet("/api/imcs/{studentId}", async (int studentId, AppDbContext dbContext) =>
{
    var imcRecords = await dbContext.ImcRecords
        .Where(ir => ir.StudentId == studentId)
        .Select(ir => new
        {
            ir.Id,
            ir.Height,
            ir.Weight,
            ir.Imc,
            ir.Classification,
            ir.CreatedAt
        })
        .ToListAsync();

    return Results.Ok(imcRecords);
});

// Endpoint para atualizar IMC
app.MapPut("/api/imc/{id}", async (int id, ImcRecord updatedImc, AppDbContext dbContext) =>
{
    var existingImc = await dbContext.ImcRecords.FindAsync(id);
    if (existingImc == null)
    {
        return Results.NotFound(new { Message = "IMC não encontrado." });
    }

    existingImc.Height = updatedImc.Height;
    existingImc.Weight = updatedImc.Weight;
    existingImc.Imc = updatedImc.Weight / (updatedImc.Height * updatedImc.Height);
    existingImc.Classification = ClassifyImc(existingImc.Imc);
    existingImc.CreatedAt = DateTime.UtcNow; 

    await dbContext.SaveChangesAsync();
    return Results.Ok(existingImc);
});

app.Run();


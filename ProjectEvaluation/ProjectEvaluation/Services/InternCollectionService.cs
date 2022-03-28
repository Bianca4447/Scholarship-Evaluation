using MongoDB.Driver;
using ProjectEvaluation.Model;
using ProjectEvaluation.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectEvaluation.Services
{
    public class InternCollectionService : IInternCollectionService
    {
        private readonly IMongoCollection<Interns> _intern;

        public InternCollectionService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _intern = database.GetCollection<Interns>(settings.NoteCollectionName);
        }

        public async Task<bool> Create(Interns intern)
        {
            await _intern.InsertOneAsync(intern);
            return true;
        }

        public async Task<bool> Delete(Guid id)
        {
            var result = await _intern.DeleteOneAsync(intern => intern.Id == id);
            if (result.IsAcknowledged && result.DeletedCount == 0)
            {
                return false;
            }
            return true;
        }

        public async Task<Interns> Get(Guid id)
        {
            return (await _intern.FindAsync(intern => intern.Id == id)).FirstOrDefault();
        }

        public async Task<List<Interns>> GetAll()
        {
            var result = await _intern.FindAsync(intern => true);
            return result.ToList();
        }

        public async Task<bool> Update(Guid id, Interns intern)
        {
            intern.Id = id;
            var result = await _intern.ReplaceOneAsync(i => i.Id == id, intern);

            if (!result.IsAcknowledged && result.ModifiedCount == 0)
            {
                await _intern.InsertOneAsync(intern);
                return false;
            }

            return true;
        }
    }
}

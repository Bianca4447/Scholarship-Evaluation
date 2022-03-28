using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectEvaluation.Services
{
    public interface ICollection<T>
    {
        Task<List<T>> GetAll();

        Task<T> Get(Guid id);

        Task<bool> Create(T intern);

        Task<bool> Update(Guid id, T intern);

        Task<bool> Delete(Guid id);
    }
}

using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver.Linq;

namespace OnlineTraining.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        IMongoQueryable<T> GetAll(Expression<Func<T, bool>> filter, 
            Expression<Func<T, bool>> orderBy, 
            int? pageSize,
            int? pageIndex);

        Task<List<T>> FindAsync(Expression<Func<T, bool>> filter, int? skip = null);

        Task<T> Where(Expression<Func<T, bool>> filter);

        Task<long> CountAsync(Expression<Func<T, bool>> document);

        Task InsertAsync(T document);

        Task UpdateAsync(
            ObjectId documentId,
            Expression<Func<T, bool>> document,
            object dataToUpdate);

        Task DeleteAsync(ObjectId documentId);
    }
}

using DataAccess.DTOs;
using DataAccess.Entities;
using LiteDB;
using Mapster;
using System.Linq.Expressions;

namespace DataAccess.Repositories;

public interface IBaseRepository<TEntity, TDto>
    where TEntity : BaseEntity
    where TDto : BaseEntityDto
{
    Task<TDto?> FindById(Guid id);

    Task<List<TDto>> GetAll();

    Task<List<TDto>> GetDeleted();

    Task<List<TDto>> GetDeleted(Expression<Func<TEntity, bool>> func);

    Task<List<TDto>> Get();

    Task<List<TDto>> Get(Expression<Func<TEntity, bool>> func);

    Task<List<TDto>> GetAll(Expression<Func<TEntity, bool>> func);

    Task<TDto?> Find(Expression<Func<TEntity, bool>> func);

    Task Upsert(TDto item);

    Task Delete(Guid itemId);

    Task Enable(Guid itemId);

    Task IncrementPriority(Guid itemId);

    Task DecrementPriority(Guid itemId);

    Task Remove(Guid itemId);

    Task<bool> Exists(Guid id);

    Task<bool> Drop();
}

public class BaseRepository<TEntity, TDto>
    where TEntity : BaseEntity
    where TDto : BaseEntityDto
{
    private readonly LiteDatabase _db;
    private readonly ILiteCollection<TEntity> _collection;

    public BaseRepository(GymmyDatabase dbContext)
    {
        _db = dbContext.GetDatabase();
        _collection = _db.GetCollection<TEntity>(typeof(TEntity).Name);
        _collection.EnsureIndex(item => item.Id);
    }

    public virtual Task<bool> Exists(Guid id)
    {
        return Task.Run(() =>
        {
            try
            {
                return _collection.Exists(xx => xx.Id == id);
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public Task<TDto?> FindById(Guid id)
    {
        return Task.Run(() =>
        {
            try
            {
                var item = _collection.Query()
                    .Where(item => item.Id == id && item.IsActive)
                    .FirstOrDefault();

                return item?.Adapt<TDto>();
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public Task<TDto?> Find(Expression<Func<TEntity, bool>> func)
    {
        return Task.Run(() =>
        {
            try
            {
                var item = _collection.Query()
                    .Where(func)
                    .FirstOrDefault();

                return item?.Adapt<TDto>();
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public virtual async Task Upsert(TDto source)
    {
        try
        {
            var entity = source.Adapt<TEntity>();

            if (await Exists(entity.Id)) _collection.Update(entity);
            else _collection.Insert(entity);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public virtual Task<List<TDto>> GetAll()
    {
        return Task.Run(() =>
        {
            try
            {
                return _collection.Query()
                    .ToList()
                    .Adapt<List<TDto>>();
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public Task<List<TDto>> GetDeleted()
    {
        return Task.Run(() =>
        {
            try
            {
                return _collection.Query()
                    .Where(xx => !xx.IsActive)
                    .ToList()
                    .Adapt<List<TDto>>();
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public Task<List<TDto>> GetDeleted(Expression<Func<TEntity, bool>> func)
    {
        return Task.Run(() =>
        {
            try
            {
                return _collection.Query()
                    .Where(xx => !xx.IsActive)
                    .Where(func)
                    .ToList()
                    .Adapt<List<TDto>>();
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public Task<List<TDto>> Get()
    {
        return Task.Run(() =>
        {
            try
            {
                return _collection.Query()
                    .Where(xx => xx.IsActive)
                    .ToList()
                    .Adapt<List<TDto>>();
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public Task<List<TDto>> Get(Expression<Func<TEntity, bool>> func)
    {
        return Task.Run(() =>
        {
            try
            {
                return _collection.Query()
                    .Where(xx => xx.IsActive)
                    .Where(func)
                    .ToList()
                    .Adapt<List<TDto>>();
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public Task<List<TDto>> GetAll(Expression<Func<TEntity, bool>> func)
    {
        return Task.Run(() =>
        {
            try
            {
                return _collection.Query()
                    .Where(func)
                    .ToList()
                    .Adapt<List<TDto>>();
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public virtual async Task Delete(Guid itemId)
    {
        try
        {
            var item = await FindById(itemId);
            if (item is null) return;

            _collection.Delete(itemId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public virtual async Task Enable(Guid itemId)
    {
        try
        {
            var item = _collection.Query()
                .Where(item => item.Id == itemId)
                .FirstOrDefault()
                ?.Adapt<TDto>();
            if (item is null) return;

            item.IsActive = true;

            await Upsert(item);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public virtual Task IncrementPriority(Guid itemId)
    {
        throw new NotImplementedException();
    }

    public virtual Task DecrementPriority(Guid itemId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Drop()
    {
        return Task.Run(() =>
        {
            try
            {
                return _collection.DeleteAll() > 0;
            }
            catch (Exception)
            {
                throw;
            }
        });
    }

    public async Task Remove(Guid itemId)
    {
        if (!await Exists(itemId)) return;

        _collection.Delete(itemId);
    }
}
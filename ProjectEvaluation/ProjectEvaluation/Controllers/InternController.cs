using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectEvaluation.Model;
using ProjectEvaluation.Services;

namespace ProjectEvaluation.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InternController : ControllerBase
    {
        IInternCollectionService _collectionService;

        public InternController(IInternCollectionService intern)
        {
            _collectionService = intern ??
               throw new ArgumentNullException(nameof(intern));
        }

        /// <summary>
        /// Get list of interns
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetInternsAsync()
        {
            return Ok(await _collectionService.GetAll());

        }

        /// <summary>
        /// Return an intern by id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetInternByIdAsync(Guid Id)
        {
            return Ok(await _collectionService.Get(Id));
        }

        /// <summary>
        /// Create a new intern
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateInternAsync([FromBody] Interns intern)
        {
            if (intern == null)
            {
                return BadRequest("Note can't be null");
            }
            if (intern.Id == Guid.Empty)
            {
                intern.Id = Guid.NewGuid();
            }
            await _collectionService.Create(intern);

            return Ok(await _collectionService.GetAll());
        }

        /// <summary>
        /// Update an intern by given id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="intern"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdateInternAsync(Guid id, [FromBody] Interns intern)
        {
            if (intern == null)
            {
                return BadRequest("Note can't be null");
            }
            if (await _collectionService.Update(id, intern))
            {
                return Ok();
            }
            if (!await _collectionService.Update(id, intern))
            {
                return NotFound("The intern don't exist");
            }
            return NoContent();
        }

        /// <summary>
        /// Delete an intern by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNoteAsync(Guid id)
        {
            bool ok = await _collectionService.Delete(id);
            if (!ok)
            {
                return NotFound("Note not found");
            }
            return Ok(await _collectionService.GetAll());
        }
    }
}

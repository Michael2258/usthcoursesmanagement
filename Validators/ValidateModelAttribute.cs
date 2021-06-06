using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Filters;

namespace coursesmanagement.Validators
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            if (actionContext.ModelState.IsValid)
                return;

            var validationErrors = new List<string>();
            foreach (var value in actionContext.ModelState.Values)
            {
                foreach (var error in value.Errors)
                {
                    validationErrors.Add(error.ErrorMessage);
                }
            }
            throw new Exception(validationErrors.First());
        }
    }
}
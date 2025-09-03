import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { MethodBinder } from '../utils';

type TValidationConfig<T> = [
  new (data: T) => object,
  keyof Pick<Request, 'body' | 'query' | 'params'>,
];

export class ValidationMiddleware {
  private validations: TValidationConfig<any>;

  constructor(...validations: TValidationConfig<any>) {
    MethodBinder.bind(this);
    this.validations = validations;
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const [DtoClass, target] = this.validations;
      const instance = plainToInstance(DtoClass, req[target]);
      await validateOrReject(instance, { whitelist: true });
      Object.assign(req[target], instance);
      next();
    } catch (errors: any) {
      if (Array.isArray(errors) && errors[0] instanceof ValidationError) {
        console.log(errors);
        const errorMessages = this.formatValidationErrors(errors);
        return res.status(400).json({
          success: false,
          message: 'Bad request exception',
          errors: errorMessages,
        });
      }
      next(errors);
    }
  }
  private formatValidationErrors(errors: ValidationError[]): string[] {
    return errors.flatMap((error) => this.extractErrorMessages(error));
  }

  private extractErrorMessages(error: ValidationError): string[] {
    if (error.constraints) {
      return Object.values(error.constraints);
    }
    if (error.children && error.children.length > 0) {
      return error.children.flatMap((childError) =>
        this.extractErrorMessages(childError),
      );
    }
    return [];
  }
}

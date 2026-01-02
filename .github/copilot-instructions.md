# Copilot Instructions for NestJS Project

## Architecture Overview
This is a modular NestJS application with feature-based modules. Core structure:
- **App Module** (`src/app.module.ts`): Root module configuring global providers (ConfigModule, TypeOrmModule).
- **Feature Modules** (e.g., `src/products/`): Self-contained with controller, service, entity, and DTOs.
- **Data Flow**: HTTP Request → Middleware/Guards → Controller → Service → TypeORM Repository → PostgreSQL DB.
- **Why Modular?**: Enables scalability; each feature (e.g., products) is isolated with its own dependencies.

## Key Patterns
- **Dependency Injection**: Use `@Injectable()` for services; inject repositories via `@InjectRepository(Entity)`. Example: `ProductsService` injects `Repository<Product>`.
- **Configuration**: Use `ConfigService` for env vars, not `process.env`. Configured in `TypeOrmModule.forRootAsync` with factory function.
- **Entities & DTOs**: Entities (`product.entity.ts`) use TypeORM decorators; DTOs (`createProduct.dto.ts`) use `class-validator` for input validation.
- **Async Operations**: All DB operations are async; use `await` consistently.
- **Error Handling**: Throw `NotFoundException` for missing resources; no custom error classes yet.
- **Querying**: Use TypeORM's `find()` with `where` clauses; support LIKE for strings, exact match for numbers (see `getAllProducts`).

## Developer Workflows
- **Development**: `npm run start:dev` (watches files, auto-restarts).
- **Testing**: `npm test` runs Jest; e2e tests in `test/app.e2e-spec.ts`.
- **Building**: `npm run build` compiles to `dist/`; `npm run start:prod` serves built app.
- **Linting**: `npm run lint` (ESLint with Prettier).
- **Debugging**: Use `npm run start:debug` for Node.js inspector.

## Conventions
- **File Naming**: Kebab-case for files (e.g., `products.service.ts`), PascalCase for classes.
- **Imports**: Group by NestJS core, then external libs, then local.
- **DB Sync**: `synchronize: true` in dev for auto-schema updates; disable in prod.
- **Seeding**: Implement in `OnModuleInit` (e.g., `ProductsService` seeds initial data if DB empty).
- **API Structure**: RESTful endpoints; use guards (e.g., `ApiKeyGuard`) for auth.
- **Documentation**: Update `README.md` with every new change, including API endpoints, setup steps, or features. Maintain API documentation in a dedicated `API.md` file, detailing endpoints, request/response formats, and authentication.

## Integration Points
- **Database**: PostgreSQL via TypeORM; config via env vars in `.env`.
- **Validation**: `class-validator` on DTOs; `class-transformer` for serialization.
- **Middleware**: Global logger (`LoggerMiddleware`) for requests.
- **External Deps**: No external APIs; focus on internal CRUD.

Reference: `src/products/` for complete feature example; `src/app.module.ts` for global config.
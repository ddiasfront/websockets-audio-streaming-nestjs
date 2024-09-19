import { Command, CommandRunner, Option } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';
import { MigrationsService } from './migrations.service';

@Command({
  name: 'migration:create-ticket-collection',
  description: 'Create the ticket collection in Firestore',
})
@Injectable()
export class MigrationsCommand extends CommandRunner {
  private readonly logger = new Logger(MigrationsCommand.name);
  constructor(private readonly migrationsService: MigrationsService) {
    super();
  }

  async run(
    _passedParams: string[],
    options: Record<string, any>,
  ): Promise<void> {
    this.logger.log(`Migration started running.`);
    const migrationId =
      options.migrationId ||
      this.generateMigrationId('create-ticket-collection');
    const migrationRef =
      await this.migrationsService.createMigration(migrationId);
    await this.migrationsService.createTicketCollection(migrationId);
    await this.migrationsService.createUserColletion(migrationId);
    await this.migrationsService.finishMigration(migrationRef);
  }

  @Option({
    flags: '-m, --migrationId <migrationId>',
    description: 'Specify a custom migration ID',
  })
  parseMigrationId(migrationId: string): void {
    this['options'].migrationId = migrationId;
  }

  private generateMigrationId(migrationName: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${timestamp}-${migrationName}`;
  }
}

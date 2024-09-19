import { Injectable, Inject, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { validateOrReject } from 'class-validator';
import { TicketDTO } from 'src/authentication/dto/authentication-ticket.model';
import { UserDTO } from 'src/users/dto/user.model';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

@Injectable()
export class MigrationsService {
  private firestore: admin.firestore.Firestore;
  private readonly logger = new Logger(MigrationsService.name);

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {
    this.firestore = firebaseAdmin.firestore();
  }

  async createMigration(
    migrationId: string,
  ): Promise<
    admin.firestore.DocumentReference<
      admin.firestore.DocumentData,
      admin.firestore.DocumentData
    >
  > {
    const migrationRef = this.firestore
      .collection('migrations')
      .doc(migrationId);
    const migrationDoc = await migrationRef.get();

    if (migrationDoc.exists) {
      this.logger.log(`Migration ${migrationId} already applied. Skipping.`);
      return;
    }

    this.logger.log(`Applying migration ${migrationId}...`);
    return migrationRef;
  }

  async finishMigration(
    migrationRef: admin.firestore.DocumentReference,
  ): Promise<void> {
    await migrationRef.set({
      appliedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  async createTicketCollection(migrationId: string): Promise<void> {
    const collectionName = 'tickets';

    const sampleTicket: TicketDTO = {
      id: 'sample-ticket-id',
      userId: 'sample-user-id',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
      isRevoked: false,
      scopes: ['read', 'write'],
      issuedBy: 'issuer-service',
      audience: 'your-app',
      tokenType: 'Bearer',
      nonce: 'sample-nonce',
      signature: 'sample-signature',
    };

    try {
      await validateOrReject(sampleTicket);
    } catch (errors) {
      this.logger.error('Validation failed for sample ticket:', errors);
      throw new Error('Sample ticket validation failed');
    }

    const docRef = this.firestore
      .collection(collectionName)
      .doc(sampleTicket.id);
    await docRef.set({ ...sampleTicket });

    this.logger.log(`Migration ${migrationId} applied.`);
  }

  async createUserColletion(migrationId: string): Promise<void> {
    const collectionName = 'users';

    this.logger.log(`Applying users migration ${migrationId}...`);

    const user: UserDTO = {
      id: randomUUID(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      displayName: faker.person.fullName(),
    };

    try {
      await validateOrReject(user);
    } catch (errors) {
      this.logger.error('Validation failed for sample user:', errors);
      throw new Error('User validation failed');
    }

    const docRef = this.firestore.collection(collectionName).doc(user.id);
    await docRef.set({ ...user });

    this.logger.log(`Migration ${migrationId} applied.`);
  }
}

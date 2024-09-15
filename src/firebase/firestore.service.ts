import { Injectable, Inject, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { validateOrReject } from 'class-validator';
import { TicketDTO } from 'src/authentication/dto/authentication-ticket.model';

@Injectable()
export class FirestoreService {
  private firestore: admin.firestore.Firestore;
  private readonly logger = new Logger(FirestoreService.name);

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {
    this.firestore = firebaseAdmin.firestore();
  }
  
  async createTicketCollection(migrationId: string): Promise<void> {
    const collectionName = 'tickets';
    const migrationRef = this.firestore
      .collection('migrations')
      .doc(migrationId);
    const migrationDoc = await migrationRef.get();

    if (migrationDoc.exists) {
      this.logger.log(`Migration ${migrationId} already applied. Skipping.`);
      return;
    }

    this.logger.log(`Applying migration ${migrationId}...`);

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

    await migrationRef.set({
      appliedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    this.logger.log(`Migration ${migrationId} applied.`);
  }
}

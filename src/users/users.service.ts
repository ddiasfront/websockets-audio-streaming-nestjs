import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserDTO } from './dto/user.model';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserAlreadyExistsException } from 'src/common/errors/exceptions/user-already-exists';
import { InvalidCredentialsException } from 'src/common/errors/exceptions/invalid-credentials-exception';
import { UserNotFoundException } from 'src/common/errors/exceptions/user-not-found-exception';

@Injectable()
export class UsersService {
  private db = admin.firestore();
  private collection = this.db.collection('users');

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {
    this.db = this.firebaseAdmin.firestore();
    this.collection = this.db.collection('users');
  }

  async registerUser(userData: UserDTO): Promise<UserDTO> {
    const existingUser = await this.collection
      .where('email', '==', userData.email)
      .get();

    if (!existingUser.empty) {
      throw new UserAlreadyExistsException(userData.email);
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user: UserDTO = {
      id,
      email: userData.email,
      password: hashedPassword,
      displayName: userData.displayName,
    };

    await this.collection.doc(id).set(user);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserDTO;
  }

  // Authenticate a user
  async validateUser(email: string, password: string): Promise<UserDTO | null> {
    const userSnapshot = await this.collection
      .where('email', '==', email)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      throw new InvalidCredentialsException();
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data() as UserDTO;

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new InvalidCredentialsException();
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as UserDTO;
  }

  async getUserById(id: string): Promise<Omit<UserDTO, 'password'>> {
    const userDoc = await this.collection.doc(id).get();

    if (!userDoc.exists) {
      throw new UserNotFoundException();
    }

    const user = userDoc.data() as UserDTO;
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

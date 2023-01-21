import {
  getAuth,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";

export class User {
  getUserInfo() {
    return getAuth().currentUser;
  }

  async updateUserAvatar(url) {
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateDisplayName(displayName) {
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateEmail(newEmail, password) {
    try {
      const auth = getAuth();
      const email = auth.currentUser.email;

      const credentials = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(auth.currentUser, credentials);
      await updateEmail(auth.currentUser, newEmail);
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(password, newPassword) {
    try {
      const auth = getAuth();
      const email = auth.currentUser.email;

      const credentials = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(auth.currentUser, credentials);
      await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      throw error;
    }
  }
}

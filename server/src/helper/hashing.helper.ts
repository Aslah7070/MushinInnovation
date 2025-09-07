
import bcrypt from "bcrypt"
export const hashPassword = async (password: string): Promise<string> => {
  if (!password || password.trim() === '') {
    throw new Error('Password is required');
  }
  return await bcrypt.hash(password, 10);
};

export async function comparePasswords(
  providedPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Password comparison failed');
  }

}

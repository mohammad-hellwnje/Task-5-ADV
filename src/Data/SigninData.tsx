import img1 from './../assets/img/Logo.png';
import img2 from './../assets/img/Upload icon.png'
export interface SignInData {
  imgSrc: string;
  imgIcon :string;
  title: string;
  info: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  submitValue: string;
  info2: string;
  createAccountText: string;
  createAccountLink: string;
  isSignUp?: boolean; 
}

export const signinData: SignInData = {
  imgSrc: img1,
  imgIcon : img2,
  title: "SIGN IN",
  info: "Enter your credentials to access your account",
  emailPlaceholder: "Enter your email",
  passwordPlaceholder: "Enter your password",
  submitValue: "Send",
  info2: "Don’t have an account?",
  createAccountText: "Create one",
  createAccountLink: "#",
};

export const signupData: SignInData = {
  imgSrc: img1,
  imgIcon :img2,
  title: "SIGN UP",
  info: "Create your account by filling in the information below",
  emailPlaceholder: "Enter your email",
  passwordPlaceholder: "Enter your password",
  submitValue: "SIGN UP",
  info2: "Already have an account?",
  createAccountText: "Sign in",
  createAccountLink: "#",
  isSignUp: true, 
};

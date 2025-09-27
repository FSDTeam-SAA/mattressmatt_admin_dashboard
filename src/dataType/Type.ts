export type User = {
  _id: string;
  name: string;
  email: string;
  username?: string;
  phone: string;
  credit: number | null;
  role: "admin" | "trainer" | "student" | "user";
  stripeAccountId: string;
  isStripeOnboarded: boolean;
  password_reset_token: string;
  fine: number;
  refreshToken: string;
  avatar: {
    public_id: string;
    url: string;
  };
  address: 
    | string
    | {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
      };
  verificationInfo: {
    verified: boolean;
    token: string;
  };
  userRating: {
    competence: { star: number; comment: string };
    punctuality: { star: number; comment: string };
    behavior: { star: number; comment: string };
  };
  treding_profile: {
    trading_exprience: string;
    assets_of_interest: string;
    main_goal: string;
    risk_appetite: string;
    preffered_learning: string[];
  };
  treding_profile_Complete?: boolean;
  uniqueId: string;
  age?: string;
  gender?: string;
  nationality?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

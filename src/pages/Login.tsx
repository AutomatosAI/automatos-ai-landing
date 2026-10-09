import { ExternalRedirect } from "@/components/ExternalRedirect";
import { SIGN_IN_URL } from "@/lib/links";

/*
  /login hands off to the app's sign-in. server.js answers /login with a 302
  for direct visits; this covers in-app navigation and `npm run dev`.
*/
const Login = () => <ExternalRedirect to={SIGN_IN_URL} label="Taking you to sign in" />;

export default Login;

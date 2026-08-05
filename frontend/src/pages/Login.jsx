import InputField from "../components/InputField";

function Login() {
  return (
    <div className="mx-auto mt-20 max-w-md rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Login
      </h1>

      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
      />

      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <button className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
        Login
      </button>
    </div>
  );
}

export default Login;
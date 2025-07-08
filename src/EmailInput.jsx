import { useCheckout } from "@stripe/react-stripe-js";

const EmailInput = ({ email, setEmail, error, setError }) => {
  const checkout = useCheckout();

  const validateEmail = async (email, checkout) => {
    const updateResult = await checkout.updateEmail(email);
    const isValid = updateResult.type !== "error";
  
    return { isValid, message: !isValid ? updateResult.error.message : null };
  }

  const handleBlur = async () => {
    if (!email) {
      return;
    }

    const { isValid, message } = await validateEmail(email, checkout);
    if (!isValid) {
      setError(message);
    }
  };

  const handleChange = (e) => {
    setError(null);
    setEmail(e.target.value);
  };

  return (
    <>
      <label>
        Email
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={error ? "error" : ""}
        />
      </label>
      {error && <div id="email-errors">{error}</div>}
    </>
  );
};

export default EmailInput;
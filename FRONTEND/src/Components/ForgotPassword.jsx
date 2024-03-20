import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your logic to handle the forgot password request,
    // such as sending a reset password email to the provided email address
    // and displaying a success message.
    setMessage(`An email has been sent to ${email} with instructions to reset your password.`);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;

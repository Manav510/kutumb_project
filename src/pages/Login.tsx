import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { setToken, setUsername } from '../utils/storage';

import OtpInput from 'react-otp-input';

export const Login: React.FC = () => {
  const [username, setUsernameInput] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, otp);
      setToken(response.data.token);
      setUsername(username);
      navigate('/create-quote');
    } catch (error) {
      alert(`Login failed ${error}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        minWidth: '100vw',
        width: '100%',
        background: 'linear-gradient(to bottom, #e0f2fe, #ffffff)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Outer Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          maxWidth: '900px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: '#e0e7ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              color: '#1e3a8a',
              fontWeight: 'bold',
              fontSize: '1.25rem',
            }}
          >
            <p style={{ marginBottom: '1rem' }}>Welcome to QUOTES</p>
            <p style={{ fontWeight: 'normal' }}>Secure your access with OTP</p>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: '2rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1e3a8a',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            LOGIN
          </h2>

          <form
            onSubmit={handleLogin}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {/* Username Input */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
              required
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
              }}
            >
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span style={{ margin: '0 0.25rem' }}>-</span>}
                inputStyle={{
                  width: '3rem',
                  height: '3rem',
                  fontSize: '1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  textAlign: 'center',
                  outline: 'none',
                }}
                renderInput={(props) => <input {...props} />}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#1e40af',
                color: '#ffffff',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                border: 'none',
                textAlign: 'center',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = '#1d4ed8')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = '#1e40af')
              }
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            div[style*="maxWidth: '900px'"] {
              flex-direction: column;
            }
            div[style*="flex: 1; backgroundColor: #e0e7ff"] {
              display: none; /* Hide illustration on small screens */
            }
            div[style*="flex: 1; padding: 2rem"] {
              padding: 1rem;
            }
            input[style*="width: 3rem"] {
              width: 2.5rem;
              height: 2.5rem;
              font-size: 1.25rem;
            }
          }

          @media (min-width: 1200px) {
            div[style*="maxWidth: '900px'"] {
              max-width: 1200px;
            }
          }
        `}
      </style>
    </div>
  );
};

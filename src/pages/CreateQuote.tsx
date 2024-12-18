import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadMedia, createQuote } from '../services/api';

interface MediaUploadResponse {
  0: {
    type: string;
    url: string;
  };
  length: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const styles = {
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, #e0f2fe, #ffffff)',
    padding: '0.25rem',
    boxSizing: 'border-box' as const,
  },
  formContainer: {
    width: '90%',
    maxWidth: '300px',
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    boxSizing: 'border-box' as const,
    position: 'relative'as const,
    top: '-20px',
  },
  heading: {
    textAlign: 'center' as const,
    marginBottom: '1rem',
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1e3a8a',
  },
  errorMessage: {
    backgroundColor: '#fdd',
    border: '1px solid #f00',
    color: '#f00',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '0.5rem',
    textAlign: 'center' as const,
    fontSize: '0.9rem',
  },
  inputText: {
    width: '95%',
    height: '100px',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '0.9rem',
    outline: 'none',
    resize: 'none' as const,
  },
  fileInput: {
    display: 'block',
    margin: '0 auto',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '0.9rem',
    width: '80%',
  },
  imagePreview: {
    width: '100%',
    height: '150px',
    objectFit: 'cover' as const,
    borderRadius: '0.5rem',
    marginTop: '0.5rem',
  },
  submitButton: {
    backgroundColor: '#1e40af',
    color: '#ffffff',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    border: 'none',
    textAlign: 'center' as const,
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#1d4ed8',
  },
  fileInfo: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.5rem',
  },
};

export const CreateQuote: React.FC = () => {
  const [text, setText] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError('');
    // File validation
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum file size is 5MB.');
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(selectedFile);

    img.onload = async () => {
      if (img.width > 1920 || img.height > 1080) {
        setError('Image dimensions should not exceed 1920x1080 pixels.');
        return;
      }

      try {
        const response = (await uploadMedia(selectedFile)) as {
          data: MediaUploadResponse;
        };

        const uploadedMediaUrl = response.data[0]?.url;

        if (uploadedMediaUrl) {
          setMediaUrl(uploadedMediaUrl);
        } else {
          setError('Failed to get media URL');
        }
      } catch (error) {
        console.error(error)
        setError('File upload failed');
      }
    };
  };

  const handleCreateQuote = async (e: FormEvent) => {
    e.preventDefault();

    if (!mediaUrl) {
      setError('Please upload an image first');
      return;
    }

    try {
      await createQuote(text, mediaUrl);
      navigate('/quotes');
    } catch (error) {
        console.error(error)
      setError(`Quote creation failed`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Create Quote</h2>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleCreateQuote} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <textarea
            placeholder="Enter your quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.inputText}
            required
            maxLength={500}
          />

          <div style={{ textAlign: 'center' }}>
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/jpeg,image/png,image/gif"
              style={styles.fileInput}
              required
            />
            <p style={styles.fileInfo}>Max: 5MB | Dimensions: 1920x1080 | JPEG, PNG, GIF</p>
          </div>

          {mediaUrl && <img src={mediaUrl} alt="Uploaded" style={styles.imagePreview} />}

          <button
            type="submit"
            style={styles.submitButton}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1e40af')}
          >
            Create Quote
          </button>
        </form>
      </div>
    </div>
  );
};


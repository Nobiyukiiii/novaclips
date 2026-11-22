import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, X, Key, Save, Check } from 'lucide-react';
import styles from './HackerApiKeyInput.module.css';

interface HackerApiKeyInputProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  onSave?: (val: string) => void;
  storageKey?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  showToggle?: boolean;
  revealLabel?: string;
  maskLabel?: string;
  saveLabel?: string;
  savedLabel?: string;
}

export const HackerApiKeyInput: React.FC<HackerApiKeyInputProps> = ({
  id,
  value,
  onChange,
  onSave,
  storageKey,
  placeholder = 'ENTER API KEY...',
  disabled = false,
  error = false,
  showToggle = true,
  revealLabel = 'Reveal key',
  maskLabel = 'Hide key',
  saveLabel = 'SIMPAN',
  savedLabel = 'TERSIMPAN',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Sync isSaved state with localStorage
  useEffect(() => {
    if (!storageKey) return;
    try {
      const stored = localStorage.getItem(storageKey) || '';
      setIsSaved(Boolean(value.trim() && stored === value.trim()));
    } catch {
      // Ignore localStorage errors
    }
  }, [value, storageKey]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (storageKey) {
      try {
        localStorage.setItem(storageKey, trimmed);
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
    }

    setIsSaved(true);
    if (onSave) {
      onSave(trimmed);
    }
  };

  return (
    <div
      className={`${styles.container} ${error ? styles.hasError : ''}`}
    >
      {/* Studio key prefix badge */}
      <div className={styles.prefix}>
        <Key size={13} style={{ marginRight: '6px', opacity: 0.8 }} /> API KEY
      </div>

      {/* Input container with masking */}
      <div className={styles.inputWrap}>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsSaved(false);
          }}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className={`${styles.input} ${isRevealed ? styles.isRevealed : ''}`}
        />

        {/* Masked overlay layer when not revealed and has value */}
        {!isRevealed && value && (
          <div
            aria-hidden="true"
            className={styles.mask}
          >
            {'•'.repeat(Math.max(16, Math.min(value.length, 38)))}
          </div>
        )}
      </div>

      {/* Action buttons: Clear, Save, & Reveal toggle */}
      <div className={styles.actions}>
        {value && !disabled && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setIsSaved(false);
              if (storageKey) {
                try {
                  localStorage.removeItem(storageKey);
                } catch {}
              }
            }}
            title="Clear key"
            className={styles.clearBtn}
          >
            <X size={14} />
          </button>
        )}

        {/* Save API Key Button */}
        {value.trim() && !disabled && (
          <button
            type="button"
            onClick={handleSave}
            title={isSaved ? "API Key tersimpan secara permanen di browser" : "Simpan API Key agar tidak hilang saat refresh"}
            className={`${styles.saveBtn} ${isSaved ? styles.isSaved : ''}`}
          >
            {isSaved ? <Check size={13} /> : <Save size={13} />}
            <span>{isSaved ? savedLabel : saveLabel}</span>
          </button>
        )}

        {showToggle && (
          <button
            type="button"
            onClick={() => setIsRevealed(!isRevealed)}
            title={isRevealed ? maskLabel : revealLabel}
            className={`${styles.toggleBtn} ${isRevealed ? styles.isActive : ''}`}
          >
            {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{isRevealed ? 'HIDE' : 'REVEAL'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default HackerApiKeyInput;

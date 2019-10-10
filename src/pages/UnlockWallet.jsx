import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird, faUnlockAlt } from '@fortawesome/pro-duotone-svg-icons';
import { navigate } from '@reach/router';
import {
  ERROR_FAILED_READING_FILE,
  ERROR_INVALID_KEYSTORE,
  readKeystoreFile,
} from 'utils/readKeystoreFile';
import { useTextInput } from 'utils/useTextInput';
import { wait } from 'utils/wait';
import Alert from 'components/Alert';
import Button from 'components/Button';
import { ErrorMessage, Input, InputGroup, Label } from 'components/Forms';
import Layout from 'components/Layout';
import { useWallet } from 'components/Wallet';
import authenticationSvg from 'assets/authentication.svg';

function UnlockWalletPage() {
  const { unlockWallet } = useWallet();
  const passwordInput = useTextInput('');
  const [keystoreFile, setKeystoreFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasFocusedInput, setHasFocusedInput] = useState(false);

  async function handleOnSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await wait(); // wait to ensure loading state shows

    let keystore = null;
    if (keystoreFile) {
      try {
        keystore = await readKeystoreFile(keystoreFile);
      } catch (error) {
        keystore = error;
      }
    }
    const password = passwordInput.value;

    if (validate(keystore, password)) {
      if (unlockWallet(keystore, password)) {
        navigate('/');
      } else {
        setErrors({ password: 'Incorrect password for the provided keystore.' });
      }
    }

    setIsLoading(false);
  }

  function validate(keystore, password) {
    const errors = {};

    if (!keystore) errors.keystoreFile = 'Please choose your keystore file.';
    else if (keystore === ERROR_FAILED_READING_FILE)
      errors.keystoreFile = 'Failed reading file, please try again with a valid keystore file.';
    else if (keystore === ERROR_INVALID_KEYSTORE)
      errors.keystoreFile = 'Please choose a valid keystore file.';

    if (!password) errors.password = 'Please enter your password.';

    setErrors(errors);
    return !errors.password && !errors.keystoreFile;
  }

  function handleRefFocus(element) {
    if (element && !hasFocusedInput) {
      element.focus();
      setHasFocusedInput(true);
    }
  }

  return (
    <Layout>
      <h2 className="text-2xl uppercase tracking-tight mb-2">Unlock existing wallet</h2>
      <div className="sm:flex items-start justify-center mb-4">
        <p className="sm:pr-5">
          Choose your keystore file and enter the wallet password to unlock your wallet.
        </p>
        <img
          src={authenticationSvg}
          alt="person entering secure website"
          className="hidden sm:block w-1/3 max-w-full flex-none -mt-8"
        />
      </div>

      <Alert
        type="info"
        text="Your keystore file won't be sent anywhere, it will only stay in your web browser session"
        className="mb-4"
      />

      <form onSubmit={handleOnSubmit}>
        <fieldset disabled={isLoading}>
          <InputGroup>
            <Label htmlFor="keystoreFile">Keystore file</Label>
            <Input
              type="file"
              id="keystoreFile"
              name="keystoreFile"
              onChange={event => {
                if (errors.keystoreFile) {
                  setErrors({ ...errors, keystoreFile: null });
                }
                setKeystoreFile(event.target.files[0]);
              }}
              hasError={!!errors.keystoreFile}
              ref={handleRefFocus}
            />
            {errors.keystoreFile && <ErrorMessage>{errors.keystoreFile}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Enter your password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={passwordInput.value}
              onChange={(...args) => {
                if (errors.password) {
                  setErrors({ ...errors, password: null });
                }
                passwordInput.onChange(...args);
              }}
              placeholder="eg. s0meth!ngsup3rsecre7"
              hasError={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <Button type="submit" disabled={isLoading}>
            <FontAwesomeIcon
              icon={isLoading ? faSpinnerThird : faUnlockAlt}
              spin={isLoading}
              fixedWidth
              className="mr-1"
            />
            Unlock{isLoading ? 'ing' : ''} wallet
          </Button>
        </fieldset>
      </form>
    </Layout>
  );
}

export default UnlockWalletPage;
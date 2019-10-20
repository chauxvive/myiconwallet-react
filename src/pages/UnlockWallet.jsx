import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird, faUnlockAlt } from '@fortawesome/pro-duotone-svg-icons';
import { faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';
import { navigate } from '@reach/router';
import Switch from 'react-switch';
import ReactTooltip from 'react-tooltip';
import colors from 'utils/colors';
import {
  ERROR_FAILED_READING_FILE,
  ERROR_INVALID_KEYSTORE,
  readKeystoreFile,
} from 'utils/readKeystoreFile';
import { useTextInput } from 'utils/useTextInput';
import { wait } from 'utils/wait';
import Alert, { ALERT_TYPE_INFO } from 'components/Alert';
import Button from 'components/Button';
import { ErrorMessage, Input, InputGroup, Label } from 'components/Forms';
import Layout from 'components/Layout';
import { useWallet } from 'components/Wallet';
import authenticationSvg from 'assets/authentication.svg';

function UnlockWalletPage() {
  const { unlockWallet } = useWallet();
  const passwordInput = useTextInput('');
  const [keystoreFile, setKeystoreFile] = useState(null);
  const [network, setNetwork] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    if (!keystore) {
      errors.keystoreFile = 'Please choose your keystore file';
    } else if (keystore === ERROR_FAILED_READING_FILE) {
      errors.keystoreFile = 'Failed reading file, please try again with a valid keystore file';
    } else if (keystore === ERROR_INVALID_KEYSTORE) {
      errors.keystoreFile = 'Please choose a valid keystore file';
    }

    if (!password) errors.password = 'Please enter your password';

    setErrors(errors);
    return !errors.password && !errors.keystoreFile;
  }

  return (
    <Layout title="Unlock Existing Wallet">
      <h2 className="text-2xl uppercase tracking-tight mb-2">Unlock existing wallet</h2>
      <div className="sm:flex items-start justify-between">
        <img
          src={authenticationSvg}
          alt="person entering secure website"
          className="hidden sm:block sm:order-2 sm:w-2/5 max-w-full flex-none sm:ml-6 sm:-mt-8"
        />

        <form onSubmit={handleOnSubmit} className="sm:order-1 sm:flex-1">
          <p>Choose your keystore file and enter the wallet password to unlock your wallet.</p>
          <Alert
            type={ALERT_TYPE_INFO}
            text="Your keystore file won't be sent anywhere, it will only stay in your web browser session"
            className="mt-4"
          />

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
                placeholder="eg. s0meth!ngSup3rSecre7"
                hasError={!!errors.password}
              />
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </InputGroup>

            <div className="flex items-center justify-between mt-6">
              <Button type="submit" disabled={isLoading}>
                <FontAwesomeIcon
                  icon={isLoading ? faSpinnerThird : faUnlockAlt}
                  spin={isLoading}
                  fixedWidth
                  className="mr-1"
                />
                Unlock{isLoading ? 'ing' : ''} wallet
              </Button>
              <label className="text-right">
                <div className="text-xs">
                  Mainnet
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    data-tip="Use this to enable mainnet"
                    className="text-gray-500 ml-1"
                  />
                  <ReactTooltip place="right" effect="solid" />
                </div>
                <Switch
                  checked={network}
                  onChange={() => setNetwork(!network)}
                  onColor={colors.green['600']}
                  offColor={colors.gray['400']}
                  height={20}
                  width={45}
                  checkedIcon={false}
                  uncheckedIcon={false}
                ></Switch>
              </label>
            </div>
          </fieldset>
        </form>
      </div>
    </Layout>
  );
}

export default UnlockWalletPage;

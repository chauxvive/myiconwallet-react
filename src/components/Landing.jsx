import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt, faWallet } from '@fortawesome/pro-duotone-svg-icons';
import { faLongArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { Link } from '@reach/router';
import Logo from 'components/Logo';
import connectedWorldSvg from 'assets/connected_world.svg';

function MegaButton({ to, title, description, cta, icon, className }) {
  return (
    <Link
      to={to}
      className={`block sm:inline-block sm:w-1/2 px-8 py-6 rounded-lg hover:shadow-md ${className ||
        ''}`}
    >
      <h3 className="text-xl uppercase tracking-tight mb-3">
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {title}
      </h3>
      <p className="mb-3">{description}</p>
      <p className="text-lg font-bold">
        {cta}
        <FontAwesomeIcon icon={faLongArrowRight} fixedWidth className="text-sm ml-2" />
      </p>
    </Link>
  );
}

function Landing() {
  return (
    <div className="container mx-auto py-8">
      <div className="sm:flex items-center justify-center mb-6">
        <div className="p-4 pt-0 sm:p-6 sm:pt-4 lg:pr-8">
          <h2 className="text-3xl leading-tight mb-3">
            Welcome to{' '}
            <span className="whitespace-no-wrap">
              my
              <Logo className="text-teal-600 mx-px" />
              wallet
            </span>
          </h2>
          <p className="text-lg">
            You'll need to{' '}
            <Link to="/create" className="text-teal-600 hover:text-teal-800 focus:text-teal-800">
              create a new wallet
            </Link>{' '}
            or{' '}
            <Link to="/unlock" className="text-teal-600 hover:text-teal-800 focus:text-teal-800">
              unlock an existing wallet
            </Link>{' '}
            before you can continue.
          </p>
        </div>
        <img
          src={connectedWorldSvg}
          alt="world map with network lines"
          className="hidden sm:block w-2/5 md:w-1/3 lg:w-1/4 max-w-full flex-none pr-6"
        />
      </div>
      <div className="sm:flex justify-between px-4 sm:px-6">
        <MegaButton
          to="/create"
          title="Create a wallet"
          description="Provide a password and we'll create a new wallet and give you the keystore to access it next time"
          cta="Get started"
          icon={faWallet}
          className="mb-6 sm:mb-0 sm:mr-6 bg-teal-500 hover:bg-teal-600 text-teal-100"
        />
        <MegaButton
          to="/unlock"
          title="Unlock a wallet"
          description="Provide your existing keystore and password to unlock and start using your wallet"
          cta="Access now"
          icon={faUnlockAlt}
          className="bg-blue-600 hover:bg-blue-700 text-blue-100"
        />
      </div>
    </div>
  );
}

export default Landing;
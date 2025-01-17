import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSync, faWallet } from '@fortawesome/pro-duotone-svg-icons';
import { Link } from '@reach/router';
import ReactTooltip from 'react-tooltip';
import { copyToClipboard } from 'utils/copyToClipboard';
import { formatNumber } from 'utils/formatNumber';
import { useWallet } from 'components/Wallet';

const COPY_TOOLTIPS = {
  INITIAL: 'Copy address',
  COPIED: 'Address copied',
};

function WalletHeader() {
  const { fullBalance, isLoading, refreshWallet, wallet } = useWallet();
  const [copyTooltip, setCopyTooltip] = useState(COPY_TOOLTIPS.INITIAL);
  const copyTooltipRef = useRef(null);

  function copyAddressToClipboard() {
    const address = wallet.getAddress();
    copyToClipboard(address);

    // Update and re-show the tooltip
    ReactTooltip.hide(copyTooltipRef.current);
    setCopyTooltip(COPY_TOOLTIPS.COPIED);
    setTimeout(() => ReactTooltip.show(copyTooltipRef.current));
    setTimeout(() => setCopyTooltip(COPY_TOOLTIPS.INITIAL), 2000);
  }

  return (
    wallet && (
      <div className="bg-blue-600 text-blue-100 shadow-inner py-3 px-6 lg:px-8 -mt-6 -ml-6 -mr-6 lg:-mt-8 lg:-ml-8 lg:-mr-8">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="hover:text-white focus:text-white" title="Back to dashboard">
              <FontAwesomeIcon icon={faHome} swapOpacity />
            </Link>
            <button
              onClick={copyAddressToClipboard}
              data-tip={copyTooltip}
              ref={copyTooltipRef}
              className="whitespace-no-wrap hover:text-white focus:text-white ml-4 sm:ml-6"
            >
              <FontAwesomeIcon icon={faWallet} className="mr-2" />
              {wallet.getAddress().substr(0, 6)}&hellip;{wallet.getAddress().substr(-8)}
              <ReactTooltip place="right" effect="solid" />
            </button>
          </div>
          <button
            onClick={() => refreshWallet()}
            disabled={isLoading}
            className="ml-4 sm:ml-6 whitespace-no-wrap hover:text-white focus:text-white"
          >
            {fullBalance && `${formatNumber(fullBalance, 2)} ICX`}
            <FontAwesomeIcon icon={faSync} spin={isLoading} className="ml-2" />
          </button>
        </div>
      </div>
    )
  );
}

export default WalletHeader;

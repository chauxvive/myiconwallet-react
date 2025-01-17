import React from 'react';
import PropTypes from 'prop-types';

function Logo({ className, iconClassName, textClassName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 120"
      role="logo"
      aria-label="ICON Foundation logo"
      className={`fill-current inline align-middle ${className || ''}`}
      style={{ height: '0.68em' }}
      data-testid="logo"
    >
      {/* o icon */}
      <g className={iconClassName} data-testid="logo-icon">
        <path d="M233.5 31.4l-13 13c2.8 4.6 4.4 9.9 4.4 15.7 0 16.6-13.4 30-30 30-5.7 0-11.1-1.6-15.7-4.4l-13 13c8 5.9 17.9 9.5 28.6 9.5 26.5 0 48-21.5 48-48 .2-10.9-3.3-20.8-9.3-28.8zM165 60c0-16.6 13.4-30 30-30 5.7 0 11.1 1.6 15.7 4.4l13-13c-8-5.9-17.9-9.5-28.6-9.5-26.5 0-48 21.5-48 48 0 10.7 3.5 20.6 9.5 28.6l13-13c-3-4.4-4.6-9.8-4.6-15.5z" />
        <circle cx="243" cy="12" r="12" />
        <circle cx="147" cy="108" r="12" />
      </g>

      {/* icn text */}
      <g className={textClassName} data-testid="logo-text">
        <circle cx="12" cy="12" r="12" />
        <path d="M20.5 106h-17c-.3 0-.5-.2-.5-.5v-73c0-.3.2-.5.5-.5h17c.3 0 .5.2.5.5v73c0 .3-.2.5-.5.5zM90.6 32h28.9c.3 0 .5-.2.5-.5v-17c0-.3-.2-.5-.5-.5H90.8C65.6 14 44.5 34 44 59.2 43.6 85 64.3 106 90 106h29.5c.3 0 .5-.2.5-.5v-17c0-.3-.2-.5-.5-.5H90c-15.7 0-28.4-13-28-28.8C62.4 44 75.3 32 90.6 32zM306.3 14c-23.6.4-42.3 20.1-42.3 43.7v47.8c0 .3.2.5.5.5h17c.3 0 .5-.2.5-.5V57.6c0-14 11.5-25.8 25.5-25.6 13.6.3 24.5 11.3 24.5 25v48.5c0 .3.2.5.5.5h17c.3 0 .5-.2.5-.5V57c0-24-19.7-43.4-43.7-43z" />
      </g>
    </svg>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  textClassName: PropTypes.string,
};

export default Logo;

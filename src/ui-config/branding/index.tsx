import React from 'react';
import { IntlShape } from 'react-intl/src/types';
import { SocialIcon } from '@aave/aave-ui-kit';

import FormattedTxErrorTextUI from './FormattedTxErrorText';
import logo from './images/rwaLogo.svg';
import LegalBanner from './LegalBanner';
import './style.css';
import TopDisclaimerUI from './TopDisclaimer';
import {
  DashboardLeftTopLine as DashboardLeftTopLineUI,
  DashboardLeftTopLineProps,
} from './DashboardLeftTopLine';
import { UnlockWalletExtraText as UnlockWalletExtraTextUI } from './UnlockWalletExtraText';

export const LOGO = logo;

export const socialIcons: SocialIcon[] = [];

export const TopDisclaimer: React.FC = TopDisclaimerUI;
export const BottomDisclaimer: React.FC = LegalBanner;
export const FormattedTxErrorText: React.FC = FormattedTxErrorTextUI;

export const DashboardLeftTopLine: React.FC<DashboardLeftTopLineProps> = DashboardLeftTopLineUI;

export const UnlockWalletExtraText: React.FC<{ intl: IntlShape }> = UnlockWalletExtraTextUI;
